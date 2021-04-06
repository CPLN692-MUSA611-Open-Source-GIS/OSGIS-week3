let plusOne = (num) => {return num + 1}
plusOne

let doTwice = (arg, func) => {
    func(arg)
    func(arg)
}

doTwice("a sentence to look at", console.log)
