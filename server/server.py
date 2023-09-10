from flask import Flask, request, Response
from flask_restful import Api, Resource
from joblib import load
import pandas as pd
import dataprep as dataprep
from flask_cors import CORS


app = Flask(__name__)
CORS(app) #cors is needed to deal with the preflight request from the react client
api = Api(app)

#handle the preflight request for validation
@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res

# Load the exported model
model = load('model.joblib') 
print("The model has been loaded")

class Preds(Resource):
  def post(self):
    # get the json input
    json_ = request.json
    print(json_)

    # check that all necessary keys are there
    keys = ["brand", "year", "fuel", "gearbox", "mileage (kms)"]
    allContained = True
    for input in keys:
      if input not in json_:
        allContained = False
    # if not the return that there is a problem
    if(allContained != True):
       return "Not all keys were provided or some were in the incorrect format", 400
    
    try:
      #put input into a panda df
      json_ = pd.json_normalize(json_) 
      df = pd.DataFrame.from_dict(json_)
      # encode using the exported encoder
      df = dataprep.oneHotEncode(df)
      df.columns = df.columns.astype(str)
      # predict
      pred = model.predict(df)
      #return prediction and 200 
      return pred[0], 200 
    except:
       return "Your input was not in the correct format", 400 #if it fails then return error incorrect format
      




api.add_resource(Preds, '/predict')

if __name__ == "__main__":
  app.run(debug = True)