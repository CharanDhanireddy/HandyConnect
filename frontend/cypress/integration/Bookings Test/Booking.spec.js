import { startMirage } from "../../mirage/devServer"

describe('Single booking view', () => {
    let server
    beforeEach(() => {
        // server = startMirage()
        cy.login()
    })

    afterEach(() => {
        // server.shutdown()
    })

    it('Select a booking and cancel it', () => {
        cy.get('[href="/bookings"]').should('exist').click()
        cy.get('#booking-table').should('exist')
        cy.get('#booking-month').should('exist')
        cy.get('#service-name').should('exist')
        cy.get('#address').should('exist')
        cy.get('#status').should('exist')
        cy.get('[data-cy="4/8/2022"] > strong').should('exist').click()
        cy.get('[data-cy="cancelButton"]').should('exist').click()
        cy.get('#status > [data-cy="4/8/2022"]').should('exist').click()
    })

    it('Select a booking and reschedule it', () => {
        cy.get('[href="/bookings"]').should('exist').click()
        cy.get('#booking-table').should('exist')
        cy.get('#booking-month').should('exist')
        cy.get('#service-name').should('exist')
        cy.get('#address').should('exist')
        cy.get('#status').should('exist')
        cy.get('[data-cy="4/7/2022"] > strong').should('exist').click()
        cy.get('[data-cy="rescheduleButton"]').should('exist').click()
        cy.get('[data-cy="4"]').should('exist').click()
        cy.get('[data-cy="confirmRescheduleButton"]').should('exist').click()
        cy.get('#status > [data-cy="4/6/2022"]').should('exist').click()
    })

    it('Select a completed booking and rate it', () => {
        cy.get('[href="/bookings"]').should('exist').click()
        cy.get('[data-cy="4/1/2022"] > strong').should('exist').click()
        cy.get('[for="mui-8"]').should('exist').click()
        cy.get('[data-cy="closeButton"]').should('exist').click()
    })

    it('Open above booking and see the rating', () => {
        cy.get('[href="/bookings"]').should('exist').click()
        cy.get('[data-cy="4/1/2022"] > strong').should('exist').click()
        cy.get('[for="mui-8"]').should('exist')
        cy.get('[data-cy="closeButton"]').should('exist').click()
    })

})