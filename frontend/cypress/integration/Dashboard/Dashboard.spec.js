import { startMirage } from "../../mirage/devServer"

describe('App', () => {
    let server
    beforeEach(() => {
        server = startMirage()
        cy.login()
    })

    afterEach(() => {
        server.shutdown()
    })

    it('Select city, service and book an appointment', () => {
        cy.get('#locationSelectId').should('exist').click()
        cy.get('#citySelectId').should('exist').select('Tampa')
        cy.get('#citySelectCancelId').should('exist')
        cy.get('#citySubmitId').should('exist').click()
        cy.get('#Plumber').should('exist').click()
        cy.wait(500)
        cy.get('[data-cy="0"]').click()
        cy.get('#addressId').type('221B Baker Street')
        cy.get('#zipcodeId').type('58347')
        cy.get('#submitId').click()
        cy.get('.toast-body').should('exist')
    })



})