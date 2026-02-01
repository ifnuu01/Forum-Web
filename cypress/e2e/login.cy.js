/**
 * - Login skenario
 *   - harus menampilkan modal login ketika user belum terautentikasi
 *   - harus mengizinkan user untuk mengetik email dan password
 */

/* global cy, describe, it, beforeEach */
describe('Login E2E Test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#auth-modal', { timeout: 15000 }).should('be.visible');
  });

  it('should display login modal when not authenticated', () => {
    cy.get('#auth-modal').should('be.visible');
  });

  it('should allow user to type email and password', () => {
    cy.get('input[placeholder="Email"]')
      .should('be.visible')
      .type('user@example.com');
    cy.get('input[placeholder="Password"]')
      .should('be.visible')
      .type('validpassword');
    cy.get('input[placeholder="Email"]').should(
      'have.value',
      'user@example.com',
    );
    cy.get('input[placeholder="Password"]').should(
      'have.value',
      'validpassword',
    );
  });
});
