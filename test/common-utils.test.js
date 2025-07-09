/**
 * Unit tests for common-utils.js functions
 * Tests the refactored utility functions for data processing
 */

import { 
  camelCaseToWords,
  processObjectToList,
  arrayToHtmlList,
  processArrayFields 
} from '../src/utils/common-utils.js';

class CommonUtilsTests {
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
   * Test camelCaseToWords function
   */
  testCamelCaseToWords() {
    console.log('🧪 Testing camelCaseToWords...');
    
    // Test basic camelCase conversion
    this.assert(
      camelCaseToWords('camelCase') === 'camel case',
      'Should convert camelCase to "camel case"'
    );
    
    // Test single word
    this.assert(
      camelCaseToWords('word') === 'word',
      'Should return single word unchanged'
    );
    
    // Test PascalCase
    this.assert(
      camelCaseToWords('PascalCase') === 'pascal case',
      'Should convert PascalCase to "pascal case"'
    );
    
    // Test multiple words
    this.assert(
      camelCaseToWords('thisIsALongVariableName') === 'this is a long variable name',
      'Should convert complex camelCase correctly'
    );
    
    // Test edge cases
    this.assert(
      camelCaseToWords('') === '',
      'Should handle empty string'
    );
    
    this.assert(
      camelCaseToWords('a') === 'a',
      'Should handle single character'
    );
    
    // Test underscore conversion
    this.assert(
      camelCaseToWords('ritual_requirements') === 'ritual requirements',
      'Should convert underscores to spaces'
    );
  }

  /**
   * Test arrayToHtmlList function
   */
  testArrayToHtmlList() {
    console.log('🧪 Testing arrayToHtmlList...');
    
    // Test basic array
    const basicArray = ['item1', 'item2', 'item3'];
    const basicResult = arrayToHtmlList(basicArray);
    this.assert(
      basicResult === '<li>item1</li><li>item2</li><li>item3</li>',
      'Should convert basic array to HTML list items'
    );
    
    // Test empty array
    this.assert(
      arrayToHtmlList([]) === '',
      'Should return empty string for empty array'
    );
    
    // Test custom formatter
    const customResult = arrayToHtmlList(basicArray, { formatter: item => `<span>${item}</span>` });
    this.assert(
      customResult === '<li><span>item1</span></li><li><span>item2</span></li><li><span>item3</span></li>',
      'Should apply custom formatter function'
    );
    
    // Test with special characters
    const specialArray = ['<script>', '"quotes"', '&amp;'];
    const specialResult = arrayToHtmlList(specialArray);
    this.assert(
      specialResult.includes('&lt;script&gt;') &&
      specialResult.includes('&quot;quotes&quot;') &&
      specialResult.includes('&amp;amp;'),
      'Should escape HTML special characters'
    );
  }

  /**
   * Test processObjectToList function
   */
  testProcessObjectToList() {
    console.log('🧪 Testing processObjectToList...');
    
    // Test basic object
    const basicObject = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3'
    };
    const basicResult = processObjectToList(basicObject);
    this.assert(
      Array.isArray(basicResult) && basicResult.length === 3 &&
      basicResult.some(item => item.includes('<strong>key1:</strong> value1')) &&
      basicResult.some(item => item.includes('<strong>key2:</strong> value2')) &&
      basicResult.some(item => item.includes('<strong>key3:</strong> value3')),
      'Should convert object to array of HTML strings with keys and values'
    );
    
    // Test camelCase key conversion
    const camelObject = {
      camelCaseKey: 'value',
      another_key: 'value2'
    };
    const camelResult = processObjectToList(camelObject);
    this.assert(
      Array.isArray(camelResult) &&
      camelResult.some(item => item.includes('<strong>camel case key:</strong>')) &&
      camelResult.some(item => item.includes('<strong>another key:</strong>')),
      'Should convert camelCase and underscore keys to readable format'
    );
    
    // Test empty object
    this.assert(
      Array.isArray(processObjectToList({})) && processObjectToList({}).length === 0,
      'Should return empty array for empty object'
    );
    
