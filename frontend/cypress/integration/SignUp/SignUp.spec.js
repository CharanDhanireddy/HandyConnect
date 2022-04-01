// import { startMirage } from "../../mirage/devServer"
import { makeServer } from "../../../src/server"

describe("SignUp page", function () {
    let server

    beforeEach(() => {
        server = makeServer()
        cy.visit('/signup')
    })

    afterEach(() => {
        server.shutdown()
    })

    it("Verify all the fields", () => {
        cy.get('#firstNameId').should('exist')
        cy.get('#lastNameId').should('exist')
        cy.get('#phoneId').should('exist')
        cy.get('#cityId').should('exist')
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
        cy.wait(500)
        cy.get('#firstNameId').type('fName');
        cy.get("#firstNameId").should('have.value', 'fName')
        cy.get('#lastNameId').type('sName');
        cy.get("#lastNameId").should('have.value', 'sName')
        cy.get('#phoneId').type('1234567890');
        cy.get("#phoneId").should('have.value', '1234567890')
        cy.get('#cityId').select('Tampa');
        cy.get("#cityId").should('have.value', '2')
        cy.get('#emailId').type('a@b.c');
        cy.get("#emailId").should('have.value', 'a@b.c')
        cy.get('#passwordId').type('123456789');
        cy.get("#passwordId").should('have.value', '123456789')
        cy.get('#rePasswordId').type('123456789');
        cy.get("#rePasswordId").should('have.value', '123456789')

        cy.get('#signup-button').click();
        cy.url().should('eq', 'http://localhost:3000/signup')
    })
})