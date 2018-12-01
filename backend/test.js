et axios = require('axios')

let obj = ***REMOVED***
	input: "this is a test string"
***REMOVED***

axios.post("https://www.wolframcloud.com/objects/14a1f8f0-8172-46ea-8529-5afbd9dd2e43", obj)
	.then(console.log)
	.catch(console.error)
