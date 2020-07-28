
describe('admin_self_test', () => {
    beforeEach(() =>{
        //登录
        cy.visit('/login')
        cy.get('[type="text"]').type("sjw");
        cy.get('[type="password"]').type("123");
        cy.get('[data-cy=login]').click();
    })
    it('classify',function () {
        //进入个人界面
        cy.get('[data-cy=self]').click();
        cy.url().should('include', '/self');
        cy.get(':nth-child(3) > .ant-menu-submenu-title').click();
        cy.get('[data-cy=logout]').click();

    })
})
