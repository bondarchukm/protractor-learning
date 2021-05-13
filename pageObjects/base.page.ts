import { browser } from 'protractor'

export abstract class Base {
    private url: string

    constructor(URL: string){
        this.url = URL
    }

    async navigateTo(): Promise<void> {
        await browser.get(this.url)
    }
}
