import { ShadowComponent } from '@/components/base/shadow-component.js';
import styles from './structure-item.css' with { type: 'css' };

/**
 * Structure Item component for displaying individual settlement structure aspects
 * Displays a single structure field with formatted label and description
 */
export class StructureItem extends ShadowComponent {
  constructor() {
    super();
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(styles);
    
    this._shadowRoot.innerHTML = `
      <div class="structure-item">
        <div class="structure-label" aria-describedby="structure-desc"></div>
        <div class="structure-description" id="structure-desc"></div>
      </div>
    `;
  }

  /**
   * Process pending data that was stored before connection
   */
  processPendingData() {
    if (this.pendingData) {
      this.setStructureData(this.pendingData.label, this.pendingData.description);
    }
  }

  /**
   * Set structure data and render content
   * @param {string} label - Structure field label (e.g., "main_area", "docks")
   * @param {string} description - Structure description text
   */
  setStructureData(label, description) {
    if (!this.isReady()) {
      this.storePendingData({ label, description });
      return;
    }

    const labelElement = this._shadowRoot.querySelector('.structure-label');
    const descElement = this._shadowRoot.querySelector('.structure-description');

    if (labelElement && descElement) {
      // Format label from snake_case to Title Case
      labelElement.textContent = this.formatLabel(label);
      descElement.textContent = description;
    }
  }

  /**
   * Format structure label from snake_case to readable Title Case
   * @param {string} label - Raw label string
   * @returns {string} Formatted label
   */
  formatLabel(label) {
    return label
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Factory method to create structure item component instances
   * @returns {StructureItem} New structure item component element
   */
  static create() {
    return document.createElement('structure-item');
  }
}

// Register the custom element
customElements.define('structure-item', StructureItem);
