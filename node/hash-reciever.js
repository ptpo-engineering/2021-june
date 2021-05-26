const maxAPI = require("max-api")
const fetch = require('node-fetch')

const hashesUrl = "https://distortedblur.wixsite.com/ptpo-data-symphony/_functions/hashes"

var interval = 10 * 1000; // 10 seconds;
async function sleep(millis) {
	return new Promise(resolve => setTimeout(resolve, millis))
}

maxAPI.addHandler('stop', () => {
	console.log('exiting')
	process.kill(process.pid, 'SIGTERM')
});

async function noiseData() {
	console.log("noiseData function has started")
	while (true) {
		try {
			const res = await fetch(hashesUrl, {
				method: 'GET',
				headers: { 'Accept': 'application/json' }
			})
			const json = await res.json()
			const result = json.result
			const list = result.map(i => parseInt(i)).join(" ")
			console.log("hashes", list)
			maxAPI.outlet({ "hashes": list })
			await sleep(interval);
		} catch (err) {
			console.log(err)
		}
	}
}

noiseData()

