import { ShadowComponent } from '@/components/base/shadow-component.js';
import styles from './layout-item.css' with { type: 'css' };

/**
 * Layout Item component for displaying individual layout items
 * Supports buildings, mansions, floors, shrine areas, etc.
 */
export class LayoutItem extends ShadowComponent {
  constructor() {
    super();
    this.itemData = null;
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(styles);
    
    this._shadowRoot.innerHTML = `
      <div class="layout-item">
        <div class="item-header">
          <h6 class="item-name"></h6>
        </div>
        <div class="item-content">
          <div class="item-description"></div>
          <div class="item-fields"></div>
          <div class="item-lists"></div>
        </div>
      </div>
    `;
  }

  /**
   * Process pending data that was stored before connection
   */
  processPendingData() {
    if (this.pendingData) {
      this.setItemData(this.pendingData);
    }
  }

  /**
   * Set item data and populate the component
   * @param {Object} itemData - Item data with name, description, fields, features, etc.
   */
  setItemData(itemData) {
    // If not ready yet, store the data for later
    if (!this.isReady()) {
      this.storePendingData(itemData);
      return;
    }

    this.itemData = itemData;
    this.populateItem();
  }

  /**
   * Populate the item with all data
   */
  populateItem() {
    if (!this.itemData) return;

    this.renderName();
    this.renderDescription();
    this.renderFields();
    this.renderLists();
  }

  /**
   * Render the item name
   */
  renderName() {
    const nameElement = this._shadowRoot.querySelector('.item-name');
    if (nameElement && this.itemData.name) {
      nameElement.textContent = this.itemData.name;
    }
  }

  /**
   * Render the item description
   */
  renderDescription() {
    const descriptionElement = this._shadowRoot.querySelector('.item-description');
    if (descriptionElement && this.itemData.description) {
      const p = document.createElement('p');
      p.textContent = this.itemData.description;
      descriptionElement.appendChild(p);
    }
  }

  /**
   * Render custom fields (owner, condition, deity, etc.)
   */
  renderFields() {
    const fieldsElement = this._shadowRoot.querySelector('.item-fields');
    if (!fieldsElement || !this.itemData.fields) return;

    Object.entries(this.itemData.fields).forEach(([key, value]) => {
      if (value) {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = 'item-field';
        
        const label = document.createElement('strong');
        label.textContent = this.formatFieldLabel(key) + ': ';
        
        const content = document.createElement('span');
        content.textContent = value;
        
        fieldDiv.appendChild(label);
        fieldDiv.appendChild(content);
        fieldsElement.appendChild(fieldDiv);
      }
    });
  }

  /**
   * Render lists (features, hazards, offerings)
   */
  renderLists() {
    const listsElement = this._shadowRoot.querySelector('.item-lists');
    if (!listsElement) return;

    // Render features
    if (this.itemData.features && this.itemData.features.length > 0) {
      this.renderList(listsElement, 'Features', this.itemData.features, 'features');
    }

    // Render hazards with special styling
    if (this.itemData.hazards && this.itemData.hazards.length > 0) {
      this.renderList(listsElement, 'Hazards', this.itemData.hazards, 'hazards');
    }

    // Render offerings (for shrines)
    if (this.itemData.offerings && this.itemData.offerings.length > 0) {
      this.renderList(listsElement, 'Offerings', this.itemData.offerings, 'offerings');
    }
  }

  /**
   * Render a single list with title
   * @param {Element} container - Container element
   * @param {string} title - List title
   * @param {Array<string>} items - List items
   * @param {string} type - List type for styling
   */
  renderList(container, title, items, type) {
    const listSection = document.createElement('div');
    listSection.className = `item-list item-list-${type}`;

    const listTitle = document.createElement('strong');
    listTitle.className = 'list-title';
    listTitle.textContent = title + ':';
    listSection.appendChild(listTitle);

    const ul = document.createElement('ul');
    ul.className = `list-items list-items-${type}`;
    
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });

    listSection.appendChild(ul);
    container.appendChild(listSection);
  }

  /**
   * Format field labels for display
   * @param {string} key - Field key
   * @returns {string} Formatted label
   */
  formatFieldLabel(key) {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/_/g, ' ');
  }

  /**
   * Factory method to create layout item component instances
   * @returns {LayoutItem} New layout item component element
   */
  static create() {
    return document.createElement('layout-item');
  }
}

// Register the custom element
customElements.define('layout-item', LayoutItem);
