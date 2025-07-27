import { ShadowComponent } from '@/components/base/shadow-component.js';
import { BuildingsList } from '@/components/settlement-layout/buildings-list/buildings-list.js';
import styles from './district-card.css' with { type: 'css' };

/**
 * District Card component for displaying individual settlement districts
 * Shows district name, description, and buildings in a card format
 */
export class DistrictCard extends ShadowComponent {
  constructor() {
    super();
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(styles);
    
    this._shadowRoot.innerHTML = `
      <div class="district-card" role="region">
        <div class="district-header">
          <h5 class="district-name"></h5>
        </div>
        <div class="district-content">
          <p class="district-description"></p>
          <div class="buildings-section">
            <slot name="buildings-list"></slot>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Process pending data that was stored before connection
   */
  processPendingData() {
    if (this.pendingData) {
      this.setDistrictData(this.pendingData);
    }
  }

  /**
   * Set district data and render content
   * @param {Object} districtData - District object with name, description, buildings
   */
  setDistrictData(districtData) {
    if (!this.isReady()) {
      this.storePendingData(districtData);
      return;
    }

    if (!districtData || typeof districtData !== 'object') {
      this.renderEmptyState();
      return;
    }

    this.renderDistrictContent(districtData);
  }

  /**
   * Render district content from data
   * @param {Object} districtData - District data object
   */
  renderDistrictContent(districtData) {
    const nameElement = this._shadowRoot.querySelector('.district-name');
    const descElement = this._shadowRoot.querySelector('.district-description');
    const card = this._shadowRoot.querySelector('.district-card');

    if (!nameElement || !descElement || !card) return;

    // Set basic content
    nameElement.textContent = districtData.name || 'Unknown District';
    descElement.textContent = districtData.description || 'No description available';

    // Set ARIA label for accessibility
    card.setAttribute('aria-label', `${districtData.name} district information`);

    // Handle buildings list
    this.renderBuildingsList(districtData.buildings);
  }

  /**
   * Render buildings list for the district
   * @param {Array<string>} buildings - Array of building names
   */
  renderBuildingsList(buildings) {
    // Create and configure buildings list
    const buildingsList = BuildingsList.create();

    // Set buildings data once component is ready
    if (buildingsList.isReady && buildingsList.isReady()) {
      buildingsList.setBuildingsData(buildings);
    } else {
      buildingsList.addEventListener('componentReady', () => {
        buildingsList.setBuildingsData(buildings);
      }, { once: true });
    }

    // Use safeSlotAssign to add the buildings list
    this.safeSlotAssign('buildings-list', buildingsList);
  }

  /**
   * Render empty state when no district data is available
   */
  renderEmptyState() {
    const nameElement = this._shadowRoot.querySelector('.district-name');
    const descElement = this._shadowRoot.querySelector('.district-description');
    const buildingsSection = this._shadowRoot.querySelector('.buildings-section');

    if (nameElement) nameElement.textContent = 'Unknown District';
    if (descElement) descElement.textContent = 'No district information available';
    if (buildingsSection) buildingsSection.style.display = 'none';
  }

  /**
   * Factory method to create district card component instances
   * @returns {DistrictCard} New district card component element
   */
  static create() {
    return document.createElement('district-card');
  }
}

// Register the custom element
customElements.define('district-card', DistrictCard);
