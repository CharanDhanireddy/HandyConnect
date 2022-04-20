import { makeServer } from "../../../src/server"

describe("Vendor journey", function () {
    let server
    it("Vendor steps", () => {
        cy.visit('/vendorLogin')
        cy.get('#emailId').clear();
        cy.get('#emailId').type('leo@gmail.com');
        cy.get('#passwordId').clear();
        cy.get('#passwordId').type('123456789');
        cy.get('#vendor-login-button').click();
        cy.get('strong').click();
        cy.get('#otpId').clear();
        cy.get('#otpId').type('174634');
        cy.get('[data-cy="submitOTPButton"] > strong').click();
        cy.get('.col > .btn').click();
        cy.get('.modal-footer > .btn').click();
    })
})