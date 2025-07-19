/**
 * Accordion wrapper component for managing collapsible content sections
 * Supports both exclusive (only one open) and multiple open modes
 */

import { ShadowComponent } from '@/components/base/shadow-component.js';
import { AccordionItem } from './accordion-item.js';
import styles from './accordion.css' with { type: 'css' };

export class Accordion extends ShadowComponent {
  constructor() {
    super();
    this.exclusive = this.hasAttribute('exclusive');
    this.allowMultiple = !this.exclusive;
  }

  /**
   * Define observed attributes
   */
  static get observedAttributes() {
    return ['exclusive'];
  }

  /**
   * Handle attribute changes
   * @param {string} name - Attribute name
   * @param {string} oldValue - Old value
   * @param {string} newValue - New value
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'exclusive') {
      this.exclusive = this.hasAttribute('exclusive');
      this.allowMultiple = !this.exclusive;
      
      // If switching to exclusive mode, close all but first expanded item
      if (this.exclusive && this.isReady()) {
        this.enforceExclusiveMode();
      }
    }
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(styles);
    
    this._shadowRoot.innerHTML = `
      <div class="accordion" role="group">
        <slot></slot>
      </div>
    `;
  }

  /**
   * Handle component connection
   */
  connectedCallback() {
    super.connectedCallback();
    
    // Listen for accordion item events
    this.addEventListener('accordion-item-toggle', this.handleItemToggle.bind(this));
    this.addEventListener('accordion-item-keydown', this.handleItemKeydown.bind(this));
  }

  /**
   * Safely add accordion item children with type enforcement
   * Stores pending items if accordion is not ready yet
   * @param {AccordionItem|AccordionItem[]} items - AccordionItem instance(s) to add
   * @throws {Error} If items are not AccordionItem instances
   */
  addAccordionItems(items) {
    const itemArray = Array.isArray(items) ? items : [items];
    
    // Type enforcement - check that all items are AccordionItem instances
    for (const item of itemArray) {
      if (!(item instanceof AccordionItem)) {
        const isValidItem = item instanceof HTMLElement && item.tagName.toLowerCase().includes('accordion-item');
        
        if (!isValidItem) {
          throw new Error(`Expected AccordionItem instance, got ${item.constructor.name || typeof item}`);
        }
      }
    }
    
    // If not ready yet, store the items for later
    if (!this.isReady()) {
      console.log('Accordion: Not ready, storing pending accordion items');
      const currentPending = this.pendingData?.accordionItems || [];
      this.storePendingData({ 
        ...this.pendingData,
        accordionItems: [...currentPending, ...itemArray] 
      });
      return;
    }
    
    // Component is ready, add items directly
    console.log('Accordion: Adding accordion items to component');
    this.safeSlotAssign(itemArray);
    
    // Ensure new items follow the current state rules
    this.ensureDefaultCollapsedState();
    
    if (this.exclusive) {
      this.enforceExclusiveMode();
    }
  }

  /**
   * Process pending data including accordion items
   */
  processPendingData() {
    super.processPendingData();
    
    // Process any pending accordion items
    if (this.pendingData?.accordionItems) {
      console.log('Accordion: Processing pending accordion items', this.pendingData.accordionItems);
      const pendingItems = this.pendingData.accordionItems;
      
      // Clear pending items to avoid infinite loop
      delete this.pendingData.accordionItems;
      if (Object.keys(this.pendingData).length === 0) {
        this.pendingData = null;
      }
      
      // Add the pending items
      this.addAccordionItems(pendingItems);
    }
    
    // Ensure all items start collapsed unless explicitly expanded
    this.ensureDefaultCollapsedState();
  }

  /**
   * Ensure all accordion items start in collapsed state unless explicitly set to expanded
   */
  ensureDefaultCollapsedState() {
    const items = this.querySelectorAll('accordion-item, background-npc-accordion-item');
    items.forEach(item => {
      // Only collapse if not explicitly set to expanded via attribute
      if (!item.hasAttribute('expanded')) {
        item.expanded = false;
        item.removeAttribute('expanded');
        if (item.updateExpandedState) {
          item.updateExpandedState();
        }
      }
    });
  }

