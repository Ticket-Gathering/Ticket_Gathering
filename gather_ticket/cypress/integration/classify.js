describe('Classify', () => {
    beforeEach(() =>{
        cy.visit('/')
        cy.visit('/login')
    })
    it('classify',function () {
        cy.get('[type="text"]').type("aaa");
        cy.get('[type="password"]').type("123");
        cy.get('[data-cy=login]').click();
        cy.get('[data-cy=classify]').click();
        cy.url().should('include', '/page');
    })
})
