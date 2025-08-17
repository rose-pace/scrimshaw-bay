import { ShadowComponent } from '@/components/base/shadow-component.js';
import { StructureSection } from '@/components/settlement-layout/structure-section/structure-section.js';
import { DistrictCard } from '@/components/settlement-layout/district-card/district-card.js';
import { ResponsiveGrid } from '@/components/responsive-grid/responsive-grid.js';
import styles from './settlement-layout.css' with { type: 'css' };

/**
 * Settlement Layout component for displaying complete settlement geographical layout
 * Orchestrates display of settlement structure and districts
 */
export class SettlementLayout extends ShadowComponent {
  constructor() {
    super();
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(styles);
    
    this._shadowRoot.innerHTML = `
      <div class="settlement-layout" role="main" aria-label="Settlement layout information">        
        <div class="layout-content">
          <slot name="structure-section"></slot>
          <slot name="districts-section"></slot>
        </div>
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
   * Set complete layout data and render all sections
   * @param {Object} layoutData - Layout object with structure and districts
   */
  setLayoutData(layoutData) {
    if (!this.isReady()) {
      this.storePendingData(layoutData);
      return;
    }

    if (!layoutData || typeof layoutData !== 'object') {
      this.renderEmptyState();
      return;
    }

    this.renderLayoutContent(layoutData);
  }

  /**
   * Render complete layout content
   * @param {Object} layoutData - Layout data object
   */
  renderLayoutContent(layoutData) {
    // Render structure section if available
    if (layoutData.structure) {
      this.renderStructureSection(layoutData.structure);
    }

    // Render districts section if available
    if (layoutData.districts && Array.isArray(layoutData.districts)) {
      this.renderDistrictsSection(layoutData.districts);
    }

    // Handle case where neither section has data
    if (!layoutData.structure && (!layoutData.districts || layoutData.districts.length === 0)) {
      this.renderEmptyState();
    }
  }

  /**
   * Render structure section
   * @param {Object} structureData - Structure data object
   */
  renderStructureSection(structureData) {
    const structureSection = StructureSection.create();

    // Set structure data once component is ready
    if (structureSection.isReady && structureSection.isReady()) {
      structureSection.setStructureData(structureData);
    } else {
      structureSection.addEventListener('componentReady', () => {
        structureSection.setStructureData(structureData);
      }, { once: true });
    }

    this.safeSlotAssign('structure-section', structureSection);
  }

  /**
   * Render districts section
   * @param {Array<Object>} districtsData - Array of district objects
   */
  renderDistrictsSection(districtsData) {
    if (!districtsData || districtsData.length === 0) return;

    // Create districts wrapper
    const districtsWrapper = document.createElement('div');
    districtsWrapper.className = 'districts-wrapper';

    // Create section header
    const header = document.createElement('div');
    header.className = 'districts-header';
    header.innerHTML = `
      <h4 class="districts-title">Districts</h4>
    `;
    districtsWrapper.appendChild(header);

    // Create district cards
    const districtCards = [];
    districtsData.forEach(districtData => {
      const districtCard = DistrictCard.create();
      
      // Set district data once component is ready
      if (districtCard.isReady && districtCard.isReady()) {
        districtCard.setDistrictData(districtData);
      } else {
        districtCard.addEventListener('componentReady', () => {
          districtCard.setDistrictData(districtData);
        }, { once: true });
      }

      districtCards.push(districtCard);
    });

    // Create responsive grid for districts with 4 column max
    const districtsGrid = ResponsiveGrid.create(4);
    
    if (districtsGrid.isReady && districtsGrid.isReady()) {
      districtsGrid.setGridData(districtCards, 4);
    } else {
      districtsGrid.addEventListener('componentReady', () => {
        districtsGrid.setGridData(districtCards, 4);
      }, { once: true });
    }

    districtsWrapper.appendChild(districtsGrid);
    this.safeSlotAssign('districts-section', districtsWrapper);
  }

  /**
   * Render empty state when no layout data is available
   */
  renderEmptyState() {
    const emptyElement = document.createElement('div');
    emptyElement.className = 'empty-state';
    emptyElement.innerHTML = `
      <div class="empty-content">
        <h4>No Layout Information</h4>
        <p>Settlement layout details are not yet available for this location.</p>
      </div>
    `;

    this.safeSlotAssign('structure-section', emptyElement);
  }

  /**
   * Factory method to create settlement layout component instances
   * @returns {SettlementLayout} New settlement layout component element
   */
  static create() {
    return document.createElement('settlement-layout');
  }
}

// Register the custom element
customElements.define('settlement-layout', SettlementLayout);
