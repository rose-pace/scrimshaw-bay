/**
 * Schema Validation Tests for Campaign Data
 * Tests that verify all data objects conform to their expected schemas
 */

import { campaignData } from '../data/data.js';
import {
  settlementSchema,
  baseNpcSchema,
  locationSchema,
  threatSchema,
  eventSchema,
  loreSchema,
  validateSchema
} from './schemas/campaign-data-schemas.js';

/**
 * Test suite for validating campaign data schemas
 */
export class SchemaValidationTests {
  constructor() {
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      details: []
    };
  }

  /**
   * Run all schema validation tests
   */
  runAllTests() {
    console.log('=== Campaign Data Schema Validation Tests ===\n');
    
    this.testSettlements();
    this.testNpcs();
    this.testLocations();
    this.testThreats();
    this.testEvents();
    this.testLore();
    
    this.printSummary();
    return this.results.failed === 0; // Return boolean success like other test classes
  }

  /**
   * Test settlements against settlement schema
   */
  testSettlements() {
    console.log('Testing Settlements...');
    
    for (const [settlementId, settlement] of Object.entries(campaignData.settlements)) {
      this.validateObject(
        settlement,
        settlementSchema,
        `Settlement: ${settlementId}`,
        'settlement'
      );
    }
  }

  /**
   * Test NPCs against NPC schema
   */
  testNpcs() {
    console.log('Testing NPCs...');
    
    for (const [npcId, npc] of Object.entries(campaignData.npcs)) {
      this.validateObject(
        npc,
        baseNpcSchema,
        `NPC: ${npcId}`,
        'npc'
      );
    }
  }

  /**
   * Test locations against location schema
   */
  testLocations() {
    console.log('Testing Locations...');
    
    for (const [locationId, location] of Object.entries(campaignData.locations)) {
      this.validateObject(
        location,
        locationSchema,
        `Location: ${locationId}`,
        'location'
      );
    }
  }

  /**
   * Test threats against threat schema
   */
  testThreats() {
    console.log('Testing Threats...');
    
    for (const [threatId, threat] of Object.entries(campaignData.threats)) {
      this.validateObject(
        threat,
        threatSchema,
        `Threat: ${threatId}`,
        'threat'
      );
    }
  }

  /**
   * Test events against event schema
   */
  testEvents() {
    console.log('Testing Events...');
    
    for (const [eventId, event] of Object.entries(campaignData.events)) {
      this.validateObject(
        event,
        eventSchema,
        `Event: ${eventId}`,
        'event'
      );
    }
  }

  /**
   * Test lore against lore schema
   */
  testLore() {
    console.log('Testing Lore...');
    
    for (const [loreId, lore] of Object.entries(campaignData.lore)) {
      this.validateObject(
        lore,
        loreSchema,
        `Lore: ${loreId}`,
        'lore'
      );
    }
  }

  /**
   * Validate a single object against its schema
   */
  validateObject(obj, schema, objectName, objectType) {
    this.results.total++;
    
    const validation = validateSchema(obj, schema);
    
    if (validation.valid) {
      this.results.passed++;
      console.log(`  ✅ ${objectName} - Valid`);
      this.results.details.push({
        name: objectName,
        type: objectType,
        status: 'PASSED',
        errors: []
      });
    } else {
      this.results.failed++;
      console.log(`  ❌ ${objectName} - Invalid`);
      validation.errors.forEach(error => {
        console.log(`     - ${error}`);
      });
      
      this.results.details.push({
        name: objectName,
        type: objectType,
        status: 'FAILED',
        errors: validation.errors
      });
    }
  }

  /**
   * Print test summary
   */
  printSummary() {
    console.log('\n=== Test Summary ===');
    console.log(`Total Tests: ${this.results.total}`);
    console.log(`Passed: ${this.results.passed}`);
    console.log(`Failed: ${this.results.failed}`);
    
    if (this.results.failed > 0) {
      console.log('\n=== Failed Tests Details ===');
      const failedTests = this.results.details.filter(test => test.status === 'FAILED');
      
      failedTests.forEach(test => {
        console.log(`\n${test.name}:`);
        test.errors.forEach(error => {
          console.log(`  - ${error}`);
        });
      });
    }
    
    const passRate = ((this.results.passed / this.results.total) * 100).toFixed(1);
    console.log(`\nPass Rate: ${passRate}%`);
  }

  /**
   * Get detailed analysis of schema compliance
   */
  getComplianceReport() {
    const report = {
      summary: {
        totalTests: this.results.total,
        passed: this.results.passed,
        failed: this.results.failed,
        passRate: ((this.results.passed / this.results.total) * 100).toFixed(1) + '%'
      },
      byType: {},
      failures: []
    };

    // Group results by object type
    this.results.details.forEach(test => {
      if (!report.byType[test.type]) {
        report.byType[test.type] = { total: 0, passed: 0, failed: 0 };
      }
      
      report.byType[test.type].total++;
      if (test.status === 'PASSED') {
        report.byType[test.type].passed++;
      } else {
        report.byType[test.type].failed++;
        report.failures.push(test);
      }
    });

    return report;
  }
}

/**
 * Additional validation tests for specific data integrity
 */
