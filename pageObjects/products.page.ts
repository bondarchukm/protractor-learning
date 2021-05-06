import { ElementFinder, $, $$, ElementArrayFinder, promise } from 'protractor'

export class ProductsPageObject {
    pageTitle: ElementFinder
    sortingOptionsDropdown: ElementFinder
    sortingOptions: ElementArrayFinder

    constructor() {
        this.pageTitle = $('.title')
        this.sortingOptionsDropdown = $('.product_sort_container')
        this.sortingOptions = $$('.product_sort_container option')
    }

    getPageTitleText(): promise.Promise<string> {
        return this.pageTitle.getText()
    }
    async clickSortingOptionsDropdown(): Promise<void> {
        await this.sortingOptionsDropdown.click()
    }
}
