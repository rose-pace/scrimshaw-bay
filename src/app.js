/**
 * Main Application class for Scrimshaw Bay Campaign Guide
 */

import { DataService } from '@/services/data-service.js';
import { ModalService } from '@/services/modal-service.js';
import { Modal } from '@/components/modal/modal.js';
import { Navigation } from '@/components/navigation/navigation.js';
import { SettlementCard } from '@/components/settlement-card/settlement-card.js';
import { NpcCard } from '@/components/npc-card/npc-card.js';
import { ThreatCard } from '@/components/threat-card/threat-card.js';
import { EventCard } from '@/components/event-card/event-card.js';
import { LocationDetail } from '@/components/location-detail/location-detail.js';
import { clearElement, safeQuerySelector, safeQuerySelectorAll, addEventListenerWithCleanup } from '@/utils/dom-utils.js';

export class ScrimshawBayApp {  constructor() {
    this.dataService = new DataService();
    this.modalService = new ModalService();
    this.modal = new Modal();
    this.navigation = new Navigation();
    this.settlementCard = new SettlementCard();
    this.npcCard = new NpcCard();
    this.threatCard = new ThreatCard();
    this.eventCard = new EventCard();
    this.locationDetail = new LocationDetail();
    this.cleanupFunctions = [];
    
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.setupEventListeners();
    this.renderInitialContent();
    this.setupNavigationListeners();
  }

  /**
   * Setup global event listeners
   */
  setupEventListeners() {
    // Listen for settlement changes
    const settlementChangeCleanup = this.navigation.addNavigationChangeListener((type, value) => {
      if (type === 'settlement') {
        this.renderSettlementDetails(value);
      }
    });
    this.cleanupFunctions.push(settlementChangeCleanup);

    // Listen for settlement card clicks
    const settlementClickCleanup = addEventListenerWithCleanup(document, 'settlementClick', (e) => {
      this.navigation.navigateToSettlement(e.detail.settlement);
    });
    this.cleanupFunctions.push(settlementClickCleanup);

    // Listen for NPC link clicks
    const npcClickCleanup = addEventListenerWithCleanup(document, 'click', (e) => {
      if (e.target.matches('.npc-link, .npc-mini-link')) {
        e.preventDefault();
        const npcKey = e.target.dataset.npc;
        if (npcKey) {
          this.modal.showNpcDetails(npcKey);
        }
      }
    });
    this.cleanupFunctions.push(npcClickCleanup);

    // Listen for threat detail button clicks
    const threatClickCleanup = addEventListenerWithCleanup(document, 'click', (e) => {
      if (e.target.matches('.details-btn')) {
        e.preventDefault();
        const threatKey = e.target.dataset.threat;
        if (threatKey) {
          this.modal.showThreatDetails(threatKey);
        }
      }
    });
    this.cleanupFunctions.push(threatClickCleanup);

    // Listen for location detail button clicks
    const locationClickCleanup = addEventListenerWithCleanup(document, 'click', (e) => {
      if (e.target.matches('.location-detail-btn')) {
        e.preventDefault();
        const locationKey = e.target.dataset.location;
        if (locationKey) {
          this.modal.showLocationDetails(locationKey);
        }
      }
    });
    this.cleanupFunctions.push(locationClickCleanup);

    // Handle network link clicks in modals
    const networkClickCleanup = addEventListenerWithCleanup(document, 'click', (e) => {
      if (e.target.matches('.network-link')) {
        e.preventDefault();
        
        if (e.target.classList.contains('npc-link')) {
          const npcKey = e.target.dataset.npc;
          if (npcKey) {
            this.modal.showNpcDetails(npcKey);
          }
        } else if (e.target.classList.contains('threat-link')) {
          const threatKey = e.target.dataset.threat;
          if (threatKey) {
            this.modal.showThreatDetails(threatKey);
          }
        } else if (e.target.classList.contains('location-link')) {
          const locationKey = e.target.dataset.location;
          if (locationKey) {
            this.modal.showLocationDetails(locationKey);
          }
        }
      }
    });
    this.cleanupFunctions.push(networkClickCleanup);
  }

