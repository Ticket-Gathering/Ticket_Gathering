describe('Search', () => {
    beforeEach(() =>{
        cy.visit('/')
    })
    it('search',function () {
        cy.get('#search').type("林俊杰{enter}");
        cy.url().should('include', '/page');
    })
})
