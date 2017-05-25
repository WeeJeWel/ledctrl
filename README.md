# LedCtrl

This is a Node.js module & CLI module to control [LedCtrl](http://www.ledctrl.eu) devices (Wi-Fi Digital LED strips).

## Command-line usage


```bash
$ ledctrl -h

  Usage: ledctrl [options] [command]


  Commands:

    discover               Discover LedCtrl devices
    gradient [options]     Set a gradient on a LedCtrl device
    effect [options]       Set an effect on a LedCtrl device
    brightness [options]   Set the brightness on a LedCtrl device
    name [options]         Set the name of a LedCtrl device
    numpixels [options]    Set the number of pixels of a LedCtrl device
    restart [options]      Restart a LedCtrl device

  Options:

    -h, --help  output usage information
```

For example:

`$ ledctrl gradient --device "TV" --gradient "FF0000,00FF00,0000FF"`

## Module usage

### Installation
```bash
npm install --save ledctrl
```

### Usage

```javascript
const ledctrl = require('ledctrl');
const Discover = ledctrl.LCDiscover;

let discover = new LCDiscover();
	discover
		.enablePolling()
		.on('device', device => {
			console.log(device); // instance of LCDevice
			
			device.getState()
				.then( console.log )
				.catch( console.error )
			
			device.setGradient('FFFF00', '00FF00', '0000FF')
				.then( console.log )
				.catch( console.error )
				
			// device.setEffect('rainbow');
			// device.setName('My name');
			// device.setBrightness(255);
		})
		.search();
```
