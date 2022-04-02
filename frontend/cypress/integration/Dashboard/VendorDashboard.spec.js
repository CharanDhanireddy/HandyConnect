import { startMirage } from "../../mirage/devServer"

describe('App', () => {
    let server
    beforeEach(() => {
        // server = startMirage()
        cy.vendorlogin()
    })

    afterEach(() => {
        // server.shutdown()
    })

it('Check if booking details are visible', () => {
    
    cy.get('#vendor-dashboard-table').should('exist')
    cy.get('#booking-month').should('exist')
    cy.get('#service-name').should('exist')
    // cy.get('#customer-name').should('exist')
    cy.get('#address').should('exist')
    cy.get('#status').should('exist')
})



})