  /**
   * Setup navigation listeners
   */
  setupNavigationListeners() {
    const cleanup = this.navigation.addNavigationChangeListener((type, value) => {
      if (type === 'section') {
        this.handleSectionChange(value);
      }
    });
    this.cleanupFunctions.push(cleanup);
  }
  /**
   * Handle section changes
   * @param {string} sectionName - Section that was changed to
   */
  handleSectionChange(sectionName) {
    switch (sectionName) {
      case 'npcs':
        this.renderNPCs();
        break;
      case 'events':
        this.renderEvents();
        break;
      case 'threats':
        this.renderThreats();
        break;
      case 'overview':
        this.renderOverview();
        break;
      default:
        break;
    }
  }
  /**
   * Render initial content
   */
  renderInitialContent() {
    this.renderOverview();
    this.renderNPCs();
    this.renderEvents();
    this.renderThreats();
  }

  /**
   * Render overview section
   */
  renderOverview() {
    const overviewSection = safeQuerySelector('#overview');
    if (!overviewSection) return;

    // Find the settlement overview container
    const settlementOverview = overviewSection.querySelector('.settlement-overview .settlement-grid');
    if (settlementOverview) {
      clearElement(settlementOverview);
      const settlementCards = this.settlementCard.createOverviewCards();
      settlementOverview.appendChild(settlementCards);
    }
  }
  /**
   * Render NPCs section
   */
  renderNPCs() {
    const npcList = safeQuerySelector('#npc-list');
    if (!npcList) return;

    clearElement(npcList);

    const npcCards = this.npcCard.createAllCards();
    npcList.appendChild(npcCards);
  }  /**
   * Render events section
   */
  renderEvents() {
    const eventsList = safeQuerySelector('#events-list');
    if (!eventsList) return;

    clearElement(eventsList);

    const eventCards = this.eventCard.createAllCards();
    eventsList.appendChild(eventCards);
  }

  /**
   * Render threats section
   */
  renderThreats() {
    const threatsSection = safeQuerySelector('#threats .content-grid');
    if (!threatsSection) return;

    // Clear existing dynamic content but keep static threat cards
    const dynamicCards = threatsSection.querySelectorAll('[data-threat]');
    dynamicCards.forEach(card => {
      if (!card.querySelector('.details-btn[data-threat]')) {
        card.remove();
      }
    });

    // Add any dynamic threat cards if needed
    const threats = this.dataService.getAllThreats();
    
    threats.forEach(threat => {
      // Only add if not already present in static HTML
      const existingCard = threatsSection.querySelector(`[data-threat="${threat.key}"]`);
      if (!existingCard) {
        const threatCard = this.threatCard.create(threat, threat.key);
        threatsSection.appendChild(threatCard);
      }
    });
  }

  /**
   * Render settlement details
   * @param {string} settlementKey - Settlement key
   */
  renderSettlementDetails(settlementKey) {
    const settlementDetails = safeQuerySelector('#settlement-details');
    if (!settlementDetails) return;

    clearElement(settlementDetails);

    const detailView = this.settlementCard.createDetailView(settlementKey);
    settlementDetails.appendChild(detailView);
  }
  /**
   * Create NPC card element
   * @param {Object} npc - NPC data with key
   * @returns {HTMLElement} NPC card element
   */
  createNpcCard(npc) {
    const card = document.createElement('div');
    card.className = 'npc-card';
    card.innerHTML = `
      <div class="npc-header">
        <h3 class="npc-name">${npc.name}</h3>
        <span class="npc-location">${npc.location}</span>
      </div>
      <p class="npc-role">${npc.role}</p>
      <p class="npc-description">${npc.description}</p>
      <button class="npc-link" data-npc="${npc.key}">View Details</button>
    `;
    return card;
  }

  /**
   * Destroy the application and clean up resources
   */
  destroy() {
    this.cleanupFunctions.forEach(cleanup => cleanup());
    this.cleanupFunctions = [];
    
    this.navigation.destroy();
    this.modalService.closeAllModals();
  }
}
