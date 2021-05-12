import { browser, ExpectedConditions } from 'protractor'
import {
    lockedUserError,
    notMatchError,
    passwordRequiredError,
    usernameRequiredError,
} from '../lib/errors'
import { url } from '../lib/urls'
import { userData } from '../lib/user.data'
import { HeaderElementObject } from '../pageObjects/header.element'
import { LoginPageObject } from '../pageObjects/login.page'
import { MenuElementObject } from '../pageObjects/menu.element'
import { ProductsPageObject } from '../pageObjects/products.page'

describe('Login page tests', () => {
    beforeAll(async () => {
        await browser.driver.manage().window().maximize()
    })
    beforeEach(async () => {
        await browser.get(url)
    })

    const loginPage = new LoginPageObject()
    const productsPage = new ProductsPageObject()
    const header = new HeaderElementObject()
    const menu = new MenuElementObject()

    const EC = ExpectedConditions

    it('Should successfully login with valid credentials', async () => {
        await loginPage.setCredentials(
            userData.standardUserName,
            userData.password
        )
        await loginPage.clickLoginButton()

        expect(await productsPage.getPageTitleText()).toEqual('PRODUCTS')
    })

    it('Should successfully logout from the app', async () => {
        await loginPage.setCredentials(
            userData.standardUserName,
            userData.password
        )
        await loginPage.clickLoginButton()
        await header.clickMenuButton()

        await browser.wait(EC.visibilityOf(menu.unhiddenMenuElement), 1000)

        await menu.clickLogoutButton()

        expect(await loginPage.loginButton.isDisplayed()).toBe(true)
    })

    it('Should display error when trying to login with empty both Username and Password fields', async () => {
        await loginPage.clickLoginButton()

        expect(await loginPage.getCredentialsErrorMessageText()).toContain(
            usernameRequiredError
        )
    })

    it('Should display error when trying to login with empty Password field', async () => {
        await loginPage.setUsername(userData.standardUserName)
        await loginPage.clickLoginButton()

        expect(await loginPage.getCredentialsErrorMessageText()).toContain(
            passwordRequiredError
        )
    })

    it('Should display error when trying to login with valid Username and invalid Password', async () => {
        await loginPage.setCredentials(
            userData.standardUserName,
            userData.invalidPassword
        )
        await loginPage.clickLoginButton()

        expect(await loginPage.getCredentialsErrorMessageText()).toContain(
            notMatchError
        )
    })

    it('Should display error when trying to login with invalid Username and valid Password', async () => {
        await loginPage.setCredentials(
            userData.invalidUserName,
            userData.password
        )
        await loginPage.clickLoginButton()

        expect(await loginPage.getCredentialsErrorMessageText()).toContain(
            notMatchError
        )
    })

    it('Should display error when trying to login with locked user Username', async () => {
        await loginPage.setCredentials(
            userData.lockedOutUser,
            userData.password
        )
        await loginPage.clickLoginButton()

        expect(await loginPage.getCredentialsErrorMessageText()).toContain(
            lockedUserError
        )
    })
})
