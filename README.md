# Junior AI Engineer Exercise

Welcome to the solution to the exercise for the Junior AI Engineer position. The provided application consists of three main parts:
- A server, where the trained model is hosted. This can respond to http requests with the necessary fields (Brand, Year, Fuel, Gearbox and Mileage) and will respond with the predicted price of the car with those characteristics. The server application was written using Flask.
- A web application that hosts a form on a local React instance. The user can input the their data onto the fields, click send and, assuming the aforementioned server is running, will get a response with the predicted price.
- Lastly, a Jupyter notebook with an improved version of the brief model is provided. 

## Execution instructions
To run this project, the user should have flask, cors, sklearn, pickle, joblib and react on their environment. This was accomplished using miniconda and pip but various other way are valid. To run the server go in to the server folder and run server.py using python. This can be access using the localhost address http://127.0.0.1:5000/predict.  To run the React webapp, go into the webapp folder and run npm start. To access it go to http://localhost:3000/. Finally the new model script can be accessed using Jupyter Notebook.

## Details on the improved model
This was mainly achieved through hyperparameter tuning and some data preparation. More steps can be taken to further improve the performance of the model but due to time constraints, some are not present here. More models and approaches should also be tested using automated software such as Optuna.
## Further Improvements
### Task 1
- Authentication both on the webapp and API
- Input sanitization
- Use of https
- Host on cloud with automated process for new models to be used
- Improvement of UI

### Task 2
- Use of Optuna to look into more models that may be a better fit
- Further data preprocessing
	- More was already implemented, such as oversampling and normalisation, but did not yield a significant improvement (more trials could prove beneficial on this)
- Intercorrelation of features should be looked into further