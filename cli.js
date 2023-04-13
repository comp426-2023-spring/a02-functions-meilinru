#!/usr/bin/env node
import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';
async function main() {

	const args = minimist(process.argv.slice(2));

	if (args.h) {
		console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE");
		console.log("-h            Show this help message and exit.");
		console.log("-n, -s        Latitude: N positive; oijS negative.");
		console.log("-e, -w        Longitude: E positive; W negative.");
		console.log("-z            Time zone: uses tz.guess() from moment-timezone by default.");
		console.log("-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.");
		console.log("-j            Echo pretty JSON from open-meteo API and exit.");
		return 0;
	}

	var latitude = NaN;
	if (args.n) {
		latitude = args.n.toFixed(2);
	} else if (args.s) {
		latitude = (-1 * args.s).toFixed(2);
	}	
	var longitude=NaN;
	if (args.e) {
		longitude = args.e.toFixed(2);
	} else if (args.w) {
		latitude = (-1 * args.w).toFixed(2);
	}	

	const timezone = (args.z || moment.tz.guess());


	const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_hours&timezone=${timezone}');
	const data = await response.json();

	if (args.j){
		console.log(data);
		return 0;
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
	} else if (days > 1) {
		console.log (`in ${days} days.`);
	} else {
		console.log ("tomorrow.");
	}
	return 0;
}
main();
