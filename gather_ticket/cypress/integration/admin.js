describe('Classify', () => {
    beforeEach(() =>{
        cy.visit('/login')
    })
    it('classify',function () {
        cy.get('[type="text"]').type("sjw");
        cy.get('[type="password"]').type("123");
        cy.get('.Login_loginBtn__27NUY').click();
        cy.url().should('include', '/');
        cy.get('.Nav_logintext__YP7s2 > a').click();
        cy.url().should('include', '/self');
        cy.get(':nth-child(3) > .ant-menu-submenu-title').click();
        // cy.get('#sub3\$Menu > :nth-child(1)').click();
        cy.get('[role="menuitem"][style="padding-left: 24px;"]').click();
        cy.url().should('include', '/');
        cy.get('.Nav_logintext__YP7s2 > a').click();
        cy.url().should('include', '/login');
        cy.get('[type="text"]').type("test");
        cy.get('[type="password"]').type("test");
        cy.get('.Login_loginBtn__ZRqpN').click();
        cy.url().should('include', '/');
    })
})
