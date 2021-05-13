import { browser } from 'protractor'
import { url } from '../lib/urls'
import { userData } from '../lib/user.data'
import { LoginPageObject } from '../pageObjects/login.page'
import { ProductsPageObject } from '../pageObjects/products.page'
import { HeaderElementObject } from '../pageObjects/header.element'
import { sortingOptions } from '../lib/sortingOptions'
import { shoppingCartPageTitle } from '../lib/pageTitles'
import { Product } from '../lib/interfaces'

describe('Products page tests', () => {
    beforeAll(async () => {
        await browser.driver.manage().window().maximize()
    })
    beforeEach(async () => {
        await productsPage.navigateTo(url)
        await loginPage.loginToApp(userData.standardUserName, userData.password)
    })
    afterEach(async () => {
        await browser.executeScript('window.sessionStorage.clear();')
        await browser.executeScript('window.localStorage.clear();')
    })

    const loginPage = new LoginPageObject()
    const productsPage = new ProductsPageObject()
    const header = new HeaderElementObject()

    it('Should sort products by Price(Low to Hi) sorting option', async () => {
        await productsPage.clickSortingOptionsDropdown()
        await productsPage.clickSortingOption(sortingOptions.loHi)

        expect(await productsPage.isPriceSorted(sortingOptions.loHi)).toBe(true)
    })

    it('Should sort products by Price(Hi to Low) sorting option', async () => {
        await productsPage.clickSortingOptionsDropdown()
        await productsPage.clickSortingOption(sortingOptions.hiLo)

        expect(await productsPage.isPriceSorted(sortingOptions.hiLo)).toBe(true)
    })

    it('Should sort products by Name(Z to A) sorting option', async () => {
        await productsPage.clickSortingOptionsDropdown()
        await productsPage.clickSortingOption(sortingOptions.za)

        expect(await productsPage.isNameSorted(sortingOptions.za)).toBe(true)
    })

    it('Should sort products by Name(A to Z) sorting option', async () => {
        await productsPage.clickSortingOptionsDropdown()
        await productsPage.clickSortingOption(sortingOptions.az)

        expect(await productsPage.isNameSorted(sortingOptions.az)).toBe(true)
    })

    it('Should add one product to the shopping cart', async () => {
        await productsPage.clickAddToCartButton(0)

        expect(await header.getShoppingCartBadgeNumber()).toEqual(1)
    })

    it('Should add two products to the shopping cart and then remove one', async () => {
        await productsPage.clickAddToCartButton(0)
        await productsPage.clickAddToCartButton(1)

        expect(await header.getShoppingCartBadgeNumber()).toEqual(2)

        await productsPage.clickRemoveFromCartButton(0)

        expect(await header.getShoppingCartBadgeNumber()).toEqual(1)
    })

    it('Should verify that shopping cart contains added product', async () => {
        let productOnPage: Product = await productsPage.getProductByIndex(0)

        await productsPage.clickAddToCartButton(0)
        await header.clickShoppingCartButton()

        expect(await productsPage.getPageTitleText()).toEqual(
            shoppingCartPageTitle
        )

        let productInCart: Product = await productsPage.getProductByIndex(0)

        expect(productOnPage).toEqual(productInCart)
    })
})
