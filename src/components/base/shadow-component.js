/**
 * Base class for web components with shadow DOM and deferred rendering
 * Provides lifecycle management for components that need to render before being connected to the DOM
 */

export class ShadowComponent extends HTMLElement {
  constructor() {
    super();
    this.pendingData = null;
    this._isComponentReady = false;
    this._shadowRoot = null;
    this._readyEventDispatched = false;
  }

  /**
   * Called when the component is connected to the DOM
   * Subclasses should call super.connectedCallback() first
   */
  connectedCallback() {
    console.log('ShadowComponent: connectedCallback called for', this.constructor.name);
    if (!this._shadowRoot) {
      this._shadowRoot = this.attachShadow({ mode: 'open', slotAssignment: 'manual' });
      this.setupShadowDOM();
    }
    
    this._isComponentReady = true;
    
    // Process any pending data
    if (this.pendingData) {
      console.log('ShadowComponent: Processing pending data for', this.constructor.name);
      this.processPendingData();
      this.pendingData = null;
    }
    
    // Dispatch ready event only once
    if (!this._readyEventDispatched) {
      this._readyEventDispatched = true;
      this.dispatchEvent(new CustomEvent('componentReady', {
        bubbles: false,
        composed: false
      }));
    }
  }

  /**
   * Called when the component is disconnected from the DOM
   */
  disconnectedCallback() {
    this._isComponentReady = false;
    this._readyEventDispatched = false;
  }

  /**
   * Setup shadow DOM structure and styles
   * Must be implemented by subclasses
   */
  setupShadowDOM() {
    throw new Error('setupShadowDOM() must be implemented by subclasses');
  }

  /**
   * Process pending data that was stored before connection
   * Must be implemented by subclasses that use deferred rendering
   */
  processPendingData() {
    // Default implementation - subclasses can override
  }

  /**
   * Safe method to store data for later processing
   * @param {*} data - Data to store until component is connected
   */
  storePendingData(data) {
    this.pendingData = data;
  }

  /**
   * Check if component is ready for DOM manipulation
   * @returns {boolean} True if shadow DOM is ready
   */
  isReady() {
    return this._shadowRoot !== null && this._isComponentReady;
  }

  /**
   * Safe query selector that only works when component is ready
   * @param {string} selector - CSS selector
   * @returns {Element|null} Found element or null
   */
  safeQuerySelector(selector) {
    return this.isReady() ? this._shadowRoot.querySelector(selector) : null;
  }

  /**
   * Safe query selector all that only works when component is ready
   * @param {string} selector - CSS selector
   * @returns {NodeList|Array} Found elements or empty array
   */
  safeQuerySelectorAll(selector) {
    return this.isReady() ? this._shadowRoot.querySelectorAll(selector) : [];
  }

  /**
   * Safe slot assignment that only works when component is ready
   * @param {string} slotName - Name of the slot
   * @param {Node|Node[]} nodes - Node(s) to assign to slot
   */
  safeSlotAssign(slotName, nodes) {
    if (!this.isReady()) {
      console.warn(`ShadowComponent: Cannot assign to slot "${slotName}" - component not ready`);
      return;
    }
    
    /** @type {HTMLSlotElement} */
    const slot = this._shadowRoot.querySelector(`slot[name="${slotName}"]`);
    if (!slot) {
      console.warn(`ShadowComponent: Slot "${slotName}" not found in shadow DOM`);
      return;
    }
    
    const nodeArray = Array.isArray(nodes) ? nodes : [nodes];
    const validNodes = nodeArray.filter(node => node && node instanceof Node);
    
    if (validNodes.length === 0) {
      console.warn(`ShadowComponent: No valid nodes to assign to slot "${slotName}"`);
      return;
    }
    
    try {
      // Step 1: Append nodes to shadow host to make them direct children
      validNodes.forEach(node => {
        if (node.parentNode === this) {
          // If already a direct child, no need to remove 
          return;
        }
        // Remove from current parent if it exists
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
        this.appendChild(node);
      });
      
      // Step 2: Assign to slot
      slot.assign(...validNodes);
      
      // Step 3: Verify assignment
      const assignedNodes = slot.assignedNodes();
      if (assignedNodes.length === 0 && validNodes.length > 0) {
        console.error(`ShadowComponent: Assignment still failed for slot "${slotName}" even after hosting`);
      }
    } catch (error) {
      console.error(`ShadowComponent: Error assigning nodes to slot "${slotName}":`, error);
    }
  }

  /**
   * Apply CSS styles to shadow DOM
   * @param {CSSStyleSheet|CSSStyleSheet[]} styles - Style sheets to apply
   */
  applyStyles(styles) {
    if (!this._shadowRoot) return;
    
    const styleArray = Array.isArray(styles) ? styles : [styles];
    this._shadowRoot.adoptedStyleSheets = styleArray;
  }

  /**
   * Get nodes assigned to a named slot
   * @param {string} slotName - Name of the slot
   * @returns {Node[]} Array of assigned nodes
   */
  getAssignedNodes(slotName) {
    if (!this.isReady()) {
      console.warn(`ShadowComponent: Cannot get assigned nodes for slot "${slotName}" - component not ready`);
      return [];
    }
    /** @type {HTMLSlotElement} */
    const slot = this._shadowRoot.querySelector(`slot[name="${slotName}"]`);
    return slot ? slot.assignedNodes() : [];
  }

  /**
   * Get elements assigned to a named slot
   * @param {string} slotName - Name of the slot
   * @returns {Element[]} Array of assigned elements
   */
  getAssignedElements(slotName) {
    if (!this.isReady()) {
      console.warn(`ShadowComponent: Cannot get assigned elements for slot "${slotName}" - component not ready`);
      return [];
    }
    /** @type {HTMLSlotElement} */
    const slot = this._shadowRoot.querySelector(`slot[name="${slotName}"]`);
    return slot ? slot.assignedElements() : [];
  }

  /**
   * Abstract factory method - must be implemented by all subclasses
   * Creates a new instance of the component
   * @returns {HTMLElement} New component instance
   * @throws {Error} If not implemented by subclass
   */
  static create() {
    throw new Error(`${this.name} must implement static create() method`);
  }
}
