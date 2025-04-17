const cities = [
    { id: 2, name: "Lille", country: "France"},
    { id: 3, name: "Nantes", country: "France"},
    { id: 5, name: "Bremen", country: "Germany"},
    { id: 10, name: "Dresden", country: "Germany"},
    { id: 11, name: "Heidelberg", country: "Germany"},
    { id: 12, name: "Venice", country: "Italy"},
    { id: 13, name: "Rome", country: "Italy"},
    { id: 16, name: "Graz", country: "Austria"},
    { id: 20, name: "Basel", country: "Switzerland"},
    { id: 21, name: "Lucerne", country: "Switzerland"},
    { id: 22, name: "Kraków", country: "Poland"},
    { id: 23, name: "Warsaw", country: "Poland"}, 
    { id: 24, name: "Poznań", country: "Poland"},
    { id: 28, name: "Ghent", country: "Belgium"},
    { id: 31, name: "Maastricht", country: "Netherlands"},
    { id: 38, name: "Maribor", country: "Slovenia"},
    { id: 42, name: "Strasbourg", country: "France"},
  ];

async function handler (request) {

    const headersCORS = new Headers()
    headersCORS.set("Access-Control-Allow-Origin", "*")
    headersCORS.set("Content-Type", "application/json")
    if (request.method == "OPTIONS") {
        return new Response(null, { headers: headersCORS })
    }

    const url = new URL (request.url)

    if (url.pathname == "/cities") {
        
        if (request.method == "POST") {
            const NewCity = await request.json()
            if (NewCity.name && NewCity.country) {

                if (cities.find(OldCity => OldCity.name == NewCity.name && OldCity.country == NewCity.country)) {
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
            
        }

        return new Response("Wrong method, required method: POST || GET", { status: 400 })
    }   

    return new Response("Invalid endpoint", { status: 400 })

}
Deno.serve(handler)