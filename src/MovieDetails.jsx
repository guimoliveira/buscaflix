import { useState, useEffect } from 'react'
import TMDB from './TMDB.js'

function MovieDetails({ type, id, onClose }) {
  const [img, setImg] = useState()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()

  useEffect(() => {
    setImg('/assets/noimg.png')
    setTitle('Carregando...')
    setDescription('')

    if (type) {
      fetch(TMDB.API_URL + type + '/' + id + '?language=pt-BR', TMDB.FETCH_OPTIONS)
        .then(response => response.json())
        .then(response => {
          const imgUrl = response.backdrop_path ? 
                        TMDB.IMG_URL + 'w780/' + response.backdrop_path : 
                        '/assets/noimg.png'
          setImg(imgUrl)
          setTitle(response.title || response.name)
          setDescription(response.overview)
        })
        .catch(err => console.error(err));
    }
  }, [type, id]);

  return (
    <section className={type ? 'backdrop' : 'hide'} onClick={onClose}>
      <div className='modal' onClick={(evt) => {evt.stopPropagation()}}>
        <img src={img} width='100%' />
        <span className='close' onClick={onClose}>x</span>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </section>
  )
}

export default MovieDetails