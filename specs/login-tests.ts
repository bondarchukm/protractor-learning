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
        browser.waitForAngularEnabled(false)
        await browser.get(url)
    })

    let LoginPage = new LoginPageObject()
    let ProductsPage = new ProductsPageObject()

    it('Should successfully login with valid credentials', async () => {
        await LoginPage.setCredentials(
            userData.standardUserName,
            userData.password
        )
        await LoginPage.clickLoginButton()

        expect(ProductsPage.getPageTitleText()).toEqual('PRODUCTS')
    })

    it('Should display error when trying to login with empty both Username and Password fields', async () => {
        await LoginPage.clickLoginButton()

        expect(LoginPage.getCredentialsErrorMessageText()).toContain(
            usernameRequiredError
        )
    })

    it('Should display error when trying to login with empty Password field', async () => {
        await LoginPage.setUsername(userData.standardUserName)
        await LoginPage.clickLoginButton()

        expect(LoginPage.getCredentialsErrorMessageText()).toContain(
            passwordRequiredError
        )
    })

    it('Should display error when trying to login with valid Username and invalid Password', async () => {
        await LoginPage.setCredentials(
            userData.standardUserName,
            userData.invalidPassword
        )
        await LoginPage.clickLoginButton()

        expect(LoginPage.getCredentialsErrorMessageText()).toContain(
            notMatchError
        )
    })

    it('Should display error when trying to login with invalid Username and valid Password', async () => {
        await LoginPage.setCredentials(
            userData.invalidUserName,
            userData.password
        )
        await LoginPage.clickLoginButton()

        expect(LoginPage.getCredentialsErrorMessageText()).toContain(
            notMatchError
        )
    })

    it('Should display error when trying to login with locked user Username', async () => {
        await LoginPage.setCredentials(
            userData.lockedOutUser,
            userData.password
        )
        await LoginPage.clickLoginButton()

        expect(LoginPage.getCredentialsErrorMessageText()).toContain(
            lockedUserError
        )
    })
})
