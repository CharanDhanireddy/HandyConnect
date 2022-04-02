// import { startMirage } from "../../mirage/devServer"
import { makeServer } from "../../../src/server"

describe("SignUp page", function () {
    let server

    beforeEach(() => {
        server = makeServer()
        cy.visit('/vendorsignup')
    })

    afterEach(() => {
        server.shutdown()
    })

    it("Verify all the fields", () => {
        cy.get('#firstNameId').should('exist')
        cy.get('#lastNameId').should('exist')
        cy.get('#phoneId').should('exist')
        cy.get('#cityId').should('exist')
        cy.get('#serviceId').should('exist')
        cy.get('#emailId').should('exist')
        cy.get('#passwordId').should('exist')
        cy.get('#rePasswordId').should('exist')
        cy.get('#signup-button').should('exist')
    })

    it("Verify SignUp required fields", () => {
        cy.get('#firstNameId').type('FName')
        cy.get('#signup-button').click()
        cy.get(':nth-child(7) > .invalid-feedback').should('exist')
    })

    it("Enter existing email or phone number, get error popup and stay on signup page", () => {
 
        
        cy.get('#firstNameId').type('fName');
        cy.get("#firstNameId").should('have.value', 'fName');
        cy.get('#lastNameId').type('sName');
        cy.get("#lastNameId").should('have.value', 'sName');
        cy.get('#phoneId').type('12345678904');
        cy.get("#phoneId").should('have.value', '12345678904');
        cy.get('#cityId').select('6');
        cy.get("#cityId").should('have.value', '6');
        cy.get('#serviceId').select('4');
        cy.get("#serviceId").should('have.value', '4');
        cy.get('#emailId').type('fnnn@jj.com');
        cy.get("#emailId").should('have.value', 'fnnn@jj.com');
        cy.get('#passwordId').type('1234567890');
        cy.get("#passwordId").should('have.value', '1234567890');
        cy.get('#rePasswordId').type('1234567890');
        cy.get("#rePasswordId").should('have.value', '1234567890')
        cy.get('#signup-button').click();
        cy.url().should('eq', 'http://localhost:3000/vendorsignup')

    })
})