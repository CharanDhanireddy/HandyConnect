/// <reference types="cypress" />

describe('App', () => {
    beforeEach(() => {
        cy.visit('vendorlogin')
    })

    it('Verify all fields', () => {
        cy.get('input[id="emailId"]').should('exist')
        cy.get('input[id="passwordId"]').should('exist')
        cy.get('button[id="vendor-login-button"]').should('exist')
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
        cy.url().should('eq', 'http://localhost:3000/vendorlogin')
    })

    it('Verify vendor login and redirect to home if correct credentials are used', () => {
        cy.get('input[id="emailId"]').should('exist')
        cy.get('input[id="passwordId"]').should('exist')
        cy.get('button[id="vendor-login-button"]').should('exist')
        cy.get('#emailId').type('thomas.edison@gmail.com');
        cy.get("#emailId").should('have.value', 'thomas.edison@gmail.com')
        cy.get('#passwordId').type('123456789');
        cy.get("#passwordId").should('have.value', '123456789')
        cy.get('#vendor-login-button').click();
        cy.url().should('eq', 'http://localhost:3000/vendorDashboard')
    })


})