import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import Youtube from "react-youtube";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Trailer({ location }) {
  const [trailerView, setTrailerView] = useState([]);
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const showTrailer = () => {
      fetch(`https://api.themoviedb.org/3/movie/${location.state.movie.id}/videos?api_key=2df3f43b7e849c30a9816dc86d93e1b4&language=en-US`)
        .then(res => res.json())
        .then(json => setTrailerView(json.results))
        .catch(error => {
          console.error(error);
        });
    }

    showTrailer();

  }, [location.state.movie.id]);

  return (
    <div>
      <Button variant='contained' sx={{ color: "black", bgcolor: "white" }} onClick={openModal}>PLAY TRAILER</Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <Youtube videoId={trailerView.length > 0 ? trailerView[0].key : ''} />
      </Modal>
    </div>
  );
}

export default Trailer;
