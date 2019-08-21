
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "February", "March", "April", "Jun", "July", "August", "September", "October", "November", "December"]
const directions = ["North", "NNE", "Northeast", "ENE", "East", "ESE", "Southeast", "SSE", "South", "SSW", "Southwest", "WSW", "West", "WNW", "Northwest", "NNW"]
const icons = {

    "clear-day": "./assets/svg/day-sunny.svg",
    "cloudy": "./assets/svg/day-cloudy.svg",
    "partly-cloudy-day": "./assets/svg/day-partly-cloudy.svg",
    "rain": "./assets/svg/day-rain.svg",
    "snow": "./assets/svg/day-snow.svg",
    "fog": "./assets/svg/day-fog.svg",
    "clear-night": "./assets/svg/night-clear.svg",
    "cloudy-night": "./assets/svg/night-cloudy.svg",
    "partly-cloudy-night": "./assets/svg/night-partly-cloudy.svg",
    "wind":"./assets/svg/wi-strong-wind.svg"
    // rain:"./assets/svg/night-rain.svg",
    // snow:"./assets/svg/night-snow.svg"
}



class Weather {
    constructor() {
        this.init()
    }

    init() {

        const url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/6801d56357ca1b2215bd84ab6e850842/52.520008,13.404954"
        this.fetchFn(url)

    }

