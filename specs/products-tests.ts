import { browser, ExpectedConditions } from 'protractor'
import { url } from '../lib/urls'
import { userData } from '../lib/user.data'
import { LoginPageObject } from '../pageObjects/login.page'
import { ProductsPageObject } from '../pageObjects/products.page'
import { HeaderElementObject } from '../pageObjects/header.element'
import { sortingOptions } from '../lib/sortingOptions'

describe('Products page tests', () => {
    beforeAll(async () => {
        await browser.driver.manage().window().maximize()
    })
    beforeEach(async () => {
        await browser.get(url)
        await loginPage.loginToApp(userData.standardUserName, userData.password)
    })
    afterEach(async () => {
        await browser.executeScript('window.sessionStorage.clear();')
        await browser.executeScript('window.localStorage.clear();')
    })

    const loginPage = new LoginPageObject()
    const productsPage = new ProductsPageObject()
    const header = new HeaderElementObject()

    const EC = ExpectedConditions

    it('Should sort products by Price(Low to Hi) sorting option', async () => {
        await productsPage.clickSortingOptionsDropdown()
        await productsPage.clickSortingOption(sortingOptions.loHi)

        let condition = EC.textToBePresentInElement(
            productsPage.activeSortingOption,
            sortingOptions.loHi.toUpperCase()
        )
        await browser.wait(condition, 1000)

        expect(await productsPage.isPriceSorted(sortingOptions.loHi)).toBe(true)
    })

    it('Should sort products by Price(Hi to Low) sorting option', async () => {
        await productsPage.clickSortingOptionsDropdown()
        await productsPage.clickSortingOption(sortingOptions.hiLo)

        let condition = EC.textToBePresentInElement(
            productsPage.activeSortingOption,
            sortingOptions.hiLo.toUpperCase()
        )
        await browser.wait(condition, 1000)

        expect(await productsPage.isPriceSorted(sortingOptions.hiLo)).toBe(true)
    })

    it('Should sort products by Name(Z to A) sorting option', async () => {
        await productsPage.clickSortingOptionsDropdown()
        await productsPage.clickSortingOption(sortingOptions.za)

        let condition = EC.textToBePresentInElement(
            productsPage.activeSortingOption,
            sortingOptions.za.toUpperCase()
        )
        await browser.wait(condition, 1000)

        expect(await productsPage.isNameSorted(sortingOptions.za)).toBe(true)
    })

    it('Should sort products by Name(A to Z) sorting option', async () => {
        await productsPage.clickSortingOptionsDropdown()
        await productsPage.clickSortingOption(sortingOptions.az)

        let condition = EC.textToBePresentInElement(
            productsPage.activeSortingOption,
            sortingOptions.az.toUpperCase()
        )
        await browser.wait(condition, 1000)

        expect(await productsPage.isNameSorted(sortingOptions.az)).toBe(true)
    })

    it('Should add one product to the shopping cart', async () => {
        await productsPage.clickAddToCartButton(0)

        expect(await header.getShoppingCartBadgeNumber()).toEqual(1)
    })
    it('Should add two products to the shopping cart and then remove one', async () => {
        await productsPage.clickAddToCartButton(1)
        await productsPage.clickAddToCartButton(2)

        expect(await header.getShoppingCartBadgeNumber()).toEqual(2)

        await productsPage.clickRemoveFromCartButton(1)

        expect(await header.getShoppingCartBadgeNumber()).toEqual(1)
    })
})
