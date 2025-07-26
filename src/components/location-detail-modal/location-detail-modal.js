import { GmSectionItem } from '@/components/gm-section-item/gm-section-item.js';
import { VillageLayout } from '@/components/village-layout/village-layout.js';
import { EnhancedInventory } from '@/components/enhanced-inventory/enhanced-inventory.js';
import { LayoutWrapper } from '@/components/layout-wrapper/layout-wrapper.js';
import { ShadowComponent } from '@/components/base/shadow-component.js';
import styles from './location-detail-modal.css' with { type: 'css' };

export class LocationDetailModal extends ShadowComponent {
  constructor() {
    super();
    this.locationData = null;
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(styles);
    
    this._shadowRoot.innerHTML = `
      <div class="location-detail-modal">
        <div class="location-section" id="description-section">
          <h4>Description:</h4>
          <slot name="description">Location description</slot>
        </div>
        
        <div class="location-section" id="layout-section" style="display: none;">
          <h4>Layout:</h4>
          <slot name="layout"></slot>
        </div>
        
        <div class="location-section" id="features-section" style="display: none;">
          <h4>Features:</h4>
          <slot name="features"></slot>
        </div>
        
        <div class="location-section" id="atmosphere-section" style="display: none;">
          <h4>Atmosphere:</h4>
          <slot name="atmosphere"></slot>
        </div>
        
        <div class="location-section" id="history-section" style="display: none;">
          <h4>History:</h4>
          <slot name="history"></slot>
        </div>
        
        <div class="location-section" id="hazards-section" style="display: none;">
          <h4>Hazards:</h4>
          <slot name="hazards"></slot>
        </div>
        
        <div class="location-section" id="enhanced-inventory-section" style="display: none;">
          <h4>Enhanced Inventory:</h4>
          <slot name="enhanced-inventory"></slot>
        </div>
        
        <div class="gm-sections" id="gm-sections" style="display: none;">
          <div class="gm-header">
            <h3>GM Information</h3>
          </div>
          
          <slot name="gm-content"></slot>
        </div>
        
        <div class="location-network" id="location-network" style="display: none;">
          <h3>Location Network</h3>
          
          <div class="network-section" id="npcs-section" style="display: none;">
            <h4>NPCs:</h4>
            <slot name="npcs"></slot>
          </div>
          
          <div class="network-section" id="connected-locations-section" style="display: none;">
            <h4>Connected Locations:</h4>
            <slot name="connected-locations"></slot>
          </div>
          
          <div class="network-section" id="related-threats-section" style="display: none;">
            <h4>Related Threats:</h4>
            <slot name="related-threats"></slot>
          </div>
          
          <div class="network-section" id="related-events-section" style="display: none;">
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

    // Create content nodes and track which sections have content
    const contentNodes = {
      description: this.createContentNode(this.locationData.description),
      layout: this.createLayoutNode(this.locationData.layout),
      features: this.createListNode(this.locationData.features),
      atmosphere: this.createContentNode(this.locationData.atmosphere),
      history: this.createContentNode(this.locationData.history),
      hazards: this.createListNode(this.locationData.hazards),
      'enhanced-inventory': this.createEnhancedInventoryNode(this.locationData.inventory),
      'gm-content': this.createGmContentNode(),
      npcs: this.createNetworkNpcsNode(),
      'connected-locations': this.createConnectedLocationsNode(),
      'related-threats': this.createRelatedThreatsNode(),
      'related-events': this.createRelatedEventsNode()
    };

    // Assign nodes to slots and show/hide sections based on content
    Object.entries(contentNodes).forEach(([slotName, content]) => {
      if (content) {
        this.safeSlotAssign(slotName, content);
        this.showSection(slotName);
      }
    });

    // Show network section if any network content exists
    if (contentNodes.npcs || contentNodes['connected-locations'] || 
        contentNodes['related-threats'] || contentNodes['related-events']) {
      this.showSection('location-network');
    }

    // Show GM sections if GM content exists
    if (contentNodes['gm-content']) {
      this.showSection('gm-sections');
    }
  }

  /**
   * Show a section by removing display: none style
   * @param {string} sectionName - Name of the section to show
   */
  showSection(sectionName) {
    let sectionId;
    
    // Map slot names to section IDs
    switch (sectionName) {
      case 'layout':
        sectionId = 'layout-section';
        break;
      case 'features':
        sectionId = 'features-section';
        break;
      case 'atmosphere':
        sectionId = 'atmosphere-section';
        break;
      case 'history':
        sectionId = 'history-section';
        break;
      case 'hazards':
        sectionId = 'hazards-section';
        break;
      case 'enhanced-inventory':
        sectionId = 'enhanced-inventory-section';
        break;
      case 'gm-sections':
        sectionId = 'gm-sections';
        break;
      case 'location-network':
        sectionId = 'location-network';
        break;
      case 'npcs':
        sectionId = 'npcs-section';
        break;
      case 'connected-locations':
        sectionId = 'connected-locations-section';
        break;
      case 'related-threats':
        sectionId = 'related-threats-section';
        break;
      case 'related-events':
        sectionId = 'related-events-section';
        break;
      default:
        sectionId = sectionName;
    }

    const section = this._shadowRoot.getElementById(sectionId);
    if (section) {
      section.style.display = '';
    }
  }

  /**
   * Create a text content node
   * @param {string} text - Text content
   * @returns {Text|null} Text node or null if empty
   */
  createContentNode(text) {
    if (!text || text.trim() === '') {
      return null;
    }
    return document.createTextNode(text);
  }

  /**
   * Create a list element
   * @param {Array<string>} items - List items
   * @returns {Element|null} List element or null if empty
   */
  createListNode(items) {
    if (!items || items.length === 0) {
      return null;
    }
    
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
   * @returns {Element|null} Layout content element or null if no layout
   */
  createLayoutNode(layout) {
    if (!layout) return null;

    // Check if this is a village layout with districts (use existing VillageLayout component)
    if (layout.village_structure && layout.districts) {
      const villageLayout = VillageLayout.create();
      villageLayout.setLayoutData(layout);
      return villageLayout;
    }

    // Check if this is the new standardized groups format
    if (layout.groups && layout.groups.length > 0) {
      const layoutWrapper = LayoutWrapper.create();
      layoutWrapper.setLayoutData(layout);
      return layoutWrapper;
    }

    // For any remaining legacy formats, return null to hide the section
    return null;
  }

  /**
   * Create GM content container with sections
   * @returns {Element|null} GM content container or null if no secrets
   */
  createGmContentNode() {
    if (!this.locationData.secrets) return null;

    const container = document.createElement('div');
    const secrets = this.locationData.secrets;
    let hasContent = false;

    // Add GM sections
    if (this.addGmSectionToContainer('Hidden Items', secrets.hiddenItems, container)) {
      hasContent = true;
    }
    if (this.addGmSectionToContainer('Secret Doors', secrets.secretDoors, container)) {
      hasContent = true;
    }
    if (this.addGmSectionToContainer('Traps', secrets.traps, container)) {
      hasContent = true;
    }
    if (this.addGmSectionToContainer('Observations', secrets.observations, container)) {
      hasContent = true;
    }

    if (secrets.gmNotes) {
      if (this.addGmSectionToContainer('GM Notes', secrets.gmNotes, container)) {
        hasContent = true;
      }
    }

    return hasContent ? container : null;
  }

  /**
   * Add GM section to container
   * @param {string} title - Section title
   * @param {string|Array} content - Section content
   * @param {Element} container - Container element
   * @returns {boolean} Whether content was added
   */
  addGmSectionToContainer(title, content, container) {
    if (!content || (Array.isArray(content) && content.length === 0)) {
      return false;
    }

    const gmSection = GmSectionItem.create();
    const formattedContent = this.formatGmContent(content);
    
    gmSection.setContent(title, formattedContent);
    container.appendChild(gmSection);
    return true;
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
   * Create network NPCs content node
   * @returns {Element|null} NPCs content element or null if no NPCs
   */
  createNetworkNpcsNode() {
    if (!this.locationData.npcs || this.locationData.npcs.length === 0) {
      return null;
    }

    const container = document.createElement('div');
    container.className = 'network-links';

    this.locationData.npcs.forEach(npcKey => {
      const link = document.createElement('span');
      link.className = 'network-link npc-link';
      link.textContent = npcKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      link.setAttribute('data-npc', npcKey);
      container.appendChild(link);
    });

    return container;
  }

  /**
   * Create connected locations content node
   * @returns {Element|null} Connected locations content element or null if none
   */
  createConnectedLocationsNode() {
    if (!this.locationData.relatedLocations || this.locationData.relatedLocations.length === 0) {
      return null;
    }

    const container = document.createElement('div');
    container.className = 'network-links';

    this.locationData.relatedLocations.forEach(locationKey => {
      const link = document.createElement('span');
      link.className = 'network-link location-link';
      link.textContent = locationKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      link.setAttribute('data-location', locationKey);
      container.appendChild(link);
    });

    return container;
  }

  /**
   * Create related threats content node
   * @returns {Element|null} Related threats content element or null if none
   */
  createRelatedThreatsNode() {
    if (!this.locationData.relatedThreats || this.locationData.relatedThreats.length === 0) {
      return null;
    }

    const container = document.createElement('div');
    container.className = 'network-links';

    this.locationData.relatedThreats.forEach(threatKey => {
      const link = document.createElement('span');
      link.className = 'network-link threat-link';
      link.textContent = threatKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      link.setAttribute('data-threat', threatKey);
      container.appendChild(link);
    });

    return container;
  }

  /**
   * Create related events content node
   * @returns {Element|null} Related events content element or null if none
   */
  createRelatedEventsNode() {
    if (!this.locationData.relatedEvents || this.locationData.relatedEvents.length === 0) {
      return null;
    }

    const container = document.createElement('div');
    container.className = 'network-links';

    this.locationData.relatedEvents.forEach(eventKey => {
      const link = document.createElement('span');
      link.className = 'network-link event-link';
      link.textContent = eventKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      link.setAttribute('data-event', eventKey);
      container.appendChild(link);
    });

    return container;
  }

  /**
   * Factory method to create location detail modal component instances
   * @returns {LocationDetailModal} New location detail modal component element
   */
  static create() {
    return document.createElement('location-detail-modal');
  }
}

// Register the custom element
customElements.define('location-detail-modal', LocationDetailModal);
