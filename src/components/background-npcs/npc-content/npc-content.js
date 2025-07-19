/**
 * NPC Content component for displaying detailed NPC information
 * Uses shadow DOM for style encapsulation
 */

import { ShadowComponent } from '@/components/base/shadow-component.js';
import styles from './npc-content.css' with { type: 'css' };

export class NpcContent extends ShadowComponent {
  constructor() {
    super();
    this.npcData = null;
    this.npcKey = null;
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(styles);
    
    this._shadowRoot.innerHTML = `
      <div class="npc-content">
        <!-- Content will be dynamically generated -->
      </div>
    `;

    this.contentContainer = this._shadowRoot.querySelector('.npc-content');
  }

  /**
   * Process pending data that was stored before connection
   */
  processPendingData() {
    if (this.pendingData) {
      this.setNpcData(this.pendingData.npcKey, this.pendingData.npcData);
    }
  }

  /**
   * Set NPC data and render content
   * @param {string} npcKey - NPC key for events
   * @param {Object} npcData - NPC data object
   */
  setNpcData(npcKey, npcData) {
    if (!this.isReady()) {
      this.storePendingData({ npcKey, npcData });
      return;
    }

    this.npcKey = npcKey;
    this.npcData = npcData;
    this.renderContent();
  }

  /**
   * Render the detailed NPC content
   */
  renderContent() {
    if (!this.npcData || !this.contentContainer) return;

    this.contentContainer.innerHTML = '';

    // Quick info section (all items)
    if (this.npcData.quick_info && this.npcData.quick_info.length > 0) {
      this.contentContainer.appendChild(this.createQuickInfoSection());
    }

    // Description section
    if (this.npcData.description) {
      this.contentContainer.appendChild(this.createDescriptionSection());
    }

    // Action button section
    this.contentContainer.appendChild(this.createActionsSection());
  }

  /**
   * Create description section
   * @returns {HTMLElement} Description section element
   */
  createDescriptionSection() {
    const section = document.createElement('div');
    section.className = 'npc-section';
    
    const title = document.createElement('h6');
    title.className = 'section-title';
    title.textContent = 'Description';
    section.appendChild(title);
    
    const description = document.createElement('p');
    description.className = 'npc-description';
    description.textContent = this.npcData.description;
    section.appendChild(description);
    
    return section;
  }

  /**
   * Create quick info section
   * @returns {HTMLElement} Quick info section element
   */
  createQuickInfoSection() {
    const section = document.createElement('div');
    section.className = 'npc-section';
    
    const title = document.createElement('h6');
    title.className = 'section-title';
    title.textContent = 'Quick Info';
    section.appendChild(title);
    
    const container = document.createElement('div');
    container.className = 'npc-quick-info';
    
    this.npcData.quick_info.forEach(info => {
      const tag = document.createElement('span');
      tag.className = 'quick-info-tag';
      tag.textContent = info;
      container.appendChild(tag);
    });
    
    section.appendChild(container);
    return section;
  }

  /**
   * Create actions section
   * @returns {HTMLElement} Actions section element
   */
  createActionsSection() {
    const section = document.createElement('div');
    section.className = 'npc-actions';
    
    const button = document.createElement('button');
    button.className = 'npc-detail-button';
    button.textContent = 'View Full Details';
    button.setAttribute('type', 'button');
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      this.dispatchNpcClickEvent();
    });
    
    section.appendChild(button);
    return section;
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
   * Factory method to create NPC content instances
   * @returns {NpcContent} New NPC content element
   */
  static create() {
    return document.createElement('npc-content');
  }
}

customElements.define('npc-content', NpcContent);
