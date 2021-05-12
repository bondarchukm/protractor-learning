import { browser } from 'protractor'

export abstract class Base {
    async navigateTo(url: string): Promise<void> {
        await browser.get(url)
    }
}
