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

    it('Login and check if bookings can be seen and logout', () => {
        cy.get('[href="/bookings"]').should('exist').click()
        cy.get('#booking-table').should('exist')
        cy.get('#booking-month').should('exist')
        cy.get('#service-name').should('exist')
        // cy.get('#vendor-name').should('exist')
        cy.get('#address').should('exist')
        cy.get('#status').should('exist')
        // cy.get('#city').should('exist')
        cy.get('[role="button"]').click();
        cy.url().should('eq', 'http://localhost:3000/')
    })

})