  /**
   * Handle accordion item toggle
   * @param {CustomEvent} event - Toggle event
   */
  handleItemToggle(event) {
    const { item, expanded } = event.detail;
    
    // If exclusive mode and item is being expanded, close others
    if (this.exclusive && expanded) {
      this.closeOtherItems(item);
    }
    
    // Dispatch accordion-level event
    this.dispatchEvent(new CustomEvent('accordion-change', {
      detail: { 
        item, 
        expanded,
        accordion: this 
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Handle keyboard navigation between items
   * @param {CustomEvent} event - Keydown event
   */
  handleItemKeydown(event) {
    const { key, item } = event.detail;
    
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      event.preventDefault();
      this.focusNextItem(item, key === 'ArrowDown');
    } else if (key === 'Home') {
      event.preventDefault();
      this.focusFirstItem();
    } else if (key === 'End') {
      event.preventDefault();
      this.focusLastItem();
    }
  }

  /**
   * Close all items except the specified one
   * @param {HTMLElement} exceptItem - Item to keep open
   */
  closeOtherItems(exceptItem) {
    const items = this.querySelectorAll('accordion-item');
    items.forEach(item => {
      if (item !== exceptItem && item.expanded) {
        item.collapse();
      }
    });
  }

  /**
   * Enforce exclusive mode by closing all but first expanded item
   */
  enforceExclusiveMode() {
    const items = this.querySelectorAll('accordion-item');
    let foundExpanded = false;
    
    items.forEach(item => {
      if (item.expanded) {
        if (foundExpanded) {
          item.collapse();
        } else {
          foundExpanded = true;
        }
      }
    });
  }

  /**
   * Focus next/previous accordion item
   * @param {HTMLElement} currentItem - Current item
   * @param {boolean} forward - Direction (true = next, false = previous)
   */
  focusNextItem(currentItem, forward = true) {
    const items = Array.from(this.querySelectorAll('accordion-item'));
    const currentIndex = items.indexOf(currentItem);
    
    if (currentIndex === -1) return;
    
    let nextIndex;
    if (forward) {
      nextIndex = currentIndex + 1;
      if (nextIndex >= items.length) nextIndex = 0;
    } else {
      nextIndex = currentIndex - 1;
      if (nextIndex < 0) nextIndex = items.length - 1;
    }
    
    items[nextIndex].focusHeader();
  }

  /**
   * Focus first accordion item
   */
  focusFirstItem() {
    const firstItem = this.querySelector('accordion-item');
    if (firstItem) {
      firstItem.focusHeader();
    }
  }

  /**
   * Focus last accordion item
   */
  focusLastItem() {
    const items = this.querySelectorAll('accordion-item');
    const lastItem = items[items.length - 1];
    if (lastItem) {
      lastItem.focusHeader();
    }
  }

  /**
   * Get all expanded items
   * @returns {Array<HTMLElement>} Expanded items
   */
  getExpandedItems() {
    return Array.from(this.querySelectorAll('accordion-item[expanded]'));
  }

  /**
   * Expand all items (if not in exclusive mode)
   */
  expandAll() {
    if (this.exclusive) return;
    
    const items = this.querySelectorAll('accordion-item');
    items.forEach(item => item.expand());
  }

  /**
   * Collapse all items
   */
  collapseAll() {
    const items = this.querySelectorAll('accordion-item');
    items.forEach(item => item.collapse());
  }
}

// Register the custom element
customElements.define('accordion-wrapper', Accordion);

/**
 * Factory method to create accordion wrapper instances
 * @returns {Accordion} New accordion wrapper element
 */
Accordion.create = function() {
  return document.createElement('accordion-wrapper');
};
