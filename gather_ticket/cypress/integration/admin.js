//测试管理员在self界面的一系列操作
describe('admin_self_test', () => {
    beforeEach(() =>{
        cy.fixture('example.json').as('testCase').then(
            (testCase)=>{
                let adminUser=testCase.adminUser;
                let adminPwd=testCase.adminPassword;
                let baseUrl=testCase.baseUrl;
                //登录
                cy.visit('/login')
                cy.get('[type="text"]').type(adminUser);
                cy.get('[type="password"]').type(adminPwd);
                cy.get('[data-cy=login]').click();

                //进入个人界面
                cy.get('[data-cy=self]').click();
                cy.url().should('equal', baseUrl+'/self');
            }
        )
    })

    //测试登出
    it('test_logout',function () {
        let baseUrl=this.testCase.baseUrl
        cy.get('[data-cy=logout]').click();
        cy.url().should('equal',baseUrl+'/')
        cy.get('[data-cy=self]').should("not.exist")
    })

    //测试用户禁用
    it('test_userDisable',function () {
        let baseUrl=this.testCase.baseUrl
        let user=this.testCase.User
        let pwd=this.testCase.Password
        cy.get('[data-cy=网站管理]').click()
        cy.get('[data-cy=用户管理]').click()

        //禁用用户aaa
        cy.get('[data-cy="user:aaa"]').find('[data-cy=disable]').click()
        cy.get('[data-cy=logout]').click();

        //使用用户aaa验证
        cy.visit('/login')
        cy.get('[type="text"]').type(user);
        cy.get('[type="password"]').type(pwd);
        cy.get('[data-cy=login]').click();
        cy.url().should('equal', baseUrl+'/login');

        //登录管理员账户
        let adminUser=this.testCase.adminUser;
        let adminPwd=this.testCase.adminPassword;
        cy.get('[type="text"]').clear().type(adminUser);
        cy.get('[type="password"]').clear().type(adminPwd);
        cy.get('[data-cy=login]').click();
        cy.get('[data-cy=self]').click();
        cy.get('[data-cy=网站管理]').click()
        cy.get('[data-cy=用户管理]').click()

        //用户解禁
        cy.get('[data-cy="user:aaa"]').find('[data-cy=enable]').click()
        cy.get('[data-cy=logout]').click();

        //再次使用用户aaa验证
        cy.visit('/login')
        cy.get('[type="text"]').type(user);
        cy.get('[type="password"]').type(pwd);
        cy.get('[data-cy=login]').click();
        cy.url().should('equal', baseUrl+'/');
    })
})
