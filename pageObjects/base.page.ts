import { browser } from 'protractor'

export abstract class Base {
    url: string

    async navigateTo(): Promise<void> {
        await browser.get(this.url)
    }
}
