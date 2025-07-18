/**
 * Accordion item component for individual collapsible sections
 * Supports full accessibility and smooth animations
 */

import { ShadowComponent } from '@/components/base/shadow-component.js';
import styles from './accordion-item.css' with { type: 'css' };

export class AccordionItem extends ShadowComponent {
  constructor() {
    super();
    this.expanded = this.hasAttribute('expanded');
    this.disabled = this.hasAttribute('disabled');
    this.uniqueId = `accordion-item-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Define observed attributes
   */
  static get observedAttributes() {
    return ['expanded', 'disabled'];
  }

  /**
   * Handle attribute changes
   * @param {string} name - Attribute name
   * @param {string} oldValue - Old value
   * @param {string} newValue - New value
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.isReady()) return;

    if (name === 'expanded') {
      this.expanded = this.hasAttribute('expanded');
      this.updateExpandedState();
    } else if (name === 'disabled') {
      this.disabled = this.hasAttribute('disabled');
      this.updateDisabledState();
    }
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(styles);
    
    this._shadowRoot.innerHTML = `
      <div class="accordion-item" role="group">
        <button 
          class="accordion-header" 
          type="button"
          role="button"
          aria-expanded="${this.expanded}"
          aria-controls="${this.uniqueId}-content"
          id="${this.uniqueId}-header"
        >
          <slot name="header"></slot>
          <span class="accordion-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 12l-4-4h8l-4 4z"/>
            </svg>
          </span>
        </button>
        <div 
          class="accordion-content" 
          role="region"
          aria-labelledby="${this.uniqueId}-header"
          id="${this.uniqueId}-content"
          aria-hidden="${!this.expanded}"
        >
          <div class="accordion-body">
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    `;
    
    this.headerButton = this._shadowRoot.querySelector('.accordion-header');
    this.contentContainer = this._shadowRoot.querySelector('.accordion-content');
    this.iconElement = this._shadowRoot.querySelector('.accordion-icon');
    
    this.updateExpandedState();
    this.updateDisabledState();
  }

  /**
   * Handle component connection
   */
  connectedCallback() {
    super.connectedCallback();
    
    if (this.isReady()) {
      this.setupEventListeners();
    }
  }

  /**
   * Setup event listeners after component is ready
   */
  setupEventListeners() {
    this.headerButton.addEventListener('click', this.handleHeaderClick.bind(this));
    this.headerButton.addEventListener('keydown', this.handleHeaderKeydown.bind(this));
  }

  /**
   * Process pending data
   */
  processPendingData() {
    super.processPendingData();
    this.setupEventListeners();
  }

  /**
   * Handle header button click
   * @param {Event} event - Click event
   */
  handleHeaderClick(event) {
    if (this.disabled) return;
    
    event.preventDefault();
    this.toggle();
  }

  /**
   * Handle header button keydown
   * @param {KeyboardEvent} event - Keydown event
   */
  handleHeaderKeydown(event) {
    if (this.disabled) return;

    // Dispatch navigation events to parent accordion
    if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      this.dispatchEvent(new CustomEvent('accordion-item-keydown', {
        detail: { key: event.key, item: this },
        bubbles: true,
        composed: true
      }));
    }
  }

  /**
   * Toggle expanded state
   */
  toggle() {
    if (this.disabled) return;
    
    if (this.expanded) {
      this.collapse();
    } else {
      this.expand();
    }
  }

  /**
   * Expand the accordion item
   */
  expand() {
    if (this.disabled || this.expanded) return;
    
    this.expanded = true;
    this.setAttribute('expanded', '');
    this.updateExpandedState();
    
    this.dispatchToggleEvent();
  }

  /**
   * Collapse the accordion item
   */
  collapse() {
    if (this.disabled || !this.expanded) return;
    
    this.expanded = false;
    this.removeAttribute('expanded');
    this.updateExpandedState();
    
    this.dispatchToggleEvent();
  }

  /**
   * Update expanded state in the UI
   */
  updateExpandedState() {
    if (!this.headerButton || !this.contentContainer) return;
    
    this.headerButton.setAttribute('aria-expanded', this.expanded);
    this.contentContainer.setAttribute('aria-hidden', !this.expanded);
    
    if (this.expanded) {
      this.contentContainer.classList.add('expanded');
      this.iconElement.classList.add('expanded');
    } else {
      this.contentContainer.classList.remove('expanded');
      this.iconElement.classList.remove('expanded');
    }
  }

  /**
   * Update disabled state in the UI
   */
  updateDisabledState() {
    if (!this.headerButton) return;
    
    this.headerButton.disabled = this.disabled;
    this.headerButton.setAttribute('aria-disabled', this.disabled);
    
    if (this.disabled) {
      this.headerButton.classList.add('disabled');
    } else {
      this.headerButton.classList.remove('disabled');
    }
  }

  /**
   * Focus the header button
   */
  focusHeader() {
    if (this.headerButton) {
      this.headerButton.focus();
    }
  }

  /**
   * Dispatch toggle event
   */
  dispatchToggleEvent() {
    this.dispatchEvent(new CustomEvent('accordion-item-toggle', {
      detail: { 
        item: this, 
        expanded: this.expanded 
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Set header content
   * @param {HTMLElement|string} content - Header content
   */
  setHeader(content) {
    this.safeSlotAssign('header', content);
  }

  /**
   * Set body content
   * @param {HTMLElement|string} content - Body content
   */
  setContent(content) {
    this.safeSlotAssign('content', content);
  }
}

// Register the custom element
customElements.define('accordion-item', AccordionItem);

/**
 * Factory method to create accordion item instances
 * @returns {AccordionItem} New accordion item element
 */
AccordionItem.create = function() {
  return document.createElement('accordion-item');
};
