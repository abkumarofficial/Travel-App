// const { json } = require("body-parser");

/* Global Variables */
// const apiKey = "cbd3f47cb61f72bbc59cf7f19ede7cb5&units=metric";
let found = false;
let lattitude = '';
let longitude = '';
let temperature;
let description;
let pictureURL = '';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

const gettingWeatherData = async (event) => {
    event.preventDefault()

    // check what text was put into the form field
    let place = document.getElementById('place').value;
    place = encodeURI(place);
    // departure Date
    let departure = new Date(document.getElementById('startDate').value);
    var startMonth = departure.getMonth() + 1; // months start counting from zero!
    var startDay   = departure.getDate();
    var startYear  = departure.getFullYear();
    // Return Date
    let returnDate = new Date(document.getElementById('endDate').value);
    var endMonth = departure.getMonth() + 1; // months start counting from zero!
    var endDay   = departure.getDate();  
    var endYear  = departure.getFullYear();
    // Finding Difference b/w two dates
    const diffTime = Math.abs(returnDate - departure);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    // Getting the data to show to the user
    if(place.length > 0 && !isNaN(diffDays)) {
        // const textURI = '&of=json&txt=' + encodeURI(formText)
        // getting key from the server
        let key = await getKeyData();
        key = JSON.parse(key);
        const keyData = {
            "username": key.geoname,
            "weather": key.weather,
            "pixabay": key.pixabay
        }
        // getting place Coordinates
        const geoNameData = await Client.geoNamesData(place, keyData.username);
        // Extracting longitude and latitude from the Matched Data
        if (geoNameData.geonames !== undefined && geoNameData.geonames.length > 0) {
            for (const index of geoNameData.geonames) {
                const searchStr = (index['name']).toLowerCase();
                if (searchStr.includes(place.toLowerCase())) {
                    found = true
                    lattitude = index['lat'];
                    longitude = index['lng']
                    break;
                }
            }
            if (!found) {
                lattitude = geoNameData.geonames[0]['lat'];
                longitude = geoNameData.geonames[0]['lng'];
            }
            let dateFound = false;
            // Getting the Weather condition using the coordinates
            const weatherData = await Client.getWeatherCondition(geoNameData,lattitude, longitude, keyData.weather);
            if (weatherData && weatherData.data !== undefined && weatherData.data.length > 0) {
                for (const index of weatherData.data) {
                    const dateObj = new Date(index.valid_date);
                    // console.log(startDay,startMonth,startYear)
                    // console.log(dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + 'dateObj.getFullYear()')
                    if (startDay === dateObj.getDate()
                    && startMonth === (dateObj.getMonth() + 1)
                    && startYear === dateObj.getFullYear()) {
                        // console.log('Date Found');
                        dateFound = true;
                        temperature = index.temp;
                        description = index.weather.description;
                        break;
                    }
                }
                if (!dateFound) {
                    alert("Please enter departure date which is within 16 days from today");
                }
            } else {
                alert("Could not fetch Weather Data ,Please try again!");
                return;
            }
        } else {
            alert('Place Could not be found, please try again');
            return;
        }
        // Getting the related place picture from pixabay API
        const pictureData = await Client.getPicture(place, keyData.pixabay);
        if (pictureData && pictureData.hits.length > 0) {
            let picFound = false;
            for (const index of pictureData.hits) {
                if (index['tags'].includes(place)) {
                    picFound = true;
                    pictureURL = index['largeImageURL']
                    document.getElementById('showData').style.backgroundImage = `url(${pictureURL})`;
                    // document.body.style.backgroundImage = `url(${pictureURL})`;
                    break;
                }
            }
            if (!picFound) {
                pictureURL = pictureData.hits[0]['largeImageURL'];
                document.getElementById('showData').style.backgroundImage = `url(${pictureURL})`;
                // document.body.style.backgroundImage = `url(${pictureURL})`;
            }
            // console.log(pictureURL)
        } else {
            alert("wow, we could not find any pics for this place.... going to moon, are we ?")
        }
    } else {
        alert("Invalid Data Entered");
        return;
    }
}

// Getting API keys from the server
const getKeyData = async () => {
    const gotKey = await fetch('http://172.16.160.128:3000/needkey');
    try {
        const key = await gotKey.text();
        return key;
    } catch (error) {
        console.log("Error while getting key:", error)
    }
}

export { gettingWeatherData };