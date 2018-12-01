var app = require('express')()
var cors = require('cors')
var bodyParser = require('body-parser')
var FormData = require('form-data')
var querystring = require('querystring')
var axios = require('axios')
var request = require('request');


app.use(cors())
app.use(bodyParser.urlencoded(***REMOVED*** extended: false ***REMOVED***));
app.use(bodyParser.json());

let vowels = ['a', 'e', 'i', 'o', 'u']

let getSentenceComplexity = (sentence) => ***REMOVED***
	let wordIsComplex = (word) => ***REMOVED***
		let difficultyThreshold = 4

		let numVowels = 0
		let numConsonants = 0
		let numConsecutiveConsonants = 0
		let maxConsecutiveConsonants = 0

		for (let i = 0; i < word.length; i++) ***REMOVED***
			let letter = word[i]
			if (vowels.includes(letter)) ***REMOVED***
				numVowels++
			***REMOVED*** else ***REMOVED***
				numConsonants++
				numConsecutiveConsonants++
				if (numConsecutiveConsonants > maxConsecutiveConsonants) ***REMOVED***
					maxConsecutiveConsonants = numConsecutiveConsonants
				***REMOVED***
			***REMOVED***
		***REMOVED***
		return numConsonants > numVowels || maxConsecutiveConsonants >= difficultyThreshold
	***REMOVED***
	let splitSentence = sentence.split(" ")
	let diffObject = splitSentence.map(wordIsComplex)
		.reduce((diffObject, currentIsComplex) => ***REMOVED***
			if (currentIsComplex) ***REMOVED***
				diffObject.numHard++
			***REMOVED*** else ***REMOVED***
				diffObject.numEasy++
			***REMOVED***
			return diffObject
		***REMOVED***, ***REMOVED***numHard: 0, numEasy: 0***REMOVED***)

	return ***REMOVED***"complexity": diffObject.numHard * 5 + diffObject.numEasy * 3***REMOVED***
***REMOVED***

console.log(getSentenceComplexity(""))

app.get('/', (req, res) => ***REMOVED***
	res.setHeader('Content-Type', 'text/html')
	res.send("Server successfully running!")
	console.log("Main page visited")
***REMOVED***)

let getWolframComplexity = (sentence, cb) => ***REMOVED***

	var options = ***REMOVED*** method: 'POST',
	  url: 'https://www.wolframcloud.com/objects/ed366ba1-1e31-457d-93d2-bef835726fef',
	  headers: 
	   ***REMOVED*** 'Content-Type': 'application/x-www-form-urlencoded' ***REMOVED***,
	  form: 
	   ***REMOVED*** Input: sentence***REMOVED*** ***REMOVED***;

	request(options, function (error, response, body) ***REMOVED***
	  if (error) throw new Error(error);

	  
	  cb(body)
	***REMOVED***);

***REMOVED***

app.post('/getWolframComplexity', async (req, res) => ***REMOVED***
	let postSentence = req.body.sentence
	res.setHeader('Content-Type', 'text/json')
	try ***REMOVED***
		getWolframComplexity(postSentence, results => ***REMOVED***
			console.log(`Wolfram complexity called with $***REMOVED***postSentence***REMOVED*** with complexity of $***REMOVED***results***REMOVED***`)
			res.send(JSON.stringify(results))
		***REMOVED***)
	***REMOVED*** catch (e) ***REMOVED***
		console.error(e)
		res.send(JSON.stringify(***REMOVED***error: e***REMOVED***))
	***REMOVED***
***REMOVED***) 

app.post('/getComplexity', (req, res) => ***REMOVED***
	let postSentence = req.body.sentence
	res.setHeader('Content-Type', 'text/json')
	let results = getSentenceComplexity(postSentence)
	console.log("Get complexity called with sentence:", postSentence)
	res.send(JSON.stringify(results))
***REMOVED***)

app.listen('80', () => ***REMOVED***
	console.log("server running")
***REMOVED***)