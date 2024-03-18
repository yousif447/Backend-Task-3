let form = document.getElementById("form")
let button = document.getElementById("but")
let inp = document.getElementById("inp")
let country = document.getElementById("country")
let city = document.getElementById( "city")
let long = document.getElementById( "long")
let lat = document.getElementById( "lat")
let weather = document.getElementById( "weather")
let err = document.getElementById( "err")

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(inp.value)
    weatherFunc()
    form.reset()
})

let weatherFunc = async() => {
    try{
        const address = inp.value
        const res = await fetch("http://localhost:3000/weather?address=" + address)
        const data = await res.json()
        console.log(data)
        if(data.error){
            err.innerText = data.error
            country.innerText = ""
            city.innerText = ""
            long.innerText = ""
            lat.innerText = ""
            weather.innerText = ""
        }else{
            country.innerText = "Address: " + data.location
            setTimeout(()=>{
                city.innerText = "City: " + data.city
            }, 500);
            setTimeout(()=>{
                long.innerText = "Longitude: " + data.longitude
            }, 1000);
            setTimeout(()=>{
                lat.innerText = "Lattitude: " + data.lattitude
            }, 1500);
            setTimeout(()=>{
                weather.innerText = "Weather: " + data.forecast
            }, 2000);
            err.innerText = ""
        }


    }
    catch(e){
        console.log(e)
    }
}