export class DataIntegrityTests {
  constructor() {
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      details: []
    };
  }

  /**
   * Run data integrity tests (renamed to match test runner expectations)
   */
  runAllTests() {
    console.log('\n=== Data Integrity Tests ===\n');
    
    this.testNpcReferences();
    this.testLocationReferences();
    this.testThreatReferences();
    this.testEventReferences();
    
    this.printSummary();
    return this.results.failed === 0; // Return boolean success like other test classes
  }

  /**
   * Test that NPC references in settlements exist in the npcs object
   */
  testNpcReferences() {
    console.log('Testing NPC References...');
    
    const allNpcIds = Object.keys(campaignData.npcs);
    
    for (const [settlementId, settlement] of Object.entries(campaignData.settlements)) {
      // Test keyNpcs references
      settlement.keyNpcs?.forEach(npcId => {
        this.testReference(
          allNpcIds.includes(npcId),
          `Settlement ${settlementId} keyNpcs`,
          npcId,
          'NPC'
        );
      });
      
      // Test backgroundNpcs references
      settlement.backgroundNpcs?.forEach(npcId => {
        this.testReference(
          allNpcIds.includes(npcId),
          `Settlement ${settlementId} backgroundNpcs`,
          npcId,
          'NPC'
        );
      });
      
      // Test notableLocations NPC references
      settlement.notableLocations?.forEach(location => {
        location.npcs?.forEach(npcId => {
          this.testReference(
            allNpcIds.includes(npcId),
            `Settlement ${settlementId} location ${location.id}`,
            npcId,
            'NPC'
          );
        });
      });
    }
  }

  /**
   * Test location references in NPCs and other objects
   */
  testLocationReferences() {
    console.log('Testing Location References...');
    
    const allLocationIds = Object.keys(campaignData.locations);
    const settlementLocationIds = [];
    
    // Collect all location IDs from settlements
    Object.values(campaignData.settlements).forEach(settlement => {
      settlement.notableLocations?.forEach(location => {
        settlementLocationIds.push(location.id);
      });
    });
    
    const allValidLocationIds = [...allLocationIds, ...settlementLocationIds];
    
    // Test NPC location references
    for (const [npcId, npc] of Object.entries(campaignData.npcs)) {
      npc.relatedLocations?.forEach(locationId => {
        this.testReference(
          allValidLocationIds.includes(locationId),
          `NPC ${npcId} relatedLocations`,
          locationId,
          'Location'
        );
      });
    }
  }

  /**
   * Test threat references
   */
  testThreatReferences() {
    console.log('Testing Threat References...');
    
    const allThreatIds = Object.keys(campaignData.threats);
    
    // Test NPC threat references
    for (const [npcId, npc] of Object.entries(campaignData.npcs)) {
      npc.relatedThreats?.forEach(threatId => {
        this.testReference(
          allThreatIds.includes(threatId),
          `NPC ${npcId} relatedThreats`,
          threatId,
          'Threat'
        );
      });
    }
    
    // Test location threat references
    for (const [locationId, location] of Object.entries(campaignData.locations)) {
      location.relatedThreats?.forEach(threatId => {
        this.testReference(
          allThreatIds.includes(threatId),
          `Location ${locationId} relatedThreats`,
          threatId,
          'Threat'
        );
      });
    }
  }

  /**
   * Test event references
   */
  testEventReferences() {
    console.log('Testing Event References...');
    
    const allEventIds = Object.keys(campaignData.events);
    
    // Test NPC event references
    for (const [npcId, npc] of Object.entries(campaignData.npcs)) {
      npc.relatedEvents?.forEach(eventId => {
        this.testReference(
          allEventIds.includes(eventId),
          `NPC ${npcId} relatedEvents`,
          eventId,
          'Event'
        );
      });
    }
    
    // Test location event references
    for (const [locationId, location] of Object.entries(campaignData.locations)) {
      location.relatedEvents?.forEach(eventId => {
        this.testReference(
          allEventIds.includes(eventId),
          `Location ${locationId} relatedEvents`,
          eventId,
          'Event'
        );
      });
    }
  }

  /**
   * Test a single reference
   */
  testReference(exists, context, referenceId, referenceType) {
    this.results.total++;
    
    if (exists) {
      this.results.passed++;
      this.results.details.push({
        context,
        referenceId,
        referenceType,
        status: 'PASSED'
      });
    } else {
      this.results.failed++;
      console.log(`  ❌ ${context}: Invalid ${referenceType} reference '${referenceId}'`);
      this.results.details.push({
        context,
        referenceId,
        referenceType,
        status: 'FAILED',
        error: `Invalid ${referenceType} reference`
      });
    }
  }

  /**
   * Print test summary
   */
  printSummary() {
    console.log('\n=== Integrity Test Summary ===');
    console.log(`Total References Tested: ${this.results.total}`);
    console.log(`Valid References: ${this.results.passed}`);
    console.log(`Invalid References: ${this.results.failed}`);
    
    if (this.results.failed > 0) {
      console.log('\n=== Invalid References ===');
      const failedTests = this.results.details.filter(test => test.status === 'FAILED');
      
      failedTests.forEach(test => {
        console.log(`${test.context}: ${test.referenceType} '${test.referenceId}' not found`);
      });
    }
    
    const passRate = ((this.results.passed / this.results.total) * 100).toFixed(1);
    console.log(`\nReference Validity Rate: ${passRate}%`);
  }
}

// Export test runner function
export function runSchemaTests() {
  const schemaTests = new SchemaValidationTests();
  const integrityTests = new DataIntegrityTests();
  
  const schemaResults = schemaTests.runAllTests();
  const integrityResults = integrityTests.runAllTests();
  
  return {
    schema: { 
      passed: schemaTests.results.passed, 
      failed: schemaTests.results.failed,
      total: schemaTests.results.total 
    },
    integrity: { 
      passed: integrityTests.results.passed, 
      failed: integrityTests.results.failed,
      total: integrityTests.results.total 
    },
    overall: {
      totalTests: schemaTests.results.total + integrityTests.results.total,
      totalPassed: schemaTests.results.passed + integrityTests.results.passed,
      totalFailed: schemaTests.results.failed + integrityTests.results.failed
    }
  };
}
