const calFunctions = [
    {text: "1", },
    {text: "2"},
    {text: "3"},
    {text: "4"},
    {text: "5"},
    {text: "6"},
    {text: "7"},
    {text: "8"},
    {text: "9"},
    {text: "0"},
    {text: "+", type: "op", op: "+"},
    {text: "-", type: "op", op: "-"},
    {text: "x", type: "op", op: "*"},
    {text: "/", type: "op", op: "/"},
    {text: "AC", type: "clear"},
    {text: "=", type: "result"}
    // {text: "1"},
    // {text: "1"},
]

const operationChars = calFunctions.filter(el => el.type == "op")
    .map(el => el.text)

let outputString = ""
const inputData = document.getElementById("screen")
const calBtns = document.querySelectorAll(".calBtnContainer .btn")

function printInput(text) {
    const inputFunc = calFunctions.filter(btn => btn.text === text)[0]

    let previousInputStr = inputData.value

    const arr = previousInputStr.split(" ").filter(el => el !== "")

    if(!arr.length) arr.push(0)

    if(inputFunc.type == "op") {
        if(!operationChars.includes(arr[arr.length - 1])) arr.push(inputFunc.text)
    }
    else {
        let lastInputStr = arr[arr.length - 1]
        let lastNum;

        if(operationChars.includes(lastInputStr)) {
            lastInputStr = 0
            lastNum = Number(`${lastInputStr}${inputFunc.text}`)
            arr.push(`${lastNum}`)
        }

        else {
            lastNum = Number(`${lastInputStr}${inputFunc.text}`)
            arr[arr.length - 1] = `${lastNum}`
        }

        console.log(lastNum)
    }

    console.log(arr)

    previousInputStr = arr.join(" ")

    outputString = previousInputStr.replace("x", "*")

    inputData.value = previousInputStr
}

function printResult() {
    inputData.value = eval(outputString)
}

function clearInput() {
    inputData.value = ""
}

const calBtnContainer = document.querySelector(".calBtnContainer")


let innerContent = ""
calFunctions.forEach(calBtn => {
    innerContent += `<div class="btn"> <p>${calBtn.text}</p> </div>`
})

calBtnContainer.innerHTML = innerContent
inputData.value = "0"

calBtns.forEach(btn => {
    btn.addEventListener("click", function() {

        if(btn.innerText == "=") return printResult()
        if(btn.innerText == "AC") return clearInput()
        // console.log(btn)
        printInput(btn.innerText)
    })
})

