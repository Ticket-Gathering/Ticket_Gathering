//测试在page界面的一系列操作
describe('page_test',function () {
    beforeEach(function () {
        cy.fixture('example.json').as('testCase')
        cy.visit('/page')
        //默认情况下，城市选取为‘全国’,类型选取为‘全部’
        cy.get('[data-cy=citySelected]').should('contain','全国')
        cy.get('[data-cy=typeSelected]').should('contain','全部')
    })

    //测试选取城市是否有效
    it('cityClick_test',function () {
        cy.get('[data-cy="select:北京"]').click()
        cy.get('[data-cy=citySelected]').should('contain','北京')
        cy.get('[data-cy=pageItem]').find('[data-cy=pageItem-city]').should('contain','北京')
    })

    //测试选取表演类型是否有效
    it('typeClick_test',function () {
        let types=this.testCase.types
        types.forEach((item,index)=> {
            cy.get(`[data-cy="select:${item}"]`).click()
            cy.get('[data-cy=typeSelected]').should('contain',item)
            cy.get('[data-cy=pageItem]').find('[data-cy=pageItem-type]').should('contain',item)
        })
    })

    //测试选取商品是否能进入about详情界面
    it("productClick_test",function () {
        let baseUrl=this.testCase.baseUrl
        cy.get('[data-cy=pageItem]').first().find('[data-cy=pageItem-goodsImg]').click()
        cy.url().should('include',baseUrl+'/about')
    })
})
