import { startMirage } from "../../mirage/devServer"

describe('App', () => {
    let server
    beforeEach(() => {
        // server = startMirage()
        cy.login()
    })

    afterEach(() => {
        // server.shutdown()
    })

it('Select city, service and book an appointment and show error when same service is booked for a same day', () => {
    cy.get('#locationSelectId').click();
    cy.get('#citySelectId').select('2');
    cy.get('#citySubmitId').click();
    cy.get('.dashboard-card-text').click();
    cy.get('[data-cy="0"]').click();
    cy.get('#addressId').clear();
    cy.get('#addressId').type('221B Bakersfield');
    cy.get('#zipcodeId').clear();
    cy.get('#zipcodeId').type('32547');
    cy.get('#submitId').click();
})

it('Select city, service and book an appointment and create a booking and show it bookings page', () => {
cy.get('#Welder > .mx-auto').click();
cy.get('#addressId').click();
cy.get('[data-cy="4"] > .text-center').click();
cy.get('#addressId').clear();
cy.get('#addressId').type('221B Bakers St');
cy.get('#zipcodeId').clear();
cy.get('#zipcodeId').type('12345');
cy.get('#submitId').click();
cy.get('.alert-heading').click();
})

})

