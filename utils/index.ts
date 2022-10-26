/**
 * Function used to simulate heavy logic
 * @memberof Webshop
 * @param {number} n - number variable 
 */
export const heavyLogicSimulation = (n: number) => {
    let result = 0;
    for (var i = Math.pow(n, 7); i >= 0; i--) {		
        result += Math.atan(i) * Math.tan(i);
    };
}