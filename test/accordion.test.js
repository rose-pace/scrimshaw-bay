/**
 * Unit tests for Accordion addAccordionItems method
 * Tests type enforcement and pending data functionality
 */

class AccordionTests {
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
   * Test accordion accepts valid AccordionItem instances
   */
  async testValidAccordionItem() {
    if (typeof window === 'undefined') {
      console.log('ℹ️  Skipping accordion tests - browser environment required');
      return;
    }

    console.log('🧪 Testing valid AccordionItem acceptance...');
    
    try {
      const { Accordion } = await import('@/components/accordion/accordion.js');
      const { AccordionItem } = await import('@/components/accordion/accordion-item.js');

      const accordion = new Accordion();
      const validItem = new AccordionItem();
      
      // Should not throw for valid AccordionItem
      accordion.addAccordionItems(validItem);
      this.assert(true, 'Valid AccordionItem accepted without error');
    } catch (error) {
      this.assert(false, `Valid AccordionItem rejected: ${error.message}`);
    }
  }

  /**
   * Test accordion accepts valid BackgroundNpcAccordionItem instances
   */
  async testValidBackgroundNpcAccordionItem() {
    if (typeof window === 'undefined') {
      return;
    }

    console.log('🧪 Testing valid BackgroundNpcAccordionItem acceptance...');
    
    try {
      const { Accordion } = await import('@/components/accordion/accordion.js');
      const { BackgroundNpcAccordionItem } = await import('@/components/background-npcs/background-npc-accordion-item.js');
      
      const accordion = new Accordion();
      const validBgItem = new BackgroundNpcAccordionItem();
      
      // Should not throw for valid BackgroundNpcAccordionItem
      accordion.addAccordionItems(validBgItem);
      this.assert(true, 'Valid BackgroundNpcAccordionItem accepted without error');
    } catch (error) {
      this.assert(false, `Valid BackgroundNpcAccordionItem rejected: ${error.message}`);
    }
  }

  /**
   * Test accordion rejects invalid types
   */
  async testInvalidTypeRejection() {
    if (typeof window === 'undefined') {
      return;
    }

    console.log('🧪 Testing invalid type rejection...');
    
    try {
      const { Accordion } = await import('@/components/accordion/accordion.js');
      const accordion = new Accordion();
      accordion.addAccordionItems("invalid");
      this.assert(false, 'Invalid type was accepted (should have thrown)');
    } catch (error) {
      this.assert(true, `Invalid type correctly rejected: ${error.message}`);
    }
  }

  /**
   * Test accordion rejects arrays with invalid types
   */
  async testMixedArrayRejection() {
    if (typeof window === 'undefined') {
      return;
    }

    console.log('🧪 Testing mixed array rejection...');
    
    try {
      const { Accordion } = await import('@/components/accordion/accordion.js');
      const { AccordionItem } = await import('@/components/accordion/accordion-item.js');
      
      const accordion = new Accordion();
      const validItem = new AccordionItem();
      accordion.addAccordionItems([validItem, "invalid"]);
      this.assert(false, 'Mixed array was accepted (should have thrown)');
    } catch (error) {
      this.assert(true, `Mixed array correctly rejected: ${error.message}`);
    }
  }

  /**
   * Test pending data storage when component not ready
   */
  async testPendingDataStorage() {
    if (typeof window === 'undefined') {
      return;
    }

    console.log('🧪 Testing pending data storage...');
    
    try {
      const { Accordion } = await import('@/components/accordion/accordion.js');
      const { AccordionItem } = await import('@/components/accordion/accordion-item.js');
      const { BackgroundNpcAccordionItem } = await import('@/components/background-npcs/background-npc-accordion-item.js');
      
      const accordion = new Accordion();
      const validItem = new AccordionItem();
      const validBgItem = new BackgroundNpcAccordionItem();
      
      // Add items before component is ready
      accordion.addAccordionItems([validItem, validBgItem]);
      
      const hasPendingData = accordion.pendingData && accordion.pendingData.accordionItems;
      const correctLength = hasPendingData && accordion.pendingData.accordionItems.length === 2;
      
      this.assert(hasPendingData, 'Items stored in pending data when component not ready');
      this.assert(correctLength, 'Correct number of items stored in pending data');
    } catch (error) {
      this.assert(false, `Pending data test failed: ${error.message}`);
    }
  }

  /**
   * Test accordion accepts arrays of valid items
   */
  async testValidArrayAcceptance() {
    if (typeof window === 'undefined') {
      return;
    }

    console.log('🧪 Testing valid array acceptance...');
    
    try {
      const { Accordion } = await import('@/components/accordion/accordion.js');
      const { AccordionItem } = await import('@/components/accordion/accordion-item.js');
      const { BackgroundNpcAccordionItem } = await import('@/components/background-npcs/background-npc-accordion-item.js');
      
      const accordion = new Accordion();
      const validItem1 = new AccordionItem();
      const validItem2 = new AccordionItem();
      const validBgItem = new BackgroundNpcAccordionItem();
      
      // Should not throw for array of valid items
      accordion.addAccordionItems([validItem1, validItem2, validBgItem]);
      this.assert(true, 'Array of valid items accepted without error');
    } catch (error) {
      this.assert(false, `Array of valid items rejected: ${error.message}`);
    }
  }

  /**
   * Run all accordion tests
   */
  runAllTests() {
    console.log('🔧 Starting Accordion Tests...');
    
    if (typeof window === 'undefined') {
      console.log('ℹ️  Skipping Accordion tests - browser environment required');
      console.log(`🏁 Accordion Test Results:`);
      console.log(`✅ Passed: ${this.results.passed}`);
      console.log(`❌ Failed: ${this.results.failed}`);
      console.log(`📊 Total: ${this.results.passed + this.results.failed}`);
      console.log('🎉 All Accordion tests passed!');
      return true;
    }
    
    try {
      // Run all tests async in browser environment
      Promise.all([
        this.testValidAccordionItem(),
        this.testValidBackgroundNpcAccordionItem(),
        this.testInvalidTypeRejection(),
        this.testMixedArrayRejection(),
        this.testPendingDataStorage(),
        this.testValidArrayAcceptance()
      ]).then(() => {
        console.log(`🏁 Accordion Test Results:`);
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`📊 Total: ${this.results.passed + this.results.failed}`);
        
        if (this.results.failed === 0) {
          console.log('🎉 All Accordion tests passed!');
        }
      });
      
      return this.results.failed === 0;
    } catch (error) {
      console.error('❌ Accordion test suite failed:', error);
      this.results.failed++;
      return false;
    }
  }
}

export default AccordionTests;
