const maxAPI = require("max-api");
const fetch = require('node-fetch');

var interval = 10 * 1000; // 10 seconds;

const urls = [
	'https://distortedblur.wixsite.com/ptpo-june-2021/_functions/avg_key'
]

maxAPI.addHandler('stop', () => {
	console.log('exiting')
	process.kill(process.pid, 'SIGTERM')
});

async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

async function main() {
	console.log("Reciever function has started")
	while(true) {
		await fetch('https://distortedblur.wixsite.com/ptpo-june-2021/_functions/avg_key', {
			method: 'GET',
			headers: { 'Accept': 'application/json' }
		}).then(res => {
				console.log(res);
				return res;
			})
			.then(res => res.json())
			.then(json => {
				console.log(json)
				return json;
			})
			.then(json => maxAPI.outlet(json.result))
			.catch(err => console.log(err))
		await sleep(interval);
	}
}

main()