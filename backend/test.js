et axios = require('axios')

let obj = {
	input: "this is a test string"
}

axios.post("https://www.wolframcloud.com/objects/14a1f8f0-8172-46ea-8529-5afbd9dd2e43", obj)
	.then(console.log)
	.catch(console.error)
