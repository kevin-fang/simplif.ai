import sys

from google.cloud import automl_v1beta1
from google.cloud.automl_v1beta1.proto import service_pb2

def get_prediction(content):
	model_id = "TCN4903880984073480682"
	project_id = "simplif-ai-224215"
	prediction_client = automl_v1beta1.PredictionServiceClient()
	name = 'projects/***REMOVED******REMOVED***/locations/us-central1/models/***REMOVED******REMOVED***'.format(project_id, model_id)
	payload = ***REMOVED***'text_snippet': ***REMOVED***'content': content, 'mime_type': 'text/plain' ***REMOVED******REMOVED***
	params = ***REMOVED******REMOVED***
	request = prediction_client.predict(name, payload, params)
	complexity = request.payload[0].classification.score
	return ***REMOVED***
		"complex": 1 if complexity > 0.75 else 0
	***REMOVED***  # waits till request is returned

#print(get_prediction("this is a wonderful test"))