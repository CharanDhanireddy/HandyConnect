describe("user journey", function () {
    it("User journey", () => {
        cy.visit('/vendorlogin')
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#emailId').clear();
        cy.get('#emailId').type('picasso.pablo@gmail.com');
        cy.get('#passwordId').clear();
        cy.get('#passwordId').type('123456789');
        cy.get('#vendor-login-button').click();
        cy.wait(4000)
        cy.get('[href="/vendorProfile"]').click();
        cy.wait(2500)
        cy.get('[href="/vendorDashboard"]').click();
        cy.wait(2500)
        cy.get(':nth-child(1) > :nth-child(5) > #view-modify-button-vendor > strong').click();
        cy.get('#otpId').clear();
        cy.get('#otpId').type('123456');
        cy.get('[data-cy="submitOTPButton"] > strong').click();
        cy.wait(2500)
        cy.get('.modal-footer > .btn').click();
        cy.wait(2500)
        cy.get(':nth-child(1) > :nth-child(5) > #view-modify-button-vendor > strong').click();
        cy.wait(2500)
        cy.get('.col > .btn > strong').click();
        cy.get('.modal-footer > .btn').click();
        cy.wait(2500)
        cy.get('[role="button"]').click();

    })
})