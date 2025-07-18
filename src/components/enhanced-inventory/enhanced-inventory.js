import enhancedInventoryStyles from './enhanced-inventory.css' with { type: 'css' };
import { ShadowComponent } from '@/components/base/shadow-component.js';

/**
 * Enhanced Inventory component for displaying location inventories with valuable items and corrupted substances
 * Uses shadow DOM and manual slot assignment for performance
 */

export class EnhancedInventory extends ShadowComponent {
  constructor() {
    super();
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(enhancedInventoryStyles);
    
    this._shadowRoot.innerHTML = `
      <div class="enhanced-inventory">
        <div class="inventory-header">
          <span class="inventory-icon">📦</span>
          <h4 class="inventory-title">Enhanced Inventory</h4>
        </div>
        <slot name="inventory-sections"></slot>
      </div>
    `;
  }

  /**
   * Process pending data that was stored before connection
   */
  processPendingData() {
    if (this.pendingData) {
      this.displayInventory(this.pendingData);
    }
  }

  /**
   * Display enhanced inventory data
   * @param {Object} inventory - Inventory with valuable_items and corrupted_substances
   */
  displayInventory(inventory) {
    // If not ready yet, store the data for later
    if (!this.isReady()) {
      this.storePendingData(inventory);
      return;
    }

    const container = document.createElement('div');
    container.className = 'inventory-sections';

    let hasContent = false;

    // Valuable items section
    if (inventory.valuable_items && inventory.valuable_items.length > 0) {
      const valuableSection = this.createInventorySection(
        'valuable_items',
        'Valuable Items',
        '💎',
        inventory.valuable_items
      );
      container.appendChild(valuableSection);
      hasContent = true;
    }

    // Corrupted substances section
    if (inventory.corrupted_substances && inventory.corrupted_substances.length > 0) {
      const corruptedSection = this.createInventorySection(
        'corrupted_substances',
        'Corrupted Substances',
        '☠️',
        inventory.corrupted_substances
      );
      container.appendChild(corruptedSection);
      hasContent = true;
    }

    // Show empty state if no content
    if (!hasContent) {
      this.displayEmptyState(container);
    }

    // Assign to slot
    this.safeSlotAssign('inventory-sections', container);
  }

  /**
   * Create an inventory section
   * @param {string} type - Section type (valuable_items or corrupted_substances)
   * @param {string} title - Section title
   * @param {string} icon - Section icon
   * @param {Array} items - Array of inventory items
   * @returns {HTMLElement} Inventory section element
   */
  createInventorySection(type, title, icon, items) {
    const section = document.createElement('div');
    section.className = `inventory-section ${type.replace('_', '-')}`;

    // Section header
    const header = document.createElement('div');
    header.className = 'section-header';

    const titleElement = document.createElement('h5');
    titleElement.className = 'section-title';
    titleElement.textContent = title;

    const iconElement = document.createElement('span');
    iconElement.className = 'section-icon';
    iconElement.textContent = icon;

    header.appendChild(iconElement);
    header.appendChild(titleElement);
    section.appendChild(header);

    // Items grid
    const itemsGrid = document.createElement('div');
    itemsGrid.className = 'items-grid';

    items.forEach(item => {
      const itemCard = this.createItemCard(item, type);
      itemsGrid.appendChild(itemCard);
    });

    section.appendChild(itemsGrid);
    return section;
  }

  /**
   * Create an item card
   * @param {Object} item - Item data
   * @param {string} type - Item type (valuable_items or corrupted_substances)
   * @returns {HTMLElement} Item card element
   */
  createItemCard(item, type) {
    const card = document.createElement('div');
    card.className = 'item-card';

    // Item header with name and value/danger
    const header = document.createElement('div');
    header.className = 'item-header';

    const name = document.createElement('h6');
    name.className = 'item-name';
    name.textContent = item.item;
    header.appendChild(name);

    if (item.value) {
      const value = document.createElement('span');
      value.className = 'item-value';
      value.textContent = item.value;
      header.appendChild(value);
    }

    if (item.danger) {
      const danger = document.createElement('span');
      danger.className = 'item-danger';
      danger.textContent = item.danger;
      header.appendChild(danger);
    }

    card.appendChild(header);

    // Location
    if (item.location) {
      const location = document.createElement('div');
      location.className = 'item-location';
      location.textContent = `Location: ${item.location}`;
      card.appendChild(location);
    }

    // Description
    if (item.description) {
      const description = document.createElement('div');
      description.className = 'item-description';
      description.textContent = item.description;
      card.appendChild(description);
    }

    return card;
  }

  /**
   * Display empty state when no inventory exists
   * @param {HTMLElement} container - Container to add empty state to
   */
  displayEmptyState(container) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
      <div class="empty-state-icon">📦</div>
      <p>No enhanced inventory items available for this location</p>
    `;
    container.appendChild(emptyState);
  }

  /**
   * Factory method to create enhanced inventory component instances
   * @returns {EnhancedInventory} New enhanced inventory component element
   */
  static create() {
    return document.createElement('enhanced-inventory');
  }
}
