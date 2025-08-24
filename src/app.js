/**
 * Main Application class for Scrimshaw Bay Campaign Guide
 */

import { DataService } from '@/services/data-service.js';
import { RouteService } from '@/services/route-service.js';
import { EventCard } from '@/components/event-card/event-card.js';
import { LocationDetail } from '@/components/location-detail/location-detail.js';
import { Modal } from '@/components/modal/modal.js';
import { Navigation } from '@/components/navigation/navigation.js';
import { NpcList } from '@/components/npc-list/npc-list.js';
import { SettlementCard } from '@/components/settlement-card/settlement-card.js';
import { ThreatCard } from '@/components/threat-card/threat-card.js';
import { clearElement, safeQuerySelector, addEventListenerWithCleanup } from '@/utils/dom-utils.js';

export class ScrimshawBayApp {
  constructor() {
    this.dataService = new DataService();
    this.routeService = new RouteService();
    this.modal = new Modal();
    this.navigation = new Navigation();
    this.settlementCard = new SettlementCard();
    this.threatCard = new ThreatCard();
    this.eventCard = new EventCard();
    this.locationDetail = new LocationDetail();
    this.cleanupFunctions = [];

    // Make dataService and modal available globally for template utils
    window.dataService = this.dataService;
    window.modal = this.modal;

    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.setupEventListeners();
    this.setupNavigationListeners();
    this.setupRouteListeners();
    this.renderInitialContent();
    this.handleInitialRoute();
  }

  /**
   * Setup global event listeners
   */
  setupEventListeners() {
    // Listen for settlement card clicks (custom event)
    const settlementClickCleanup = addEventListenerWithCleanup(document, 'settlementClick', (e) => {
      this.routeService.navigateToSettlement(e.detail.settlement);
    });
    this.cleanupFunctions.push(settlementClickCleanup);

    // Listen for NPC card clicks (custom event)
    const npcClickCleanup = addEventListenerWithCleanup(document, 'npcClick', (e) => {
      this.modal.showNpcDetails(e.detail.npc);
    });
    this.cleanupFunctions.push(npcClickCleanup);

    // Single delegated click handler for all clickable elements
    const globalClickCleanup = addEventListenerWithCleanup(document, 'click', (e) => {
      // Helper function to find target element and handle click
      const findAndHandle = (selectors, handler) => {
        for (const selector of selectors) {
          const element = e.target.matches(selector) ? e.target : e.target.closest(selector);
          if (element) {
            e.preventDefault();
            handler(element);
            return true;
          }
        }
        return false;
      };

      // NPC link clicks
      if (findAndHandle(['.npc-link', '.npc-mini-link'], (element) => {
        const npcKey = element.dataset.npc;
        if (npcKey) {
          this.modal.showNpcDetails(npcKey);
        }
      })) return;

      // Threat detail button clicks
      if (findAndHandle(['.details-btn'], (element) => {
        const threatKey = element.dataset.threat;
        if (threatKey) {
          this.modal.showThreatDetails(threatKey);
        }
      })) return;

      // Location detail button clicks
      if (findAndHandle(['.location-detail-btn'], (element) => {
        const locationKey = element.dataset.location;
        if (locationKey) {
          this.modal.showLocationDetails(locationKey);
        }
      })) return;

      // Network link clicks in modals
      if (findAndHandle(['.network-link'], (element) => {
        if (element.classList.contains('npc-link')) {
          const npcKey = element.dataset.npc;
          if (npcKey) {
            this.modal.showNpcDetails(npcKey);
          }
        } else if (element.classList.contains('threat-link')) {
          const threatKey = element.dataset.threat;
          if (threatKey) {
            this.modal.showThreatDetails(threatKey);
          }
        } else if (element.classList.contains('location-link')) {
          const locationKey = element.dataset.location;
          if (locationKey) {
            this.modal.showLocationDetails(locationKey);
          }
        } else if (element.classList.contains('settlement-link')) {
          const settlementKey = element.dataset.settlement;
          if (settlementKey) {
            // Close current modal and navigate to settlement
            this.modal.closeAllModals();
            this.routeService.navigateToSettlement(settlementKey);
          }
        } else if (element.classList.contains('event-link')) {
          const eventKey = element.dataset.event;
          if (eventKey) {
            this.modal.showEventDetails(eventKey);
          }
        }
      })) return;
    });
    
    this.cleanupFunctions.push(globalClickCleanup);
  }

  /**
   * Setup navigation listeners
   */
  setupNavigationListeners() {
    const cleanup = this.navigation.addNavigationChangeListener((type, value) => {
      // Only handle navigation events, not route-driven updates
      if (type === 'section') {
        this.routeService.navigateToSection(value);
      } else if (type === 'settlement') {
        this.routeService.navigateToSettlement(value);
      }
    });
    this.cleanupFunctions.push(cleanup);
  }

  /**
   * Setup route change listeners
   */
  setupRouteListeners() {
    this.routeService.onRouteChange((route, pushToHistory) => {
      this.handleRouteChange(route, pushToHistory);
    });
  }

  /**
   * Handle initial route on app load
   */
  handleInitialRoute() {
    const currentRoute = this.routeService.getCurrentRoute();
    this.handleRouteChange(currentRoute, false);
  }