    fetchFn(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => this.mainTemplate(data))
    }
    setIcon(param) {
        for (let ico in icons) {
            if (ico = param) {
                return icons[ico]
            }
        }
    }
    hourlyTem(obj){
        obj.hourly.data.length=24
    return    obj.hourly.data.map(ele=>
            `
            <div class="owl-item" style="width: 61px;">
                <div class="item">
                    <div class="biseller-column">
                        <p>${new Date(ele.time * 1000).getHours()}</p>
                        <a class="lightbox" href="#">
                            <img src=${this.setIcon(ele.icon)} alt="">
                        </a> 
                        <p>${((ele.apparentTemperature - 32) / 1.8).toString().slice(0, 4)}<sup class="degree">°</sup></p>
                    </div>
                </div>
            </div>
            `    
        ).join("")
    }
    mainTemplate(obj) {
        const layout = document.getElementById("weather")
        console.log(obj)
        layout.innerHTML =
            `
            <div class="agileits-top">
                <div class="agileinfo-top-row">
                    <div class="agileinfo-top-img">
                        <span> </span>
                    </div>
                    <h3>${((obj.currently.apparentTemperature - 32) / 1.8).toString().slice(0, 4)}<sup class="degree">°</sup><span>C</span></h3>
                    <p>${obj.timezone}</p>
                    <div class="agileinfo-top-time"> 
                        <div class="date-time">
                            <div class="dmy">
                                <div id="txt"></div>
                                <div class="date">
                                    ${(new Date(obj.currently.time * 1000)).toDateString()}
                                </div>
                                <div class="clear"></div>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
            <div class="w3ls-bottom">
                <h2>Today's Weather </h2>
                <div id="owl-demo" class="owl-carousel owl-theme" style="opacity: 1; display: block;">
                    <div class="owl-wrapper-outer">
                        <div class="owl-wrapper" id="hourly" style="width: 1586px; left: 0px; display: block; transition: all 800ms ease 0s; transform: translate3d(-183px, 0px, 0px);">
                        ${this.hourlyTem(obj)}
                    </div>
                </div>     
                <div class="owl-controls clickable">
                    <div class="owl-pagination">
                        <div class="owl-page active">
                            <span class=""></span>
                        </div>
                        <div class="owl-page">
                            <span class=""></span>
                        </div>
                        <div class="owl-page">
                            <span class=""></span>
                        </div>
                    </div>
                </div>
            </div>  

            <div class="w3ls-bottom2">	 
                <div class="ac-container">
                    <input id="ac-1" name="accordion-1" type="checkbox">
                    <label for="ac-1" class="grid1"> Week</label>
                    <article class="ac-small">
                        <div class="wthree-grids">
                            <div class="wthree-grids-row">
                                <ul class="top">
                                    <li>${days[(new Date(obj.daily.data[1].time * 1000)).getDay()]}</li>
                                    <li class="wthree-img"><img src=${this.setIcon(obj.daily.data[1].icon)} alt=""> </li>
                                    <li class="wthree-temp"> ${((obj.daily.data[1].apparentTemperatureMax - 32) / 1.8).toString().slice(0, 4)} <sup class="degree">°</sup></li>
                                    <li class="wthree-temp"> ${((obj.daily.data[1].apparentTemperatureMin - 32) / 1.8).toString().slice(0, 4)} <sup class="degree">°</sup></li> 
                                </ul> 
                                <div class="clear"> </div>
                            </div>
                            <div class="wthree-grids-row">
                                <ul>
                                    <li>${days[(new Date(obj.daily.data[2].time * 1000)).getDay()]}</li>
                                    <li class="wthree-img"><img src=${this.setIcon(obj.daily.data[2].icon)} alt=""> </li>
                                    <li class="wthree-temp"> ${((obj.daily.data[2].apparentTemperatureMax - 32) / 1.8).toString().slice(0, 4)} <sup class="degree">°</sup></li>
                                    <li class="wthree-temp"> ${((obj.daily.data[2].apparentTemperatureMin - 32) / 1.8).toString().slice(0, 4)} <sup class="degree">°</sup></li> 
                                </ul>
                                <div class="clear"> </div>
                            </div>
                            <div class="wthree-grids-row">
                                <ul>
                                    <li>${days[(new Date(obj.daily.data[3].time * 1000)).getDay()]}</li>
                                    <li class="wthree-img"><img src=${this.setIcon(obj.daily.data[3].icon)} alt=""> </li>
                                    <li class="wthree-temp"> ${((obj.daily.data[3].apparentTemperatureMax - 32) / 1.8).toString().slice(0, 4)} <sup class="degree">°</sup></li>
                                    <li class="wthree-temp"> ${((obj.daily.data[3].apparentTemperatureMin - 32) / 1.8).toString().slice(0, 4)} <sup class="degree">°</sup></li> 
                                </ul> 
                                <div class="clear"> </div>
                            </div>
                            <div class="wthree-grids-row">
                                <ul>
                                    <li>${days[(new Date(obj.daily.data[4].time * 1000)).getDay()]} </li>
                                    <li class="wthree-img"><img src=${this.setIcon(obj.daily.data[4].icon)} alt=""> </li>
                                    <li class="wthree-temp"> ${((obj.daily.data[4].apparentTemperatureMax - 32) / 1.8).toString().slice(0, 4)} <sup class="degree">°</sup></li>
                                    <li class="wthree-temp"> ${((obj.daily.data[4].apparentTemperatureMin - 32) / 1.8).toString().slice(0, 4)} <sup class="degree">°</sup></li> 
                                </ul>
                                <div class="clear"> </div>
                            </div>
                            <div class="wthree-grids-row">
                                <ul>
                                    <li>${days[(new Date(obj.daily.data[5].time * 1000)).getDay()]}</li>
                                    <li class="wthree-img"><img src=${this.setIcon(obj.daily.data[5].icon)} alt=""> </li>
                                    <li class="wthree-temp"> ${((obj.daily.data[5].apparentTemperatureMax - 32) / 1.8).toString().slice(0, 4)} <sup class="degree">°</sup></li>
                                    <li class="wthree-temp"> ${((obj.daily.data[5].apparentTemperatureMin - 32) / 1.8).toString().slice(0, 4)} <sup class="degree">°</sup></li> 
                                </ul> 
                                <div class="clear"> </div>
                            </div>
                            <div class="wthree-grids-row">
                                <ul>
                                    <li>${days[(new Date(obj.daily.data[6].time * 1000)).getDay()]}</li>
                                    <li class="wthree-img"><img src=${this.setIcon(obj.daily.data[6].icon)} alt=""> </li>
                                    <li class="wthree-temp"> ${((obj.daily.data[6].apparentTemperatureMax - 32) / 1.8).toString().slice(0, 4)} <sup class="degree">°</sup></li>
                                    <li class="wthree-temp"> ${((obj.daily.data[6].apparentTemperatureMin - 32) / 1.8).toString().slice(0, 4)}<sup class="degree">°</sup></li> 
                                </ul> 
                                <div class="clear"> </div>
                            </div>
                        </div>
                    </article>
                </div>  
            </div>
            `
    }

}

const Istanbul = new Weather()

function watch() {
    let d = new Date
    let hours = d.getHours()
    let minutes = d.getMinutes()
    let seconds = d.getSeconds()
    let time = `${hours}:${minutes}:${seconds}`
    return document.getElementById("txt").innerHTML = time
}
setInterval(watch, 1000)

