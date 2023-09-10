import pandas as pd
import datetime
from sklearn.preprocessing import OneHotEncoder
import pickle
from sklearn.pipeline import Pipeline

def oneHotEncode(df):
    # get the file with the encoder and load it 
    file = open("encoder", "rb")
    enc = pickle.load(file) 

    # transform the necessary fields
    enc.transform(df[['brand', 'fuel', 'gearbox']]).toarray()
    X_features = pd.DataFrame(enc.transform(df[['brand', 'fuel', 'gearbox']]).toarray())
    # convert the year
    year = datetime.datetime.now().year
    df['age'] = year-df['year']
    X_num = df[['age', 'mileage (kms)']]
    # put the numerical and categorical features together
    X = pd.concat([X_num, X_features], axis=1)
    return X