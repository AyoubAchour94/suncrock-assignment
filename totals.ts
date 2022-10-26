import CATEGORIES from './categories.json'
import { WebShop, Category } from './utils/webShop'


const isSimulation: boolean = !!process.argv[2] 

// Casting json data to Categorie interface format
const categories: Category[] = CATEGORIES

export const init = () => {
    const webShop = new WebShop(categories, isSimulation)
    webShop.getTotalAsync()
}



