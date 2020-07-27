describe('Buy', () => {
    beforeEach(() =>{
        cy.visit('/login')
    })
    it('buy',function () {
        cy.get('[type="text"]').type("sjw");
        cy.get('[type="password"]').type("123");
        cy.get('[data-cy=login]').click();
        cy.url().should('include', '/');
        cy.visit('/about/1_1_611305813172')
    })
})
