/**
 * - Login skenario
 *   - harus menampilkan modal login ketika user belum terautentikasi
 *   - harus mengizinkan user untuk mengetik email dan password
 *   - harus menampilkan toast error ketika login gagal
 *   - harus menutup modal dan menampilkan toast sukses ketika login berhasil
 */

/* global cy, describe, it, beforeEach */
describe('Login E2E Test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#auth-modal', { timeout: 10000 }).should('be.visible');
  });

  it('should display login modal when not authenticated', () => {
    cy.get('#auth-modal').should('be.visible');
  });

  it('should allow user to type email and password', () => {
    cy.get('input[placeholder="Email"]').should('be.visible').as('emailInput');
    cy.get('@emailInput').type('user@example.com');

    cy.get('input[placeholder="Password"]')
      .should('be.visible')
      .as('passwordInput');
    cy.get('@passwordInput').type('validpassword');

    cy.get('@emailInput').should('have.value', 'user@example.com');
    cy.get('@passwordInput').should('have.value', 'validpassword');
  });

  it('should show error toast when login failed', () => {
    cy.get('input[placeholder="Email"]').should('be.visible').as('emailInput');
    cy.get('@emailInput').type('salah@example.com');

    cy.get('input[placeholder="Password"]')
      .should('be.visible')
      .as('passwordInput');
    cy.get('@passwordInput').type('salahpassword');

    cy.get('button[type="submit"]').click();
    cy.contains('Login gagal', { timeout: 10000 }).should('be.visible');
  });

  it('should close modal and show success toast when login successful', () => {
    cy.get('input[placeholder="Email"]').should('be.visible').as('emailInput');
    cy.get('@emailInput').type('ucup@gmail.com');

    cy.get('input[placeholder="Password"]')
      .should('be.visible')
      .as('passwordInput');
    cy.get('@passwordInput').type('123456');

    cy.get('button[type="submit"]').click();

    cy.contains('Login berhasil', { timeout: 10000 }).should('be.visible');
    cy.get('#auth-modal').should('not.exist');
  });
});
