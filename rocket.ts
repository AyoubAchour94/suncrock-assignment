import { Journey } from './utils/journey'

export const init = () => {
    const distanceInput: string = process.argv[2] || '0'
    const journey = new Journey()
    console.time('Excution time')

    // Binet's formula approach
    const time = journey.getTimeRequiredByDistance(parseInt(distanceInput) * 1000)
    
    // Iterative approach
    // const time = journey.normalSearch(parseInt(distanceInput) * 1000)
    console.log(`${time} seconds is the time required to travel ${distanceInput} Km.`)
    console.timeEnd('Excution time')
}