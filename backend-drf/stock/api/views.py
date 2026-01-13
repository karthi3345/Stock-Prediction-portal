from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework import status
from rest_framework.response import Response
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from datetime import datetime
from django.http import Http404
import os
from django.conf import settings
from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error
from sklearn.metrics import r2_score





# Create your views here.
class StockPerdictionAPIView(APIView):
   def post(self,request):
       serializer=StockPredictionSerializer(data=request.data)
       if serializer.is_valid():
           ticker=serializer.validated_data['ticker']
           
           #fetch the data from yfinance
           
           now=datetime.now()
           start=datetime(now.year-10,now.month,now.day)#2016 prediction with current
           end=now
           df = yf.download(ticker,start,end)
           print(df)
           if df.empty:
               return Response({"error" :'no data found from given ticker','status': status.HTTP_404_NOT_FOUND})
           
           df.reset_index()
           # genertae plot
           plt.switch_backend('AGG') # convert graph png format
           plt.figure(figsize=(12,5))
           plt.xlabel("Days")
           plt.ylabel('Close Price')
           plt.title(f'Closing Price of {ticker}')
           plt.plot(df.Close,label="Closing Price")
           plt.legend()
           
           
           #save the image plot file
           
           
           
          
           
           
           plot_img_path= f'{ticker}_plot.png'
           
        
        
           plot_img= save_plot(plot_img_path)
           
           
          
           
           ma100=df.Close.rolling(100).mean()
           
           plt.switch_backend('AGG') # convert graph png format
           plt.figure(figsize=(12,5))
           plt.xlabel("Days")
           plt.ylabel('Close Price')
           plt.plot(ma100,'r', label='100 DMA')
           plt.title(f'100 Days Moving Average {ticker}')  #average 100 days perdiction
           plt.plot(df.Close,label="Price")
           plt.legend()
           plot_img_path= f'{ticker}_100_dma.png'
           plot_100_dma= save_plot(plot_img_path)
           
           
           
           
             #average 200 days perdiction
             
           ma200=df.Close.rolling(200).mean()
             
           plt.switch_backend('AGG') # convert graph png format
           plt.figure(figsize=(12,5))
           plt.xlabel("Days")
           plt.ylabel('Close Price')
           plt.plot(ma100,'r', label='100 DMA')
           plt.plot(ma200,'g', label='200 DMA')
           plt.title(f'200 Days Moving Average {ticker}')  #average 200 days perdiction
           plt.plot(df.Close,label="Price")
           plt.legend()
           plt.grid()
           plot_img_path= f'{ticker}_200_dma.png'
    
           plot_200_dma= save_plot(plot_img_path)
           
           #calculating percentage change in each trading section
           
           df['Percentage Changed']=df.Close.pct_change()
           plt.figure(figsize=(12, 5))
           plt.plot(df['Percentage Changed'], label='Percentage Change', color='purple')
           plt.axhline(0, linestyle='--')   # zero reference line
           plt.xlabel("Days")
           plt.ylabel("Percentage Change (%)")
           plt.title(f'Percentage Change of {ticker}')
           plt.legend()
           plot_img_path= f'{ticker}_percentage_change.png'
           percent_change= save_plot(plot_img_path)
           
           
           #setting data for testing 
           
           data_training=pd.DataFrame(df.Close[0:int(len (df)*0.7)]);
           data_testing=pd.DataFrame(df.Close[int(len (df)*0.7): int(len(df))]);
           
           
           #scale down between o and 1
           
           scaler = MinMaxScaler(feature_range=(0,1))
           
          
           
           

# Get the project root directory (backend-drf)
           MODEL_PATH = os.path.join(settings.BASE_DIR, "stock_prediction_model.keras")
           
           close_price = df['Close'].values
           scaled_data = scaler.fit_transform(close_price.reshape(-1,1))

           

           print("MODEL PATH:", MODEL_PATH)
           print("MODEL EXISTS:", os.path.exists(MODEL_PATH))

           model = load_model(MODEL_PATH)
           
           
           
           #preparing test data
           
           past_100_days=data_training.tail(100)
           df_final=pd.concat([past_100_days,data_testing],ignore_index=True)
           input_data=scaler.fit_transform(df_final)
           
           
           x_test=[]
           y_test=[]
           for i in range(100,input_data.shape[0]):
              x_test.append(input_data[i-100:i]) #100 days
              y_test.append(input_data[i,0])
              
           x_test,y_test = np.array(x_test), np.array(y_test)
           
           
        # Make Predictions
           y_predicted = model.predict(x_test)
           
        # Reverse Transform
           y_predicted = scaler.inverse_transform(y_test.reshape(-1,1)).flatten() # back to original stock prices
           y_test=scaler.inverse_transform(y_test.reshape(-1,1)).flatten()+3
           
           
           
        #Plot the final prediction
        
        #    print("y_predicted--->",y_predicted)
        #    print("y_test--->",y_test)
           
           
           #Final prediction
             
           
           plt.switch_backend('AGG') # convert graph png format
           plt.figure(figsize=(12,5))
           plt.xlabel("Days")
           plt.ylabel('Price')
           plt.plot(y_test,'b', label='Original Price')
           plt.plot(y_predicted,'g', label='Predicted Price')
           plt.title(f'Final Prediction {ticker}')  #average 200 days perdiction
           plt.legend()
           plt.grid()
           plot_img_path= f'{ticker}_final_prediction.png'
    
           plot_prediction= save_plot(plot_img_path)
           
           
           
           #Model Evalution
           
           mse = mean_squared_error(y_test, y_predicted)
           rmse = np.sqrt(mse) 
           print("Mean Squared Error (MSE):", mse)
           rsquare = r2_score(y_test, y_predicted)
        
        
           
        

           
           
           

           

           
       return Response({'status':'success' ,'plot_img':plot_img,  'plot_100_dma': plot_100_dma, 'plot_200_dma': plot_200_dma, 'percent_change':percent_change,  
                        
                  'plot_prediction':plot_prediction, 'mse':mse, 'rsquare':rsquare ,'rmse':rmse
                  })
           
       