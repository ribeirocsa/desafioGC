# desafioGC

Web page that allows users to get weather informations (temperature, sunrise and sunset) from 3 cities.

<h3>Installation</h3>

After clone the project, in the terminal, go to the server directory and run the command to install node modules:

`npm install`

Then, go to the client directory and run the command to install node modules:

`npm install`

<h3>Prerequisites</h3>

This web app need a valid API Key to be able to run the service.
Please provide one from <a>https://openweathermap.org/</a>.

<p>On the server directory, create .env file using the command:</p>

`touch .env`

In this file add the API key as the example:
`API_KEY=your_api_key`

<h3>Run the service</h3>

To run the server go to the server directory and run the command:

`node server.js`

<h3>Run the app</h3>

To run the app go to the client directory and run the command:

`npm start`

<h3>Functional tests</h3>
The following functional validations were manually performed to assure the quality of this web app. 
<h5>Frontend</h5>
<ul>
  <li>Verify if when the name of the 3 cities are correctly introduced the app presents the correct data (in the table and in the bar chart)</li>
    <ul>
      <li>Expected: the table presents each city in a row and it's possible to order each of it's collumns</li>
      <li>Expected: the bar chart presents each city in a bar and allows zero, positive and negative temperature values</li>
    </ul>
  
  <li>Verify if incorrect URL is handled</li>
    <ul>
      <li>Expected: the app handles the error and gives feedback to user</li>
    </ul>

  <li>Verify inexistent city</li>
    <ul>
      <li>Expected: the app handles the error and gives feedback to user</li>
    </ul>

  <li>Verify if all the input fields are set</li>
    <ul>
      <li>Expected: the app handles the error and maintain inactive the submit button when any field is empty</li>
    </ul>
    
  <li>Verify if the user can sort any column</li>
    <ul>
      <li>Expected: the results are sorted when the user clicks on the column header</li>
    </ul>
</ul>

<h5>Backend</h5>
<ul>
  <li>Verify if when the name of the 3 cities are correctly introduced the service returns the correct data</li>
    <ul>
      <li>Expected: the service correctly retrive data for the 3 given cities</li>
    </ul>
  
  <li>Verify if incorrect URL is handled</li>
    <ul>
      <li>Expected: the service handles the error and logs it</li>
    </ul>

  <li>Verify inexistent city</li>
    <ul>
      <li>Expected: the service handles the error and logs it</li>
    </ul>

  <li>Verify inexistent API key</li>
    <ul>
      <li>Expected: the service handles the error and logs it</li>
    </ul>
    
  <li>Verify that cities names with spaces are correctly retrieved</li>
    <ul>
      <li>Expected: the service accepts the name with one or more spaces and retrieves the data</li>
    </ul>
    
  <li>Verify that log files (combined.log and error.log) are created when the service starts for the first time and events are correctly appended</li>
    <ul>
      <li>Expected: the log files are created in the logs directory when the server starts for the first time</li>
      <li>Expected: errors are correctly appended to error.log file</li>
      <li>Expected: logs with severity greater or equal to debug are correctly appended to combined.log file</li>
      <li>Expected: when file reaches 5120000 bytes a new file is created</li>
      <li>Expected: only two log files are created for each kind of log</li>
      <li>Expected: the information is shown in the format: [timestamp]level: message</li>
    </ul>
  <li>The logs with severity greater or equal to debug are shown on the console</li>
    <ul>
      <li>Expected: logs with severity greater or equal to debug are correctly shown on the console</li>
      <li>Expected: the information is shown in the format: [timestamp]level: message</li>
    </ul>
</ul>
