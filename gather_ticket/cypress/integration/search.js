describe('Search', () => {
    beforeEach(() =>{
        cy.visit('http://localhost:3000')
    })
    it('search',function () {
        cy.get('#search').type("林俊杰{enter}");
        cy.url().should('include', '/page');
    })
})