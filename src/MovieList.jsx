import { useState, useEffect } from 'react'
import TMDB from './TMDB.js'

function MovieList({ title, endpoint, query, onClick }) {
  const [cards, setCards] = useState(<p>Carregando...</p>)

  function prev(evt) {
    const row = evt.target.parentElement;
    row.scrollLeft -= row.clientWidth;
  }

  function next(evt) {
    const row = evt.target.parentElement;
    row.scrollLeft += row.clientWidth;
  }

  function handleScroll(evt) {
    const row = evt.target;
    const prev = row.children[0];
    const next = row.children[1];

    if (row.scrollLeft <= 20) {
      prev.classList.add('hide');
    } else {
      prev.classList.remove('hide');
    }
    if (row.scrollLeft >= row.scrollWidth - row.clientWidth - 20) {
      next.classList.add('hide');
    } else {
      next.classList.remove('hide');
    }
  }

  useEffect(() => {
    if (query) {
      query = '&query=' + query
    } 

    fetch(TMDB.API_URL + endpoint + '?language=pt-BR&page=1' + query, TMDB.FETCH_OPTIONS)
      .then(response => response.json())
      .then(response => {
        let cards = [
          <span key='prev' className='prev hide' onClick={prev}>&lsaquo;</span>,
          <span key='next' className='next' onClick={next}>&rsaquo;</span>
        ];
        response.results.forEach((movie) => {
          const imgUrl = movie.backdrop_path ? 
                         TMDB.IMG_URL + 'w355_and_h200_multi_faces/' + movie.backdrop_path : 
                         '/assets/noimg.png'

          cards.push(
            <div className='card' key={movie.id} onClick={() => {onClick(movie.id)}}>
              <img loading="lazy" src={imgUrl}></img>
              <p>{movie.title || movie.name}</p>
            </div>
          )
        });
        if (response.results.length == 0) {
          cards = <p>Oops! Não encontramos o que você estava buscando.</p>
        }
        setCards(cards);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section>
      <h3>{title}</h3>
      <div className='row' onScroll={handleScroll}>
        {cards}
      </div>
    </section>
  )
}

export default MovieList