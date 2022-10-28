import { Category, WebShop, WorkerData } from './webShop'
import { heavyLogicSimulation } from './'

/** @module ShopWorker */

/**
 * Main logic of worker thread that initialize total products count
 * @method initProcess
 * @member ShopWorker
 * @param {WorkerData} workerData - workerData from main thread
 * @returns {Category} - updated category with total products
 */
export default ({value, isSimulation}: WorkerData): Category => {
    const total = WebShop.fetchTotalRecursive(value)
    if(isSimulation) heavyLogicSimulation(12)
    return { ...value, products: total }
}
    