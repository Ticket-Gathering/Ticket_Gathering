describe('Classify', () => {
    beforeEach(() =>{
        cy.visit('http://localhost:3000/login')
    })
    it('classify',function () {
        cy.get('[type="text"]').type("test");
        cy.get('[type="password"]').type("test");
        cy.get('.Login_loginBtn__ZRqpN').click();
        cy.url().should('include', '/');
        cy.get('.Nav_page__3N1ew > a').click();
        cy.url().should('include', '/page');
        cy.get(':nth-child(1) > .Page_titleBox__2kmWK > :nth-child(3)').click();
        cy.get(':nth-child(3) > .Page_titleBox__2kmWK > .Page_titleSelected__1GP6z').click();
        cy.get('.Nav_index__1A31h > a').click();
        cy.url().should('include', '/');
        cy.get(':nth-child(3) > a > .NavList_sonimg__38CSS > img').click();
        cy.url().should('include', '/page');
    })
})