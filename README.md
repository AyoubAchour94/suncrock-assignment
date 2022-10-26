<h1 align="center">Welcome Stranger 👋</h1>
<p>
  <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank">
    <img alt="License: GPL--3.0" src="https://img.shields.io/badge/License-GPL--3.0-yellow.svg" />
  </a>
</p>

> This code is used for an assignment for Sunrock.

### ✨ [Demo](https://example.com)

## Approachs and thought process

### Task1:
* **1st Appraoch:**      
Initital thought here was that there is no speed and only way to calculate time is to iterate over every `index` of the `fibonacci sequence` and `summing` every step until we find the first Sum bigger than our distance which means our index is the time required to travel that distance.
> The method `normalSearch` is commented in the script since it is not the best approach in most cases. But, I found out later on that it is the best approach for `VERY VERY BIG distances`.

* **2nd Approach:**       
After some thinking I wanted to optimize the procedure I though to myself there should be other way right ?   
First thing I wanted to check whether it is possible to calculate the Sum at n index `(S(n))` without iterating until first index. According to Wiki there is a formula that do just that `(Sum(n) = F(n+2) - 1)`.    
Good but I still need to iterate from `1` to `n+2` to find `F(n+2)` right ?   
Well it seems there is other formula that can help. According to wiki `(F(2n) = F(n)[2F(n-1) + F(n)])` and `(F(2n - 1) = F(n)^2 + F(n-1)^2)` which means we can skip with `x2` on every step and have `less iterations`.    
At this point I have created a `recursive` logic that do exactly what I wanted and in order to optimize it I implemented `memoization` to cache some repeated operations and save ressources. Now, I m able to get Sum`(distance traveled)` at `n` index.   
How do I get `n` from given distance ?   
Well this was a bit tricky I coudn't figure it out for a while but then checked the Wiki again ***with some googling*** and saw the formula `(n(F) = ln(F * SQRT(5) - 0.5)/ln(φ))` that gives an approximation of `n`. So I `rounded` the approximation and checked distance at that index whether it is the result I m looking for or not. If not I just incremented or decremented accordingly to find the right one.
> I liked this approach for a while but then I though about avoiding `recursive overhead`. you can check implementation of this in the method called `getNthFib`
* **Final Approach:**   
So at this point I m quite happy with result but just want to tweak the `getNthFib`. I went back to Wiki again and checked other formulas and found the `binet formula` to calculate `n-th fibonacci` `(F(n)= (φ^n - ψ^n)/SQRT(5))`.    
So, I just implemeted that instead of doing the `recursive` work.
Other than that, It is still pretty much the same approach.

### Task2:
* **1st Approach:**   
For this Task I have to find the total number of products per category in a given catalog. First thing comes to mind is that this time there is `no shortcuts` or `formulas` since I will have to iterate over each category and its nested sub categories to get the total `there is no going around that fact`.   
So, I created a simple logic that will iterate throughout each category and its sub categories until there is no sub categories left. 
* **2nd Approach:**     
After carefully reading the task again I noticed that the result expected is not expecting to show the final totals of each category in `one batch` but it expects `one line` for every category and there is no mention on the `order` it should be printed.     
My thoughts here is that since there is `no dependency` in between categories, I can optimize this process by using nodeJS's concurrency by running the total count for each category in `parallel` that way they don't have to wait for each other and gain significant `process time`.    
At this point, it is either I have to use `child processes` or `worker threads`. I debated both pros and cons for a while but then went with worker threads. Worker threads seemed `cheaper` to use since they `share memory usage` with main thread and child process will require `its own memory` which will create high memory usage for large number `n` of categories.   
So, I went and implemented this approach. This way the main thread will iterate over categories and allocate each task to a `worker` and `wait` for their response without being `blocked`.
> I thought this is the final approach for while then I came back and thought about how I m allocating a worker for each category and how bad this can be where the workers number exceeds of logical cores in my CPU.
* **Final Approach:**     
At this point I just had to stick with the last approach but just try to limit the number of workers depending on the number of logical cores available at that time.   
To achieve this I had to use a popular module that handles worker pools for nodeJS and it has a `maxThreads` option. According to documentation `The default is based on the number of available CPUs` which exactly what I need.


## Install

```sh
npm install
```

## Build

```sh
npm run build
```
## Usage

### Task 1
```sh
node rocket {number}
```
### Task 2 `(Final approach)`
```sh
node totals
```
### Task 2 `(First approach)`
```sh
node totalsSync
```
> You will notice that the First approach is faster in this case. But, this is only true for small catalogs.    
To simulate test with bigger catalog you can use the simulate option to see the difference:
```sh
node totals --simulate
node totalsSync --simulate
```

### Generate jsDoc documentation
```sh
npm run docs
```
### Serve docs locally
```sh
npm run docs:serve
```
> It will be available on http://localhost:3000

## Addtional notes

* I have tried to document my thought process and approaches to the problems as much as I could. Also, I have left the code base of my earlier approaches to give you an idea of what I thought at that time.
* I m still thinking of ways to optimize the logic further but I will stop here for now since this should not exceed 4-5 hours.

## Author

👤 **Ayoub Ben Achour**

* LinkedIn: [@ayoub-ben-achour](https://linkedin.com/in/ayoub-ben-achour-280420145)