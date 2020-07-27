describe('Classify', () => {
    beforeEach(() =>{
        cy.visit('/login')
    })
    it('classify',function () {
        cy.get('[type="text"]').type("aaa");
        cy.get('[type="password"]').type("123");
        cy.get('.Login_loginBtn__3At_c').click();
        cy.url().should('include', '/');
        cy.get('.Nav_page__2mH-n > a').click();
        cy.url().should('include', '/page');
        cy.get(':nth-child(1) > .Page_titleBox__1srMK > :nth-child(3)').click();
        cy.get(':nth-child(3) > .Page_titleBox__1srMK > .Page_titleSelected__3KfaT').click();
        cy.get('.Nav_index__3sZ74 > a').click();
        cy.url().should('include', '/');
        cy.get(':nth-child(3) > a > .NavList_sonimg__uo55i > img').click();
        cy.url().should('include', '/page');
    })
})
