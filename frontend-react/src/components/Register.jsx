import React,{useState} from 'react'
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";



const Register = () => {
    const [username,setUsername] =useState('')
    const[email,setEmail]=useState('')
    const[errors,setErrors]=useState({})
    const[password,setPassword]=useState('')
    const[success,setSuccess]=useState(false) 
    const[loading ,setLoading]=useState(false)
    // intailly it will be false
    const handleRegisteration= async (e)=>{
        e.preventDefault();
        setLoading(true);
    
        const userData ={
            username,email,password
        }
    
        try{

           const response=  await axios.post("http://127.0.0.1:8000/api/v1/register/", userData)
           console.log(response.data)
           console.log("register successfully")
           setErrors({})
            
        } catch(error){
            setSuccess(true)
            setErrors(error.response.data)
            console.log("failure",error.response.data)

        }finally{
            setLoading(false)
        }
    }
  return (
    <>
    <div className="container">
        <div className="row justify-content-center">
          
        <div className='col-md-6 bg-light-dark p-5 rounded'>
        <h3 className='text-light text-center mb-4' > Create an Account</h3>
        <form onSubmit={handleRegisteration}>
           <div className="mb-3">
             <input type="text"  className='form-control mb-3 rounded' placeholder='Enter the UserName' value={username} onChange={(e)=>setUsername(e.target.value)}/>
             <small>{errors.username && <div className="text-danger">{errors.username}</div>}</small>
           </div>
            <div className="mb-3">
                 <input type="email"  className='form-control mb-3' placeholder='Enter the email address' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
             <div className='mb-2'>
                <input type="password"  className='form-control mb-5' placeholder='Set Passsword' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                 <small className="mt-3">{errors.password && <div className="text-danger">{errors.password}</div>}</small>
             </div>
             {success && <div className='alert alert-success '>Registeration Succesful</div>}
             { loading ?(
                     <button type='submit' className='btn btn-info d-block mx-auto' disabled> <FontAwesomeIcon icon={faSpinner}/> Please Wait...</button>
             ):(

                <button type='submit' className='btn btn-info d-block mx-auto'>Register</button> 
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

export default Register