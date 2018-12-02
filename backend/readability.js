var syllable = require('syllable')

let getAutomatedReadability = (sentence) => {
	/* 4.71 * (characters / words) + 0.5 * (words / sentences) - 21.43
	*/
	let numChars = 0
	let numWords = 0
	let numSentences = 0
	let letterNumber = /^[0-9a-zA-Z]+$/;
	for (let i = 0; i < sentence.length; i++) {
		let char = sentence[i]
		if (char.match(letterNumber)) {
			numChars++
		}
		if (char === " ") {
			numWords++
		}
		if (char === ".") {
			numSentences++
		}
	}
	//console.log(`chars: ${numChars}, words: ${numWords}, sentences: ${numSentences}`)
	words = sentence.split(" ")
	let score = 4.71 * (numChars / numWords) + 0.5 * (numWords / numSentences) - 21.43
	console.log(score)
	return score
}

let getNumSyllables = (word) => {
	word = word.toLowerCase();
	if (word.length <= 3) { 
		return 1; 
	}
	word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
	word = word.replace(/^y/, '');
    return word.match(/[aeiouy]{1,2}/g).length;
}

let getFleschKincaidReadability = (sentence) => {
	// 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
	let numWords = sentence.split(" ").length
	let numSentences = 0
	let numSyllables = 0
	for (let i = 0; i < sentence.length; i++) {
		let char = sentence[i]
		if (char === ".") {
			numSentences++
		}
	}
	let words = sentence.split(" ")
	for (let i = 0; i < words.length; i++) {
		let word = words[i]
		if (Number(word) != NaN) {
			numSyllables += syllable(word)
			//console.log(`word: ${word}, num syllables: ${syllable(word)}`)
		}
	}
	//console.log(numWords, numSentences, numSyllables)
	let score = 206.835 - 1.015 * (numWords / numSentences) - 84.6 * (numSyllables / numWords)
	return score
}


/*
let pca = "Principal component analysis (PCA) is a statistical procedure that uses an orthogonal transformation to convert a set of observations of possibly correlated variables (entities each of which takes on various numerical values) into a set of values of linearly uncorrelated variables called principal components. This transformation is defined in such a way that the first principal component has the largest possible variance (that is, accounts for as much of the variability in the data as possible), and each succeeding component in turn has the highest variance possible under the constraint that it is orthogonal to the preceding components. The resulting vectors (each being a linear combination of the variables and containing n observations) are an uncorrelated orthogonal basis set. PCA is sensitive to the relative scaling of the original variables. PCA was invented in 1901 by Karl Pearson,[1] as an analogue of the principal axis theorem in mechanics; it was later independently developed and named by Harold Hotelling in the 1930s.[2] Depending on the field of application, it is also named the discrete Karhunen–Loève transform (KLT) in signal processing, the Hotelling transform in multivariate quality control, proper orthogonal decomposition (POD) in mechanical engineering, singular value decomposition (SVD) of X (Golub and Van Loan, 1983), eigenvalue decomposition (EVD) of XTX in linear algebra, factor analysis (for a discussion of the differences between PCA and factor analysis see Ch. 7 of Jolliffe's Principal Component Analysis[3]), Eckart–Young theorem(Harman, 1960), or empirical orthogonal functions (EOF) in meteorological science, empirical eigenfunction decomposition (Sirovich, 1987), empirical component analysis (Lorenz, 1956), quasiharmonic modes (Brooks et al., 1988), spectral decomposition in noise and vibration, and empirical modal analysis in structural dynamics."

let milk = "Milk is a white liquid made by mammals, for example cows, dogs, and humans. It is made in the mammary glands (breasts, udders, or teats) of female mammals. Because newborn babies have no teeth, they must be given milk before they can eat solid food. Milk has many nutrients to help babies grow and be healthy. It is also a rich source of calcium which is good for your bones and teeth."
console.log(`PCA: automated: ${getAutomatedReadability(pca)}; flesch-kincaid: ${getFleschKincaidReadability(pca)}`)

console.log(getAutomatedReadability(milk))*/

module.exports = {
	getFleschKincaidReadability: getFleschKincaidReadability,
	getAutomatedReadability: getAutomatedReadability
}