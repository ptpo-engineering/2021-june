const maxAPI = require("max-api")
const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')

const userName = 'antonsolovev'
const projectFolder = '/Users/' + userName + '/Projects/2021-june/'
const clipsPath = path.join(projectFolder, 'clips')

const clipParts = {}

const files = fs.readdirSync(clipsPath)
files.forEach(function (file) {
	const key = Number(file.replace('.mid', ''))
	clipParts[key] = path.join(clipsPath, file)
});

const urls = {
	"next": 'https://distortedblur.wixsite.com/ptpo-data-symphony/_functions/next_trigger',
	"stop": 'https://distortedblur.wixsite.com/ptpo-data-symphony/_functions/stop_trigger',
}

var interval = 10 * 1000; // 10 seconds;
async function sleep(millis) {
	return new Promise(resolve => setTimeout(resolve, millis))
}

maxAPI.addHandler('stop', () => {
	console.log('exiting')
	process.kill(process.pid, 'SIGTERM')
});

let partNumber = 0
async function sheetData() {
	console.log("sheetData function has started")
	console.log("Clips", clipParts)
	while (true) {
		for (const [key, url] of Object.entries(urls)) {
			try {
				const res = await fetch(url, {
					method: 'GET',
					headers: { 'Accept': 'application/json' }
				})

				const json = await res.json()
				const result = json.result
				console.log(key, result)

				if (key == "stop" && result === true) {
					maxAPI.outlet({ "midi": "Nil" })
				} else {
					if (result === true) {
						partNumber += 1
					}
					console.log("partNumber", partNumber)
					const midiName = clipParts[partNumber]
					maxAPI.outlet({ "midi": midiName })
				}
				await sleep(interval);
			} catch (err) {
				console.log(err)
			}
		}
	}
}

sheetData()
