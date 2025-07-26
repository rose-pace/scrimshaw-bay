import { ShadowComponent } from '@/components/base/shadow-component.js';
import styles from './layout-group.css' with { type: 'css' };

/**
 * Layout Group component for displaying groups of layout items
 * Handles titles and containers for related layout items
 */
export class LayoutGroup extends ShadowComponent {
  constructor() {
    super();
    this.groupData = null;
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(styles);
    
    this._shadowRoot.innerHTML = `
      <div class="layout-group">
        <h5 class="group-title"></h5>
        <div class="group-items">
          <slot name="layout-items"></slot>
        </div>
      </div>
    `;
  }

  /**
   * Process pending data that was stored before connection
   */
  processPendingData() {
    if (this.pendingData) {
      this.setGroupData(this.pendingData);
    }
  }

  /**
   * Set group data and populate the component
   * @param {Object} groupData - Group data with title, type, and items
   */
  setGroupData(groupData) {
    // If not ready yet, store the data for later
    if (!this.isReady()) {
      this.storePendingData(groupData);
      return;
    }

    this.groupData = groupData;
    this.populateGroup();
  }

  /**
   * Populate the group with title and items
   */
  populateGroup() {
    if (!this.groupData) return;

    // Set title
    const titleElement = this._shadowRoot.querySelector('.group-title');
    if (titleElement && this.groupData.title) {
      titleElement.textContent = this.groupData.title;
    }

    // Set group type class for styling
    const groupElement = this._shadowRoot.querySelector('.layout-group');
    if (groupElement && this.groupData.type) {
      groupElement.classList.add(`group-type-${this.groupData.type}`);
    }

    // Create items
    if (this.groupData.items && this.groupData.items.length > 0) {
      // Import LayoutItem component dynamically
      import('@/components/layout-item/layout-item.js').then(({ LayoutItem }) => {
        const container = document.createElement('div');
        container.className = 'layout-items-grid';

        this.groupData.items.forEach(itemData => {
          const layoutItem = LayoutItem.create();
          layoutItem.setItemData(itemData);
          container.appendChild(layoutItem);
        });

        this.safeSlotAssign('layout-items', container);
      });
    }
  }

  /**
   * Factory method to create layout group component instances
   * @returns {LayoutGroup} New layout group component element
   */
  static create() {
    return document.createElement('layout-group');
  }
}

// Register the custom element
customElements.define('layout-group', LayoutGroup);
