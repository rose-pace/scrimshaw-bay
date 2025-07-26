import { ShadowComponent } from '@/components/base/shadow-component.js';
import styles from './layout-wrapper.css' with { type: 'css' };

/**
 * Layout Wrapper component for displaying location layouts
 * Provides consistent container and styling for all layout types
 */
export class LayoutWrapper extends ShadowComponent {
  constructor() {
    super();
    this.layoutData = null;
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(styles);
    
    this._shadowRoot.innerHTML = `
      <div class="layout-wrapper">
        <slot name="layout-groups"></slot>
      </div>
    `;
  }

  /**
   * Process pending data that was stored before connection
   */
  processPendingData() {
    if (this.pendingData) {
      this.setLayoutData(this.pendingData);
    }
  }

  /**
   * Set layout data and populate the component
   * @param {Object} layoutData - Layout data with groups array
   */
  setLayoutData(layoutData) {
    // If not ready yet, store the data for later
    if (!this.isReady()) {
      this.storePendingData(layoutData);
      return;
    }

    this.layoutData = layoutData;
    this.populateLayout();
  }

  /**
   * Populate the layout with groups
   */
  populateLayout() {
    if (!this.layoutData || !this.layoutData.groups) return;

    // Import LayoutGroup component dynamically
    import('@/components/layout-group/layout-group.js').then(({ LayoutGroup}) => {
      const container = document.createElement('div');
      container.className = 'layout-groups-container';

      this.layoutData.groups.forEach(groupData => {
        const layoutGroup = LayoutGroup.create();
        layoutGroup.setGroupData(groupData);
        container.appendChild(layoutGroup);
      });

      this.safeSlotAssign('layout-groups', container);
    });
  }

  /**
   * Factory method to create layout wrapper component instances
   * @returns {LayoutWrapper} New layout wrapper component element
   */
  static create() {
    return document.createElement('layout-wrapper');
  }
}

// Register the custom element
customElements.define('layout-wrapper', LayoutWrapper);
