import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';
import { addDoc, doc, collection, getDocs } from 'firebase/firestore';
import { database } from '../firebase/setup';
import { auth } from '../firebase/setup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Trailer from './Trailer';

function MovieDetail() {
  const [review, setReview] = useState("");
  const [reviewData, setReviewData] = useState([]);
  const location = useLocation();
  const movieRef = doc(database, "Movies", `${location.state.movie.id}`);
  const reviewRef = collection(movieRef, "Reviews");

  console.log(auth)

  const addReview = async () => {
    try {
      await addDoc(reviewRef, {
        movieReview: review,
        email: auth.currentUser?.email,
        username: auth.currentUser?.displayName,
        profile_image:auth.currentUser?.photoURL
      });
      toast.success("Review added succesfully",{
      theme:"dark"
     } )

      setReview("");
      showReview(); // Update the review list after adding a review
    } catch (err) {
      console.error(err);
    }
  }

  const showReview = async () => {
    try {
      const data = await getDocs(reviewRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setReviewData(filteredData);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    showReview();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <div style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://tmdb.org/t/p/original${location.state.movie?.poster_path})`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}>
            <ToastContainer autoClose={2000}/>
          <div style={{ paddingTop: "150px", paddingLeft: "30px", paddingRight: "10px", fontFamily: "initial" }}>
            <Grid container>
              <h1 style={{ color: "red", fontSize: "50px" }}>{location.state.movie?.original_title}</h1>
            </Grid>
            <div style={{ display: "flex" }}>
              <h4 style={{ color: "white" }}>Language: {location.state.movie?.original_language}</h4>
              <h5 style={{ color: "white" }}>Release Date: {location.state.movie?.release_date}</h5>
            </div>
            <Grid container>
              <h3 style={{ color: "black", fontWeight: "100" }}>{location.state.movie?.overview}</h3>
              {/*<Button variant='contained' sx={{ color: "black", bgcolor: "white" }}>Play Trailer</Button>*/}
              <Trailer location={location}/>
            </Grid>
          </div>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div style={{ backgroundColor: "white", height: "100vh", padding: "20px" }}>
          <Grid container>
            <div>
              <h5 style={{ color: "#A4A4A4", fontWeight: "100" }}>ADD REVIEW</h5>
              <TextField
                onChange={(e) => setReview(e.target.value)}
                value={review}
                size='small'
                label="Review"
                variant='outlined'
                style={{ backgroundColor: "white", borderRadius: "5px" }}
              />
              <Button onClick={addReview} sx={{ ml: "10px", bgcolor: "red", color: "white" }} variant='contained'>Submit</Button>
            </div>
          </Grid>
          <Grid container>
            <div>
              <h5 style={{ color: "#A4A4A4", fontWeight: "100" }}>REVIEWS</h5>
              {reviewData.map((each) => (
                <div key={each.id}>
                    <div style={{display:"flex"}}>
                    <img style={{width:"20px",borderRadius:"50px"}} alt={each.profile_image}/>
                  <li style={{ color: "grey",paddingLeft:"10px" }}>{each.username}</li>
                  </div>
                  <h6 style={{ color: "grey" }}>{each.movieReview}</h6>
                </div>
              ))}
            </div>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}

export default MovieDetail;
