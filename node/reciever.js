const maxAPI = require("max-api");
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

const projectFolder = '/Users/antonsolovev/Projects/2021-june/';
const InCPath = path.join(projectFolder, 'InC');

const InCNotes = {}
const InCDurations = {}

let commentReplacer = new RegExp("(^#.*)|(\r\n)", "gm")

const files = fs.readdirSync(InCPath);
files.forEach(function (file) {
	const data = fs.readFileSync(path.join(InCPath, file), 'utf8');
	const key = Number(file.replace('.txt', ''))
	let parts = data.replace(commentReplacer, ' ').trim().split(' ')
	parts = parts.filter(s => s.length > 0).filter(s => !s.includes('R')).map(s => s.replace('-', ''))
	const pitches = parts.map(notes => notes.split(',')[0])
	const durs = parts.map(notes => notes.split(',')[1].concat('/8'))
	InCNotes[key] = pitches
	InCDurations[key] = durs
});



const urls = [
	'https://distortedblur.wixsite.com/ptpo-june-2021/_functions/avg_key'
]

var interval = 10 * 1000; // 10 seconds;
async function sleep(millis) {
	return new Promise(resolve => setTimeout(resolve, millis));
}

maxAPI.addHandler('stop', () => {
	console.log('exiting')
	process.kill(process.pid, 'SIGTERM')
});

async function main() {
	console.log("Reciever function has started")
	while (true) {
		for (const url of urls) {
			console.log(url)
			await fetch(url, {
				method: 'GET',
				headers: { 'Accept': 'application/json' }
			}).then(res => {
				return res;
			})
				.then(res => res.json())
				.then(json => {
					console.log(json)
					return json;
				})
				.then(json => {
					const nearestPart = Math.round(json.result)
					const notes = InCNotes[nearestPart]
					const durs = InCDurations[nearestPart]
					maxAPI.outlet({"notes": notes, "durs": durs})
				})
				.catch(err => console.log(err))
			await sleep(interval);
		}
	}
}

main()