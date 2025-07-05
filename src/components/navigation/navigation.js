/**
 * Navigation component for managing section navigation
 */

import { safeQuerySelectorAll, addEventListenerWithCleanup } from '@/utils/dom-utils.js';

export class Navigation {
  constructor() {
    this.currentSection = 'overview';
    this.cleanupFunctions = [];
    this.init();
  }

  /**
   * Initialize navigation
   */
  init() {
    this.setupMainNavigation();
    this.setupSettlementNavigation();
  }

  /**
   * Setup main section navigation
   */
  setupMainNavigation() {
    const navButtons = safeQuerySelectorAll('.nav-btn');
    
    navButtons.forEach(btn => {
      const cleanup = addEventListenerWithCleanup(btn, 'click', (e) => {
        const section = e.target.dataset.section;
        if (section) {
          this.showSection(section);
        }
      });
      this.cleanupFunctions.push(cleanup);
    });
  }
  /**
   * Setup settlement navigation
   */
  setupSettlementNavigation() {
    const settlementButtons = safeQuerySelectorAll('.settlement-nav-btn');
    
    settlementButtons.forEach(btn => {
      const cleanup = addEventListenerWithCleanup(btn, 'click', (e) => {
        const settlement = e.target.dataset.settlement;
        if (settlement) {
          this.showSettlement(settlement);
        }
      });
      this.cleanupFunctions.push(cleanup);
    });
  }

  /**
   * Show a main section
   * @param {string} sectionName - Section to show
   */
  showSection(sectionName) {
    // Update current section
    this.currentSection = sectionName;
    
    // Hide all sections
    const sections = safeQuerySelectorAll('.content-section');
    sections.forEach(section => {
      section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
      targetSection.classList.add('active');
    }
    
    // Update navigation buttons
    const navButtons = safeQuerySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.section === sectionName) {
        btn.classList.add('active');
      }
    });

    // Dispatch custom event for section change
    this.dispatchSectionChangeEvent(sectionName);
  }  /**
   * Show a settlement within the settlements section
   * @param {string} settlementName - Settlement to show
   */
  showSettlement(settlementName) {
    // Update settlement buttons
    const settlementButtons = safeQuerySelectorAll('.settlement-nav-btn');
    settlementButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.settlement === settlementName) {
        btn.classList.add('active');
      }
    });

    // Dispatch custom event for settlement change
    this.dispatchSettlementChangeEvent(settlementName);
  }

  /**
   * Dispatch section change event
   * @param {string} sectionName - Section that was changed to
   */
  dispatchSectionChangeEvent(sectionName) {
    const event = new CustomEvent('sectionChange', {
      detail: { section: sectionName }
    });
    document.dispatchEvent(event);
  }

  /**
   * Dispatch settlement change event
   * @param {string} settlementName - Settlement that was changed to
   */
  dispatchSettlementChangeEvent(settlementName) {
    const event = new CustomEvent('settlementChange', {
      detail: { settlement: settlementName }
    });
    document.dispatchEvent(event);
  }

  /**
   * Get current section
   * @returns {string} Current section name
   */
  getCurrentSection() {
    return this.currentSection;
  }

  /**
   * Add navigation change listener
   * @param {Function} callback - Callback to execute on navigation change
   * @returns {Function} Cleanup function
   */
  addNavigationChangeListener(callback) {
    const sectionListener = (e) => {
      callback('section', e.detail.section);
    };
    
    const settlementListener = (e) => {
      callback('settlement', e.detail.settlement);
    };

    document.addEventListener('sectionChange', sectionListener);
    document.addEventListener('settlementChange', settlementListener);

    return () => {
      document.removeEventListener('sectionChange', sectionListener);
      document.removeEventListener('settlementChange', settlementListener);
    };
  }

  /**
   * Navigate to a specific section programmatically
   * @param {string} sectionName - Section to navigate to
   */
  navigateToSection(sectionName) {
    this.showSection(sectionName);
  }

  /**
   * Navigate to a specific settlement programmatically
   * @param {string} settlementName - Settlement to navigate to
   */
  navigateToSettlement(settlementName) {
    // First navigate to settlements section
    this.showSection('settlements');
    
    // Then show the specific settlement
    setTimeout(() => {
      this.showSettlement(settlementName);
    }, 100);
  }

  /**
   * Cleanup all event listeners
   */
  destroy() {
    this.cleanupFunctions.forEach(cleanup => cleanup());
    this.cleanupFunctions = [];
  }
}
