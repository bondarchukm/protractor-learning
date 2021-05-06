import { browser } from 'protractor'
import { url } from '../lib/urls'
import { userData } from '../lib/user.data'
import { LoginPageObject } from '../pageObjects/login.page'
import { ProductsPageObject } from '../pageObjects/products.page'

describe('Login page tests', () => {
    beforeAll(async () => {
        await browser.driver.manage().window().maximize()
    })
    beforeEach(async () => {
        await browser.waitForAngularEnabled(false)
        await browser.get(url)
        await loginPage.loginToApp(userData.standardUserName, userData.password)
    })

    let loginPage = new LoginPageObject()
    let productsPage = new ProductsPageObject()

    enum sortingOptions {
        az = 'Name (A to Z)', 
        za = 'Name (Z to A)',
        lohi = 'Price (low to high)',
        hilo = 'Price (high to low)',
    }

    it('Should select Price(Low to Hi) sorting option', async () => {
        await productsPage.clickSortingOptionsDropdown()
        await productsPage.clickSortingOption(sortingOptions.lohi)

        await browser.sleep(3000)
        // expect(await productsPage.getPageTitleText()).toEqual('PRODUCTS')
    })
})
