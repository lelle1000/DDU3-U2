
// Test 1

const Test1 = new Request("http://localhost:8000/cities", {
    method: "GET"
})

const promiseResponse1 = fetch(Test1)
promiseResponse1.then(handleResponse1)

function handleResponse1(response) {
    const promiseResource1 = response.json()
    promiseResource1.then(handleResource1)
}

function handleResource1(resource) {
    console.log(resource);
}

// Test 2

const Test2 = new Request("http://localhost:8000/cities", {
    method: "POST",
    headers: { "Content-Type" : "application/json"},
    body: JSON.stringify({ name: "Malmö", country: "Sweden" })
})

const promiseResponse2 = fetch(Test2)
promiseResponse2.then(handleResponse2)

function handleResponse2(response) {
    const promiseResource2 = response.json()
    promiseResource2.then(handleResource2)
}

function handleResource2(resource) {
    console.log(resource);
}

// Test 3

const Test3 = new Request("http://localhost:8000/cities", {
    method: "DELETE",
    body: JSON.stringify({ id: 2 })
})

const promiseResponse3 = fetch(Test3)
promiseResponse3.then(handleResponse3)

function handleResponse3(response) {
    const promiseResource3 = response.json()
    promiseResource3.then(handleResource3)
}

function handleResource3(resource) {
    console.log(resource);
}

// Test 4

const Test4 = new Request("http://localhost:8000/cities")

const promiseResponse4 = fetch(Test4)
promiseResponse4.then(handleResponse4)

function handleResponse4(response) {
    const promiseResource4 = response.json()
    promiseResource4.then(handleResource4)
}

function handleResource4(resource) {
    console.log(resource);
}

// Test 5

const Test5 = new Request("http://localhost:8000/cities/43")

const promiseResponse5 = fetch(Test5)
promiseResponse5.then(handleResponse5)

function handleResponse5(response) {
    const promiseResource5 = response.json()
    promiseResource5.then(handleResource5)
}

function handleResource5(resource) {
    console.log(resource);
}

// Test 6

const Test6 = new Request("http://localhost:8000/cities/search?text=en")

const promiseResponse6 = fetch(Test6)
promiseResponse6.then(handleResponse6)

function handleResponse6(response) {
    const promiseResource6 = response.json()
    promiseResource6.then(handleResource6)
}

function handleResource6(resource) {
    console.log(resource);
}

// Test 7

const Test7 = new Request("http://localhost:8000/cities/search?text=en&country=Sweden")

const promiseResponse7 = fetch(Test7)
promiseResponse7.then(handleResponse7)

function handleResponse7(response) {
    const promiseResource7 = response.json()
    promiseResource7.then(handleResource7)
}

function handleResource7(resource) {
    console.log(resource);
}

// Test 8

const Test8 = new Request("http://localhost:8000/cities", {
    method: "POST",
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify({ name: "Dresden", country: "Germany" })
})

async function Test8Func () {
    const response = await fetch(Test8)
    console.log(response);
    
}
Test8Func()

// Test 9

const Test9 = new Request("http://localhost:8000/cities", {
    method: "POST",
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify({ name: "Ystad" })
})

async function Test9Func () {
    const response = await fetch(Test9)
    console.log(response);
    
}
Test9Func()

// Test 10

 const Test10 = new Request("http://localhost:8000/cities", {
    method: "DELETE",
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify({ id: 56 })
})

async function Test10Func () {
    const response = await fetch(Test10)
    const resource = await response.json()
    console.log(resource.status);
    
}
Test10Func()

// Test 11

const Test11 = new Request("http://localhost:8000/cities", {
    method: "DELETE",
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify({})
})

async function Test11Func () {
    const respone = await fetch(Test11)
}
Test11Func()

// Test 12

const Test12 = new Request("http://localhost:8000/messages", {
    method: "POST",
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify({ from: 2, to: 1, password: "pass" })
})

async function Test12Func () {
    const response = await fetch(Test12)
}
Test12Func()

// Test 13

const Test13 = new Request("http://localhost:8000/cities/search")

async function Test13Func () {
    const response = await fetch(Test13)
    const resource = await response.json()
}
Test13Func()

// Test 14

const Test14 = new Request("http://localhost:8000/mordor")

async function Test14Func () {
    const response = await fetch(Test14)
    const resource = await response.json()
}
Test14Func()
