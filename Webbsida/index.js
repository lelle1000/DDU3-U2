const AddCity = document.getElementById("AddCity")
const AddCountry = document.getElementById("AddCountry")

const SearchText = document.getElementById("SearchText")
const SearchCountry = document.getElementById("SearchCountry")

const addbutton = document.getElementById("AddCityButton")
const findbutton = document.getElementById("SearchCityButton")

const CitiesHolder = document.getElementById("AddedCitiesList")
const SearchCitiesHolder = document.getElementById("SearchCities")

const popupbox = document.getElementById("POPUPDIV")
const okButton = document.getElementById("popupbutton")

const RandomImages = ["../images/AngryFrogCat.png", "../images/BuckteethCat.png", "../images/ChunkySquirrel.png", "../images/Frog.png", "../images/HappyFox.png", "../images/LayingMereCat.png", "../images/SassyPenguin.png", "../images/SmilingCat.png", "../images/SuprisedOwl.png", "../images/ToungeFox.png", "../images/WaffleCat.png", "../images/Zebra.png", "../images/DogEyes.jpg", "../images/DogTounge.jpg"]

const ExistingCities = new Request("http://localhost:8000/cities")

okButton.addEventListener("click", function () {
    popupbox.style.display = "none"
})

async function GetCities () {
    const response = await fetch(ExistingCities)
    const resource = await response.json()

    if (response.ok) {
        for (let city of resource) {
            let randomImage = RandomImages[Math.floor(Math.random() * RandomImages.length)]
            const cityDiv = document.createElement("div")
            cityDiv.classList.add("CityBox")
            cityDiv.innerHTML = `<h2>${city.name}, ${city.country}</h2>`
            cityDiv.style.backgroundImage = `url(${randomImage})`
            cityDiv.style.backgroundSize = "cover"
            cityDiv.style.backgroundPosition = "center"
            cityDiv.style.border = "1px solid black"
            CitiesHolder.append(cityDiv)

            const deleteButton = document.createElement("button")
            deleteButton.classList.add("DelBtn")
            deleteButton.innerHTML = `<h2>DELETE</h2>`
            cityDiv.append(deleteButton)

            deleteButton.addEventListener("click", async function () {

                const RemoveCity = new Request(`http://localhost:8000/cities`, {
                    method: "DELETE",
                    body: JSON.stringify({ id: city.id})
                })
        
                const response = await fetch(RemoveCity)  
        
                if(response.status == 200) {
                    cityDiv.remove()
                }
            })
        }
    } else {
        return
    }
}
GetCities()



addbutton.addEventListener("click", async function () {

    const addcity = new Request("http://localhost:8000/cities", { 
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify({ name: AddCity.value, country: AddCountry.value })

    })

    const response = await fetch(addcity)
    if (response.status == 409) {
        popupbox.style.display = "flex"
        return        
    }

    const NewCity = await response.json()
    let randomImage = RandomImages[Math.floor(Math.random() * RandomImages.length)]
    const cityDiv = document.createElement("div")

    cityDiv.classList.add("CityBox")
    cityDiv.innerHTML = `<h2>${NewCity.name}, ${NewCity.country}</h2>`
    cityDiv.style.backgroundImage = `url(${randomImage})`
    cityDiv.style.backgroundSize = "cover"
    cityDiv.style.backgroundPosition = "center"
    cityDiv.style.border = "1px solid black"
    CitiesHolder.append(cityDiv)

    const deleteButton = document.createElement("button")
    deleteButton.classList.add("DelBtn")
    deleteButton.innerHTML = `<h2>DELETE</h2>`
    cityDiv.append(deleteButton)

    deleteButton.addEventListener("click", async function () {

        const RemoveCity = new Request(`http://localhost:8000/cities`, {
            method: "DELETE",
            body: JSON.stringify({ id: NewCity.id})
        })

        const response = await fetch(RemoveCity)  

        if(response.status == 200) {
            cityDiv.remove()
        }
    })

    AddCity.value = ""
    AddCountry.value = ""

})

findbutton.addEventListener("click", function () {
    
    const findcity = new Request(`http://localhost:8000/cities/search?text=${SearchText.value}&country=${SearchCountry.value}`)

    const promiseResponse = fetch(findcity)
    promiseResponse.then(handleResponse) 

    function handleResponse (response) {
        const promiseResource = response.json()
        promiseResource.then(handleResource)
    }

    function handleResource (resource) {
        
        SearchCitiesHolder.innerHTML = "";

        for (let city of resource) {
            const searchDiv = document.createElement("div")
            searchDiv.classList.add("CityBox")
            searchDiv.innerHTML = `<h2>${city.name}, ${city.country}</h2>`

            SearchCitiesHolder.append(searchDiv)
        }

    }

})    
