export interface FibCache {
    [key: number]: number[]
}

/**
 * Represents a Journey
 * @author Ayoub Ben Achour <ayoub.benachour94@gmail.com>
 * @property {FibCache} cache - Variable used to memoize the n-th fibonacci method.
 */
export class Journey {
    private cache: FibCache
    constructor() {
        this.cache = {}
    }
    /**
     * Calculate the N-th fibonacci number
     * using fast doubling algorithm
     * also using recursion with memoization
     * Time Complexity: O(log N)
     * 
     * PS: I found this approach to not be optimal after all
     * @see {@link https://en.wikipedia.org/wiki/Fibonacci_number}
     * @method Journey#getNthFib
     * @memberof Journey
     * @param {number} n - Position in fibonacci sequence
     * @returns {number} - N-th fibonacci number
     */
    private getNthFib = (n: number): number => {
        const fib = (n: number): number[] => {
            let a, b, c, d;
            let res: number[] = [0, 0]
            // Treating n - 1 < 0 case
            if (n == 0) {
                res[0] = 0;
                res[1] = 0;
                return res;
            }
            // Base Condition
            else if (n == 1) {
                res[0] = 0;
                res[1] = 1;
                return res;
            }
            const nextVal = Math.floor(n / 2)

            // Return cached version if caculated before
            if(this.cache[n]) {
                return this.cache[n]
            } else {
            res = fib(nextVal);
            
            // a = F(n-1)
            a = res[0];
        
            // b = F(n)
            b = res[1];

            // Adding calculation to cache for late use
            this.cache[nextVal] = [a, b]
        
            // c = F(2n - 1) = F(n)^2 + F(n-1)^2
            c = b * b + a * a;
        
            // d  = F(2n) = F(n)[2F(n-1) + F(n)]
            d = b * (2 * a + b);
        
            // Check if N is odd or even
            if (n % 2 == 0) {
                res[0] = c;
                res[1] = d;
            } else {
                res[0] = d;
                res[1] = c + d;
            }
                return res
            }
        };
        const result = fib(n);
        return result[1];
    };

    /**
     * Calculate the N-th fibonacci number
     * using Binet's Formula
     * Time Complexity: O(1)
     * @see {@link https://en.wikipedia.org/wiki/Fibonacci_number}
     * @method Journey#getNthFibBinet
     * @memberof Journey
     * @param {number} n - Position in fibonacci sequence
     * @returns {number} - N-th fibonacci number
     */
    private getNthFibBinet = (n: number): number => {
        const sqRootOf5 = Math.sqrt(5);
        // φ = (1+SQRT(5))/2
        const Phi = (1+sqRootOf5)/2;
        // ψ = (1-SQRT(5))/2
        const phi = (1-sqRootOf5)/2
        // F(n)= (φ^n - ψ^n)/SQRT(5)
        return Math.round((Math.pow(Phi, n) - Math.pow(phi, n)) / sqRootOf5);
    }

    /**
     * Calculate distance traveled at specific t seconds
     * @method Journey#getDistanceTraveledAtTime
     * @memberof Journey
     * @param {number} t - Time in seconds
     * @returns {number} - Distance traveled in Km
     */
    private getDistanceTraveledAtTime = (t: number): number => {
        // Sum(n) = F(n+2) - 1
        
        return this.getNthFibBinet(t + 2) - 1; // Final approach
        // 2nd approach
        // return this.getNthFib(t + 2) - 1;
    };
    
    /**
     * This method calculates approximation of closest
     * fibonacci number that represents
     * @method Journey#getTimeRequiredByDistance
     * @memberof Journey
     * @param {number} d - Distance in km
     * @returns {number} - Time in seconds
     */
    public getTimeRequiredByDistance = (d: number): number => {
        if(d === 0) return 0
        const sqRootOf5 = Math.sqrt(5);
        // φ = (1 + SQRT(5)) / 2
        const Phi = (1+sqRootOf5)/2;
        let prevDistance
        // n(F) = ln(F * SQRT(5) - 0.5)/ln(φ)
        const approximateIndex = Math.log(d * sqRootOf5 - 0.5)/Math.log(Phi)
        let currIndex = Math.round(approximateIndex)
        while(currIndex > 0) {
            let currDistance = this.getDistanceTraveledAtTime(currIndex-2)
            if(d === currDistance) return currIndex - 2
            if(d < currDistance) {
                if(prevDistance && (d > prevDistance))
                    return currIndex-2
                currIndex--
            }
            else {
                if(prevDistance && (d < prevDistance))
                    return currIndex-1
                currIndex++
            }
            prevDistance = currDistance
        }
        return -1
    };

    /**
     * Searching the required time to travel d distance
     * by iterating over all possible fibonacci numbers
     * until we find our solution
     * @method Journey#normalSearch
     * @memberof Journey
     * @param {number} d - distance to travel 
     * @returns {number} - time required to travel d in seconds
     */
    public normalSearch = (d: number): number => {
        if(d ===0) return 0
        let i = 1
        let lastTwo = [0,1]
        let currentDistance = 1
        while(currentDistance < d) {
            const nextVal = lastTwo[0]+ lastTwo[1]
            currentDistance += nextVal
            lastTwo = [lastTwo[1], nextVal]
            i++
        }
        return i
    }

    
}