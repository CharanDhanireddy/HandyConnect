import { startMirage } from "../../mirage/devServer"

describe('All bookings', () => {
    let server
    beforeEach(() => {
        // server = startMirage()
        cy.login()
    })

    afterEach(() => {
        // server.shutdown()
    })

    it('Visit the bookings page and check if bookings can be seen', () => {
        cy.get('[href="/bookings"]').should('exist').click()
        cy.get('#booking-table').should('exist')
        cy.get('#booking-month').should('exist')
        cy.get('#service-name').should('exist')
        cy.get('#address').should('exist')
        cy.get('#status').should('exist')
    })

})