import { useState } from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import MovieList from './MovieList.jsx'
import MovieDetails from './MovieDetails.jsx'

function App() {
  const [search, setSearch] = useState('')
  const [detailType, setDetailType] = useState()
  const [detailId, setDetailId] = useState()

  function detailMovie(id) {
    setDetailType('movie');
    setDetailId(id);
  }

  function detailTV(id) {
    setDetailType('tv');
    setDetailId(id);
  }
  
  const lists = search != '' ?
    (
      <>
        <h1>Resultado da busca</h1>
        <MovieList key={search + 'movie'} title='Filmes encontrados' endpoint='search/movie' query={search} onClick={detailMovie} />
        <MovieList key={search + 'tv'} title='Séries encontradas' endpoint='search/tv' query={search} onClick={detailTV} />
      </>
    ) : (
      <>
        <h1>Só na Buscaflix</h1>
        <p>
          Na Buscaflix você acha conteúdo original incrível, que não pode ser<br/>
          encontrado em nenhum outro lugar. Filmes, séries, especiais...<br/>
          Todos feitos especialmente para você!
        </p>
        <MovieList title='Em exibição' endpoint='movie/now_playing' onClick={detailMovie} />
        <MovieList title='Mais bem votados' endpoint='movie/top_rated' onClick={detailMovie} />
        <MovieList title='Séries para maratonar' endpoint='tv/on_the_air' onClick={detailTV} />
        <MovieList title='Filmes populares' endpoint='movie/popular' onClick={detailMovie} />
        <MovieList title='Próximos lançamentos' endpoint='movie/upcoming' onClick={detailMovie} />
        <MovieList title='Séries melhores avaliadas' endpoint='tv/top_rated' onClick={detailTV} />
      </>
    )

  return (
    <>
      <Header onSearch={(search) => {setSearch(search)}} />

      {lists}

      <MovieDetails type={detailType} id={detailId} onClose={() => {setDetailType()}} />

      <Footer />
      
    </>
  )
}

export default App