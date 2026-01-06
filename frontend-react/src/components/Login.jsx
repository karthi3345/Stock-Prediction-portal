import {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import { useContext } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate()
  const[errors, setErrors]=useState()
  const{isLoggedIn,setIsLoggedIn}=useContext(AuthContext)


  const handleLogin= async (e)=>{
    e.preventDefault()
    setLoading(true)
    const userData={username , password}
    console.log(userData)
    try{
      const response = await axios.post("http://127.0.0.1:8000/api/v1/token/", userData) //wait for response fro backend so we use await
      console.log(response.data)
      localStorage.setItem("accessToken",response.data.access)
      localStorage.setItem("refreshToken", response.data.refresh);

      console.log("login successful")
      setIsLoggedIn(true)
      navigate('/')
    }
    catch(error){
            console.error("invalid")
            setErrors("invalid credentials")
    }

    finally{
      setLoading(false)
    }

  }
  
  return (
    
     <>
    <div className="container">
        <div className="row justify-content-center">
          
        <div className='col-md-6 bg-light-dark p-5 rounded'>
        <h3 className='text-light text-center mb-4' > Create an Account</h3>
        <form onSubmit={handleLogin}>
           <div className="mb-3">
             <input type="text"  className='form-control mb-3 rounded' placeholder='Enter the UserName' value={username} onChange={(e)=>setUsername(e.target.value)}/>
             
           </div>
        
                <input type="password"  className='form-control mb-5' placeholder='Set Passsword' value={password} onChange={(e)=>setPassword(e.target.value)}/>
              
             { errors  && <div className="text-danger"> invalid crediential</div>}
             { loading ?(
                     <button type='submit' className='btn btn-info d-block mx-auto' disabled> <FontAwesomeIcon icon={faSpinner}/> Logging ib...</button>
             ):(

                <button type='submit' className='btn btn-info d-block mx-auto'>Login</button> 
             )

             }


             {/* When loading = true → button is disabled and text shows Registering...

              When loading = false → normal button shows Register */}
             
        </form>
        </div>



        </div>



    </div>




    </>
  )
}

export default Login