var app = require('express')()
var cors = require('cors')
var bodyParser = require('body-parser')
var FormData = require('form-data')
var querystring = require('querystring')
var axios = require('axios')
var request = require('request');
var readability = require('./readability.js')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let vowels = ['a', 'e', 'i', 'o', 'u']

let getSentenceComplexity = (sentence) => {
	let wordIsComplex = (word) => {
		let difficultyThreshold = 4

		let numVowels = 0
		let numConsonants = 0
		let numConsecutiveConsonants = 0
		let maxConsecutiveConsonants = 0

		for (let i = 0; i < word.length; i++) {
			let letter = word[i]
			if (vowels.includes(letter)) {
				numVowels++
			} else {
				numConsonants++
				numConsecutiveConsonants++
				if (numConsecutiveConsonants > maxConsecutiveConsonants) {
					maxConsecutiveConsonants = numConsecutiveConsonants
				}
			}
		}
		return numConsonants > numVowels || maxConsecutiveConsonants >= difficultyThreshold
	}
	let splitSentence = sentence.split(" ")
	let diffObject = splitSentence.map(wordIsComplex)
		.reduce((diffObject, currentIsComplex) => {
			if (currentIsComplex) {
				diffObject.numHard++
			} else {
				diffObject.numEasy++
			}
			return diffObject
		}, {numHard: 0, numEasy: 0})

	return {"complexity": diffObject.numHard * 5 + diffObject.numEasy * 3}
}

app.get('/', (req, res) => {
	res.setHeader('Content-Type', 'text/html')
	res.send("Server successfully running!")
	console.log("Main page visited")
})

let getWolframComplexity = (sentence, cb) => {

	var options = { method: 'POST',
	  url: 'https://www.wolframcloud.com/objects/25496950-6817-4820-8ea6-a3a81ad1f4ec',
	  headers: 
	   { 'Content-Type': 'application/x-www-form-urlencoded' },
	  form: 
	   { Input: sentence} };

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  
	  cb(body)
	});

}

let getNeuralNetComplexity = (sentence, cb) => {
	var options = { method: 'POST',
		url: 'http://35.231.145.97/getNeuralNetComplexity',
		headers: 
		{ 'Content-Type': 'application/json' },
		body: { sentence: sentence },
		json: true };

	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		cb(body)
	});
}

let getAutoMLComplexity = (sentence, cb) => {
	var options = { method: 'POST',
		url: 'http://35.231.145.97/getAutoMLComplexity',
		headers: 
		{ 'Content-Type': 'application/json' },
		body: { sentence: sentence },
		json: true };

	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		cb(body)
	});
}

app.post('/getAutoMLComplexity', async (req, res) => {
	let postSentence = req.body.sentence
	res.setHeader('Content-Type', 'text/json')
	try {
		getAutoMLComplexity(postSentence, results => {
			console.log(`AutoML complexity called with ${postSentence} with complexity of ${results}`)
			res.send(JSON.stringify({complexity: results}))
		})
	} catch (e) {
		console.error(e)
		res.send(JSON.stringify({error: e}))
	}
}) 

app.post('/getNeuralNetComplexity', async (req, res) => {
	let postSentence = req.body.sentence
	res.setHeader('Content-Type', 'text/json')
	try {
		getNeuralNetComplexity(postSentence, results => {
			console.log(`Neural net complexity called with ${postSentence} with complexity of ${results}`)
			let complex = 1
			if (Number(results) < 0.5) {
				complex = 0
			}
			res.send(JSON.stringify({complexity: complex}))
		})
	} catch (e) {
		console.error(e)
		res.send(JSON.stringify({error: e}))
	}
}) 

app.post('/getReadability', async (req, res) => {
	let postSentence = req.body.sentence
	console.log("Readability called with sentence", postSentence)
	let fleschKincaid = readability.getFleschKincaidReadability(postSentence)
	let automated = readability.getAutomatedReadability(postSentence)
	console.log(fleschKincaid, automated)
	res.setHeader('Content-Type', 'text/json')
	res.send(JSON.stringify({
		flesch: fleschKincaid,
		ari: automated
	}))
})

app.post('/getWolframComplexity', async (req, res) => {
	let postSentence = req.body.sentence
	res.setHeader('Content-Type', 'text/json')
	try {
		getWolframComplexity(postSentence, results => {
			console.log(`Wolfram complexity called with ${postSentence} with complexity of ${results}`)
			res.send(JSON.stringify({complexity: results}))
		})
	} catch (e) {
		console.error(e)
		res.send(JSON.stringify({error: e}))
	}
}) 

app.post('/getComplexity', (req, res) => {
	let postSentence = req.body.sentence
	res.setHeader('Content-Type', 'text/json')
	let results = getSentenceComplexity(postSentence)
	console.log("Get complexity called with sentence:", postSentence)
	res.send(JSON.stringify(results))
})

app.listen('80', () => {
	console.log("server running")
})