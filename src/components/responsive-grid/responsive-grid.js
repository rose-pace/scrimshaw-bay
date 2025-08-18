import { ShadowComponent } from '@/components/base/shadow-component.js';
import styles from './responsive-grid.css' with { type: 'css' };

/**
 * Responsive Grid component for displaying collections of components in a grid layout
 * Automatically adjusts column count based on media query breakpoints
 */
export class ResponsiveGrid extends ShadowComponent {
  constructor() {
    super();
    this.maxColumns = 4; // Default max columns
    this.gridItems = [];
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(styles);
    
    this._shadowRoot.innerHTML = `
      <div class="responsive-grid" role="grid">
        <slot name="grid-items"></slot>
      </div>
    `;
  }

  /**
   * Process pending data that was stored before connection
   */
  processPendingData() {
    if (this.pendingData) {
      this.setGridData(this.pendingData.items, this.pendingData.maxColumns);
    }
  }

  /**
   * Set grid data and render items
   * @param {Array<HTMLElement>} items - Array of HTML elements to display in grid
   * @param {number} maxColumns - Maximum number of columns (2-4, defaults to 4)
   */
  setGridData(items, maxColumns = 4) {
    if (!this.isReady()) {
      this.storePendingData({ items, maxColumns });
      return;
    }

    // Store items
    this.gridItems = Array.isArray(items) ? items : [items];

    // Apply grid class based on max columns
    this.applyGridClass(maxColumns);

    // Add items to grid
    this.renderGridItems();
  }

  /**
   * Apply appropriate grid class based on max columns
   */
  applyGridClass() {
    const gridContainer = this._shadowRoot.querySelector('.responsive-grid');
    if (!gridContainer) return;

    // Remove any existing grid classes
    gridContainer.classList.remove(
      'grid-cols-2', 'grid-cols-3', 'grid-cols-4'
    );

    // Add appropriate grid class
    this.maxColumns = Math.max(2, Math.min(4, this.maxColumns));
    gridContainer.classList.add(`grid-cols-${this.maxColumns}`);
  }

  /**
   * Render grid items using safeSlotAssign
   */
  renderGridItems() {
    if (this.gridItems.length === 0) {
      this.renderEmptyState();
      return;
    }

    // Use safeSlotAssign to add all items to the grid
    this.safeSlotAssign('grid-items', this.gridItems);
  }

  /**
   * Render empty state when no items are provided
   */
  renderEmptyState() {
    const emptyElement = document.createElement('div');
    emptyElement.className = 'grid-empty-state';
    emptyElement.textContent = 'No items to display';
    
    this.safeSlotAssign('grid-items', emptyElement);
  }

  /**
   * Add a single item to the grid
   * @param {HTMLElement} item - HTML element to add
   */
  addItem(item) {
    if (!item || !(item instanceof HTMLElement)) return;
    
    this.gridItems.push(item);
    
    if (this.isReady()) {
      this.renderGridItems();
    }
  }

  /**
   * Clear all grid items
   */
  clearItems() {
    this.gridItems = [];
    
    if (this.isReady()) {
      this.renderEmptyState();
    }
  }

  /**
   * Factory method to create responsive grid component instances
   * @param {number} maxColumns - Maximum number of columns (2-4, defaults to 4); 0 means auto
   * @returns {ResponsiveGrid} New responsive grid component element
   */
  static create(maxColumns = 4) {
    const grid = document.createElement('responsive-grid');
    grid.maxColumns = maxColumns; // validation happens elsewhere

    return grid;
  }
}

// Register the custom element
customElements.define('responsive-grid', ResponsiveGrid);
