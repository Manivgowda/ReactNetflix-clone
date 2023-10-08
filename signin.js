import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { Button } from '@mui/material'
import netflix from "../images/netflix.png"
import { auth, googleAuth } from '../firebase/setup'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signin() {

    const navigate = useNavigate()

    const googleSignin = async()=>{
        try{
            await signInWithPopup(auth,googleAuth)
                setTimeout(()=>{
                    auth.currentUser?.emailVerified  && navigate("/")
                },2000)
    toast.success("SignedIn succesfully")
        }catch(err){
            console.error(err)
        }
    }

    console.log(auth?.currentUser?.email)

    return (
        <div style={{backgroundColor:"black",height:"100vh",padding:"20px"}}>
            <ToastContainer autoClose={2000}/>
          <img style={{width:"100px",height:"100px"}} src={netflix} alt="Netflix Logo" />

            <div style={{position:"fixed",left:"45%",top:"35%"}}>
            <Button onClick={googleSignin} varient='contained' color='error'>Signin with google</Button>
            <br/>
            
            <h2 style={{color:"white"}}>Lets start to explore movies<br/> from here.</h2>
            </div>
            </div>   
    
    )
}

export default Signin