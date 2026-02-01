/**
 * - Login skenario
 *   - harus menampilkan modal login ketika user belum terautentikasi
 *   - harus mengizinkan user untuk mengetik email dan password
 *   - harus menampilkan toast error ketika login gagal
 *   - harus menutup modal dan menampilkan toast sukses ketika login berhasil
 */

/* global cy, describe, it */
describe('Login E2E Test', () => {
  it('should display login modal when not authenticated', () => {
    cy.visit('http://localhost:5173');
    cy.get('#auth-modal').should('be.visible');
  });

  it('should allow user to type email and password', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[placeholder="Email"]').type('user@example.com');
    cy.get('input[placeholder="Password"]').type('validpassword');
    cy.get('input[placeholder="Email"]').should(
      'have.value',
      'user@example.com',
    );
    cy.get('input[placeholder="Password"]').should(
      'have.value',
      'validpassword',
    );
  });

  it('should show error toast when login failed', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[placeholder="Email"]').type('salah@example.com');
    cy.get('input[placeholder="Password"]').type('salahpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Login gagal', { timeout: 5000 }).should('be.visible');
  });

  it('should close modal and show success toast when login successful', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[placeholder="Email"]').type('ucup@gmail.com');
    cy.get('input[placeholder="Password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.contains('Login berhasil', { timeout: 5000 }).should('be.visible');
    cy.get('#auth-modal').should('not.exist');
  });
});
