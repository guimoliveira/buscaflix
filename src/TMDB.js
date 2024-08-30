const TMDB = {
    API_KEY: '[INSIRA AQUI O SEU TOKEN DE LEITURA DA API]',
    API_URL: 'https://api.themoviedb.org/3/',
    IMG_URL: 'https://image.tmdb.org/t/p/',
};

TMDB.FETCH_OPTIONS = {
    method: 'GET', 
    headers: { accept: 'application/json', Authorization: 'Bearer ' + TMDB.API_KEY }
}

Object.freeze(TMDB);

export default TMDB;