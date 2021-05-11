import {
    ElementFinder,
    $,
    $$,
    ElementArrayFinder,
    promise,
    element,
    by,
} from 'protractor'
import { sortingOptions } from '../lib/sortingOptions'

interface Product {
    name: string
    price: number
    description: string
}

export class ProductsPageObject {
    pageTitle: ElementFinder
    sortingOptionsDropdown: ElementFinder
    sortingOptions: string
    itemPrice: ElementArrayFinder
    itemName: ElementArrayFinder
    itemDescription: ElementArrayFinder
    itemNameByIndex: string

    constructor() {
        this.pageTitle = $('.title')
        this.sortingOptionsDropdown = $('.product_sort_container')
        this.sortingOptions = '.product_sort_container option'
        this.itemPrice = $$('.inventory_item_price')
        this.itemName = $$('.inventory_item_name')
        this.itemDescription = $$('.inventory_item_desc')
    }

    getPageTitleText(): promise.Promise<string> {
        return this.pageTitle.getText()
    }
    getSortingOptionLocator(text: string): ElementFinder {
        return element(by.cssContainingText(this.sortingOptions, text))
    }

    async getProductByIndex(index: number): Promise<Product> {
        const product = {} as Product 
        let productPrice: number[] = await this.getItemsPriceArray()
        let productName: string[] = await this.getItemsNameArray()
        let productDescription: string[] = await this.getItemsDescriptionArray()

        product.price = productPrice[index]
        product.name = productName[index]
        product.description = productDescription[index]

        return product
    }

    async getItemsPriceArray(): Promise<number[]> {
        // return this.itemPrice.map(async (el: ElementFinder) =>
        //     el ? parseFloat((await el.getText()).split('$')[1]) : undefined)
        let itemPriceArray: number[] = []
        for (let item of await this.itemPrice) {
            if (item != undefined) {
                itemPriceArray.push(
                    parseFloat((await item.getText()).split('$')[1])
                )
            } else return undefined
        }
        return itemPriceArray
    }
    async getItemsNameArray(): Promise<string[]> {
        let itemNameArray: string[] = []
        for (let item of await this.itemName) {
            if (item != undefined) {
                itemNameArray.push(await item.getText())
            } else return undefined
        }
        return itemNameArray
    }
    async getItemsDescriptionArray(): Promise<string[]> {
        let itemDescriptionArray: string[] = []
        for (let item of await this.itemDescription) {
            if (item != undefined) {
                itemDescriptionArray.push(await item.getText())
            } else return undefined
        }
        return itemDescriptionArray
    }
    async validateAscendSorting(array: string[] | number[]): Promise<boolean> {
        // console.log(array)
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] <= array[i + 1]) {
                continue
            } else {
                return false
            }
        }
        return true
    }
    async validateDescendSorting(array: string[] | number[]): Promise<boolean> {
        // console.log(array)
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] >= array[i + 1]) {
                continue
            } else {
                return false
            }
        }
        return true
    }
    async isPriceSorted(option: string): Promise<boolean> {
        let sorted: boolean
        if (option === sortingOptions.hiLo) {
            sorted = await this.validateDescendSorting(
                await this.getItemsPriceArray()
            )
        } else if (option === sortingOptions.loHi) {
            sorted = await this.validateAscendSorting(
                await this.getItemsPriceArray()
            )
        } else return undefined
        return sorted
    }
    async isNameSorted(option: string): Promise<boolean> {
        let sorted: boolean
        if (option === sortingOptions.az) {
            sorted = await this.validateAscendSorting(
                await this.getItemsNameArray()
            )
        } else if (option === sortingOptions.za) {
            sorted = await this.validateDescendSorting(
                await this.getItemsNameArray()
            )
        } else return undefined
        return sorted
    }

    async clickSortingOption(option: string): Promise<void> {
        (await this.getSortingOptionLocator(option)).click()
    }
    async clickSortingOptionsDropdown(): Promise<void> {
        await this.sortingOptionsDropdown.click()
    }
}