  /**
   * Handle route changes from the route service
   * @param {Object} route - Route object with section and settlement
   * @param {boolean} pushToHistory - Whether this was pushed to history
   */
  handleRouteChange(route, pushToHistory) {
    // Handle 404 routes
    if (route.section === '404') {
      this.show404Page(route.originalPath);
      return;
    }

    // Remove any existing 404 section when navigating to valid routes
    this.cleanup404Section();

    // Update navigation UI to match route (without triggering navigation events)
    this.updateNavigationUI(route);

    // Handle section-specific rendering
    this.handleSectionChange(route.section);
    
    // Handle settlement rendering if needed
    if (route.settlement) {
      // Small delay to ensure section is rendered first
      setTimeout(async () => {
        await this.renderSettlementDetails(route.settlement);
      }, 50);
    }

    // Scroll to top for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Remove the 404 section if it exists
   */
  cleanup404Section() {
    const errorSection = document.getElementById('error-404');
    if (errorSection) {
      errorSection.remove();
    }
  }

  /**
   * Update navigation UI without triggering navigation events
   * @param {Object} route - Route object
   */
  updateNavigationUI(route) {
    // Update section navigation without dispatching events
    this.navigation.showSection(route.section, false);
    
    // Update settlement navigation if applicable, also without dispatching events
    if (route.settlement) {
      setTimeout(() => {
        this.navigation.showSettlement(route.settlement, false);
      }, 10);
    }
  }

  /**
   * Show 404 page for invalid routes
   * @param {string} invalidPath - The invalid path that was attempted
   */
  show404Page(invalidPath) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
      section.classList.remove('active');
    });

    // Check if 404 section already exists
    let errorSection = document.getElementById('error-404');
    
    if (!errorSection) {
      // Create new 404 section
      errorSection = document.createElement('section');
      errorSection.id = 'error-404';
      errorSection.className = 'content-section';
      errorSection.innerHTML = `
        <div class="section-header">
          <h2>Page Not Found</h2>
        </div>
        <div class="content-grid">
          <div class="info-card error-card">
            <h3>404 - Page Not Found</h3>
            <p>The requested page "<strong>${invalidPath}</strong>" could not be found.</p>
            <p>Please check the URL or navigate to one of the available sections:</p>
            <ul class="error-nav-links">
              <li><a href="#overview" class="error-link">Overview</a></li>
              <li><a href="#settlements" class="error-link">Settlements</a></li>
              <li><a href="#npcs" class="error-link">NPCs</a></li>
              <li><a href="#threats" class="error-link">Threats</a></li>
              <li><a href="#events" class="error-link">Events</a></li>
              <li><a href="#lore" class="error-link">Lore</a></li>
            </ul>
          </div>
        </div>
      `;
      
      // Add to main content area
      const mainContent = document.querySelector('main.content');
      if (mainContent) {
        mainContent.appendChild(errorSection);
      }
    } else {
      // Update existing 404 section with current invalid path
      const pathElement = errorSection.querySelector('strong');
      if (pathElement) {
        pathElement.textContent = invalidPath;
      }
    }

    // Show the 404 section
    errorSection.classList.add('active');

    // Clear navigation active states
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
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
      case 'settlements':
        // Only load default settlement if no specific settlement in route
        const currentRoute = this.routeService.getCurrentRoute();
        if (!currentRoute.settlement) {
          this.loadDefaultSettlement().catch(console.error);
        }
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
    /** @type {NpcList} */
    const npcListElement = safeQuerySelector('#npc-list');
    if (!npcListElement) return;

    // Initialize the NPC list component if it exists in DOM
    if (npcListElement.tagName.toLowerCase() === 'npc-list') {
      npcListElement.loadAllNpcs();
    }
  }

  /**
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
    const dynamicCards = threatsSection.querySelectorAll('.threat-card');
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
  async renderSettlementDetails(settlementKey) {
    const settlementDetails = safeQuerySelector('#settlement-details');
    if (!settlementDetails) {
      console.error('settlement-details element not found');
      return;
    }

    clearElement(settlementDetails);

    const detailView = await this.settlementCard.createDetailView(settlementKey);

    if (detailView) {
      settlementDetails.appendChild(detailView);
    } else {
      console.error('Failed to create detail view for settlement:', settlementKey);
    }
  }

  /**
   * Load default settlement when settlements section is first shown
   */
  async loadDefaultSettlement() {
    // Select the first settlement button
    const activeSettlementBtn = safeQuerySelector('.settlement-nav-btn');
    
    if (activeSettlementBtn) {
      const defaultSettlement = activeSettlementBtn.dataset.settlement;
      
      // Update the navigation UI to show this settlement as active
      this.navigation.showSettlement(defaultSettlement, false);
      
      // Render the settlement details
      await this.renderSettlementDetails(defaultSettlement);
      
      // Update the route to include the settlement (without pushing to history)
      this.routeService.navigateToSettlement(defaultSettlement, false);
    }
  }

  /**
   * Destroy the application and clean up resources
   */
  destroy() {
    this.cleanupFunctions.forEach(cleanup => cleanup());
    this.cleanupFunctions = [];

    this.navigation.destroy();
    this.modal.closeAllModals();
  }
}
