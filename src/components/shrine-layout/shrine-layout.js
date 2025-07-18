import shrineLayoutStyles from './shrine-layout.css' with { type: 'css' };
import { ShadowComponent } from '@/components/base/shadow-component.js';

/**
 * Shrine Layout component for displaying shrine areas and memorial spaces
 * Uses shadow DOM and manual slot assignment for performance
 */

export class ShrineLayout extends ShadowComponent {
  constructor() {
    super();
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(shrineLayoutStyles);
    
    this._shadowRoot.innerHTML = `
      <div class="shrine-layout">
        <div class="shrine-header">
          <span class="shrine-icon">🏛️</span>
          <h4 class="shrine-title">Shrine Areas</h4>
        </div>
        <slot name="shrine-areas"></slot>
      </div>
    `;
  }

  /**
   * Process pending data that was stored before connection
   */
  processPendingData() {
    if (this.pendingData) {
      this.displayShrineLayout(this.pendingData);
    }
  }

  /**
   * Display shrine layout data
   * @param {Object} layout - Shrine layout with deity areas and graveyard
   */
  displayShrineLayout(layout) {
    // If not ready yet, store the data for later
    if (!this.isReady()) {
      this.storePendingData(layout);
      return;
    }

    const container = document.createElement('div');
    
    const shrineGrid = document.createElement('div');
    shrineGrid.className = 'shrine-grid';
    
    // Process each area in the layout
    Object.entries(layout).forEach(([key, value]) => {
      if (key === 'village_graveyard') {
        // Handle graveyard as a special case
        const graveyardArea = this.createGraveyardArea(value);
        container.appendChild(graveyardArea);
      } else if (typeof value === 'object' && (value.deity || value.description)) {
        // Handle deity shrine areas
        const shrineArea = this.createShrineArea(key, value);
        shrineGrid.appendChild(shrineArea);
      }
    });
    
    // Add shrine grid first, then graveyard if it exists
    container.appendChild(shrineGrid);
    
    // Assign to slot
    this.safeSlotAssign('shrine-areas', container);
  }

  /**
   * Create a shrine area card
   * @param {string} key - Area key
   * @param {Object} area - Area data
   * @returns {HTMLElement} Shrine area element
   */
  createShrineArea(key, area) {
    const shrineArea = document.createElement('div');
    shrineArea.className = 'shrine-area';
    
    // Header with name and deity
    const header = document.createElement('div');
    header.className = 'shrine-area-header';
    
    const name = document.createElement('h5');
    name.className = 'shrine-area-name';
    name.textContent = this.formatAreaName(key);
    header.appendChild(name);
    
    if (area.deity) {
      const deity = document.createElement('span');
      deity.className = 'deity-name';
      deity.textContent = area.deity;
      header.appendChild(deity);
    }
    
    shrineArea.appendChild(header);
    
    // Description
    if (area.description) {
      const description = document.createElement('p');
      description.className = 'shrine-description';
      description.textContent = area.description;
      shrineArea.appendChild(description);
    }
    
    // Offerings
    if (area.offerings && area.offerings.length > 0) {
      const offeringsSection = document.createElement('div');
      offeringsSection.className = 'offerings-section';
      
      const offeringsTitle = document.createElement('h6');
      offeringsTitle.className = 'offerings-title';
      offeringsTitle.textContent = 'Traditional Offerings';
      offeringsSection.appendChild(offeringsTitle);
      
      const offeringsList = document.createElement('ul');
      offeringsList.className = 'offerings-list';
      
      area.offerings.forEach(offering => {
        const li = document.createElement('li');
        li.textContent = offering;
        offeringsList.appendChild(li);
      });
      
      offeringsSection.appendChild(offeringsList);
      shrineArea.appendChild(offeringsSection);
    }
    
    return shrineArea;
  }

  /**
   * Create graveyard area
   * @param {Object} graveyard - Graveyard data
   * @returns {HTMLElement} Graveyard area element
   */
  createGraveyardArea(graveyard) {
    const graveyardArea = document.createElement('div');
    graveyardArea.className = 'graveyard-area';
    
    // Header
    const header = document.createElement('div');
    header.className = 'graveyard-header';
    
    const icon = document.createElement('span');
    icon.className = 'graveyard-icon';
    icon.textContent = '⚰️';
    header.appendChild(icon);
    
    const title = document.createElement('h5');
    title.className = 'graveyard-title';
    title.textContent = 'Village Graveyard';
    header.appendChild(title);
    
    graveyardArea.appendChild(header);
    
    // Description
    if (graveyard.description) {
      const description = document.createElement('p');
      description.className = 'graveyard-description';
      description.textContent = graveyard.description;
      graveyardArea.appendChild(description);
    }
    
    // Features
    if (graveyard.features && graveyard.features.length > 0) {
      const featuresSection = document.createElement('div');
      featuresSection.className = 'features-section';
      
      const featuresTitle = document.createElement('h6');
      featuresTitle.className = 'features-title';
      featuresTitle.textContent = 'Features';
      featuresSection.appendChild(featuresTitle);
      
      const featuresGrid = document.createElement('div');
      featuresGrid.className = 'graveyard-features';
      
      graveyard.features.forEach(feature => {
        const featureCard = document.createElement('div');
        featureCard.className = 'graveyard-feature';
        
        const featureText = document.createElement('p');
        featureText.className = 'graveyard-feature-text';
        featureText.textContent = feature;
        featureCard.appendChild(featureText);
        
        featuresGrid.appendChild(featureCard);
      });
      
      featuresSection.appendChild(featuresGrid);
      graveyardArea.appendChild(featuresSection);
    }
    
    return graveyardArea;
  }

  /**
   * Format area name from key
   * @param {string} key - Area key
   * @returns {string} Formatted name
   */
  formatAreaName(key) {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  /**
   * Factory method to create shrine layout component instances
   * @returns {ShrineLayout} New shrine layout component element
   */
  static create() {
    return document.createElement('shrine-layout');
  }
}

customElements.define('shrine-layout', ShrineLayout);
