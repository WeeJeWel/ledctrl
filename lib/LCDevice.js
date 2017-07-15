'use strict';

const axios = require('axios');
const tinygradient = require('tinygradient');

class LCDevice {
	
	constructor( id, device ) {
		Object.assign( this, device );
		this.id = id;
		
		this.lastseen = new Date( this.lastseen * 1000 );
		
		this.state = {};
	}
	
	_request( method, path, body ) {
		return axios.request({
			method: method,
			baseURL: `http://${this.address}/`,
			url: path,
			data: body
		})
		.then( res => {
			return res.data;
		})
	}
	
	getState() {
		return this._request('get', '/state')
			.then( state => {				
				this.state = LCDevice.parseState( state );
				return this.state;
			})
	}
	
	setOn( on ) {
		return this._request('put', '/on', (( on ) ? 'true' : 'false'));
	}
	
	setGradient( colors ) {
		if( !Array.isArray(colors) )
			throw new Error('Expected array of colors');
			
		let gradient = this._colorsToGradient( colors );
		let body = colors.join(',') + ';' + gradient.join(',');
		
		return this._request('put', '/gradient', body);
	}
	
	setEffect( effect ) {
		return this._request('put', '/effect', effect);		
	}
	
	setBrightness( brightness ) {
		
		brightness = parseInt(brightness);
		if( brightness < 0 || brightness > 255 )
			throw new Error('Brightness out of range');
		
		return this._request('put', '/brightness', brightness.toString());				
	}
	
	setName( name ) {
		return this._request('put', '/name', name);			
	}
	
	setNumPixels( pixels ) {
		return this._request('put', '/numpixels', pixels);			
	}
	
	restart() {
		return this._request('put', '/restart');			
	}
	
	static parseState( state ) {
		
		let stateObj = {};
		
		state
			.split('\n')
			.forEach( line => {
				line = line.split('=');
				if( line.length !== 2 ) return;
				stateObj[ line[0] ] = line[1];
			});
		
		// booleans
		[ 'on' ].forEach( key => {
			if( typeof stateObj[key] === 'undefined' ) return;
			stateObj[key] = ( stateObj[key] === 'true' );
		});
		
		// numbers
		[ 'version', 'brightness', 'pixels' ].forEach( key => {
			if( typeof stateObj[key] === 'undefined' ) return;
			stateObj[key] = parseInt(stateObj[key]);
		});
			
		return stateObj;
	}
	
	_colorsToGradient( inputColors ) {
		
		// add # to color
		inputColors = inputColors.map( color => {
			return `#${color}`;
		});
		
		if( inputColors.length === 1 )
			inputColors.push( inputColors[0] );
		
		let gradient = tinygradient(inputColors);
		
		let outputColors = gradient.rgb(this.pixels);
		
		outputColors = outputColors.map( color => {
			return color
				.toString('hex')
				.substring(1)
				.toUpperCase()
		});
		
		return outputColors;
	}
	
}

module.exports = LCDevice;