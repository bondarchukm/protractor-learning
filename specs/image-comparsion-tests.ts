import { browser } from 'protractor'
import { LoginPageObject } from '../pageObjects/login.page'

describe('Image comparison tests', () => {
    beforeAll(async () => {
        await browser.driver.manage().window().maximize()
    })
    beforeEach(async () => {
        await loginPage.navigateTo()
    })
    afterEach(async () => {
        await browser.executeScript('window.sessionStorage.clear();')
        await browser.executeScript('window.localStorage.clear();')
    })

    const loginPage = new LoginPageObject()

    it('Should save Login Page screens', async () => {
        // Save the Login Page screen
        await loginPage.saveScreen('loginPage', {
            // options
        })

        // Save the Login Button element
        await loginPage.saveElement(
            loginPage.loginButton,
            'loginButtonElement',
            {
                // options
            }
        )

        // Save the full Login Page screens
        await loginPage.saveFullPageScreen('fullLoginPage', {
            // options
        })
    })

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
