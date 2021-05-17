import { browser } from 'protractor'
import { LoginPageObject } from '../pageObjects/login.page'
import { screenSize } from '../lib/screenSize'

describe('Image comparison tests', () => {
    beforeAll(async () => {
        await browser.driver
            .manage()
            .window()
            .setSize(screenSize.fullHd[0], screenSize.fullHd[1])
    })
    beforeEach(async () => {
        await loginPage.navigateTo()
    })
    afterEach(async () => {
        await browser.executeScript('window.sessionStorage.clear();')
        await browser.executeScript('window.localStorage.clear();')
    })

    const loginPage = new LoginPageObject()

    it('Should compare Login Page screens successful with a baseline', async () => {
        // Check the Login Page screen
        expect(
            await loginPage.checkScreen('loginPage', {
                // options
            })
        ).toEqual(0)

        // Check the Login Button element
        expect(
            await loginPage.checkElement(
                loginPage.loginButton,
                'loginButtonElement',
                {
                    // options
                }
            )
        ).toEqual(0)

        // Check the full Login Page screens
        expect(
            await loginPage.checkFullPageScreen('fullLoginPage', {
                // options
            })
        ).toEqual(0)
    })
})
