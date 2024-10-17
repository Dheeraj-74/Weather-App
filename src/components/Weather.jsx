/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png' 
import clear_icon from '../assets/clear.png' 
import cloudy_icon from '../assets/cloudy.png' 
import drizzle_icon from '../assets/drizzle.png' 
import humidity_icon from '../assets/humidity.png' 
import rainy_icon from '../assets/rainy.png' 
import snowflake_icon from '../assets/snowflake.png' 
import windy_icon from '../assets/windy.png' 

const Weather = () => {

    const inputRef = useRef()
    const[WeatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d" : clear_icon,
        "01n" : clear_icon,
        "02d" : cloudy_icon,
        "02n" : cloudy_icon,
        "03d" : cloudy_icon,
        "03n" : cloudy_icon,
        "04d" : cloudy_icon,
        "09d" : drizzle_icon,
        "09n" : drizzle_icon,
        "10d" : rainy_icon,
        "10n" : rainy_icon,
        "13d" : snowflake_icon,
        "13n" : snowflake_icon
    }

    const search = async (city)=>{
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok){
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity : data.main.humidity,
                windSpeed : data.wind.speed,
                temperature : Math.floor(data.main.temp),
                location : data.name,
                icon : icon
            })

        }catch (error) {
            setWeatherData(false);
            console.error("Error in fetching the weather data");
        }
    }

    useEffect(()=>{
        search("London");
    },[])

  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref = {inputRef} type="text" placeholder='Search'/>
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {WeatherData?<>
        <img src={WeatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{WeatherData.temperature}°c</p>
        <p className='location'>{WeatherData.location}</p>
        <div className='weather-data'>
            <div className='col'>
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{WeatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className='col'>
                <img src={windy_icon} alt="" />
                <div>
                    <p>{WeatherData.windSpeed} km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </>:<></>}
    </div>
  )
}

export default Weather
