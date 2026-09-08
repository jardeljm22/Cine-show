

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
    populares : 'movie/popular' ,       //  tipo de busca  (  2  )   // url para buscar filmes populares
    topAvaliados : 'movie/top_rated',   //  tipo de busca  (  3  )
    seriesPopulares : 'tv/popular', //  tipo de busca      (  4  )
    seriesBemAvaliadas : 'tv/top_rated', //  tipo de busca (  5  )
    seriesLancamentos : 'discover/tv', //  tipo de busca (  6  )
    filmes_series_por_nome :'search/multi',  //  procura filmes e series por nome
    detalhes : (id) => `movie/${id}`, // colocar a variavel id do filme depois
    elenco : (id) => `movie/${id}/credits`, // colocar a variavel id do filme depois
    detalhesSerie : (id) => `tv/${id}`, // colocar a variavel id da serie depois
    temporadasSerie : (id_serie,temp) => `tv/${id_serie}/season/${temp}`, // colocar a variavel id da serie depois
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

 // função de buscar series populares | tipo de busca (  4  )
export const getSeriesPopulares = async (page=1) =>{
    const { data } = await axiosTmdb.get(endpoints.seriesPopulares , { params : { page }});
    return data;
}
 // função de buscar series mais bem avaliadas | tipo de busca (  5  )
export const getseriesBemAvaliadas = async (page=1) =>{
    const { data } = await axiosTmdb.get(endpoints.seriesBemAvaliadas  , { params : { page }})
    return data ;
}         
 // função de buscar series em lançamento | tipo de busca (  6  )
export const getSeriesLancamentos = async ( page = 1) => {
    const { data } = await axiosTmdb.get( endpoints.seriesLancamentos , { params : { 
            page,
            sort_by: 'first_air_date.desc',
            'first_air_date.gte': '2026-01-01',
            'first_air_date.lte': '2026-09-07'  }}) 
    return data ;
}

export const getProcuraFilmePorNome = async (nome,page=1) =>{
    const { data } = await axiosTmdb.get(endpoints.filmes_series_por_nome ,{params : { query : nome , page }});
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
