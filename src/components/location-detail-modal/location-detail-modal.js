import { GmSectionItem } from '@/components/gm-section-item/gm-section-item.js';

export class LocationDetailModal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open', slotAssignment: 'manual' });
    
    // Register the GmSectionItem component
    if (!customElements.get('gm-section-item')) {
      customElements.define('gm-section-item', GmSectionItem);
    }

    shadow.innerHTML = `
      <div class="location-network-modal">
        <div class="location-section">
          <h4>Description:</h4>
          <slot name="description">Location description</slot>
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
   * Set location data for the modal
   * @param {Object} locationData - Location data object
   */
  setLocationData(locationData) {
    this.locationData = locationData;
    this.populateSlots();
  }

  /**
   * Populate slots with location data using manual slot assignment
   */
  populateSlots() {
    if (!this.locationData) return;

    const slots = this.shadowRoot.querySelectorAll('slot');
    
    // Create content nodes
    const contentNodes = {
      description: this.createContentNode(this.locationData.description),
      features: this.locationData.features ? this.createListNode(this.locationData.features) : null,
      atmosphere: this.locationData.atmosphere ? this.createContentNode(this.locationData.atmosphere) : null,
      history: this.locationData.history ? this.createContentNode(this.locationData.history) : null,
      hazards: this.locationData.hazards ? this.createListNode(this.locationData.hazards) : null,
      'gm-content': this.createGmContentNode()
    };

    // Assign nodes to slots
    slots.forEach(slot => {
      const slotName = slot.name;
      const content = contentNodes[slotName];
      
      if (content) {
        slot.assign(content);
      } else {
        slot.assign(); // Clear slot if no content
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

    const gmSection = document.createElement('gm-section-item');
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
}
