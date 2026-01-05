import React from 'react'
import Button from './Button'
import Header from './Header'
import Footer from './Footer'



const Main = () => {
  return (
   <>
 
    <div className='container'>
        <div className='p-5 text-center bg-light-dark rounded'>
            <h1 className='text-light'>Stock Prediction Portal</h1>
            <p className='text-light lead'>This is stock prediction application utlizes Machine learning techniques especially employing Keras, and LSTM model integrated with Django Framework
                it forcest on future stock prices by analyzing 100 days and 200 day moving averages ,used by stock analysis to infprm trading and investment decisions.
            </p>
             <Button text="Login" class="btn-outline-danger"/>
        </div>
    </div>
    
   </>
  )
}

export default Main