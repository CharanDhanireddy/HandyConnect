/// <reference types="cypress" />

describe('App', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('http://localhost:3000/vendorlogin')
    })

    it('Verify vendor login and redirect to home if details are not found', () => {
        cy.get('input[id="emailId"]').should('exist')
        cy.get('input[id="passwordId"]').should('exist')
        cy.get('button[id="vendor-login-button"]').should('exist')
        cy.get('#emailId').type('srikanth@email.com');
        cy.get("#emailId").should('have.value', 'srikanth@email.com')
        cy.get('#passwordId').type('12345678');
        cy.get("#passwordId").should('have.value', '12345678')
        cy.get('#vendor-login-button').click();
        cy.url().should('eq', 'http://localhost:3000/vendorDashboard')
    })

    
})