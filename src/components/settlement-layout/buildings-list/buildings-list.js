import { ShadowComponent } from '@/components/base/shadow-component.js';
import styles from './buildings-list.css' with { type: 'css' };

/**
 * Buildings List component for displaying buildings within a district
 * Renders array of building strings with consistent styling
 */
export class BuildingsList extends ShadowComponent {
  constructor() {
    super();
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(styles);
    
    this._shadowRoot.innerHTML = `
      <div class="buildings-list">
        <h6 class="buildings-title">Buildings & Landmarks</h6>
        <ul class="buildings-items" role="list">
          <!-- Building items will be dynamically added -->
        </ul>
      </div>
    `;
  }

  /**
   * Process pending data that was stored before connection
   */
  processPendingData() {
    if (this.pendingData) {
      this.setBuildingsData(this.pendingData);
    }
  }

  /**
   * Set buildings data and render list
   * @param {Array<string>} buildings - Array of building names/descriptions
   */
  setBuildingsData(buildings) {
    if (!this.isReady()) {
      this.storePendingData(buildings);
      return;
    }

    const listContainer = this._shadowRoot.querySelector('.buildings-items');
    const titleElement = this._shadowRoot.querySelector('.buildings-title');

    if (!listContainer || !titleElement) return;

    // Clear existing content
    listContainer.innerHTML = '';

    // Handle empty state
    if (!buildings || buildings.length === 0) {
      this.renderEmptyState(listContainer, titleElement);
      return;
    }

    // Show title when we have buildings
    titleElement.style.display = 'block';

    // Render building items
    buildings.forEach(building => {
      const listItem = this.createBuildingItem(building);
      listContainer.appendChild(listItem);
    });

    // Update title with count
    titleElement.textContent = `Buildings & Landmarks (${buildings.length})`;
  }

  /**
   * Create individual building list item
   * @param {string} building - Building name/description
   * @returns {HTMLElement} List item element
   */
  createBuildingItem(building) {
    const li = document.createElement('li');
    li.className = 'building-item';
    li.setAttribute('role', 'listitem');
    li.textContent = building;
    return li;
  }

  /**
   * Render empty state when no buildings are available
   * @param {HTMLElement} container - List container element
   * @param {HTMLElement} title - Title element
   */
  renderEmptyState(container, title) {
    title.style.display = 'none';
    
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'empty-state';
    emptyMessage.textContent = 'No buildings or landmarks recorded';
    container.appendChild(emptyMessage);
  }

  /**
   * Factory method to create buildings list component instances
   * @returns {BuildingsList} New buildings list component element
   */
  static create() {
    return document.createElement('buildings-list');
  }
}

// Register the custom element
customElements.define('buildings-list', BuildingsList);
