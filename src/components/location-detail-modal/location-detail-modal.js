import { GmSectionItem } from '@/components/gm-section-item/gm-section-item.js';
import { VillageLayout } from '@/components/village-layout/village-layout.js';
import { ShrineLayout } from '@/components/shrine-layout/shrine-layout.js';
import { EnhancedInventory } from '@/components/enhanced-inventory/enhanced-inventory.js';
import { ShadowComponent } from '@/components/base/shadow-component.js';

export class LocationDetailModal extends ShadowComponent {
  constructor() {
    super();
    this.locationData = null;
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this._shadowRoot.innerHTML = `
      <div class="location-network-modal">
        <div class="location-section">
          <h4>Description:</h4>
          <slot name="description">Location description</slot>
        </div>
        
        <div class="location-section">
          <h4>Layout:</h4>
          <slot name="layout"></slot>
        </div>
        
        <div class="location-section">
          <h4>Features:</h4>
          <slot name="features"></slot>
        </div>
        
        <div class="location-section">
          <h4>Atmosphere:</h4>
          <slot name="atmosphere"></slot>
        </div>
        
        <div class="location-section">
          <h4>History:</h4>
          <slot name="history"></slot>
        </div>
        
        <div class="location-section">
          <h4>Hazards:</h4>
          <slot name="hazards"></slot>
        </div>
        
        <div class="location-section">
          <h4>Enhanced Inventory:</h4>
          <slot name="enhanced-inventory"></slot>
        </div>
        
        <div class="gm-sections">
          <div class="gm-header">
            <h3>GM Information</h3>
          </div>
          
          <slot name="gm-content"></slot>
        </div>
        
        <div class="location-network">
          <h3>Location Network</h3>
          
          <div class="network-section">
            <h4>NPCs:</h4>
            <slot name="npcs"></slot>
          </div>
          
          <div class="network-section">
            <h4>Connected Locations:</h4>
            <slot name="connected-locations"></slot>
          </div>
          
          <div class="network-section">
            <h4>Related Threats:</h4>
            <slot name="related-threats"></slot>
          </div>
          
          <div class="network-section">
            <h4>Related Events:</h4>
            <slot name="related-events"></slot>
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
      this.setLocationData(this.pendingData);
    }
  }

  /**
   * Set location data for the modal
   * @param {Object} locationData - Location data object
   */
  setLocationData(locationData) {
    // If not ready yet, store the data for later
    if (!this.isReady()) {
      this.storePendingData(locationData);
      return;
    }

    this.locationData = locationData;
    this.populateSlots();
  }

  /**
   * Populate slots with location data using manual slot assignment
   */
  populateSlots() {
    if (!this.locationData) return;

    // Create content nodes
    const contentNodes = {
      description: this.createContentNode(this.locationData.description),
      layout: this.createLayoutNode(this.locationData.layout),
      features: this.locationData.features ? this.createListNode(this.locationData.features) : null,
      atmosphere: this.locationData.atmosphere ? this.createContentNode(this.locationData.atmosphere) : null,
      history: this.locationData.history ? this.createContentNode(this.locationData.history) : null,
      hazards: this.locationData.hazards ? this.createListNode(this.locationData.hazards) : null,
      'enhanced-inventory': this.createEnhancedInventoryNode(this.locationData.inventory),
      'gm-content': this.createGmContentNode()
    };

    // Assign nodes to slots using safe methods
    Object.entries(contentNodes).forEach(([slotName, content]) => {
      if (content) {
        this.safeSlotAssign(slotName, content);
      }
    });
  }

  /**
   * Create a text content node
   * @param {string} text - Text content
   * @returns {Text} Text node
   */
  createContentNode(text) {
    return document.createTextNode(text || '');
  }

  /**
   * Create a list element
   * @param {Array<string>} items - List items
   * @returns {Element} List element
   */
  createListNode(items) {
    const ul = document.createElement('ul');
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
    return ul;
  }

  /**
   * Create layout content node
   * @param {Object} layout - Layout data
   * @returns {Element} Layout content element
   */
  createLayoutNode(layout) {
    if (!layout) return document.createTextNode('');

    // Check if this is a village layout with districts
    if (layout.village_structure && layout.districts) {
      const villageLayout = VillageLayout.create();
      villageLayout.setLayoutData(layout);
      return villageLayout;
    }

    // Check if this is a shrine layout
    if (layout.main_shrine || layout.star_alcove || layout.spring_pool || layout.memorial_area) {
      const shrineLayout = ShrineLayout.create();
      shrineLayout.displayShrineLayout(layout);
      return shrineLayout;
    }

    // Handle other layout types (buildings, mansions, etc.)
    if (layout.buildings) {
      return this.createBuildingsLayout(layout);
    }

    if (layout.mansions) {
      return this.createMansionsLayout(layout);
    }

    // Generic layout display
    return this.createGenericLayout(layout);
  }

  /**
   * Create buildings layout display
   * @param {Object} layout - Layout with buildings
   * @returns {Element} Buildings layout element
   */
  createBuildingsLayout(layout) {
    const container = document.createElement('div');
    container.className = 'buildings-layout';

    const buildingsTitle = document.createElement('h5');
    buildingsTitle.textContent = 'Buildings';
    container.appendChild(buildingsTitle);

    const buildingsGrid = document.createElement('div');
    buildingsGrid.className = 'buildings-grid';

    layout.buildings.forEach(building => {
      const buildingCard = document.createElement('div');
      buildingCard.className = 'building-card';

      const name = document.createElement('h6');
      name.textContent = building.name;
      buildingCard.appendChild(name);

      const description = document.createElement('p');
      description.textContent = building.description;
      buildingCard.appendChild(description);

      if (building.features && building.features.length > 0) {
        const featuresTitle = document.createElement('strong');
        featuresTitle.textContent = 'Features:';
        buildingCard.appendChild(featuresTitle);

        const featuresList = document.createElement('ul');
        building.features.forEach(feature => {
          const li = document.createElement('li');
          li.textContent = feature;
          featuresList.appendChild(li);
        });
        buildingCard.appendChild(featuresList);
      }

      if (building.hazards && building.hazards.length > 0) {
        const hazardsTitle = document.createElement('strong');
        hazardsTitle.textContent = 'Hazards:';
        hazardsTitle.style.color = '#d32f2f';
        buildingCard.appendChild(hazardsTitle);

        const hazardsList = document.createElement('ul');
        building.hazards.forEach(hazard => {
          const li = document.createElement('li');
          li.textContent = hazard;
          li.style.color = '#d32f2f';
          hazardsList.appendChild(li);
        });
        buildingCard.appendChild(hazardsList);
      }

      buildingsGrid.appendChild(buildingCard);
    });

    container.appendChild(buildingsGrid);

    // Add underground section if present
    if (layout.underground) {
      const undergroundSection = document.createElement('div');
      undergroundSection.className = 'underground-section';

      const undergroundTitle = document.createElement('h5');
      undergroundTitle.textContent = 'Underground Areas';
      undergroundSection.appendChild(undergroundTitle);

      Object.entries(layout.underground).forEach(([key, value]) => {
        if (key !== 'hazards') {
          const item = document.createElement('div');
          const label = document.createElement('strong');
          label.textContent = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ': ';
          const text = document.createElement('span');
          text.textContent = value;
          item.appendChild(label);
          item.appendChild(text);
          undergroundSection.appendChild(item);
        }
      });

      if (layout.underground.hazards) {
        const hazardsTitle = document.createElement('strong');
        hazardsTitle.textContent = 'Underground Hazards:';
        hazardsTitle.style.color = '#d32f2f';
        undergroundSection.appendChild(hazardsTitle);

        const hazardsList = document.createElement('ul');
        layout.underground.hazards.forEach(hazard => {
          const li = document.createElement('li');
          li.textContent = hazard;
          li.style.color = '#d32f2f';
          hazardsList.appendChild(li);
        });
        undergroundSection.appendChild(hazardsList);
      }

      container.appendChild(undergroundSection);
    }

    return container;
  }

  /**
   * Create mansions layout display
   * @param {Object} layout - Layout with mansions
   * @returns {Element} Mansions layout element
   */
  createMansionsLayout(layout) {
    const container = document.createElement('div');
    container.className = 'mansions-layout';

    const mansionsTitle = document.createElement('h5');
    mansionsTitle.textContent = 'Mansions';
    container.appendChild(mansionsTitle);

    const mansionsGrid = document.createElement('div');
    mansionsGrid.className = 'mansions-grid';

    layout.mansions.forEach(mansion => {
      const mansionCard = document.createElement('div');
      mansionCard.className = 'mansion-card';

      const name = document.createElement('h6');
      name.textContent = mansion.name;
      mansionCard.appendChild(name);

      const owner = document.createElement('p');
      owner.innerHTML = `<strong>Owner:</strong> ${mansion.owner}`;
      mansionCard.appendChild(owner);

      const condition = document.createElement('p');
      condition.innerHTML = `<strong>Condition:</strong> ${mansion.condition}`;
      mansionCard.appendChild(condition);

      const resident = document.createElement('p');
      resident.innerHTML = `<strong>Current Resident:</strong> ${mansion.current_resident}`;
      mansionCard.appendChild(resident);

      if (mansion.features && mansion.features.length > 0) {
        const featuresTitle = document.createElement('strong');
        featuresTitle.textContent = 'Features:';
        mansionCard.appendChild(featuresTitle);

        const featuresList = document.createElement('ul');
        mansion.features.forEach(feature => {
          const li = document.createElement('li');
          li.textContent = feature;
          featuresList.appendChild(li);
        });
        mansionCard.appendChild(featuresList);
      }

      mansionsGrid.appendChild(mansionCard);
    });

    container.appendChild(mansionsGrid);
    return container;
  }

  /**
   * Create shrine layout display
   * @param {Object} layout - Layout with shrine areas
   * @returns {Element} Shrine layout element
   */
  createShrineLayout(layout) {
    const container = document.createElement('div');
    container.className = 'shrine-layout';

    const shrineTitle = document.createElement('h5');
    shrineTitle.textContent = 'Shrine Areas';
    container.appendChild(shrineTitle);

    const shrineGrid = document.createElement('div');
    shrineGrid.className = 'shrine-grid';

    // Handle main shrine and other deity areas
    Object.entries(layout).forEach(([key, value]) => {
      if (key === 'village_graveyard') {
        // Handle graveyard separately
        const graveyardCard = document.createElement('div');
        graveyardCard.className = 'graveyard-card';

        const name = document.createElement('h6');
        name.textContent = 'Village Graveyard';
        graveyardCard.appendChild(name);

        const description = document.createElement('p');
        description.textContent = value.description;
        graveyardCard.appendChild(description);

        if (value.features && value.features.length > 0) {
          const featuresTitle = document.createElement('strong');
          featuresTitle.textContent = 'Features:';
          graveyardCard.appendChild(featuresTitle);

          const featuresList = document.createElement('ul');
          value.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
          });
          graveyardCard.appendChild(featuresList);
        }

        shrineGrid.appendChild(graveyardCard);
      } else if (typeof value === 'object' && value.deity) {
        // Handle deity areas
        const deityCard = document.createElement('div');
        deityCard.className = 'deity-card';

        const name = document.createElement('h6');
        name.textContent = `${value.deity} - ${key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
        deityCard.appendChild(name);

        const description = document.createElement('p');
        description.textContent = value.description;
        deityCard.appendChild(description);

        if (value.offerings && value.offerings.length > 0) {
          const offeringsTitle = document.createElement('strong');
          offeringsTitle.textContent = 'Offerings:';
          deityCard.appendChild(offeringsTitle);

          const offeringsList = document.createElement('ul');
          value.offerings.forEach(offering => {
            const li = document.createElement('li');
            li.textContent = offering;
            offeringsList.appendChild(li);
          });
          deityCard.appendChild(offeringsList);
        }

        shrineGrid.appendChild(deityCard);
      }
    });

    container.appendChild(shrineGrid);
    return container;
  }

  /**
   * Create generic layout display
   * @param {Object} layout - Generic layout data
   * @returns {Element} Generic layout element
   */
  createGenericLayout(layout) {
    const container = document.createElement('div');
    container.className = 'generic-layout';

    Object.entries(layout).forEach(([key, value]) => {
      const item = document.createElement('div');
      item.className = 'layout-item';

      const label = document.createElement('strong');
      label.textContent = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ': ';
      
      const content = document.createElement('span');
      if (typeof value === 'string') {
        content.textContent = value;
      } else if (Array.isArray(value)) {
        content.textContent = value.join(', ');
      } else {
        content.textContent = JSON.stringify(value);
      }

      item.appendChild(label);
      item.appendChild(content);
      container.appendChild(item);
    });

    return container;
  }

  /**
   * Create GM content container with sections
   * @returns {Element} GM content container
   */
  createGmContentNode() {
    if (!this.locationData.secrets) return document.createTextNode('');

    const container = document.createElement('div');
    const secrets = this.locationData.secrets;

    // Add GM sections
    this.addGmSectionToContainer('Hidden Items', secrets.hiddenItems, container);
    this.addGmSectionToContainer('Secret Doors', secrets.secretDoors, container);
    this.addGmSectionToContainer('Traps', secrets.traps, container);
    this.addGmSectionToContainer('Observations', secrets.observations, container);

    if (secrets.gmNotes) {
      this.addGmSectionToContainer('GM Notes', secrets.gmNotes, container);
    }

    return container;
  }

  /**
   * Add GM section to container
   * @param {string} title - Section title
   * @param {string|Array} content - Section content
   * @param {Element} container - Container element
   */
  addGmSectionToContainer(title, content, container) {
    if (!content || (Array.isArray(content) && content.length === 0)) {
      return;
    }

    const gmSection = GmSectionItem.create();
    const formattedContent = this.formatGmContent(content);
    
    gmSection.setContent(title, formattedContent);
    container.appendChild(gmSection);
  }

  /**
   * Format GM content based on its type
   * @param {string|Array} content - Content to format
   * @returns {Element} Formatted content element
   */
  formatGmContent(content) {
    if (typeof content === 'string') {
      const p = document.createElement('p');
      p.textContent = content;
      return p;
    }

    if (Array.isArray(content)) {
      // Check if it's an array of objects or strings
      if (content.length > 0 && typeof content[0] === 'object') {
        return this.formatObjectArray(content);
      } else {
        return this.formatStringArray(content);
      }
    }

    // Fallback
    const p = document.createElement('p');
    p.textContent = String(content);
    return p;
  }

  /**
   * Format array of objects (like hiddenItems)
   * @param {Array<Object>} items - Array of objects
   * @returns {Element} Formatted list
   */
  formatObjectArray(items) {
    const container = document.createElement('div');
    container.className = 'gm-object-list';

    items.forEach(item => {
      const itemCard = document.createElement('div');
      itemCard.className = 'gm-item-card';

      // Handle different object structures
      if (item.item && item.location && item.description) {
        // Hidden items format
        itemCard.innerHTML = `
          <div class="item-header">
            <strong>${item.item}</strong>
          </div>
          <div class="item-location">
            <em>Location:</em> ${item.location}
          </div>
          <div class="item-description">
            ${item.description}
          </div>
        `;
      } else {
        // Generic object format
        Object.entries(item).forEach(([key, value]) => {
          const field = document.createElement('div');
          field.className = 'item-field';
          field.innerHTML = `<strong>${key}:</strong> ${value}`;
          itemCard.appendChild(field);
        });
      }

      container.appendChild(itemCard);
    });

    return container;
  }

  /**
   * Format array of strings
   * @param {Array<string>} items - Array of strings
   * @returns {Element} Formatted list
   */
  formatStringArray(items) {
    const ul = document.createElement('ul');
    ul.className = 'gm-string-list';

    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });

    return ul;
  }

  /**
   * Create enhanced inventory content node
   * @param {Object} inventory - Inventory data
   * @returns {Element|null} Enhanced inventory node or null if no enhanced inventory
   */
  createEnhancedInventoryNode(inventory) {
    if (!inventory || (!inventory.valuable_items && !inventory.corrupted_substances)) {
      return null;
    }

    const enhancedInventory = EnhancedInventory.create();
    enhancedInventory.displayInventory(inventory);
    return enhancedInventory;
  }

  /**
   * Factory method to create location detail modal component instances
   * @returns {LocationDetailModal} New location detail modal component element
   */
  static create() {
    return LocationDetailModal.create();
  }
}
