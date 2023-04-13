#!/usr/bin/env node
import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';
const args = minimist(process.argv.slice(2));
if (args.h == true) {
console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE");
    console.log("-h            Show this help message and exit.");
    console.log("-n, -s        Latitude: N positive; S negative.");
    console.log("-e, -w        Longitude: E positive; W negative.");
    console.log("-z            Time zone: uses tz.guess() from moment-timezone by default.");
    console.log("-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.");
    console.log("-j            Echo pretty JSON from open-meteo API and exit.");
}
const timezone = moment.tz.guess();
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.91&longitude=-79.06&daily=precipitation_hours&timezone=America%2FNew_York');
const data = await response.json();
console.log(data.daily.precipitation_hours[0]);
