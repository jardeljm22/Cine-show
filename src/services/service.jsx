

import axios from 'axios';



const axiosTmdb = axios.create({
    baseURL: import.meta.env.VITE_TMDB_BASE_URL, // RECEBENDO A BASE URL DA .ENV
    params:{  
        api_key :  import.meta.env.VITE_TMDB_API_KEY, // RECEBENDO A API KEY DA .ENV
        language : 'pt-BR',
    }       
})   

//  verificar o tipo de busca na documentacao abaixo e ao lado das urls 
const endpoints = {
    lancamentos : 'movie/now_playing',         //  tipo de busca (  1  )
    populares : 'movie/popular' ,       //  tipo de busca (  2  )   // url para buscar filmes populares
    topAvaliados : 'movie/top_rated',   //  tipo de busca (  3  )
    filmePorNome :'search/movie',  //  colocar a variavel nome do filme depois
    detalhes : (id) => `movie/${id}`, // colocar a variavel id do filme depois
    elenco : (id) => `movie/${id}/credits`, // colocar a variavel id do filme depois

}

//  função de buscar filmes em lançamento | tipo de busca ( 1 )
export const getFilmesLancamentos = async (page=1) =>{
    const { data } = await axiosTmdb.get(endpoints.lancamentos ,{ params :{ page }} )
    return  data;
}
// função de buscar filmes populares | tipo de busca ( 2 )
export const getFilmesPopulares = async ( page=1 ) => {
    const { data } = await axiosTmdb.get(endpoints.populares,{params : { page }});
    return data;    
}
//  busca filmes mais bem avaliados |  tipo de busca ( 3 )
export const getFilmesBemAvaliados = async (page=1) =>{

    const { data } = await axiosTmdb.get(endpoints.topAvaliados ,{ params:{ page }})
    return  data;

}
  // função de procurar filme por nome | tipo de busca (  4  )
export const getProcuraFilmePorNome = async (nome,page=1) =>{
    const { data } = await axiosTmdb.get(endpoints.filmePorNome ,{params : { query : nome , page }});
    return  data; 
}
export const getDetalhesFilme = async (id) => {
    const { data } = await axiosTmdb.get(endpoints.detalhes(id));
    return data;
}
// recebe o elenco e a producao do filme 
export const getElencoFilme = async (id) => {
    const { data } = await axiosTmdb.get(endpoints.elenco(id));
    return data;
}