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
    cy.wait(3000);
  });

  it('should display login modal when not authenticated', () => {
    cy.get('#auth-modal', { timeout: 15000 }).should('be.visible');
  });

  it('should allow user to type email and password', () => {
    cy.get('input[placeholder="Email"]', { timeout: 15000 })
      .should('be.visible')
      .type('user@example.com', { delay: 50, force: true });

    cy.get('input[placeholder="Password"]')
      .should('be.visible')
      .type('validpassword', { delay: 50, force: true });

    cy.get('input[placeholder="Email"]').should(
      'have.value',
      'user@example.com',
    );
  });

  it('should show error toast when login failed', () => {
    cy.get('input[placeholder="Email"]')
      .should('be.visible')
      .type('salah@example.com', { force: true });
    cy.get('input[placeholder="Password"]')
      .should('be.visible')
      .type('salahpassword', { force: true });
    cy.get('button[type="submit"]').click();
    cy.contains('Login gagal', { timeout: 15000 }).should('be.visible');
  });

  it('should close modal and show success toast when login successful', () => {
    cy.get('input[placeholder="Email"]')
      .should('be.visible')
      .type('ucup@gmail.com', { force: true });
    cy.get('input[placeholder="Password"]')
      .should('be.visible')
      .type('123456', { force: true });
    cy.get('button[type="submit"]').click();
    cy.contains('Login berhasil', { timeout: 15000 }).should('be.visible');
    cy.get('#auth-modal').should('not.exist');
  });
});
