import { ensureNode } from '@/utils/dom-utils.js';
import { ShadowComponent } from '@/components/base/shadow-component.js';
import styles from './gm-section-item.css' with { type: 'css' };

export class GmSectionItem extends ShadowComponent {
  constructor() {
    super();
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(styles);
    
    this._shadowRoot.innerHTML = `
      <div class="gm-section">
        <h4>
          <slot name="title">Section Title</slot>
        </h4>
        <slot name="content">Content goes here...</slot>
      </div>
    `;
  }

  /**
   * Create a GM section item element
   * @param {Element|Text|string} title - Section title
   * @param {Element|Text|string} content - Section content
   */
  setContent(title, content) {
    // If not ready yet, store the data for later
    if (!this.isReady()) {
      this.storePendingData({ title, content });
      return;
    }

    const titleNode = ensureNode(title);
    const contentNode = ensureNode(content);

    this.safeSlotAssign('title', titleNode);
    this.safeSlotAssign('content', contentNode);
  }

  /**
   * Process pending data that was stored before connection
   */
  processPendingData() {
    if (this.pendingData) {
      this.setContent(this.pendingData.title, this.pendingData.content);
    }
  }

  /**
   * Factory method to create GM section item component instances
   * @returns {GmSectionItem} New GM section item component element
   */
  static create() {
    return document.createElement('gm-section-item');
  }
}

customElements.define('gm-section-item', GmSectionItem);
