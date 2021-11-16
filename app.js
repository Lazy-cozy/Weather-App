require('dotenv').config();
const express=require("express");
const https=require("https");
const app=express();

app.use(express.urlencoded({ extended : true}));

app.use(express.json());

app.get("/",function(req,res) {

    
res.sendFile(__dirname+"/index.html");

})

app.post("/",function(req,res) {

  
    const cityName=req.body.cityName;
    const stateCode=req.body.stateName;
    
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+","+stateCode+"&appid="+process.env.API_KEY+"&units=metric"
    https.get(url,function (response){
         console.log(response.statusCode);
       
        response.on("data",function(data) {

            const weatherData= JSON.parse(data);
            console.log(weatherData);
            const temp=weatherData.main.temp
            const type=weatherData.weather[0].main
            const icon=weatherData.weather[0].icon
            const imageUrl="http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            
            res.write("<p> The weather is currently "+ type +"</p>");
            res.write("<h1> Temperature in "+req.body.cityName+" "+temp+"</h1>");
            res.write("<img src="+imageUrl+">");
            res.send()

        })

    })
})



    

app.listen(3000,function() {
    console.log("server is running on port 3000");
    
});