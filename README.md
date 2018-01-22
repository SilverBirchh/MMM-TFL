# MMM-TFL

MagicMirror module for Transport For London tube line status designed to replicate the [TFL status board](https://tfl.gov.uk/tube-dlr-overground/status/).

## Preview

## Installation

1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/SilverBirchh/MMM-TFL.git`.

2. `cd MMM-TFL` and execute `npm install`.

3. Add this module to your `config.js` file.

## Config

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
	module: 'MMM-TFL',
	position: 'top_right',	// This can be any of the regions but works best on either side of the display
	config: {
          updateTime: 60000,
          lines: 'all'
	}
	}
]
````

|Option|Description|
|---|---|
|`updateTime`|Number. Optional. The interval time in seconds to update the status of the tube line. Defaults to `60000` (10 minutes)|
|`lines`|Array / String. Optional. The tube lines you want to keep track of. Can be an array of line id's e.g. `['central', 'bakerloo', 'circle']` or `all` which will display all lines. Defaults to `all`.|

## Tube Lines

|Id|Line|
|---|---|
|bakerloo|Bakerloo|
|central|Central|
|circle|Circle|
|district|District|
|hammersmith-city|Hammersmith & City|
|jubilee|Jubilee|
|metropolitan|Metropolitan|
|northern|Northern|
|piccadilly|Piccadilly|
|victoria|Victoria|
|waterloo-city|Waterloo & City|

## To Do

[ ] Add TFL-Rail status </br>
[ ] Add Overground status</br>
[ ] Add bus status</br>
[ ] Add config to config styles</br>

## Special Thanks
- [Michael Teeuw](https://github.com/MichMich) for creating the awesome [MagicMirror2](https://github.com/MichMich/MagicMirror/tree/develop) project that made this module possible.
