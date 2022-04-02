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

    it('Select city, service and book an appointment and create a booking and show it bookings page', () => {
        cy.get('#locationSelectId').should('exist').click()
        cy.get('#citySelectId').should('exist').select('Tampa')
        cy.get('#citySelectCancelId').should('exist')
        cy.get('#citySubmitId').should('exist').click()
        cy.get('#Painter').should('exist').click()
        cy.get('[data-cy="6"]').click();
        cy.get('#addressId').clear();
        cy.get('#addressId').type('221B Bakers St');
        cy.get('#zipcodeId').clear();
        cy.get('#zipcodeId').type('12345');
        cy.get('#submitId').click();
    })

    it('Repeat above test for previous day', () => {
        cy.get('#locationSelectId').should('exist').click()
        cy.get('#citySelectId').should('exist').select('Tampa')
        cy.get('#citySelectCancelId').should('exist')
        cy.get('#citySubmitId').should('exist').click()
        cy.get('#Painter').should('exist').click()
        cy.get('[data-cy="5"]').click();
        cy.get('#addressId').clear();
        cy.get('#addressId').type('221B Bakers St');
        cy.get('#zipcodeId').clear();
        cy.get('#zipcodeId').type('12345');
        cy.get('#submitId').click();
    })

    it('Select city, service and book an appointment and show error when same service is booked for a same day', () => {
        cy.get('#locationSelectId').should('exist').click()
        cy.get('#citySelectId').should('exist').select('Tampa')
        cy.get('#citySelectCancelId').should('exist')
        cy.get('#citySubmitId').should('exist').click()
        cy.get('#Painter').should('exist').click()
        cy.get('[data-cy="5"]').click();
        cy.get('#addressId').clear();
        cy.get('#addressId').type('221B Bakers St');
        cy.get('#zipcodeId').clear();
        cy.get('#zipcodeId').type('12345');
        cy.get('#submitId').click();
    })

})

