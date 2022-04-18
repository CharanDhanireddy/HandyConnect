import { makeServer } from "../../../src/server"

describe("user journey", function () {
    let server
    it("abc", () => {
        cy.visit('/signup')
      
            cy.get('#firstNameId').clear();
            cy.get('#firstNameId').type('Sach');
            cy.get('#lastNameId').clear();
            cy.get('#lastNameId').type('Tendulkar');
            cy.get('#phoneId').clear();
            cy.get('#phoneId').type('657897448');
            cy.get('#cityId').select('2');
            cy.get('#emailId').clear();
            cy.get('#emailId').type('tendulka@email.com');
            cy.get('#passwordId').clear();
            cy.get('#passwordId').type('123456789');
            cy.get('#rePasswordId').clear();
            cy.get('#rePasswordId').type('123456789');
            cy.get('#signup-button').click();
            cy.wait(5000)
            cy.get('#emailId').clear();
            cy.get('#emailId').type('tendulka@email.com');
            cy.get('#passwordId').clear();
            cy.get('#passwordId').type('123456789');
            cy.get('#user-login-button').click();
            cy.get('#locationSelectId').click();
            cy.get('.modal-body').click();
            cy.wait(500)
            cy.get('#citySelectId').select('1');
            cy.wait(200)
            cy.get('#citySubmitId').click();
            cy.wait(500)
            cy.get('[href="/profile"]').click();
            cy.wait(1500)
            cy.get('[href="/bookings"]').click();
            cy.wait(500)
            cy.get('.ml-auto > [href="/"]').click();
            cy.wait(1500)
            cy.get('#Painter').click();
            cy.wait(500)
            cy.get('[data-cy="3"] > .text-center').click();
            cy.get('#addressId').clear();
            cy.get('#addressId').type('4000 SW 88st');
            cy.get('#zipcodeId').clear();
            cy.get('#zipcodeId').type('36858');
            cy.wait(1500)
            cy.get('#submitId > strong').click();
            cy.wait(5000)
            cy.get('strong').click();
            cy.wait(1500)
            cy.get('[data-cy="cancelButton"] > strong').click();
            cy.wait(2500)
            cy.get('.ml-auto > [href="/"]').click();
            cy.wait(500)
            cy.get('#Painter > .mx-auto > .dashboard-card-text').click();
            cy.wait(500)
            cy.get('[data-cy="4"] > .text-center').click();
            cy.get('#addressId').clear();
            cy.get('#addressId').type('4000 SW 37 Blvd');
            cy.get('#zipcodeId').clear();
            cy.get('#zipcodeId').type('32608');
            cy.wait(1500)
            cy.get('#submitId > strong').click();
            cy.wait(5000)
            cy.get(':nth-child(5) > [data-cy="4/23/2022"]').click();
            cy.wait(1500)
            cy.get('[data-cy="rescheduleButton"] > strong').click();
            cy.get('[data-cy="6"] > .text-center').click();
            cy.wait(2500)
            cy.get('[data-cy="confirmRescheduleButton"]').click();
            cy.wait(2500)
            cy.get('[role="button"]').click();
            cy.wait(1500)
    })
     

    // it("Verify all the fields on signup", () => {
    //     cy.visit('/signup')
    //     cy.get('#firstNameId').should('exist')
    //     cy.get('#lastNameId').should('exist')
    //     cy.get('#phoneId').should('exist')
    //     cy.get('#cityId').should('exist')
    //     cy.get('#emailId').should('exist')
    //     cy.get('#passwordId').should('exist')
    //     cy.get('#rePasswordId').should('exist')
    // })

    // it("Verify SignUp required fields", () => {
    //     cy.get('#firstNameId').type('FName')
    //     cy.get('#signup-button').click()
    //     cy.get(':nth-child(7) > .invalid-feedback').should('exist')
    // })

    // it("Enter existing email or phone number, get error popup and stay on signup page", () => {
    //     cy.wait(500)
    //     cy.get('#firstNameId').type('');
    //     cy.get("#firstNameId").should('have.value', 'fName')
    //     cy.get('#lastNameId').type('sName');
    //     cy.get("#lastNameId").should('have.value', 'sName')
    //     cy.get('#phoneId').type('1234567890');
    //     cy.get("#phoneId").should('have.value', '1234567890')
    //     cy.get('#cityId').select('Tampa');
    //     cy.get("#cityId").should('have.value', '2')
    //     cy.get('#emailId').type('a@b.c');
    //     cy.get("#emailId").should('have.value', 'a@b.c')
    //     cy.get('#passwordId').type('123456789');
    //     cy.get("#passwordId").should('have.value', '123456789')
    //     cy.get('#rePasswordId').type('123456789');
    //     cy.get("#rePasswordId").should('have.value', '123456789')

    //     cy.get('#signup-button').click();
    //     cy.url().should('eq', 'http://localhost:3000/signup')
    // })
})