import { ensureNode } from '@/utils/dom-utils.js';
import { ShadowComponent } from '@/components/base/shadow-component.js';
import styles from './village-layout.css' with { type: 'css' };

export class VillageLayout extends ShadowComponent {
  constructor() {
    super();
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(styles);
    
    this._shadowRoot.innerHTML = `
      <div class="village-layout">
        <div class="village-structure">
          <h4>Village Structure</h4>
          <slot name="village-structure"></slot>
        </div>
        
        <div class="districts">
          <h4>Districts</h4>
          <slot name="districts"></slot>
        </div>
      </div>
    `;
  }

  /**
   * Set layout data for the village
   * @param {Object} layoutData - Layout data object
   */
  setLayoutData(layoutData) {
    if (!layoutData || !this._shadowRoot) return;

    const slots = this._shadowRoot.querySelectorAll('slot');
    
    // Create content nodes
    const contentNodes = {
      'village-structure': this.createVillageStructureContent(layoutData.village_structure),
      'districts': this.createDistrictsContent(layoutData.districts)
    };

    // Assign nodes to slots
    slots.forEach(slot => {
      const slotName = slot.name;
      const content = contentNodes[slotName];
      
      if (content) {
        slot.assign(content);
      } else {
        slot.assign();
      }
    });
  }

  /**
   * Create village structure content
   * @param {Object} structure - Village structure data
   * @returns {Element} Structure content element
   */
  createVillageStructureContent(structure) {
    if (!structure) return document.createTextNode('');

    const container = document.createElement('div');
    container.className = 'structure-details';

    Object.entries(structure).forEach(([key, value]) => {
      const item = document.createElement('div');
      item.className = 'structure-item';
      
      const label = document.createElement('strong');
      label.textContent = this.formatStructureLabel(key);
      
      const description = document.createElement('span');
      description.textContent = value;
      
      item.appendChild(label);
      item.appendChild(document.createTextNode(': '));
      item.appendChild(description);
      
      container.appendChild(item);
    });

    return container;
  }

  /**
   * Create districts content
   * @param {Array} districts - Districts array
   * @returns {Element} Districts content element
   */
  createDistrictsContent(districts) {
    if (!districts || !Array.isArray(districts)) return document.createTextNode('');

    const container = document.createElement('div');
    container.className = 'districts-list';

    districts.forEach(district => {
      const districtCard = document.createElement('div');
      districtCard.className = 'district-card';

      // District header
      const header = document.createElement('div');
      header.className = 'district-header';
      const name = document.createElement('h5');
      name.textContent = district.name;
      header.appendChild(name);

      // District description
      const description = document.createElement('p');
      description.className = 'district-description';
      description.textContent = district.description;

      // District buildings
      const buildingsContainer = document.createElement('div');
      buildingsContainer.className = 'district-buildings';
      
      if (district.buildings && district.buildings.length > 0) {
        const buildingsTitle = document.createElement('h6');
        buildingsTitle.textContent = 'Buildings:';
        buildingsContainer.appendChild(buildingsTitle);

        const buildingsList = document.createElement('ul');
        buildingsList.className = 'buildings-list';
        
        district.buildings.forEach(building => {
          const li = document.createElement('li');
          li.textContent = building;
          buildingsList.appendChild(li);
        });
        
        buildingsContainer.appendChild(buildingsList);
      }

      districtCard.appendChild(header);
      districtCard.appendChild(description);
      districtCard.appendChild(buildingsContainer);
      
      container.appendChild(districtCard);
    });

    return container;
  }

  /**
   * Format structure label for display
   * @param {string} key - Structure key
   * @returns {string} Formatted label
   */
  formatStructureLabel(key) {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  /**
   * Factory method to create village layout component instances
   * @returns {VillageLayout} New village layout component element
   */
  static create() {
    return document.createElement('village-layout');
  }
}

customElements.define('village-layout', VillageLayout);
