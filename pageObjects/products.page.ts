import {
    ElementFinder,
    $,
    $$,
    ElementArrayFinder,
    promise,
    element,
    by,
    ProtractorExpectedConditions,
    protractor,
    browser,
} from 'protractor'
import { sortingOptions } from '../lib/sortingOptions'
import { Product } from '../lib/interfaces'
import { validateAscendSorting, validateDescendSorting } from '../lib/helpers'
import { Base } from '../pageObjects/base.page'

export class ProductsPageObject extends Base {
    pageTitle: ElementFinder
    sortingOptionsDropdown: ElementFinder
    sortingOptions: string
    activeSortingOption: ElementFinder
    itemPriceArray: ElementArrayFinder
    itemNameArray: ElementArrayFinder
    itemDescriptionArray: ElementArrayFinder
    itemAddToCartButtonArray: ElementArrayFinder
    itemRemoveFromCartButtonArray: ElementArrayFinder
    EC: ProtractorExpectedConditions

    constructor() {
        super()
        this.pageTitle = $('.title')
        this.sortingOptionsDropdown = $('.product_sort_container')
        this.sortingOptions = '.product_sort_container option'
        this.itemPriceArray = $$('.inventory_item_price')
        this.itemNameArray = $$('.inventory_item_name')
        this.itemDescriptionArray = $$('.inventory_item_desc')
        this.itemAddToCartButtonArray = $$('.btn.btn_small.btn_inventory')
        this.itemRemoveFromCartButtonArray = $$('button[name*="remove-"]')
        this.activeSortingOption = $('.active_option')
        this.EC = protractor.ExpectedConditions
    }

    getPageTitleText(): promise.Promise<string> {
        return this.pageTitle.getText()
    }
    private getSortingOptionLocator(text: string): ElementFinder {
        return element(by.cssContainingText(this.sortingOptions, text))
    }

    async getProductByIndex(index: number): Promise<Product> {
        const product = {} as Product
        product.name = await (
            await this.getItemNameLocatorByIndex(index)
        ).getText()
        product.description = await (
            await this.getItemDescriptionLocatorByIndex(index)
        ).getText()
        product.price = parseFloat(
            await (
                await (await this.getItemPriceLocatorByIndex(index)).getText()
            ).split('$')[1]
        )
        return product
    }
    private getItemNameLocatorByIndex(index: number): ElementFinder {
        return this.itemNameArray.get(index)
    }
    private getItemDescriptionLocatorByIndex(index: number): ElementFinder {
        return this.itemDescriptionArray.get(index)
    }
    private getItemPriceLocatorByIndex(index: number): ElementFinder {
        return this.itemPriceArray.get(index)
    }

    private getItemAddToCartLocatorByIndex(index: number): ElementFinder {
        return this.itemAddToCartButtonArray.get(index)
    }
    async clickAddToCartButton(index: number): Promise<void> {
        await (await this.getItemAddToCartLocatorByIndex(index)).click()
    }

    private getItemRemoveFromCartLocatorByIndex(index: number): ElementFinder {
        return this.itemRemoveFromCartButtonArray.get(index)
    }
    async clickRemoveFromCartButton(index: number): Promise<void> {
        await (await this.getItemRemoveFromCartLocatorByIndex(index)).click()
    }

    private async getItemsPriceArray(): Promise<number[]> {
        // return this.itemPrice.map(async (el: ElementFinder) =>
        //     el ? parseFloat((await el.getText()).split('$')[1]) : undefined)
        let itemPriceArray: number[] = []
        for (let item of await this.itemPriceArray) {
            if (item != undefined) {
                itemPriceArray.push(
                    parseFloat((await item.getText()).split('$')[1])
                )
            } else return undefined
        }
        return itemPriceArray
    }
    private async getItemsNameArray(): Promise<string[]> {
        let itemNameArray: string[] = []
        for (let item of await this.itemNameArray) {
            if (item != undefined) {
                itemNameArray.push(await item.getText())
            } else return undefined
        }
        return itemNameArray
    }
    async isPriceSorted(option: string): Promise<boolean> {
        let sorted: boolean
        if (option === sortingOptions.hiLo) {
            sorted = await validateDescendSorting(
                await this.getItemsPriceArray()
            )
        } else if (option === sortingOptions.loHi) {
            sorted = await validateAscendSorting(
                await this.getItemsPriceArray()
            )
        } else return undefined
        return sorted
    }
    async isNameSorted(option: string): Promise<boolean> {
        let sorted: boolean
        if (option === sortingOptions.az) {
            sorted = await validateAscendSorting(await this.getItemsNameArray())
        } else if (option === sortingOptions.za) {
            sorted = await validateDescendSorting(
                await this.getItemsNameArray()
            )
        } else return undefined
        return sorted
    }

    async clickSortingOption(option: string): Promise<void> {
        await (await this.getSortingOptionLocator(option)).click()
        await browser.wait(
            this.EC.textToBePresentInElement(
                this.activeSortingOption,
                option.toUpperCase()
            ),
            1000
        )
    }
    async clickSortingOptionsDropdown(): Promise<void> {
        await this.sortingOptionsDropdown.click()
    }
}
