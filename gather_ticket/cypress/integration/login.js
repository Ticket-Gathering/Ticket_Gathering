// describe('Register', () => {
//     beforeEach(() =>{
//         cy.visit('http://localhost:3000/login')
//     })
//     it('register',function () {
//         cy.get('.Login_bottomOptions__3rK3U > :nth-child(2)').click();
//         cy.get('[type="text"]').type("test");
//         cy.get('[placeholder="请输入登录密码"]').type("test");
//         cy.get('[placeholder="请再次输入登录密码"]').type("test");
//         cy.get('.Login_loginBtn__ZRqpN').click();
//     })
// })
describe('Login', () => {
    beforeEach(() =>{
        cy.visit('/login')
    })
    it('login',function () {
        cy.get('[type="text"]').type("aaa");
        cy.get('[type="password"]').type("123");
        cy.get('.Login_loginBtn__3At_c').click();
        cy.url().should('include', '/');
    })
})
describe('Login_out', () => {
    it('login_out',function () {
        cy.get('.Nav_logintext__1GNU_ > a').click();
        cy.url().should('include', '/self');
        cy.get('[role="menuitem"][style="padding-left: 24px;"]').click();
        cy.url().should('include', '/');
    })
})
