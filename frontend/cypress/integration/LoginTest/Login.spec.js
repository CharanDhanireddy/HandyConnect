/// <reference types="cypress" />

describe('App', () => {
    beforeEach(() => {
        cy.visit('login')
    })

    it('Verify all fields', () => {
        cy.get('input[id="emailId"]').should('exist')
        cy.get('input[id="passwordId"]').should('exist')
        cy.get('button[id="user-login-button"]').should('exist')
    })

    it('Verify redirect to home if wrong credentials are used', () => {
        cy.get('#emailId').type('srikanth@email.com');
        cy.get("#emailId").should('have.value', 'srikanth@email.com')
        cy.get('#passwordId').type('12345678');
        cy.get("#passwordId").should('have.value', '12345678')

        cy.get('#user-login-button').click();
        cy.url().should('eq', 'http://localhost:3000/')
    })

    it('Verify redirect to dashboard if correct credentials are used', () => {
        cy.get('#emailId').type('u2@gmail.com');
        cy.get("#emailId").should('have.value', 'u2@gmail.com')
        cy.get('#passwordId').type('123456789');
        cy.get("#passwordId").should('have.value', '123456789')

        cy.get('#user-login-button').click();
        cy.get('#dashboardContainerId').should('exist')
    })


})