import { browser, ElementFinder, promise } from 'protractor'

export abstract class Base {
    private url: string

    constructor(URL: string) {
        this.url = URL
    }

    async navigateTo(): Promise<void> {
        await browser.get(this.url)
    }

    async saveScreen(screenName: string, options: any): Promise<void> {
        await browser.imageComparison.saveScreen(screenName, { options })
    }

    async saveElement(
        elementLocator: ElementFinder,
        screenName: string,
        options: any
    ): Promise<void> {
        await browser.imageComparison.saveElement(elementLocator, screenName, {
            options,
        })
    }

    async saveFullPageScreen(screenName: string, options: any): Promise<void> {
        await browser.imageComparison.saveFullPageScreen(screenName, {
            options,
        })
    }

    checkScreen(screenName: string, options: any): promise.Promise<number> {
        return browser.imageComparison.checkScreen(screenName, {
            options,
        })
    }

    checkElement(
        elementLocator: ElementFinder,
        screenName: string,
        options: any
    ): promise.Promise<number> {
        return browser.imageComparison.checkElement(
            elementLocator,
            screenName,
            { options }
        )
    }

    checkFullPageScreen(
        screenName: string,
        options: any
    ): promise.Promise<number> {
        return browser.imageComparison.checkFullPageScreen(screenName, {
            options,
        })
    }
}
