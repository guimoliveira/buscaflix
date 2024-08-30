import { useRef } from 'react'

function Header({ onSearch }) {
  const timeoutRef = useRef()

  function onSubmit(evt) {
    evt.preventDefault()
  }

  function onChange() {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      onSearch(document.getElementById('searchBar').value.trim())
    }, 250)
  }

  return (
    <header>
        <img src='assets/logo.png' height='30px' />
        <form onSubmit={onSubmit} autoComplete="off">
          <input id='searchBar' type='text' placeholder='Pesquisa de séries e filmes' onChange={onChange}></input>
        </form>
        <div className='desktop'>
          SÉRIES E FILMES ILIMITADOS
        </div>
    </header>
  )
}

export default Header