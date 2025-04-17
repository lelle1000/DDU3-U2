const AddCity = document.getElementById("AddCity")
const AddCountry = document.getElementById("AddCountry")

const SearchText = document.getElementById("SearchText")
const SearchCountry = document.getElementById("SearchCountry")

const addbutton = document.getElementById("AddCityButton")
const findbutton = document.getElementById("SearchCityButton")

addbutton.addEventListener("click", async function () {

    const addcity = new Request("http://localhost:8000/cities", { 
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify({ name: AddCity.value, country: AddCountry.value })
    })

    await fetch(addcity)

})

findbutton.addEventListener("click", function () {
    
    const findcity = new Request("http://localhost:8000/cities")

    const promiseResponse = fetch(findcity)
    promiseResponse.then(handleResponse) 

    function handleResponse (response) {
        const promiseResource = response.json()
        promiseResource.then(handleResource)
    }

    function handleResource (resource) {
        
    }
})
    
