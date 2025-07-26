# Scrimshaw Bay - Test Suite

This directory contains comprehensive unit tests for the Scrimshaw Bay application, organized into modular test suites for better maintainability and focused testing.

## Test Structure

### Test Files
- `test-runner.js` - Main test runner that orchestrates all test suites
- `common-utils.test.js` - Unit tests for the refactored utility functions
- `data-service.test.js` - Tests for data retrieval and management functionality
- `modal-service.test.js` - Tests for modal creation and management
- `components.test.js` - Tests for UI component creation and functionality
- `ui-navigation.test.js` - Tests for navigation, UI structure, and accessibility
- `schema-validation.test.js` - **NEW**: Schema validation and data integrity tests
- `schemas/campaign-data-schemas.js` - **NEW**: JSON schemas for all data objects

### Schema Validation Tests
- `schema-validation.test.js` - Validates all campaign data objects against their schemas
- `run-schema-tests.js` - Schema test runner with detailed reporting

## Running Tests

### All Tests
```bash
npm test
```
Runs the complete test suite using the test runner with comprehensive reporting.

### Individual Test Suites
```bash
# Utility functions only
npm run test:utils

# Data service functionality  
npm run test:data

# Modal service functionality
npm run test:modal

# Component creation and templates
npm run test:components

# UI structure and navigation
npm run test:ui

# Schema validation tests
node test/run-schema-tests.js

# Browser-based tests (manual)
npm run test:browser
```

## Test Coverage

### Common Utils (`common-utils.test.js`) - 31 Tests
Tests the core refactored utility functions:

#### `camelCaseToWords()` - 6 Tests
- ✅ Basic camelCase conversion
- ✅ PascalCase handling  
- ✅ Underscore field names
- ✅ Edge cases (empty strings, single characters)

#### `arrayToHtmlList()` - 4 Tests
- ✅ Basic array to HTML list conversion
- ✅ Custom formatting functions
- ✅ HTML special character escaping
- ✅ Empty array handling

#### `processObjectToList()` - 4 Tests
- ✅ Object to structured list conversion
- ✅ Key formatting (camelCase to readable)
- ✅ Special value handlers
- ✅ Empty object handling

#### `processArrayFields()` - 9 Tests
- ✅ Multiple array processing with List suffix generation
- ✅ HasItems flag generation
- ✅ Underscore field name support
- ✅ Non-array value handling
- ✅ Error conditions (null/undefined inputs)

#### Integration & Error Handling - 8 Tests
- ✅ Realistic NPC data processing
- ✅ Event data with multiple array fields
- ✅ Template-ready output generation
- ✅ Robust error handling

### Data Service (`data-service.test.js`) - 12 Tests
Tests data structure validation and service functionality:
- ✅ Data structure integrity
- ✅ Settlement data validation
- ✅ NPC data validation  
- ✅ Threat data validation
- ✅ Event data validation
- ✅ Referential integrity checks
- ✅ Browser service functionality (when available)

### Modal Service (`modal-service.test.js`) - Browser Only
Tests modal management functionality:
- ✅ Modal creation and configuration
- ✅ Modal state management
- ✅ DOM manipulation
- ✅ Event handling
- ✅ Error handling and cleanup

### Components (`components.test.js`) - Browser Only  
Tests UI component creation:
- ✅ Settlement card generation
- ✅ NPC card generation
- ✅ Threat card generation
- ✅ Event card generation
- ✅ Template cloning functionality

### UI & Navigation (`ui-navigation.test.js`) - Browser Only
Tests user interface and accessibility:
- ✅ Navigation structure and functionality
- ✅ UI element presence and structure
- ✅ CSS loading and styling
- ✅ Responsive design elements
- ✅ Accessibility compliance

## Environment-Specific Testing

### Node.js Environment
- Runs utility function tests
- Runs data structure validation tests
- Skips browser-dependent tests with informative messages

### Browser Environment  
- Runs all tests including DOM manipulation
- Tests actual component creation and styling
- Validates user interface and accessibility

## Test Results

When all tests pass, you should see:
```
🎉 ALL TESTS PASSED! 🎉
   ✅ Total Passed: 43
   ❌ Total Failed: 0
   📊 Total Tests: 43
```

## Test Architecture Benefits

The refactored test suite provides:

1. **Modular Organization** - Each service/component has its own test file
2. **Environment Awareness** - Tests adapt to Node.js vs browser environments  
3. **Comprehensive Coverage** - From utility functions to full UI testing
4. **Individual Testing** - Each test suite can be run independently
5. **Clear Reporting** - Detailed results with pass/fail breakdown
6. **Maintainable Structure** - Easy to add new tests and modify existing ones

## Refactoring Validation

The test suite confirms the successful refactoring:

✅ **Eliminated Code Duplication** - No more repetitive `.map()` patterns  
✅ **Centralized Processing** - All array-to-HTML logic in utility functions  
✅ **Consistent Naming** - Standardized `fieldNameList` and `fieldNameHasItems`  
✅ **Future-Proof Architecture** - New array fields work automatically  
✅ **Robust Error Handling** - Graceful handling of edge cases  

## Adding New Tests

When adding new functionality:

1. **For utilities:** Add tests to `common-utils.test.js`
2. **For data:** Add tests to `data-service.test.js`  
3. **For UI:** Add tests to appropriate component test file
4. **New services:** Create new test file and add to `test-runner.js`
5. **For data objects:** Update schemas in `schemas/campaign-data-schemas.js` and run schema validation

## Schema Validation

### Campaign Data Schemas (`schema-validation.test.js`) - 65 Schema Tests + 117 Reference Tests

The schema validation system ensures data integrity and consistency:

#### Schema Compliance: ✅ 100% (65/65 objects valid)
- **Settlements**: 5/5 valid - All settlement objects conform to schema
- **NPCs**: 32/32 valid - All NPC objects conform to schema  
- **Locations**: 9/9 valid - All location objects conform to schema
- **Threats**: 7/7 valid - All threat objects conform to schema
- **Events**: 5/5 valid - All event objects conform to schema
- **Lore**: 4/4 valid - All lore objects conform to schema

#### Reference Integrity: ⚠️ 83.8% (98/117 references valid)
- **19 reference issues found** - mostly case sensitivity in IDs
- See `SCHEMA_ANALYSIS_REPORT.md` for detailed analysis and fixes needed

### Schema Benefits
- ✅ Validates data structure consistency
- ✅ Catches reference errors before they cause runtime issues
- ✅ Ensures all required fields are present
- ✅ Provides detailed error reporting for data issues
- ✅ Supports future data expansion with confidence

## CI/CD Integration

The test suite returns appropriate exit codes:
- Exit code 0: All tests passed
- Exit code 1: Some tests failed

Each test file can also be run individually with proper exit codes for targeted CI/CD testing.
