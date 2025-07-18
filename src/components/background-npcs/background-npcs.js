/**
 * Background NPCs component for displaying village/settlement background NPCs
 * Uses shadow DOM and manual slot assignment for performance
 */

import { DataService } from '@/services/data-service.js';
import { ShadowComponent } from '@/components/base/shadow-component.js';
import { Accordion } from '@/components/accordion/accordion.js';
import { BackgroundNpcAccordionItem } from './background-npc-accordion-item.js';
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
  displayBackgroundNpcs(npcKeys, settlementName) {
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
    npcKeys.forEach(npcKey => {
      const npc = this.dataService.getNpc(npcKey);
      if (npc) {
        console.log('BackgroundNpcs: Creating accordion item for NPC', npcKey, npc.name);
        const npcAccordionItem = BackgroundNpcAccordionItem.create();
        npcAccordionItem.setAttribute('npc-key', npcKey);
        
        // Forward npcClick events from accordion items
        npcAccordionItem.addEventListener('npcClick', (event) => {
          event.stopPropagation();
          this.dispatchNpcClickEvent(event.detail.npc);
        });
        
        accordion.appendChild(npcAccordionItem);
      } else {
        console.warn('BackgroundNpcs: NPC not found:', npcKey);
      }
    });

    console.log('BackgroundNpcs: Assigning to slots');
    // Assign to slots
    this.safeSlotAssign('count', countBadge);
    this.safeSlotAssign('npcs-grid', accordion);

    const debugAccordion = this._shadowRoot.querySelector('.background-npcs-accordion');
    if (debugAccordion) {
      console.log('BackgroundNpcs: Accordion found:', debugAccordion);
    }
    else {
      console.warn('BackgroundNpcs: Accordion not found in shadow DOM');
    }
    console.log('BackgroundNpcs: Assignment complete');
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
}
