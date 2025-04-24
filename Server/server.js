const cities = [
    { id: 2, name: "Lille", country: "France" },
    { id: 3, name: "Nantes", country: "France" },
    { id: 5, name: "Bremen", country: "Germany" },
    { id: 10, name: "Dresden", country: "Germany" },
    { id: 11, name: "Heidelberg", country: "Germany" },
    { id: 12, name: "Venice", country: "Italy" },
    { id: 13, name: "Rome", country: "Italy" },
    { id: 16, name: "Graz", country: "Austria" },
    { id: 20, name: "Basel", country: "Switzerland" },
    { id: 21, name: "Lucerne", country: "Switzerland" },
    { id: 22, name: "Kraków", country: "Poland" },
    { id: 23, name: "Warsaw", country: "Poland" },
    { id: 24, name: "Poznań", country: "Poland" },
    { id: 28, name: "Ghent", country: "Belgium" },
    { id: 31, name: "Maastricht", country: "Netherlands" },
    { id: 38, name: "Maribor", country: "Slovenia" },
    { id: 42, name: "Strasbourg", country: "France" }
  ];

const cityRoute = new URLPattern({ pathname: "/cities/:id" })

async function handler (request) {

    const headersCORS = new Headers()
    headersCORS.set("Access-Control-Allow-Origin", "*")
    headersCORS.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    headersCORS.set("Access-Control-Allow-Headers", "Content-Type");
    if (request.method == "OPTIONS") {
        return new Response(null, { headers: headersCORS })
    }

    const url = new URL (request.url)

    if (url.pathname == "/cities/search" && request.method == "GET") {
        let results = [];
        const text = url.searchParams.get("text")
        const country = url.searchParams.get("country")

        if (!text) {
            return new Response("Text Needs To Be Filled", {
                status: 404,
                headers: headersCORS
            })
        }

        for (let city of cities) {
            if (city.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()) && (!country || city.country.toLocaleLowerCase() == country.toLocaleLowerCase())) {
                results.push(city)
            }
        }
        return new Response(JSON.stringify(results), {
            status: 200,
            headers: headersCORS
        })
    }

    const match = cityRoute.exec(url)
    if (match && request.method == "GET") {
        const id = Number(match.pathname.groups.id)
        const CityID = cities.find(cID => cID.id == id)

        if (CityID) {
            return new Response(JSON.stringify(CityID), { 
                status: 200,
                headers: headersCORS
            })
        } else {
            return new Response("City ID does not exist", {
                status: 404,
                headers: headersCORS
            })
        }
    } 

    if (url.pathname == "/cities") {
        if (request.method == "POST") {
            const NewCity = await request.json()

            if (NewCity.name && NewCity.country) {
                if (cities.find(OldCity => OldCity.name.toLocaleLowerCase() == NewCity.name.toLocaleLowerCase() && OldCity.country.toLocaleLowerCase() == NewCity.country.toLocaleLowerCase())) {
                    return new Response("City Already Exists", {
                        status: 409,
                        headers: headersCORS
                    })
                } else {
                    NewCity.id = cities.length > 0 ? cities[cities.length - 1].id + 1 : 1;
                    const AddNewCity = { id: NewCity.id, name: NewCity.name, country: NewCity.country }
                    cities.push(AddNewCity)
                    return new Response(JSON.stringify(AddNewCity), { 
                        status: 200,
                        headers: headersCORS
                    })
                }
            }
            return new Response("The Request has invalid keys", { 
                status: 400, 
                headers: headersCORS
            })
        }

        if (request.method == "GET") {
            return new Response(JSON.stringify(cities), { 
                status: 200,
                headers: headersCORS  })
        }

        if (request.method == "DELETE") {
            const RequestData = await request.json()

            if (RequestData.id == undefined) {
                return new Response("Id Missing", {
                    status: 400,
                    headers: headersCORS
                })
            }
            if (!isNaN(RequestData.id) && RequestData.id > 0) {
                const CityIndex = cities.findIndex(CorrectCity => CorrectCity.id === RequestData.id)
                cities.splice(CityIndex, 1)
                return new Response("Delete OK", {
                    status: 200,
                    headers: headersCORS
                })
            } else {
                return new Response("City ID is not in use or is a string", { 
                    status: 404,
                    headers: headersCORS
                })
            }
        }

        return new Response("Wrong method, required method: POST || GET || DELETE", { status: 400 })
    }   

    

    return new Response("Invalid endpoint", { status: 400 })

}
Deno.serve(handler)