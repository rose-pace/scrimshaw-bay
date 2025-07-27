import { ShadowComponent } from '@/components/base/shadow-component.js';
import { StructureItem } from '@/components/settlement-layout/structure-item/structure-item.js';
import { ResponsiveGrid } from '@/components/responsive-grid/responsive-grid.js';
import styles from './structure-section.css' with { type: 'css' };

/**
 * Structure Section component for displaying settlement geographical structure
 * Orchestrates display of structure object data as descriptive items
 */
export class StructureSection extends ShadowComponent {
  constructor() {
    super();
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(styles);
    
    this._shadowRoot.innerHTML = `
      <div class="structure-section">
        <div class="section-header">
          <h4 class="section-title">Settlement Structure</h4>
          <p class="section-description">Geographical arrangement and key areas</p>
        </div>
        <div class="structure-items">
          <slot name="structure-items"></slot>
        </div>
      </div>
    `;
  }

  /**
   * Process pending data that was stored before connection
   */
  processPendingData() {
    if (this.pendingData) {
      this.setStructureData(this.pendingData);
    }
  }

  /**
   * Set structure data and render items
   * @param {Object} structureData - Structure object with descriptive fields
   */
  setStructureData(structureData) {
    if (!this.isReady()) {
      this.storePendingData(structureData);
      return;
    }

    if (!structureData || typeof structureData !== 'object') {
      this.renderEmptyState();
      return;
    }

    this.renderStructureItems(structureData);
  }

  /**
   * Render structure items from data object
   * @param {Object} structureData - Structure data object
   */
  renderStructureItems(structureData) {
    if (!this.isReady()) {
      this.storePendingData(structureData);
      return;
    }

    // Create structure items for each field
    const structureItems = [];
    
    Object.entries(structureData).forEach(([key, value]) => {
      if (typeof value === 'string' && value.trim()) {
        const structureItem = StructureItem.create();
        
        // Set data once component is ready
        if (structureItem.isReady && structureItem.isReady()) {
          structureItem.setStructureData(key, value);
        } else {
          structureItem.addEventListener('componentReady', () => {
            structureItem.setStructureData(key, value);
          }, { once: true });
        }
        
        structureItems.push(structureItem);
      }
    });

    // Create responsive grid with 4 column max and add items
    if (structureItems.length > 0) {
      const grid = ResponsiveGrid.create(4);
      
      if (grid.isReady && grid.isReady()) {
        grid.setGridData(structureItems, 4);
      } else {
        grid.addEventListener('componentReady', () => {
          grid.setGridData(structureItems, 4);
        }, { once: true });
      }
      
      this.safeSlotAssign('structure-items', grid);
    } else {
      this.renderEmptyState();
    }
  }

  /**
   * Clear slot content
   * @param {HTMLElement} slot - Slot element to clear
   */
  clearSlotContent(slot) {
    // Remove all slotted elements
    const slottedElements = Array.from(this.querySelectorAll('[slot="structure-items"]'));
    slottedElements.forEach(element => element.remove());
  }

  /**
   * Render empty state when no structure data is available
   */
  renderEmptyState() {
    const emptyElement = document.createElement('div');
    emptyElement.className = 'empty-state';
    emptyElement.textContent = 'No settlement structure information available';
    
    this.safeSlotAssign('structure-items', emptyElement);
  }

  /**
   * Factory method to create structure section component instances
   * @returns {StructureSection} New structure section component element
   */
  static create() {
    return document.createElement('structure-section');
  }
}

// Register the custom element
customElements.define('structure-section', StructureSection);
