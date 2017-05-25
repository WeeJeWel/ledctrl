#!/usr/bin/env node

'use strict';

const ledctrl = require('..');
const program = require('commander');

const LCDevice = ledctrl.LCDevice;
const LCDiscovery = ledctrl.LCDiscovery;

program
	.command('discover')
	.description('Discover LedCtrl devices')
	.action( cmd => {
		
		let discovery = new LCDiscovery();
			discovery
				.on('device', device => {
					console.log();
					console.log('Device found!');
					console.log(device);
					
					/*
					device.getState()
						.then(console.log.bind( this, '[log]', 'getState', device.id))
						.catch(console.error.bind( this, '[err]', 'getState', device.id));
					*/
						
					device.setGradient([ 'FF0000', '00FF00', '0000FF' ])
						.then(console.log.bind( this, '[log]', 'setGradient', device.id))
						.catch(console.error.bind( this, '[err]', 'setGradient', device.id));
				})
				.search()
				.catch( console.error )
				
	})
	
program
	.command('gradient')
	.description('Set a gradient on a LedCtrl device')
	.option('-d, --device <id>', 'The LedCtrl device (ID or name) to send the gradient to. Use an asterisk (*) to send to all LedCtrl devices.')
	.option('-g, --gradient <colors>', 'Comma-seperated list of colors')
	.action( cmd  => {
		
		let discovery = new LCDiscovery();
			discovery
				.on('device', device => {
					
					if( !(device.id === cmd.device || device.name === cmd.device || cmd.device === '*' ) ) return;
						
					device.setGradient(cmd.gradient.toUpperCase().split(','))
						.then(console.log.bind( this, '[log]', 'setGradient', device.id))
						.catch(console.error.bind( this, '[err]', 'setGradient', device.id));
				})
				.search()
				.catch( console.error )
	});
	
program
	.command('effect')
	.description('Set an effect on a LedCtrl device')
	.option('-d, --device <id>', 'The LedCtrl device (ID or name) to send the effect to. Use an asterisk (*) to send to all LedCtrl devices.')
	.option('-e, --effect <effect>', 'Name of the effect')
	.action( cmd  => {
		
		let discovery = new LCDiscovery();
			discovery
				.on('device', device => {
					
					if( !(device.id === cmd.device || device.name === cmd.device || cmd.device === '*' ) ) return;
						
					device.setEffect(cmd.effect)
						.then(console.log.bind( this, '[log]', 'setEffect', device.id))
						.catch(console.error.bind( this, '[err]', 'setEffect', device.id));
				})
				.search()
				.catch( console.error )
	});
	
program
	.command('brightness')
	.description('Set the brightness on a LedCtrl device')
	.option('-d, --device <id>', 'The LedCtrl device (ID or name) to send the brightness to. Use an asterisk (*) to send to all LedCtrl devices.')
	.option('-b, --brightness <value>', 'Value of the brightness (0-255)')
	.action( cmd  => {
		
		let discovery = new LCDiscovery();
			discovery
				.on('device', device => {
					
					if( !(device.id === cmd.device || device.name === cmd.device || cmd.device === '*' ) ) return;
						
					device.setBrightness(cmd.brightness)
						.then(console.log.bind( this, '[log]', 'setBrightness', device.id))
						.catch(console.error.bind( this, '[err]', 'setBrightness', device.id));
				})
				.search()
				.catch( console.error )
	});
	
program
	.command('name')
	.description('Set the name of a LedCtrl device')
	.option('-d, --device <id>', 'The LedCtrl device (ID or name) to send the brightness to. Use an asterisk (*) to send to all LedCtrl devices.')
	.option('-n, --name <value>', 'The new name (max 30 characters)')
	.action( cmd  => {
		
		let discovery = new LCDiscovery();
			discovery
				.on('device', device => {
					
					if( !(device.id === cmd.device || device.name === cmd.device || cmd.device === '*' ) ) return;
						
					device.setName(cmd.name)
						.then(console.log.bind( this, '[log]', 'setName', device.id))
						.catch(console.error.bind( this, '[err]', 'setName', device.id));
				})
				.search()
				.catch( console.error )
	});
	
program
	.command('numpixels')
	.description('Set the number of pixels of a LedCtrl device')
	.option('-d, --device <id>', 'The LedCtrl device (ID or name) to send the brightness to. Use an asterisk (*) to send to all LedCtrl devices.')
	.option('-p, --pixels <value>', 'The amount of pixels')
	.action( cmd  => {
		
		let discovery = new LCDiscovery();
			discovery
				.on('device', device => {
					
					if( !(device.id === cmd.device || device.name === cmd.device || cmd.device === '*' ) ) return;
						
					device.setNumPixels(cmd.pixels)
						.then(console.log.bind( this, '[log]', 'setNumPixels', device.id))
						.catch(console.error.bind( this, '[err]', 'setNumPixels', device.id));
				})
				.search()
				.catch( console.error )
	});
	
program
	.command('restart')
	.description('Restart a LedCtrl device')
	.option('-d, --device <id>', 'The LedCtrl device (ID or name) to send the brightness to. Use an asterisk (*) to send to all LedCtrl devices.')
	.action( cmd  => {
		
		let discovery = new LCDiscovery();
			discovery
				.on('device', device => {
					
					if( !(device.id === cmd.device || device.name === cmd.device || cmd.device === '*' ) ) return;
						
					device.restart()
						.then(console.log.bind( this, '[log]', 'restart', device.id))
						.catch(console.error.bind( this, '[err]', 'restart', device.id));
				})
				.search()
				.catch( console.error )
	});

program.parse(process.argv);
