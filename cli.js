#!/usr/bin/env node
import minimist from 'minimist';


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
import moment from 'moment-timezone';
const timezone = moment.tz.guess();

import fetch from 'node-fetch';
const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_hours&timezone=${timezone}');
const data = await response.json();

if (args.j( {
    console.log(data);
}
if (args.w) {
    var latitude = (args.w * -1).toFixed(2);
} else {
    var latitude = args.e.toFixed(2);
}
if (args.s) {
    var longitude = (args.s * -1).toFixed(2);
} else {
    var longitude = args.n.toFixed(2);
}




const days = args.d;
const rain = data.daily.precipitation_hours[days];

if (rain > 0) {
    process.stdout.write ("You might need your galoshes ");
} else {
    process.stdout.write ("You will not need your galoshes ");
}

if (days == 0) {
    console.log ("today.");
} else if (days == 1) {
    console.log ("tomorrow.");
} else {
    console.log (`in ${days} days.`);
}
