'use strict';

const events = require('events');
const axios = require('axios');
const LCDevice = require('./LCDevice.js');

class LCDiscovery extends events.EventEmitter {
	
	constructor( url ) {
		super();
		
		this._url = url || 'http://nupnp.ledctrl.eu';
		this._pollIntervalTimeout = 30000;
		this._devices = {};
		
	}
	
	enablePolling( interval ) {
		
		if( typeof interval === 'number' ) {
			this._pollIntervalTimeout = interval;
		}
		
		this.disablePolling();
		
		this._pollInterval = setInterval(this._onPoll.bind(this), this._pollIntervalTimeout);
		
		return this;
			
	}
	
	disablePolling() {
		
		if( this._pollInterval )
			clearInterval(this._pollInterval);
			
		return this;
		
	}
	
	getDevices() {
		return this._devices;
	}
	
	getDevice( deviceId ) {
		return this._device[deviceId] || new Error('Invalid device');
	}
	
	search() {
	
		return axios.get( this._url )
			.then( result => {
				return Promise.resolve( result.data.message );
			})
			.then( devices => {
				for( let deviceId in devices ) {
					let device = new LCDevice( deviceId, devices[deviceId] );
					
					if( this._devices[deviceId] instanceof LCDevice ) continue;
						this._devices[deviceId] = device;
					
					this.emit('device', device);
					
				}
				return Promise.resolve( this.getDevices() );				
			})
	}
	
	_onPoll() {
		this.search();
	}
	
}

module.exports = LCDiscovery;