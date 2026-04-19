

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
    try{
        const lancamentos = await axiostmdb.get(urlFilmesLancamento ,{ params :{page : page }} )
        return {
            sucess : true,
            data  : lancamentos
        };
    }catch(error){
        console.log(error)
        return {
            sucess : false,
            erro : 'erro na busca de filmes em lançamento,volte e tente novamente'
        };
    }
}
// função de buscar filmes populares | tipo de busca ( 2 )
export const getFilmesPopulares = async ( page=1 ) => {
    try{
        const filmesPopulares = await axiostmdb.get(urlFilmesPopulares,{params : {page: page}});
        return {
            sucess : true,
            data : filmesPopulares
        } ;
    }catch(error){
        console.log('erro na require :',error);
        return {sucess :false ,
            erro : 'erro na busca de filmes populares,volte e tente novamente'
         } ;
    }
}
//  busca filmes mais bem avaliados |  tipo de busca ( 3 )
export const getFilmesBemAvaliados = async (page=1) =>{
    try{
        const resultado = await axiostmdb.get(urlBuscarFilmesTopAvaliados ,{ params:{ page : page }})
        return {
            sucess : true,
            data : resultado
        };
    }catch(error){
        console.log('erro na busca de filmes bem avaliados :',error)
        return {
            sucess :false ,
            erro : 'erro na busca de filmes bem avaliados,volte e tente novamente'
         } ;
    }
}
    // função de procurar filme por nome | tipo de busca (  4  )
export const getProcuraFilmePorNome = async (nome,page=1) =>{
    try{
        const resultado = await axiostmdb.get(urlBuscarFilmePorNome ,{params : { query : nome ,page : page }});
        return {
            sucess : true ,
            data : resultado
        } ;
    }catch(erro){
        console.log('erro',erro);
        return {
            sucess : false ,
            erro : 'erro inesperado na busca de filme por nome,volte e tente novamente'
        };
    }
}
export const getDetalhesFilme = async (id) => {
    try{
        const filme = await axiostmdb.get(urlDetalhesDeUmFilme + id);
        return {
            sucess : true ,
            data : filme
        } ;
    }catch(error){
        console.log('erro  da require detalhes filme :  ',error); 
        return {
            sucess : false ,    
            erro : 'ocorreu um erro  ao buscar os detalhes do filme,volte e tente novamente'
        };
    }
}
 
// recebe o elenco e a producao do filme 
export const getElencoFilme = async (id) => {

    try{
        const elenco = await axiostmdb.get(`/movie/${id}/credits`);
        return  elenco.data;

    }catch(erro){
        console.log('erro',erro)
        return  erro;
      
    }

}