# SkyTrack-Dashboard
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) 

## User Story
As a traveler, I want to see the weather outlook for multiple cities. So, that I can plan a trip accordingly.

## Description: Servers and APIs
External APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in their context, frequently consuming this data via a server. My task is to build a weather dashboard application that calls the OpenWeather API and renders data in the browser.The application’s front end has already been created. It's my job to build the back end, connect the two, and then deploy the entire application to Render.

## Table of Contents

-Description      
-Installation   
-Usage     
-License       
-Contribution       
-Tests        
-Questions

## Installation
To install and run this application locally, please follow these steps:

Clone the repository via SSH:

`git clone git@github.com: elele20005/SkyScope-Dashboard.git`
       
   Navigate to the Project Directory


 command: `cd SkyScope-Dashboard`
 
Install Dependencies

Copy code
command:  `npm install`

## Usage

I will be Using the 5-day weather forecast API to retrieve weather data for cities:       

https://openweathermap.org/forecast5.


The base URL should look like the following:    

`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`


After registering for a new API key, you may need to wait up to 2 hours for that API key to activate.

For more information on how to work with the OpenWeather API, refer to the Full-Stack Blog on how to use API keys

https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys  

And Render documentation on setting environment variables 

https://docs.render.com/configure-environment-variables

Also add your `server` and `api scripts` in the scripts section of package.json      

Exaple below:

`{ `        
`"scripts": { `     
` "server": "node server.js",  `    
  ` "api": "node api.js",  `      
   ` "start": "npm run server & npm run api"  `       
         `     } `       
         `}`      

command: `npm run server` will start the server (server.js file).      
Command: `npm run api` will start the API (api.js file).          
command: `npm start` runs both server and api scripts concurrently

## License
This project is licensed under the MIT License and Apache 2.0

## Contributing
Contributions are welcome! Please feel free to submit pull requests.

## Tests
To test the application, run the Builder and verify that outputs match expected results based on various inputs


## Additional Requirements
This Challenge combines many of the skills covered so far. In addition to the user story and acceptance criteria, we've provided some guidelines to help you get started. Your application should use Inquirer for collecting input from the user. The application will be invoked by using the following command:

command:  `npm start` 

## Deployement URL
You can check out the deployment url being used below      

https://skytrack-dashboard.onrender.com


## For more questions, please reach out to:
 
- GitHub: https://github.com/elele20005
- Email: ralphconsultant1@gmail.com
