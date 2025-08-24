/**
 * NPC List component for displaying all NPCs with filtering functionality
 * Uses shadow DOM and manual slot assignment for performance
 */

import { DataService } from '@/services/data-service.js';
import { ShadowComponent } from '@/components/base/shadow-component.js';
import { NpcCard } from '@/components/npc-card/npc-card.js';
import { filterNpcs } from '@/utils/common-utils.js';
import styles from './npc-list.css' with { type: 'css' };

export class NpcList extends ShadowComponent {
  constructor() {
    super();
    this.dataService = new DataService();
    this.npcCard = new NpcCard();
    this.allNpcs = []; // Store all NPCs for filtering
    this.filteredNpcs = []; // Store filtered NPCs
    this.filterText = '';
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(styles);
    
    this._shadowRoot.innerHTML = `
      <div class="npc-list">
        <div class="npc-list-header">
          <h3 class="npc-list-title">All NPCs</h3>
          <slot name="count"></slot>
        </div>
        <div class="npc-filter-container">
          <input 
            type="text" 
            class="npc-filter-input" 
            placeholder="Filter NPCs (name, location, role, description)..."
            aria-label="Filter NPCs"
          />
          <div class="filter-hint">Enter at least 3 characters to search</div>
        </div>
        <slot name="npcs-grid"></slot>
      </div>
    `;

    // Set up filter input event listener
    const filterInput = this._shadowRoot.querySelector('.npc-filter-input');
    const filterHint = this._shadowRoot.querySelector('.filter-hint');
    
    filterInput.addEventListener('input', (event) => {
      const value = event.target.value.trim();
      console.log('NpcList: Filter input changed:', value);
      
      if (value.length >= 3) {
        filterHint.style.display = 'none';
        this.filterText = value;
        console.log('NpcList: Applying filter:', value);
        this.applyFilter();
      } else if (value.length === 0) {
        filterHint.style.display = 'none';
        this.filterText = '';
        console.log('NpcList: Clearing filter');
        this.applyFilter();
      } else {
        filterHint.style.display = 'block';
      }
    });
  }

  /**
   * Process pending data that was stored before connection
   */
  processPendingData() {
    console.log('NpcList: processPendingData called');
    // If there's pending data, process it; otherwise, load all NPCs by default
    if (this.pendingData && this.pendingData.loadAllNpcs) {
      this.loadAllNpcs();
    } else {
      // Auto-load NPCs when component is ready
      this.loadAllNpcs();
    }
  }

  /**
   * Load and display all NPCs
   */
  async loadAllNpcs() {
    console.log('NpcList: loadAllNpcs called', { isReady: this.isReady() });
    
    // If not ready yet, store the request for later
    if (!this.isReady()) {
      console.log('NpcList: Not ready, storing pending data');
      this.storePendingData({ loadAllNpcs: true });
      return;
    }

    // Get all NPCs from data service
    const npcs = this.dataService.getAllNpcs();
    
    if (!npcs || npcs.length === 0) {
      console.log('NpcList: No NPCs found, showing empty state');
      this.allNpcs = [];
      this.filteredNpcs = [];
      this.displayEmptyState();
      return;
    }

    console.log('NpcList: Loading', npcs.length, 'NPCs');

    // Store all NPCs for filtering (add key to each NPC if not present)
    this.allNpcs = npcs.map(npc => ({
      key: npc.key,
      ...npc
    }));

    // Apply current filter (initially shows all NPCs)
    this.applyFilter();
  }

  /**
   * Apply current filter to NPCs and render the list
   */
  async applyFilter() {
    if (!this.isReady() || this.allNpcs.length === 0) {
      return;
    }

    let npcsToShow = this.allNpcs;

    // Apply filter if filter text is provided
    if (this.filterText && this.filterText.length >= 3) {
      const filterResults = filterNpcs(this.allNpcs, this.filterText);
      npcsToShow = filterResults.map(result => result.value);
      console.log('NpcList: Filtered NPCs', filterResults.length, 'results');
    }

    this.filteredNpcs = npcsToShow;
    await this.renderNpcGrid();
  }

  /**
   * Render the filtered NPC grid
   */
  async renderNpcGrid() {
    if (!this.isReady()) {
      return;
    }

    // Create count badge
    const countBadge = document.createElement('span');
    countBadge.className = 'npc-list-count';
    
    if (this.filteredNpcs.length === 0) {
      if (this.filterText && this.filterText.length >= 3) {
        // Show "no results" message for active filter
        countBadge.textContent = '0';
        const noResults = document.createElement('div');
        noResults.className = 'no-filter-results';
        noResults.innerHTML = `
          <div class="no-results-icon">🔍</div>
          <p>No NPCs found matching "${this.filterText}"</p>
          <p class="filter-suggestion">Try a different search term</p>
        `;
        this.safeSlotAssign('count', countBadge);
        this.safeSlotAssign('npcs-grid', noResults);
        return;
      } else {
        // Show empty state for no NPCs at all
        this.displayEmptyState();
        return;
      }
    }

    // Update count
    countBadge.textContent = `${this.filteredNpcs.length}`;
    if (this.filterText && this.allNpcs.length !== this.filteredNpcs.length) {
      countBadge.textContent += ` of ${this.allNpcs.length}`;
    }
    
    // Create grid container for NPCs
    const npcGrid = document.createElement('div');
    npcGrid.className = 'npc-grid';
    
    // Create NPC cards for filtered NPCs
    this.filteredNpcs.forEach(npc => {
      console.log('NpcList: Creating card for filtered NPC', npc.key, npc.name);
      
      const npcCard = this.npcCard.create(npc, npc.key);
      npcGrid.appendChild(npcCard);
    });

    console.log('NpcList: Assigning filtered results to slots');
    // Assign to slots
    this.safeSlotAssign('count', countBadge);
    this.safeSlotAssign('npcs-grid', npcGrid);
  }

  /**
   * Display empty state when no NPCs exist
   */
  displayEmptyState() {
    // If not ready yet, store empty state for later
    if (!this.isReady()) {
      this.storePendingData({ loadAllNpcs: true });
      return;
    }

    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
      <div class="empty-state-icon">👤</div>
      <p>No NPCs available</p>
    `;
    
    const countBadge = document.createElement('span');
    countBadge.className = 'npc-list-count';
    countBadge.textContent = '0';
    
    this.safeSlotAssign('count', countBadge);
    this.safeSlotAssign('npcs-grid', emptyState);
  }

  /**
   * Factory method to create NPC list component instances
   * @returns {NpcList} New NPC list component element
   */
  static create() {
    return document.createElement('npc-list');
  }
}

customElements.define('npc-list', NpcList);
