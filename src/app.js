
const express = require("express")
const app = express() 

const port = process.env.PORT || 3000

const path = require("path")

const x = path.join(__dirname, '../public')
app.use(express.static(x))

app.set("view engine", "hbs")

const viewsDirectory = path.join(__dirname, "../temp1/views")
app.set("views", viewsDirectory)

const hbs = require("hbs")
const partialDirectory = path.join(__dirname, "../temp1/partials")
hbs.registerPartials(partialDirectory)

const geocode = require("./weather/geocode")
const forecast = require("./weather/forecast")

app.get("/", (req, res) => {
    res.render("index", {
        title: "HOME",
        desc: "This is a description of the home page.",
    })
})

app.get("/service", (req, res) => {
    res.render("service", {
        title: "SERVICE",
        desc: "This is a description of the service page.",
        name: "Yousif",
        city: "cairo",
        age: 21,
    })
})

app.get("/team", (req, res) => {
    res.render("team", {
        title: "TEAM",
        desc: "This is a description of the team page.",
        name: "adel",
        city: "mansoura",
        age: 60,
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide an address."
        })
    }
    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({error})
        }
        forecast(data.longitude, data.lattitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData.weather,
                location: req.query.address,
                longitude: data.longitude,
                lattitude: data.lattitude,
                city: forecastData.city
                
            })
        })
    })
})


app.get("*", (req,res) => {
    res.send("404 Error Page!")
})

app.listen(port, () => {
    console.log(`app is running in port ${port}`)
})