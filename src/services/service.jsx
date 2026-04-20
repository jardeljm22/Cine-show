

import axios from 'axios';



const axiostmdb = axios.create({
    baseURL: import.meta.env.VITE_TMDB_BASE_URL, // RECEBENDO A BASE URL DA .ENV
    params:{  
        api_key :  import.meta.env.VITE_TMDB_API_KEY, // RECEBENDO A API KEY DA .ENV
        language : 'pt-BR',
    }       
})   

//  verificar o tipo de busca na documentacao abaixo e ao lado das urls 

const urlFilmesLancamento = 'movie/now_playing';      //  tipo de busca (  1  )
const urlFilmesPopulares = 'movie/popular' ;          //  tipo de busca (  2  )   // url para buscar filmes populares
const urlBuscarFilmesTopAvaliados = 'movie/top_rated' //  tipo de busca (  3  )
const urlBuscarFilmePorNome = 'search/movie?';  //  colocar a variavel nome do filme depois dela
const urlDetalhesDeUmFilme = 'movie/';                //  buscar detalhes de um filme (colocar a variavel id do filme )
//const urlBuscarFilmesPorGenero = 'genre/movie/list';

//  função de buscar filmes em lançamento | tipo de busca ( 1 )
export const getFilmesLancamentos = async (page=1) =>{
    const lancamentos = await axiostmdb.get(urlFilmesLancamento ,{ params :{page : page }} )
    return  lancamentos.data;
}
// função de buscar filmes populares | tipo de busca ( 2 )
export const getFilmesPopulares = async ( page=1 ) => {
    const filmesPopulares = await axiostmdb.get(urlFilmesPopulares,{params : {page: page}});
    return filmesPopulares.data;
}
//  busca filmes mais bem avaliados |  tipo de busca ( 3 )
export const getFilmesBemAvaliados = async (page=1) =>{

    const resultado = await axiostmdb.get(urlBuscarFilmesTopAvaliados ,{ params:{ page : page }})
    return  resultado;

}
  // função de procurar filme por nome | tipo de busca (  4  )
export const getProcuraFilmePorNome = async (nome,page=1) =>{
    const resultado = await axiostmdb.get(urlBuscarFilmePorNome ,{params : { query : nome ,page : page }});
    return  resultado;
}
export const getDetalhesFilme = async (id) => {
    const filme = await axiostmdb.get(urlDetalhesDeUmFilme + id);
    return filme;
}
// recebe o elenco e a producao do filme 
export const getElencoFilme = async (id) => {
    const elenco = await axiostmdb.get(`/movie/${id}/credits`);
    return  elenco.data;
}