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
        cy.get('#emailId').type('u1@gmail.com');
        cy.get("#emailId").should('have.value', 'u1@gmail.com')
        cy.get('#passwordId').type('1234567890');
        cy.get("#passwordId").should('have.value', '1234567890')

        cy.get('#user-login-button').click();
        // cy.get('#dashboardContainerId').should('exist')
    })


})


// /* ==== Generated with Cypress Studio ==== */
// cy.get('.row').click();
// cy.get('#emailId').clear();
// cy.get('#emailId').type('u1@gmail.com');
// cy.get('#passwordId').click();
// cy.get('#passwordId').click();
// cy.get('#passwordId').clear();
// cy.get('#passwordId').type('1234567890');
// cy.get('#user-login-button').click();
// cy.get('#Electrician > .mx-auto').click();
// cy.get('[data-cy="0"] > .text-center').click();
// cy.get('#addressId').clear();
// cy.get('#addressId').type('4000 SW 37th blvd');
// cy.get('#zipcodeId').clear();
// cy.get('#zipcodeId').type('32608');
// cy.get('#submitId').click();
// /* ==== End Cypress Studio ==== */