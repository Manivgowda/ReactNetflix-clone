import React, { useEffect, useState } from 'react';
import { Box, Card, CardMedia, Grid } from "@mui/material";
import { Link } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';
import { database } from '../firebase/setup';

function Home() {
  const [movies, setMovies] = useState([]);

  const getMovie = () => {
    try {
      fetch("https://api.themoviedb.org/3/discover/movie?api_key=2df3f43b7e849c30a9816dc86d93e1b4")
        .then(res => res.json())
        .then(json => setMovies(json.results));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getMovie();
  }, []);

  const addMovie = async (movie) => {
    console.log(movie)
    const movieRef = doc(database, "Movies", `${movie.id}`);
    try {
      await setDoc(movieRef, {
        movieName: movie.original_title
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ backgroundColor: "#181818" }}>
      <Grid container spacing={2}>
        {movies.map((movie) => {
          addMovie(movie); 
          return (
            <Grid item xs={3} key={movie.id}>
              <Box>
                <Link to="/movieDetail" state={{ movie: movie }}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}>
                    </CardMedia>
                  </Card>
                </Link>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Home;
