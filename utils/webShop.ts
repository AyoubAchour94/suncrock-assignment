import { Worker } from 'node:worker_threads'
import path from 'path'
import Piscina from 'piscina'
import { heavyLogicSimulation } from '.'

export interface WorkerData {
    value: Category,
    isSimulation: boolean
}

export interface Category {
    id: string
    products: number
    categories: Category[]
}

/**
 * Represents a Webshop
 * @author Ayoub Ben Achour <ayoub.benachour94@gmail.com>
 * @constructor
 * @param {Category[]} categories - initial catalog
 * @param {boolean} isSimulation - initial mode
 * @property {Categorie[]} categories - Products catalog.
 * @property {boolean} isSimulation - Variable used to toggle simulation mode.
 */
export class WebShop {
    private categories: Category[]
    private isSimulation: boolean = false
    constructor(categories: Category[], isSimulation: boolean) {
        this.categories = categories
        this.isSimulation = isSimulation
    }
    /**
     * Main function that fetches total number of products
     * per categorie using worker threads to work in parallel
     * without blocking the main thread
     * @method WebShop#getTotalAsync
     * @memberof WebShop
     */
    public getTotalAsync = () => {
        let pending = this.categories.length
        console.time(`Excution time Async`)
        this.categories.forEach(cat => {
            // Calculate total number of products per categorie
            // in a seperate thread
            new Promise<Category>((resolve, reject) => {
                const workerData: WorkerData = {
                    value: cat,
                    isSimulation: this.isSimulation
                }
                // Final Approach: creating workers pool
                const piscina = new Piscina({
                    filename: path.resolve(__dirname, 'worker.js')
                });
                piscina.run(workerData).then((data: Category) => {
                    console.log(`${data.id}: ${data.products}`)
                    resolve(data)
                    if(pending === 1) console.timeEnd(`Excution time Async`)
                    else pending--
                }).catch(reject)
                // 2nd Approach
                // const worker = new Worker('./utils/worker.js', { workerData });
                // worker.on('message', (data: Category) => {
                //     console.log(`${data.id}: ${data.products}`)
                //     resolve(data)
                //     if(pending === 1) console.timeEnd(`Excution time Async`)
                //     else pending--
                // });
                // worker.on('error', reject);
                // worker.on('exit', (code) => {
                //     if (code !== 0) {
                //         reject(new Error(`Worker stopped with exit code ${code}`));
                //     }
                // });
            });
        })
    }

    /**
     * Main function that fetches total number of products
     * per categorie synchronically using main thread
     * 
     * PS: This is used just to demonstrate the limit of 
     * this approach
     * @method WebShop#getTotalSync
     * @memberof WebShop
     */
    public getTotalSync = () => {
        console.time(`Excution time Sync`)
        this.categories.forEach(cat => {
            WebShop.fetchTotal(cat)
            if(this.isSimulation) heavyLogicSimulation(12)
            console.log(`${cat.id}: ${cat.products}`)
        })
        console.timeEnd(`Excution time Sync`)
    }


    /**
     * Recursive function that fetches the total 
     * number of products in the nested categories
     * @method fetchTotal
     * @memberof WebShop
     * @param {Categorie} categorie - categorie 
     * @returns {number} - total number of products
     */
    static fetchTotal = (categorie: Category): number => {
        categorie.categories.forEach(cat => categorie.products += WebShop.fetchTotal(cat))
        return categorie.products 
    }
}