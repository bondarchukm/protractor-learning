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
        loHi = 'Price (low to high)',
        hiLo = 'Price (high to low)',
    }

    it('Should sort products by Price(Low to Hi) sorting option', async () => {
        await productsPage.clickSortingOptionsDropdown()
        await productsPage.clickSortingOption(sortingOptions.loHi)
        await browser.sleep(200) // this pause is needed for waiting while page sorting will change

        expect(await productsPage.isPriceLoHiSorted()).toBe(true)
    })

    it('Should sort products by Price(Hi to Low) sorting option', async () => {
        await productsPage.clickSortingOptionsDropdown()
        await productsPage.clickSortingOption(sortingOptions.hiLo)
        await browser.sleep(200) // this pause is needed for waiting while page sorting will change

        expect(await productsPage.isPriceHiLoSorted()).toBe(true)
    })


})
