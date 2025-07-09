/**
 * Components Tests
 * Tests the component functionality for creating UI elements
 */

class ComponentsTests {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      tests: []
    };
  }

  /**
   * Assert function for testing
   */
  assert(condition, message) {
    if (condition) {
      this.results.passed++;
      this.results.tests.push({ status: 'PASS', message });
    } else {
      this.results.failed++;
      this.results.tests.push({ status: 'FAIL', message });
      console.error(`❌ FAIL: ${message}`);
    }
  }

  /**
   * Test Settlement Card Component
   */
  testSettlementCard() {
    console.log('🏘️ Testing Settlement Card Component...');
    
    try {
      if (typeof window === 'undefined' || !window.ScrimshawBayApp) {
        console.log('⚠️  Skipping settlement card tests - browser environment required');
        return;
      }

      // Test settlement card creation
      const settlement = { 
        name: 'Test Settlement', 
        type: 'Test Type', 
        population: '~100',
        description: 'A test settlement for testing purposes'
      };
      
      // Access the settlement card via the template utils
      const templateUtils = window.ScrimshawBayApp.templateUtils || window.templateUtils;
      if (templateUtils && templateUtils.createSettlementCard) {
        const card = templateUtils.createSettlementCard(settlement, 'test');
        
        this.assert(card instanceof HTMLElement, 'SettlementCard should create HTML element');
        this.assert(card.querySelector('.settlement-name') !== null, 'Settlement card should have name element');
        this.assert(card.querySelector('.settlement-type') !== null, 'Settlement card should have type element');
        this.assert(card.getAttribute('data-settlement') === 'test', 'Settlement card should have correct data attribute');
        
        // Test content
        const nameElement = card.querySelector('.settlement-name');
        if (nameElement) {
          this.assert(nameElement.textContent.includes('Test Settlement'), 'Settlement name should be correct');
        }
        
        const typeElement = card.querySelector('.settlement-type');
        if (typeElement) {
          this.assert(typeElement.textContent.includes('Test Type'), 'Settlement type should be correct');
        }
      } else {
        console.log('ℹ️  Settlement card component not available for testing');
      }
      
    } catch (error) {
      console.error('❌ Settlement card tests failed:', error);
      this.assert(false, `Settlement card test failed with error: ${error.message}`);
    }
  }

  /**
   * Test NPC Card Component
   */
  testNpcCard() {
    console.log('👤 Testing NPC Card Component...');
    
    try {
      if (typeof window === 'undefined' || !window.ScrimshawBayApp) {
        console.log('⚠️  Skipping NPC card tests - browser environment required');
        return;
      }

      // Test NPC card creation
      const npc = { 
        name: 'Test NPC', 
        role: 'Test Role', 
        description: 'A test NPC for testing purposes',
        location: 'Test Location',
        secrets: ['Secret knowledge', 'Hidden agenda'],
        motivations: ['Protect the town', 'Gain power'],
        abilities: ['Persuasion', 'Intimidation']
      };
      
      // Access the NPC card via the template utils
      const templateUtils = window.ScrimshawBayApp.templateUtils || window.templateUtils;
      if (templateUtils && templateUtils.createNpcCard) {
        const npcElement = templateUtils.createNpcCard(npc, 'test');
        
        this.assert(npcElement instanceof HTMLElement, 'NpcCard should create HTML element');
        this.assert(npcElement.querySelector('.npc-name') !== null, 'NPC card should have name element');
        this.assert(npcElement.querySelector('.npc-role') !== null, 'NPC card should have role element');
        this.assert(npcElement.getAttribute('data-npc') === 'test', 'NPC card should have correct data attribute');
        
        // Test content
        const nameElement = npcElement.querySelector('.npc-name');
        if (nameElement) {
          this.assert(nameElement.textContent.includes('Test NPC'), 'NPC name should be correct');
        }
        
        const roleElement = npcElement.querySelector('.npc-role');
        if (roleElement) {
          this.assert(roleElement.textContent.includes('Test Role'), 'NPC role should be correct');
        }
        
        // Test secrets, motivations, and abilities sections
        const secretsSection = npcElement.querySelector('.npc-secrets');
        if (secretsSection) {
          this.assert(secretsSection.style.display !== 'none', 'Secrets section should be visible when NPC has secrets');
          const secretsList = secretsSection.querySelector('ul');
          if (secretsList) {
            this.assert(secretsList.innerHTML.includes('Secret knowledge'), 'Secrets list should contain NPC secrets');
          }
        }
        
        const motivationsSection = npcElement.querySelector('.npc-motivations');
        if (motivationsSection) {
          this.assert(motivationsSection.style.display !== 'none', 'Motivations section should be visible when NPC has motivations');
          const motivationsList = motivationsSection.querySelector('ul');
          if (motivationsList) {
            this.assert(motivationsList.innerHTML.includes('Protect the town'), 'Motivations list should contain NPC motivations');
          }
        }
        
        const abilitiesSection = npcElement.querySelector('.npc-abilities');
        if (abilitiesSection) {
          this.assert(abilitiesSection.style.display !== 'none', 'Abilities section should be visible when NPC has abilities');
          const abilitiesList = abilitiesSection.querySelector('ul');
          if (abilitiesList) {
            this.assert(abilitiesList.innerHTML.includes('Persuasion'), 'Abilities list should contain NPC abilities');
          }
        }
        
        // Test NPC without secrets/motivations/abilities
        const minimalNpc = {
          name: 'Minimal NPC',
          role: 'Basic Role',
          description: 'A minimal NPC for testing'
        };
        
        const minimalElement = templateUtils.createNpcCard(minimalNpc, 'minimal');
        const minimalSecretsSection = minimalElement.querySelector('.npc-secrets');
        if (minimalSecretsSection) {
          this.assert(minimalSecretsSection.style.display === 'none' || 
                     window.getComputedStyle(minimalSecretsSection).display === 'none',
                     'Secrets section should be hidden when NPC has no secrets');
        }
        
      } else {
        console.log('ℹ️  NPC card component not available for testing');
      }
      
    } catch (error) {
      console.error('❌ NPC card tests failed:', error);
      this.assert(false, `NPC card test failed with error: ${error.message}`);
    }
  }

  /**
   * Test Threat Card Component
   */
  testThreatCard() {
    console.log('⚠️ Testing Threat Card Component...');
    
    try {
      if (typeof window === 'undefined' || !window.ScrimshawBayApp) {
        console.log('⚠️  Skipping threat card tests - browser environment required');
        return;
      }

      // Test threat card creation
      const threat = { 
        name: 'Test Threat', 
        type: 'Test Type', 
        description: 'A dangerous test threat',
        dangerLevel: 'High',
        abilities: ['Dark magic', 'Mind control'],
        effects: ['Fear inducement', 'Corruption']
      };
      
      // Access the threat card via the template utils
      const templateUtils = window.ScrimshawBayApp.templateUtils || window.templateUtils;
      if (templateUtils && templateUtils.createThreatCard) {
        const threatElement = templateUtils.createThreatCard(threat, 'test');
        
        this.assert(threatElement instanceof HTMLElement, 'ThreatCard should create HTML element');
        this.assert(threatElement.querySelector('.threat-name') !== null, 'Threat card should have name element');
        this.assert(threatElement.querySelector('.threat-type') !== null, 'Threat card should have type element');
        this.assert(threatElement.getAttribute('data-threat') === 'test', 'Threat card should have correct data attribute');
        
        // Test content
        const nameElement = threatElement.querySelector('.threat-name');
        if (nameElement) {
          this.assert(nameElement.textContent.includes('Test Threat'), 'Threat name should be correct');
        }
        
        const typeElement = threatElement.querySelector('.threat-type');
        if (typeElement) {
          this.assert(typeElement.textContent.includes('Test Type'), 'Threat type should be correct');
        }
        
        // Test danger level
        const dangerElement = threatElement.querySelector('.danger-level');
        if (dangerElement) {
          this.assert(dangerElement.textContent.includes('High'), 'Danger level should be correct');
        }
        
      } else {
        console.log('ℹ️  Threat card component not available for testing');
      }
      
    } catch (error) {
      console.error('❌ Threat card tests failed:', error);
      this.assert(false, `Threat card test failed with error: ${error.message}`);
    }
  }

  /**
   * Test Event Card Component
   */
  testEventCard() {
    console.log('📅 Testing Event Card Component...');
    
    try {
      if (typeof window === 'undefined' || !window.ScrimshawBayApp) {
        console.log('⚠️  Skipping event card tests - browser environment required');
        return;
      }

      // Test event card creation
      const event = { 
        name: 'Test Event', 
        description: 'A mysterious test event occurs',
        trigger: 'When the moon is full',
        outcomes: ['Strange occurrences', 'Supernatural phenomena'],
        hooks: ['Investigate the source', 'Seek ancient knowledge'],
        relatedNpcs: ['npc1', 'npc2'],
        relatedLocations: ['location1']
      };
      
      // Access the event card via the template utils
      const templateUtils = window.ScrimshawBayApp.templateUtils || window.templateUtils;
      if (templateUtils && templateUtils.createEventCard) {
        const eventElement = templateUtils.createEventCard(event, 'test');
        
        this.assert(eventElement instanceof HTMLElement, 'EventCard should create HTML element');
        this.assert(eventElement.querySelector('.event-name') !== null, 'Event card should have name element');
        this.assert(eventElement.getAttribute('data-event') === 'test', 'Event card should have correct data attribute');
        
        // Test content
        const nameElement = eventElement.querySelector('.event-name');
        if (nameElement) {
          this.assert(nameElement.textContent.includes('Test Event'), 'Event name should be correct');
        }
        
        // Test trigger section
        const triggerSection = eventElement.querySelector('.trigger');
        if (triggerSection && event.trigger) {
          this.assert(triggerSection.style.display !== 'none', 'Trigger section should be visible');
        }
        
        // Test outcomes section
        const outcomesSection = eventElement.querySelector('.outcomes');
        if (outcomesSection && event.outcomes) {
          this.assert(outcomesSection.style.display !== 'none', 'Outcomes section should be visible');
        }
        
      } else {
        console.log('ℹ️  Event card component not available for testing');
      }
      
    } catch (error) {
      console.error('❌ Event card tests failed:', error);
      this.assert(false, `Event card test failed with error: ${error.message}`);
    }
  }

  /**
   * Test template cloning functionality
   */
  testTemplateCloning() {
    console.log('📄 Testing Template Cloning...');
    
    try {
      if (typeof window === 'undefined' || !window.ScrimshawBayApp) {
        console.log('⚠️  Skipping template cloning tests - browser environment required');
        return;
      }

      const templateUtils = window.ScrimshawBayApp.templateUtils || window.templateUtils;
      if (templateUtils && templateUtils.cloneTemplate) {
        
        // Test if basic template elements exist
        const templates = [
          'settlement-card-template',
          'npc-card-template', 
          'threat-card-template',
          'event-card-template'
        ];
        
        templates.forEach(templateId => {
          const templateElement = document.getElementById(templateId);
          this.assert(templateElement !== null, `Template ${templateId} should exist in DOM`);
          
          if (templateElement) {
            this.assert(templateElement.tagName === 'TEMPLATE', `${templateId} should be a template element`);
            this.assert(templateElement.content !== null, `${templateId} should have content`);
          }
        });
        
      } else {
        console.log('ℹ️  Template cloning functionality not available for testing');
      }
      
    } catch (error) {
      console.error('❌ Template cloning tests failed:', error);
      this.assert(false, `Template cloning test failed with error: ${error.message}`);
    }
  }

  /**
   * Run all tests
   */
  runAllTests() {
    console.log('🧩 Starting Components Tests...\n');
    
    if (typeof window !== 'undefined') {
      this.testSettlementCard();
      this.testNpcCard();
      this.testThreatCard();
      this.testEventCard();
      this.testTemplateCloning();
    } else {
      console.log('ℹ️  Skipping Components tests - browser environment required');
    }
    
    return this.displayResults();
  }

  /**
   * Display test results
   */
  displayResults() {
    console.log(`\n🏁 Components Test Results:`);
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`📊 Total: ${this.results.passed + this.results.failed}`);
    
    if (this.results.failed === 0) {
      console.log('🎉 All Components tests passed!');
    } else {
      console.log('⚠️  Some tests failed. See details above.');
      
      // Display failed tests
      console.log('\n❌ Failed Tests:');
      this.results.tests
        .filter(test => test.status === 'FAIL')
        .forEach(test => console.log(`   • ${test.message}`));
    }
    
    return this.results.failed === 0;
  }
}

// Auto-run if this is the main module
if (typeof window === 'undefined' && import.meta.url === `file://${process.argv[1]}`) {
  const tests = new ComponentsTests();
  const success = tests.runAllTests();
  
  if (typeof process !== 'undefined') {
    process.exit(success ? 0 : 1);
  }
} else if (typeof window !== 'undefined') {
  window.ComponentsTests = ComponentsTests;
}

export default ComponentsTests;
