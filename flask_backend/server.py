from flask import Flask, request
from keras.models import load_model
from keras.preprocessing import sequence
import numpy as np
from nltk.stem import WordNetLemmatizer
import get_automl
lemmatizer = WordNetLemmatizer()

model = load_model("../generated_data/complexity_classifier.h5")

import pickle
with open('../generated_data/word_to_num.pkl', 'rb') as f:
	reverse_dict = pickle.load(f)

def get_sentence_complexity(sentence):
	print("sentence: {}".format(sentence))
	num_list = []
	for word in sentence.split(" "):
		word = word.lower()
		word = lemmatizer.lemmatize(word)
		if word in reverse_dict:
			num_list.append(reverse_dict[word])
	print("num list: {}".format(num_list))
	sentence = np.array(num_list)
	print("sentence {}".format(sentence))
	max_wiki_length = 100
	sentence = sequence.pad_sequences(np.array([sentence]), maxlen=max_wiki_length)
	print("sentence 2: {}".format(sentence))
	result = model.predict(sentence)[0][0]
	print("result: {}".format(result))
	return result
app = Flask(__name__)

@app.route('/getNeuralNetComplexity', methods=["POST"])
def get_neural_complexity():
	data = request.get_json()
	complexity = get_sentence_complexity(data['sentence'])
	print("complexity: {}".format(complexity))
	return str(complexity)

import os
os.environ['GOOGLE_APPLICATION_CREDENTIALS']='./simplif-ai.json'
@app.route('/getAutoMLComplexity', methods=["POST"])
def get_automl_complexity():
	data = request.get_json()
	complexity = get_automl.get_prediction(data['sentence'])
	return str(complexity)

if __name__ == "__main__":
	app.run("0.0.0.0")