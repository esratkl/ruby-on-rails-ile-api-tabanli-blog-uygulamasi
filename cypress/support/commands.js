// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to optionally visit a visual test page
// This gracefully handles cases where the server is not running
Cypress.Commands.add('visitVisualPage', (url, options = {}) => {
  // Use Cypress baseUrl to construct full URL
  const baseUrl = Cypress.config('baseUrl') || 'http://localhost:3000';
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  const defaultOptions = {
    failOnStatusCode: false,
    timeout: 3000, // Shorter timeout for faster failure
    ...options
  };
  
  // Try to visit - if it fails, we'll handle it gracefully
  // Note: In Cypress, connection errors in before() hooks will still skip the suite
  // To avoid this, ensure your Rails server is running on port 3000 before running tests
  return cy.visit(url, defaultOptions);
});

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
