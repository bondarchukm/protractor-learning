import { browser } from 'protractor'
import {
    lockedUserError,
    notMatchError,
    passwordRequiredError,
    usernameRequiredError,
} from '../lib/errors'
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
    })

    let loginPage = new LoginPageObject()
    let productsPage = new ProductsPageObject()

    it('Should successfully login with valid credentials', async () => {
        await loginPage.setCredentials(
            userData.standardUserName,
            userData.password
        )
        await loginPage.clickLoginButton()

        expect(await productsPage.getPageTitleText()).toEqual('PRODUCTS')
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