    // Test with special handlers
    const specialObject = {
      normalKey: 'normal value',
      arrayKey: ['item1', 'item2']
    };
    const specialHandlers = {
      arrayKey: (value) => `Array with ${value.length} items`
    };
    const specialResult = processObjectToList(specialObject, { specialHandlers });
    this.assert(
      Array.isArray(specialResult) &&
      specialResult.some(item => item.includes('Array with 2 items')),
      'Should apply special handlers for specific keys'
    );
  }

  /**
   * Test processArrayFields function
   */
  testProcessArrayFields() {
    console.log('🧪 Testing processArrayFields...');
    
    // Test basic object with arrays
    const testObject = {
      outcomes: ['outcome1', 'outcome2'],
      hooks: ['hook1'],
      abilities: [],
      nonArrayField: 'not an array'
    };
    
    const fieldsConfig = {
      outcomes: { checkLength: true },
      hooks: { checkLength: true },
      abilities: { checkLength: true }
    };
    
    const result = processArrayFields(testObject, fieldsConfig);
    
    // Test processed list generation
    this.assert(
      result.outcomesList === '<li>outcome1</li><li>outcome2</li>',
      'Should generate HTML list for outcomes'
    );
    
    this.assert(
      result.hooksList === '<li>hook1</li>',
      'Should generate HTML list for hooks'
    );
    
    this.assert(
      result.abilitiesList === '',
      'Should generate empty string for empty array'
    );
    
    // Test hasItems flags
    this.assert(
      result.outcomesHasItems === true,
      'Should set hasItems to true for non-empty array'
    );
    
    this.assert(
      result.hooksHasItems === true,
      'Should set hasItems to true for non-empty array'
    );
    
    this.assert(
      result.abilitiesHasItems === false,
      'Should set hasItems to false for empty array'
    );
    
    // Test that non-configured fields are not processed
    this.assert(
      result.nonArrayFieldList === undefined,
      'Should not process non-configured fields'
    );
    
    // Test underscore field names
    const underscoreObject = {
      ritual_requirements: ['req1', 'req2'],
      encounter_notes: ['note1']
    };
    
    const underscoreConfig = {
      ritual_requirements: { checkLength: true },
      encounter_notes: { checkLength: true }
    };
    
    const underscoreResult = processArrayFields(underscoreObject, underscoreConfig);
    
    this.assert(
      underscoreResult.ritual_requirementsList === '<li>req1</li><li>req2</li>',
      'Should handle underscore field names correctly'
    );
    
    this.assert(
      underscoreResult.ritual_requirementsHasItems === true,
      'Should generate hasItems flag for underscore fields'
    );
  }

  /**
   * Test integration scenarios
   */
  testIntegrationScenarios() {
    console.log('🧪 Testing integration scenarios...');
    
    // Test realistic NPC data
    const npcData = {
      secrets: ['Secret knowledge of the old gods', 'Hidden stash of artifacts'],
      motivations: ['Protect the town', 'Find missing daughter'],
      abilities: ['Keen insight', 'Local connections', 'Combat training']
    };
    
    const npcConfig = {
      secrets: { checkLength: true },
      motivations: { checkLength: true },
      abilities: { checkLength: true }
    };
    
    const npcResult = processArrayFields(npcData, npcConfig);
    
    this.assert(
      npcResult.secretsList.includes('Secret knowledge of the old gods') &&
      npcResult.secretsList.includes('Hidden stash of artifacts'),
      'Should process NPC secrets correctly'
    );
    
    this.assert(
      npcResult.secretsHasItems === true &&
      npcResult.motivationsHasItems === true &&
      npcResult.abilitiesHasItems === true,
      'Should set all hasItems flags correctly for NPC data'
    );
    
    // Test realistic event data
    const eventData = {
      outcomes: [
        'The ritual succeeds, but at a terrible cost',
        'Strange visions plague the participants',
        'The barrier between worlds weakens'
      ],
      hooks: ['Investigate the mysterious symbols'],
      ritual_requirements: ['Full moon', 'Sacred dagger', 'Virgin sacrifice']
    };
    
    const eventConfig = {
      outcomes: { checkLength: true },
      hooks: { checkLength: true },
      ritual_requirements: { checkLength: true }
    };
    
    const eventResult = processArrayFields(eventData, eventConfig);
    
    this.assert(
      eventResult.outcomesList.includes('terrible cost') &&
      eventResult.hooksList.includes('mysterious symbols') &&
      eventResult.ritual_requirementsList.includes('Sacred dagger'),
      'Should process event data correctly'
    );
  }

  /**
   * Test error handling and edge cases
   */
  testErrorHandling() {
    console.log('🧪 Testing error handling...');
    
    // Test null/undefined inputs
    this.assert(
      typeof processArrayFields(null, {}) === 'object' && processArrayFields(null, {}) !== null,
      'Should handle null object gracefully'
    );
    
    this.assert(
      typeof processArrayFields({}, null) === 'object' && processArrayFields({}, null) !== null,
      'Should handle null config gracefully'
    );
    
    // Test with non-array values in array fields
    const mixedData = {
      outcomes: 'not an array',
      hooks: ['valid hook']
    };
    
    const mixedConfig = {
      outcomes: { checkLength: true },
      hooks: { checkLength: true }
    };
    
    const mixedResult = processArrayFields(mixedData, mixedConfig);
    
    this.assert(
      mixedResult.outcomesList === '' &&
      mixedResult.outcomesHasItems === false,
      'Should handle non-array values gracefully'
    );
    
    this.assert(
      mixedResult.hooksList === '<li>valid hook</li>' &&
      mixedResult.hooksHasItems === true,
      'Should still process valid arrays when other fields are invalid'
    );
  }

  /**
   * Run all tests
   */
  runAllTests() {
    console.log('🔧 Starting Common Utils Tests...\n');
    
    this.testCamelCaseToWords();
    this.testArrayToHtmlList();
    this.testProcessObjectToList();
    this.testProcessArrayFields();
    this.testIntegrationScenarios();
    this.testErrorHandling();
    
    return this.displayResults();
  }

  /**
   * Display test results
   */
  displayResults() {
    console.log(`\n🏁 Test Results Summary:`);
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`📊 Total: ${this.results.passed + this.results.failed}`);
    
    if (this.results.failed === 0) {
      console.log('🎉 All tests passed!');
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

// Auto-run tests when loaded directly (not when imported)
if (typeof window === 'undefined' && import.meta.url === `file://${process.argv[1]}`) {
  // Node.js environment - only run if this is the main module
  const tests = new CommonUtilsTests();
  const success = tests.runAllTests();
  
  // Exit with appropriate code for CI/CD
  if (typeof process !== 'undefined') {
    process.exit(success ? 0 : 1);
  }
} else if (typeof window !== 'undefined') {
  // Browser environment
  window.CommonUtilsTests = CommonUtilsTests;
}

export default CommonUtilsTests;
