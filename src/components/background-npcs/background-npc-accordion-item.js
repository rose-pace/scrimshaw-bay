/**
 * Background NPC Accordion Item - specialized accordion item for displaying NPC data
 * Extends accordion-item with NPC-specific content and interactions
 */

import { DataService } from '@/services/data-service.js';
import { AccordionItem } from '@/components/accordion/accordion-item.js';
import styles from './background-npc-accordion-item.css' with { type: 'css' };

export class BackgroundNpcAccordionItem extends AccordionItem {
  constructor() {
    super();
    this.dataService = new DataService();
    this.npcKey = null;
    this.npcData = null;
    
    // Ensure NPCs start collapsed by default
    this.expanded = false;
    this.removeAttribute('expanded');
  }

  /**
   * Define observed attributes
   */
  static get observedAttributes() {
    return [...super.observedAttributes, 'npc-key'];
  }

  /**
   * Handle attribute changes
   * @param {string} name - Attribute name
   * @param {string} oldValue - Old value
   * @param {string} newValue - New value
   */
  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    
    if (name === 'npc-key' && newValue !== oldValue) {
      this.npcKey = newValue;
      this.loadNpcData();
    }
  }

  /**
   * Setup shadow DOM with additional NPC-specific styles
   */
  setupShadowDOM() {
    super.setupShadowDOM();
    this.applyStyles(styles);
  }

  /**
   * Load and display NPC data
   */
  loadNpcData() {
    if (!this.npcKey) return;

    this.npcData = this.dataService.getNpc(this.npcKey);
    if (!this.npcData) {
      console.warn('BackgroundNpcAccordionItem: NPC not found:', this.npcKey);
      return;
    }

    this.renderNpcContent();
  }

  /**
   * Render NPC content in header and body
   */
  renderNpcContent() {
    if (!this.npcData || !this.isReady()) {
      if (this.npcData) {
        // Store data for later if component isn't ready
        this.storePendingData({ npcData: this.npcData });
      }
      return;
    }

    this.renderHeader();
    this.renderContent();
  }

  /**
   * Process pending data
   */
  processPendingData() {
    super.processPendingData();
    if (this.pendingData?.npcData) {
      this.npcData = this.pendingData.npcData;
      this.renderNpcContent();
    }
  }

  /**
   * Render the accordion header with NPC summary
   */
  renderHeader() {
    const header = document.createElement('div');
    header.className = 'npc-header';
    
    // Name and role container
    const nameContainer = document.createElement('div');
    nameContainer.className = 'npc-name-container';
    
    const name = document.createElement('h5');
    name.className = 'npc-name';
    name.textContent = this.npcData.name;
    nameContainer.appendChild(name);
    
    if (this.npcData.role) {
      const role = document.createElement('div');
      role.className = 'npc-role';
      role.textContent = this.npcData.role;
      nameContainer.appendChild(role);
    }
    
    header.appendChild(nameContainer);
    
    // Quick info preview (first 2 items)
    if (this.npcData.quick_info && this.npcData.quick_info.length > 0) {
      const quickPreview = document.createElement('div');
      quickPreview.className = 'npc-quick-preview';
      
      this.npcData.quick_info.slice(0, 2).forEach(info => {
        const tag = document.createElement('span');
        tag.className = 'quick-info-tag';
        tag.textContent = info;
        quickPreview.appendChild(tag);
      });
      
      header.appendChild(quickPreview);
    }
    
    this.setHeader(header);
  }

  /**
   * Render the accordion content with full NPC details
   */
  renderContent() {
    const content = document.createElement('div');
    content.className = 'npc-content';
    
    // Description
    if (this.npcData.description) {
      const descriptionSection = document.createElement('div');
      descriptionSection.className = 'npc-section';
      
      const descriptionTitle = document.createElement('h6');
      descriptionTitle.className = 'section-title';
      descriptionTitle.textContent = 'Description';
      descriptionSection.appendChild(descriptionTitle);
      
      const description = document.createElement('p');
      description.className = 'npc-description';
      description.textContent = this.npcData.description;
      descriptionSection.appendChild(description);
      
      content.appendChild(descriptionSection);
    }
    
    // Quick info (all items)
    if (this.npcData.quick_info && this.npcData.quick_info.length > 0) {
      const quickInfoSection = document.createElement('div');
      quickInfoSection.className = 'npc-section';
      
      const quickInfoTitle = document.createElement('h6');
      quickInfoTitle.className = 'section-title';
      quickInfoTitle.textContent = 'Quick Info';
      quickInfoSection.appendChild(quickInfoTitle);
      
      const quickInfoContainer = document.createElement('div');
      quickInfoContainer.className = 'npc-quick-info';
      
      this.npcData.quick_info.forEach(info => {
        const tag = document.createElement('span');
        tag.className = 'quick-info-tag detailed';
        tag.textContent = info;
        quickInfoContainer.appendChild(tag);
      });
      
      quickInfoSection.appendChild(quickInfoContainer);
      content.appendChild(quickInfoSection);
    }
    
    // Motivations
    if (this.npcData.motivations && this.npcData.motivations.length > 0) {
      const motivationsSection = document.createElement('div');
      motivationsSection.className = 'npc-section';
      
      const motivationsTitle = document.createElement('h6');
      motivationsTitle.className = 'section-title';
      motivationsTitle.textContent = 'Motivations';
      motivationsSection.appendChild(motivationsTitle);
      
      const motivationsList = document.createElement('ul');
      motivationsList.className = 'motivations-list';
      
      this.npcData.motivations.forEach(motivation => {
        const li = document.createElement('li');
        li.textContent = motivation;
        motivationsList.appendChild(li);
      });
      
      motivationsSection.appendChild(motivationsList);
      content.appendChild(motivationsSection);
    }
    
    // Additional details (if they exist)
    if (this.npcData.background || this.npcData.secrets || this.npcData.relationships) {
      const additionalSection = document.createElement('div');
      additionalSection.className = 'npc-section';
      
      const additionalTitle = document.createElement('h6');
      additionalTitle.className = 'section-title';
      additionalTitle.textContent = 'Additional Details';
      additionalSection.appendChild(additionalTitle);
      
      if (this.npcData.background) {
        const background = document.createElement('div');
        background.className = 'detail-item';
        background.innerHTML = `<strong>Background:</strong> ${this.npcData.background}`;
        additionalSection.appendChild(background);
      }
      
      if (this.npcData.secrets) {
        const secrets = document.createElement('div');
        secrets.className = 'detail-item';
        secrets.innerHTML = `<strong>Secrets:</strong> ${this.npcData.secrets}`;
        additionalSection.appendChild(secrets);
      }
      
      if (this.npcData.relationships) {
        const relationships = document.createElement('div');
        relationships.className = 'detail-item';
        relationships.innerHTML = `<strong>Relationships:</strong> ${this.npcData.relationships}`;
        additionalSection.appendChild(relationships);
      }
      
      content.appendChild(additionalSection);
    }
    
    // Action button for detailed view
    const actionSection = document.createElement('div');
    actionSection.className = 'npc-actions';
    
    const detailButton = document.createElement('button');
    detailButton.className = 'npc-detail-button';
    detailButton.textContent = 'View Full Details';
    detailButton.setAttribute('type', 'button');
    detailButton.addEventListener('click', (e) => {
      e.stopPropagation();
      this.dispatchNpcClickEvent();
    });
    
    actionSection.appendChild(detailButton);
    content.appendChild(actionSection);
    
    this.setContent(content);
  }

  /**
   * Dispatch NPC click event for detailed view
   */
  dispatchNpcClickEvent() {
    const event = new CustomEvent('npcClick', {
      detail: { npc: this.npcKey },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  /**
   * Set NPC data directly (alternative to npc-key attribute)
   * @param {string} npcKey - NPC key
   * @param {Object} npcData - NPC data object
   */
  setNpcData(npcKey, npcData) {
    this.npcKey = npcKey;
    this.npcData = npcData;
    this.setAttribute('npc-key', npcKey);
    this.renderNpcContent();
  }
}

// Register the custom element
customElements.define('background-npc-accordion-item', BackgroundNpcAccordionItem);

/**
 * Factory method to create background NPC accordion item instances
 * @returns {BackgroundNpcAccordionItem} New background NPC accordion item element
 */
BackgroundNpcAccordionItem.create = function() {
  return document.createElement('background-npc-accordion-item');
};
