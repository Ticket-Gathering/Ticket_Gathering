//测试在主页的点击操作
describe('Home_test', () => {
    beforeEach(() =>{
        cy.fixture('example.json').as('testCase')
        cy.visit('/')
    })
    //测试点击"登录"是否能正常跳转到/login界面
    it('login',function () {
        let baseUrl=this.testCase.baseUrl
        cy.get('[data-cy=login]').click()
        cy.url().should('equal',baseUrl+'/login')
    })
    //测试点击”分类“能否正常跳转到/page界面且正确显示选择的城市
    it('page',function(){
        let baseUrl=this.testCase.baseUrl
        cy.get('[data-cy="selectCity"]').click().get('[data-cy="上海"]').click()
        cy.get('[data-cy=classify]').click();
        cy.url().should('equal', baseUrl+'/page');
        cy.get('[data-cy=citySelected]').should('contain','上海')
        cy.get('[data-cy=pageItem]').find('[data-cy=pageItem-city]').should('contain','上海')
    })

    //测试点击navList的表演类别是否能正常跳转到page界面且正确显示相应的类别及城市
    it('navList_test',function () {
        let types=this.testCase.types
        let baseUrl=this.testCase.baseUrl
        types.forEach((item,index)=>{
            cy.visit('/')
            cy.get('[data-cy="selectCity"]').click().get('[data-cy="上海"]').click()
            cy.get(`[data-cy="${item}"]`).click()
            cy.url().should('equal', baseUrl+'/page')
            cy.get('[data-cy=typeSelected]').should('contain',item)
            cy.get('[data-cy=citySelected]').should('contain','上海')
            cy.get('[data-cy=pageItem]').find('[data-cy=pageItem-city]').should('contain','上海')
            cy.get('[data-cy=pageItem]').find('[data-cy=pageItem-type]').should('contain',item)
        })
    })
    //测试点击HomePoster的More是否能正常跳转到page界面且正确显示相应的类别及城市
    it('homePoster_test',function () {
        let types=this.testCase.types
        let baseUrl=this.testCase.baseUrl
        types.forEach((item,index)=>{
            if(index>3) return
            cy.visit('/')
            //使lazyLoad能加载出所有的元素
            cy.scrollTo('bottom',{ duration: 100})
            cy.get('[data-cy="selectCity"]').click().get('[data-cy="上海"]').click()
            cy.get(`[data-cy="homePoster:${item}"]`).find('[data-cy="more"]').click()
            cy.url().should('equal', baseUrl+'/page')
            cy.get('[data-cy=typeSelected]').should('contain',item)
            cy.get('[data-cy=citySelected]').should('contain','上海')
            cy.get('[data-cy=pageItem]').find('[data-cy=pageItem-city]').should('contain','上海')
            cy.get('[data-cy=pageItem]').find('[data-cy=pageItem-type]').should('contain',item)
        })
    })

    //测试搜索功能
    it('search',function () {
        cy.get('#search').type("林俊杰{enter}");
        cy.url().should('include', '/page');
        cy.get('[data-cy=pageItem]').find('[data-cy=pageItem-name]').should('contain','林俊杰')
    })

    //测试点击商品是否能正常跳转到相应的about界面
    it('productClick_test',function () {
        let baseUrl=this.testCase.baseUrl
        cy.get('[data-cy="homePoster:演唱会"]').find('[data-cy=firstPoster]').click()
        cy.url().should('include',baseUrl+'/about')
        cy.visit('/')
        cy.get('[data-cy="演唱会:poster:0"]').find('img').click()
        cy.url().should('include',baseUrl+'/about')
    })
})
