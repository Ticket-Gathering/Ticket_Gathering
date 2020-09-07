//测试login界面的一系列操作
describe('login_test', () => {
    beforeEach(()=>{
        cy.fixture('example.json').as('example')
    })
    //正常登录
    it('log_in',function () {
        let user=this.example.User;
        let pwd=this.example.Password;
        let baseUrl=this.example.baseUrl
        cy.visit('/login');
        cy.get('[type="text"]').type(user);
        cy.get('[type="password"]').type(pwd);
        cy.get('[data-cy=login]').click();
        cy.url().should('equal',baseUrl+'/')
    })

    //注册
    it('register',function (){
        let baseUrl=this.example.baseUrl
        let registerUser='test'+Math.floor(Math.random()*100000)
        cy.visit('/login')
        cy.get('[data-cy=register]').click()
        cy.get('[data-cy=register-user]').type(registerUser)
        cy.get('[data-cy=register-password]').type('password')
        cy.get('[data-cy=register-password-confirm]').type('password')
        cy.get('[data-cy=register]').click()
        cy.get('[data-cy=login]').click()
        cy.url().should('equal',baseUrl+'/')
    })
})
