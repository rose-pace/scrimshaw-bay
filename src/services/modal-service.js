/**
 * Modal service for creating and managing modal dialogs
 */

import { createElement, addEventListenerWithCleanup } from '@/utils/dom-utils.js';

export class ModalService {
  constructor() {
    this.activeModals = new Map();
    this.modalCounter = 0;
    this.setupKeyboardHandlers();
  }

  /**
   * Creates and displays a modal
   * @param {Object} options - Modal configuration
   * @param {string} options.title - Modal title
   * @param {string} options.content - Modal content HTML
   * @param {string} options.className - Additional CSS classes
   * @param {boolean} options.closeOnOverlayClick - Whether to close on overlay click
   * @param {Function} options.onClose - Callback when modal closes
   * @returns {string} Modal ID for reference
   */
  createModal(options = {}) {
    const {
      title = '',
      content = '',
      className = '',
      closeOnOverlayClick = true,
      onClose = null
    } = options;

    const modalId = `modal-${++this.modalCounter}`;
    
    const modal = createElement('div', {
      className: `modal-overlay ${className}`,
      attributes: {
        'data-modal-id': modalId,
        'role': 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': title ? `${modalId}-title` : null
      }
    });

    const modalContent = createElement('div', {
      className: 'modal-content',
      innerHTML: `
        <div class="modal-header">
          ${title ? `<h2 id="${modalId}-title">${title}</h2>` : ''}
          <button class="close-btn" aria-label="Close modal" type="button">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
      `
    });

    modal.appendChild(modalContent);

    // Store modal info for cleanup
    const modalInfo = {
      element: modal,
      onClose,
      cleanupFunctions: []
    };

    // Setup close button
    const closeBtn = modal.querySelector('.close-btn');
    if (closeBtn) {
      const closeCleanup = addEventListenerWithCleanup(closeBtn, 'click', () => {
        this.closeModal(modalId);
      });
      modalInfo.cleanupFunctions.push(closeCleanup);
    }

    // Setup overlay click
    if (closeOnOverlayClick) {
      const overlayCleanup = addEventListenerWithCleanup(modal, 'click', (e) => {
        if (e.target === modal) {
          this.closeModal(modalId);
        }
      });
      modalInfo.cleanupFunctions.push(overlayCleanup);
    }

    // Prevent modal content clicks from closing modal
    const contentCleanup = addEventListenerWithCleanup(modalContent, 'click', (e) => {
      e.stopPropagation();
    });
    modalInfo.cleanupFunctions.push(contentCleanup);

    this.activeModals.set(modalId, modalInfo);

    // Add to DOM
    document.body.appendChild(modal);

    // Focus management
    this.focusModal(modal);

    // Add CSS class to body to prevent scrolling
    document.body.classList.add('modal-open');

    return modalId;
  }

  /**
   * Closes a modal by ID
   * @param {string} modalId - Modal ID to close
   */
  closeModal(modalId) {
    const modalInfo = this.activeModals.get(modalId);
    if (!modalInfo) return;

    // Call onClose callback if provided
    if (modalInfo.onClose) {
      modalInfo.onClose();
    }

    // Clean up event listeners
    modalInfo.cleanupFunctions.forEach(cleanup => cleanup());

    // Remove from DOM
    modalInfo.element.remove();

    // Remove from active modals
    this.activeModals.delete(modalId);

    // Remove body class if no more modals
    if (this.activeModals.size === 0) {
      document.body.classList.remove('modal-open');
    }
  }

  /**
   * Closes all active modals
   */
  closeAllModals() {
    const modalIds = Array.from(this.activeModals.keys());
    modalIds.forEach(id => this.closeModal(id));
  }

  /**
   * Focuses the modal for accessibility
   * @param {HTMLElement} modal - Modal element
   */
  focusModal(modal) {
    // Find first focusable element
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    } else {
      modal.focus();
    }
  }

  /**
   * Sets up keyboard handlers for modal navigation
   */
  setupKeyboardHandlers() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModals.size > 0) {
        // Close the most recently opened modal
        const modalIds = Array.from(this.activeModals.keys());
        const lastModalId = modalIds[modalIds.length - 1];
        this.closeModal(lastModalId);
      }
    });
  }

  /**
   * Creates a confirmation modal
   * @param {Object} options - Confirmation options
   * @param {string} options.title - Confirmation title
   * @param {string} options.message - Confirmation message
   * @param {string} options.confirmText - Confirm button text
   * @param {string} options.cancelText - Cancel button text
   * @param {Function} options.onConfirm - Callback on confirm
   * @param {Function} options.onCancel - Callback on cancel
   * @returns {string} Modal ID
   */
  createConfirmationModal(options = {}) {
    const {
      title = 'Confirm',
      message = 'Are you sure?',
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      onConfirm = null,
      onCancel = null
    } = options;

    const content = `
      <div class="confirmation-modal">
        <p>${message}</p>
        <div class="confirmation-buttons">
          <button class="btn btn-danger confirm-btn" type="button">${confirmText}</button>
          <button class="btn btn-secondary cancel-btn" type="button">${cancelText}</button>
        </div>
      </div>
    `;

    const modalId = this.createModal({
      title,
      content,
      className: 'confirmation-modal-overlay',
      closeOnOverlayClick: false
    });

    const modal = this.activeModals.get(modalId).element;

    // Setup confirmation buttons
    const confirmBtn = modal.querySelector('.confirm-btn');
    const cancelBtn = modal.querySelector('.cancel-btn');

    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        if (onConfirm) onConfirm();
        this.closeModal(modalId);
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        if (onCancel) onCancel();
        this.closeModal(modalId);
      });
    }

    return modalId;
  }

  /**
   * Gets the count of active modals
   * @returns {number} Number of active modals
   */
  getActiveModalCount() {
    return this.activeModals.size;
  }

  /**
   * Checks if a modal is currently active
   * @param {string} modalId - Modal ID to check
   * @returns {boolean} True if modal is active
   */
  isModalActive(modalId) {
    return this.activeModals.has(modalId);
  }
}
