/**
 * Background NPCs component for displaying village/settlement background NPCs
 * Uses shadow DOM and manual slot assignment for performance
 */

import { DataService } from '@/services/data-service.js';
import { ShadowComponent } from '@/components/base/shadow-component.js';
import { Accordion } from '@/components/accordion/accordion.js';
import { AccordionItem } from '@/components/accordion/accordion-item.js';
import { NpcHeader } from './npc-header/npc-header.js';
import { NpcContent } from './npc-content/npc-content.js';
import styles from './background-npcs.css' with { type: 'css' };

export class BackgroundNpcs extends ShadowComponent {
  constructor() {
    super();
    this.dataService = new DataService();
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(styles);
    
    this._shadowRoot.innerHTML = `
      <div class="background-npcs">
        <div class="background-npcs-header">
          <h4 class="background-npcs-title">Background NPCs</h4>
          <slot name="count"></slot>
        </div>
        <slot name="npcs-grid"></slot>
      </div>
    `;
  }

  /**
   * Process pending data that was stored before connection
   */
  processPendingData() {
    console.log('BackgroundNpcs: processPendingData called', this.pendingData);
    if (this.pendingData) {
      this.displayBackgroundNpcs(this.pendingData.npcKeys, this.pendingData.settlementName);
    }
  }

  /**
   * Create and display background NPCs for a settlement
   * @param {Array<string>} npcKeys - Array of NPC keys
   * @param {string} settlementName - Name of the settlement
   */
  async displayBackgroundNpcs(npcKeys, settlementName) {
    console.log('BackgroundNpcs: displayBackgroundNpcs called', { npcKeys, settlementName, isReady: this.isReady() });
    
    // If not ready yet, store the data for later
    if (!this.isReady()) {
      console.log('BackgroundNpcs: Not ready, storing pending data');
      this.storePendingData({ npcKeys, settlementName });
      return;
    }

    if (!npcKeys || npcKeys.length === 0) {
      console.log('BackgroundNpcs: No NPCs, showing empty state');
      this.displayEmptyState();
      return;
    }

    console.log('BackgroundNpcs: Creating content for', npcKeys.length, 'NPCs');

    // Create count badge
    const countBadge = document.createElement('span');
    countBadge.className = 'background-npcs-count';
    countBadge.textContent = `${npcKeys.length}`;
    
    // Create accordion wrapper for NPCs
    const accordion = Accordion.create();
    accordion.className = 'background-npcs-accordion';
    
    // Create accordion items for each NPC
    const accordionItemPromises = [];
    npcKeys.forEach(npcKey => {
      const npc = this.dataService.getNpc(npcKey);
      if (npc) {
        console.log('BackgroundNpcs: Creating accordion item for NPC', npcKey, npc.name);
        
        // Create standard accordion item
        const accordionItem = this.createNpcAccordionItem(npcKey, npc);
        accordionItemPromises.push(accordionItem);
      } else {
        console.warn('BackgroundNpcs: NPC not found:', npcKey);
      }
    });

    const accordionItems = await Promise.all(accordionItemPromises)

    // Add accordion items using the new method
    accordion.addAccordionItems(accordionItems);

    console.log('BackgroundNpcs: Assigning to slots');
    // Assign to slots
    this.safeSlotAssign('count', countBadge);
    this.safeSlotAssign('npcs-grid', accordion);
  }

  /**
   * Display empty state when no background NPCs exist
   */
  displayEmptyState() {
    // If not ready yet, store empty state for later
    if (!this.isReady()) {
      this.storePendingData({ npcKeys: [], settlementName: '' });
      return;
    }

    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
      <div class="empty-state-icon">👤</div>
      <p>No background NPCs available for this settlement</p>
    `;
    
    const countBadge = document.createElement('span');
    countBadge.className = 'background-npcs-count';
    countBadge.textContent = '0';
    
    this.safeSlotAssign('count', countBadge);
    this.safeSlotAssign('npcs-grid', emptyState);
  }

  /**
   * Dispatch NPC click event
   * @param {string} npcKey - NPC key
   */
  dispatchNpcClickEvent(npcKey) {
    const event = new CustomEvent('npcClick', {
      detail: { npc: npcKey },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  /**
   * Factory method to create background NPCs component instances
   * @returns {BackgroundNpcs} New background NPCs component element
   */
  static create() {
    return document.createElement('background-npcs');
  }
  
  /**
   * Factory function to create an NPC accordion item
   * @param {string} npcKey - The key of the NPC
   * @param {Object} npc - The NPC data object
   * @returns {Promise<AccordionItem>} A promise that resolves to the created accordion item
   */
  async createNpcAccordionItem(npcKey, npc) {
    return new Promise((resolve, reject) => {
      if (!npcKey || !npc) {
        console.error('BackgroundNpcs: Invalid NPC data for key', npcKey);
        reject(new Error('Invalid NPC data'));
        return;
      }

      const accordionItem = AccordionItem.create();

      accordionItem.addEventListener('componentReady', () => {
          console.log('BackgroundNpcs: Accordion item component ready for NPC', npcKey);

          // Create NPC header component
          const npcHeader = NpcHeader.create();
          npcHeader.setNpcData(npc);

          // Create NPC content component
          const npcContent = NpcContent.create();
          npcContent.setNpcData(npcKey, npc);

          // Forward npcClick events from content component
          npcContent.addEventListener('npcClick', (event) => {
              event.stopPropagation();
              this.dispatchNpcClickEvent(event.detail.npc);
          });

          // Assign components to accordion item slots
          accordionItem.setHeader(npcHeader);
          accordionItem.setContent(npcContent);
      });
      resolve(accordionItem);
    });
  }
}

customElements.define('background-npcs', BackgroundNpcs);
