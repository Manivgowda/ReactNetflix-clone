import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button'; // Import the Button component
import netflix from "../images/netflix.png";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/setup'
import { signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {

  const logout = async()=>{
    try{
      await signOut(auth)
      toast.success("Loggedout successfully",{
        theme:"dark"
      })
     
    }catch(error){
      console.error(error)
  }
  }

  const navigate = useNavigate()
  const [movies, setMovies] = useState([]);

  const getMovie = () => {
    try {
      fetch("https://api.themoviedb.org/3/discover/movie?api_key=2df3f43b7e849c30a9816dc86d93e1b4")
        .then((res) => res.json())
        .then((json) => setMovies(json.results))
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  }
  const signinClick = ()=>{
    navigate("/signin")
  }

  useEffect(() => {
    getMovie();
  }, []);

  console.log(auth.currentUser?.email);

  return (
    <div style={{
      backgroundImage: `"linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)",url(https://image.tmdb.org/t/p/original${movies[0]?.poster_path})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: "500px",
      width: "100%"
    }}>
      <ToastContainer autoClose={2000}/>
        <div style={{display:"flex",justifyContent:"space-between",padding:"20px"}}>
        <img alt={{width:"90px",height:"90px"}} src={netflix}/>
        <div>
        {auth.currentUser?.emailVerfied ? <Button onClick={logout} color='error' variant='contained' sx={{height:"40px"}}>SignIn</Button>
        :<Button onClick={signinClick} varient='contained' color="error" sx={{height:"40px",marginLeft:"10px"}}>Logout</Button>}
        </div>
        </div>
        <div style={{padding:"20px"}}>
        <h1 style={{ color: "#F1F1F1", fontSize: "70px", fontFamily: "initial" }}>
  {movies[8]?.original_title}
</h1>
<h3 style={{ color: "#F1F1F1" }}>{movies[8]?.overview}</h3>

        </div>
        <Button variant='contained' sx={{ color: "red", bgcolor: "white", fontWeight: "bold" }}>play Trailer</Button>

    
    </div>
  );
}

export default Navbar;
