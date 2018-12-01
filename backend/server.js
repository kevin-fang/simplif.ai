var app = require('express')()
var cors = require('cors')
var bodyParser = require('body-parser')

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
	console.log("Logging")
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