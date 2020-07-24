describe('Buy', () => {
    beforeEach(() =>{
        cy.visit('http://localhost:3000/login')
    })
    it('buy',function () {
        cy.get('[type="text"]').type("sjw");
        cy.get('[type="password"]').type("123");
        cy.get('.Login_loginBtn__ZRqpN').click();
        cy.url().should('include', '/');
        cy.visit('http://localhost:3000/about/1_1_611305813172')
    })
})