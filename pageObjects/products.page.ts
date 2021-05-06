import {
    ElementFinder,
    $,
    $$,
    ElementArrayFinder,
    promise,
    element,
    by,
} from 'protractor'

export class ProductsPageObject {
    pageTitle: ElementFinder
    sortingOptionsDropdown: ElementFinder
    sortingOptions: string

    constructor() {
        this.pageTitle = $('.title')
        this.sortingOptionsDropdown = $('.product_sort_container')
        this.sortingOptions = '.product_sort_container option'
    }

    getPageTitleText(): promise.Promise<string> {
        return this.pageTitle.getText()
    }
    getSortingOptionLocator(text: string): ElementFinder {
        return element(by.cssContainingText(this.sortingOptions, text))
    }
    async clickSortingOption(option: string): Promise<void> {
        (await this.getSortingOptionLocator(option)).click()
    }
    async clickSortingOptionsDropdown(): Promise<void> {
        await this.sortingOptionsDropdown.click()
    }
}
