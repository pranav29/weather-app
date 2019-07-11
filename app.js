window.addEventListener("load", () => {
    let latitude, longitude;
    const timezoneElement = document.querySelector(`.location-timezone`);
    const temperatureDegree = document.querySelector(`.temperature-degree`);
    const temperatureDescription = document.querySelector(`.temperature-description`);
    const weatherIcon = document.querySelector(`.icon`);
    const fandC = document.querySelector(`.degree-section span`);
    const degreeSection = document.querySelector(`.degree-section`);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            const proxy = `http://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/c2005b06b87b19a2dd69ba58ed34c791/${latitude},${longitude}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    let { temperature, summary, icon } = data.currently;
                    let { timezone } = data;

                    timezoneElement.textContent = timezone;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;

                    addWeatherIcon(weatherIcon, icon);
                    
                    fahrenheitCelsiusConverter(degreeSection, fandC, temperatureDegree, temperature);
                });
        });
    } else {
        alert(`Browser does not support navigator`);
    }

    function fahrenheitCelsiusConverter(degreeSection, fandC, temperatureDegree, temperature){
        degreeSection.addEventListener('click', ()=>{
            let text = fandC.textContent;
            if(text === `F`) {
                fandC.textContent = `C`;
                temperatureDegree.textContent = Math.floor((temperature - 32)*5/9);
            } else {
                fandC.textContent = `F`;
                temperatureDegree.textContent = Math.floor(temperatureDegree.textContent*9/5+32);
            }
        })
    }

    function addWeatherIcon(weatherIcon, icon){
        const skycons = new Skycons({ color: `white` });
        let currentIcon = icon.replace(`-`, `_`).toUpperCase();

        skycons.add(weatherIcon, Skycons[currentIcon]);
        skycons.play();
        skycons.set(weatherIcon, Skycons[currentIcon]);

    }
})