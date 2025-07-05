/**
 * Data service for managing campaign data
 * Singleton pattern to ensure consistent data access across the application
 */

// Import campaign data from the existing data file
import { campaignData } from 'data';

export class DataService {
  static instance = null;

  constructor() {
    if (DataService.instance) {
      return DataService.instance;
    }
    
    this.data = campaignData;
    DataService.instance = this;
  }

  /**
   * Gets settlement data by key
   * @param {string} settlementKey - Settlement identifier
   * @returns {Object|null} Settlement data or null if not found
   */  getSettlement(settlementKey) {
    return this.data.settlements?.[settlementKey] || null;
  }

  /**
   * Gets all settlements as array with keys
   * @returns {Array<Object>} Array of settlement objects with keys
   */
  getAllSettlements() {
    return Object.entries(this.data.settlements || {}).map(([key, data]) => ({
      key,
      ...data
    }));
  }

  /**
   * Gets NPC data by key
   * @param {string} npcKey - NPC identifier
   * @returns {Object|null} NPC data or null if not found
   */
  getNpc(npcKey) {
    return this.data.npcs?.[npcKey] || null;
  }

  /**
   * Gets all NPCs as array with keys
   * @returns {Array<Object>} Array of NPC objects with keys
   */
  getAllNpcs() {
    return Object.entries(this.data.npcs || {}).map(([key, data]) => ({
      key,
      ...data
    }));
  }

  /**
   * Gets NPCs for a specific settlement
   * @param {string} settlementKey - Settlement identifier
   * @returns {Array<Object>} Array of NPC objects
   */
  getNpcsForSettlement(settlementKey) {
    return Object.entries(this.data.npcs || {})
      .filter(([_, npc]) => npc.location === settlementKey)
      .map(([key, npc]) => ({ key, ...npc }));
  }

  /**
   * Gets threat data by key
   * @param {string} threatKey - Threat identifier
   * @returns {Object|null} Threat data or null if not found
   */
  getThreat(threatKey) {
    return this.data.threats?.[threatKey] || null;
  }

  /**
   * Gets all threats as array with keys
   * @returns {Array<Object>} Array of threat objects with keys
   */
  getAllThreats() {
    return Object.entries(this.data.threats || {}).map(([key, data]) => ({
      key,
      ...data
    }));
  }

  /**
   * Gets event data by key
   * @param {string} eventKey - Event identifier
   * @returns {Object|null} Event data or null if not found
   */
  getEvent(eventKey) {
    return this.data.events?.[eventKey] || null;
  }

  /**
   * Gets all events as array with keys
   * @returns {Array<Object>} Array of event objects with keys
   */
  getAllEvents() {
    return Object.entries(this.data.events || {}).map(([key, data]) => ({
      key,
      ...data
    }));
  }

  /**
   * Gets location data by key
   * @param {string} locationKey - Location identifier
   * @returns {Object|null} Location data or null if not found
   */
  getLocation(locationKey) {
    return this.data.locations?.[locationKey] || null;
  }

  /**
   * Gets all locations as array with keys
   * @returns {Array<Object>} Array of location objects with keys
   */
  getAllLocations() {
    return Object.entries(this.data.locations || {}).map(([key, data]) => ({
      key,
      ...data
    }));
  }

  /**
   * Gets locations for a specific settlement
   * @param {string} settlementKey - Settlement identifier
   * @returns {Array<Object>} Array of location objects
   */
  getLocationsForSettlement(settlementKey) {
    return Object.entries(this.data.locations || {})
      .filter(([_, location]) => location.settlement === settlementKey)
      .map(([key, location]) => ({ key, ...location }));
  }

  /**
   * Searches for items across all data types
   * @param {string} searchTerm - Search term
   * @returns {Object} Search results organized by type
   */
  search(searchTerm) {
    const term = searchTerm.toLowerCase();
    const results = {
      settlements: [],
      npcs: [],
      threats: [],
      events: [],
      locations: []
    };

    // Search settlements
    Object.entries(this.data.settlements || {}).forEach(([key, settlement]) => {
      if (settlement.name.toLowerCase().includes(term) || 
          settlement.description.toLowerCase().includes(term)) {
        results.settlements.push({ key, ...settlement });
      }
    });

    // Search NPCs
    Object.entries(this.data.npcs || {}).forEach(([key, npc]) => {
      if (npc.name.toLowerCase().includes(term) || 
          npc.description.toLowerCase().includes(term) ||
          npc.role.toLowerCase().includes(term)) {
        results.npcs.push({ key, ...npc });
      }
    });

    // Search threats
    Object.entries(this.data.threats || {}).forEach(([key, threat]) => {
      if (threat.name.toLowerCase().includes(term) || 
          threat.description.toLowerCase().includes(term)) {
        results.threats.push({ key, ...threat });
      }
    });

    // Search events
    Object.entries(this.data.events || {}).forEach(([key, event]) => {
      if (event.name.toLowerCase().includes(term) || 
          event.description.toLowerCase().includes(term)) {
        results.events.push({ key, ...event });
      }
    });

    // Search locations
    Object.entries(this.data.locations || {}).forEach(([key, location]) => {
      if (location.name.toLowerCase().includes(term) || 
          location.description.toLowerCase().includes(term)) {
        results.locations.push({ key, ...location });
      }
    });

    return results;
  }
}
