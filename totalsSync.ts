import CATEGORIES from './categories.json'
import { Category, WebShop } from './utils/webShop'

const isSimulation: boolean = !!process.argv[2] 

const categories: Category[] = CATEGORIES


export const init = () => {
    const webShop = new WebShop(categories, isSimulation)
    webShop.getTotalSync()
}


