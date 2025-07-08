/**
 * Route service for managing browser history and URL routing
 */

export class RouteService {
  constructor() {
    this.currentRoute = null;
    this.routeChangeCallback = null;
    this.validSections = ['overview', 'settlements', 'npcs', 'events', 'threats'];
    this.isNavigating = false; // Prevent infinite recursion
    this.init();
  }

  /**
   * Initialize the route service
   */
  init() {
    // Listen for browser back/forward button
    window.addEventListener('popstate', (e) => {
      if (this.isNavigating) return;
      
      const route = this.parseCurrentRoute();
      // Update current route BEFORE handling the route change
      this.currentRoute = route;
      this.handleRouteChange(route, false); // Don't push to history on popstate
    });

    // Parse initial route
    this.currentRoute = this.parseCurrentRoute();
  }

  /**
   * Parse the current URL to extract route information
   * @returns {Object} Route object with section and settlement
   */
  parseCurrentRoute() {
    const hash = window.location.hash.slice(1); // Remove #
    
    // If no hash, treat as overview (index page)
    if (!hash) {
      return { section: 'overview', settlement: null, isValid: true };
    }

    const parts = hash.split('/');
    const section = parts[0];
    const settlement = parts[1] || null;

    // Validate section
    const isValid = this.validSections.includes(section);
    
    return { 
      section: isValid ? section : '404', 
      settlement: isValid ? settlement : null,
      isValid,
      originalPath: hash
    };
  }

  /**
   * Navigate to a section
   * @param {string} sectionName - Section to navigate to
   * @param {boolean} pushToHistory - Whether to push to browser history
   */
  navigateToSection(sectionName, pushToHistory = true) {
    if (this.isNavigating) return;
    
    if (!this.validSections.includes(sectionName)) {
      console.warn(`Invalid section: ${sectionName}`);
      return;
    }
    
    const route = { section: sectionName, settlement: null, isValid: true };
    this.updateRoute(route, pushToHistory);
  }

  /**
   * Navigate to a settlement within the settlements section
   * @param {string} settlementName - Settlement to navigate to
   * @param {boolean} pushToHistory - Whether to push to browser history
   */
  navigateToSettlement(settlementName, pushToHistory = true) {
    if (this.isNavigating) return;
    
    const route = { section: 'settlements', settlement: settlementName, isValid: true };
    this.updateRoute(route, pushToHistory);
  }

  /**
   * Update the current route
   * @param {Object} route - Route object with section and settlement
   * @param {boolean} pushToHistory - Whether to push to browser history
   */
  updateRoute(route, pushToHistory = true) {
    if (this.isNavigating) return;
    
    this.isNavigating = true;
    this.currentRoute = route;
    
    if (pushToHistory) {
      const url = this.buildUrl(route);
      const title = this.buildTitle(route);
      
      // Only update URL if it's different from current
      if (window.location.hash !== url) {
        window.history.pushState(route, title, url);
      }
    }

    this.handleRouteChange(route, pushToHistory);
    
    // Reset navigation flag after a short delay
    setTimeout(() => {
      this.isNavigating = false;
    }, 50);
  }

  /**
   * Build URL from route object
   * @param {Object} route - Route object
   * @returns {string} URL string
   */
  buildUrl(route) {
    // Don't add hash for overview (treat as index)
    if (route.section === 'overview' && !route.settlement) {
      return window.location.pathname + window.location.search;
    }
    
    let hash = `#${route.section}`;
    
    if (route.settlement) {
      hash += `/${route.settlement}`;
    }
    
    return hash;
  }

  /**
   * Build page title from route object
   * @param {Object} route - Route object
   * @returns {string} Page title
   */
  buildTitle(route) {
    const baseTitle = 'Scrimshaw Bay Campaign Guide';
    
    if (route.section === '404') {
      return `Page Not Found - ${baseTitle}`;
    }
    
    if (route.settlement) {
      return `${this.formatSectionName(route.settlement)} - Settlements - ${baseTitle}`;
    }
    
    if (route.section && route.section !== 'overview') {
      return `${this.formatSectionName(route.section)} - ${baseTitle}`;
    }
    
    return baseTitle;
  }

  /**
   * Format section name for display
   * @param {string} sectionName - Section name to format
   * @returns {string} Formatted section name
   */
  formatSectionName(sectionName) {
    return sectionName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Handle route changes
   * @param {Object} route - Route object
   * @param {boolean} pushToHistory - Whether this was pushed to history
   */
  handleRouteChange(route, pushToHistory) {
    // Update document title
    document.title = this.buildTitle(route);
    
    // Call the registered callback
    if (this.routeChangeCallback) {
      this.routeChangeCallback(route, pushToHistory);
    }
  }

  /**
   * Register a callback for route changes
   * @param {Function} callback - Callback function to execute on route change
   */
  onRouteChange(callback) {
    this.routeChangeCallback = callback;
  }

  /**
   * Get the current route
   * @returns {Object} Current route object
   */
  getCurrentRoute() {
    return this.currentRoute;
  }

  /**
   * Check if a section is valid
   * @param {string} section - Section to validate
   * @returns {boolean} Whether the section is valid
   */
  isValidSection(section) {
    return this.validSections.includes(section);
  }

  /**
   * Get all valid sections
   * @returns {Array<string>} Array of valid section names
   */
  getValidSections() {
    return [...this.validSections];
  }

  /**
   * Replace the current route without adding to history
   * @param {Object} route - Route object
   */
  replaceRoute(route) {
    this.currentRoute = route;
    
    const url = this.buildUrl(route);
    const title = this.buildTitle(route);
    
    window.history.replaceState(route, title, url);
    this.handleRouteChange(route, false);
  }

  /**
   * Go back in history
   */
  goBack() {
    window.history.back();
  }

  /**
   * Go forward in history
   */
  goForward() {
    window.history.forward();
  }

  /**
   * Check if we can go back
   * @returns {boolean} Whether we can go back
   */
  canGoBack() {
    return window.history.length > 1;
  }
}
