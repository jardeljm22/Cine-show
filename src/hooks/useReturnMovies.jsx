import { useCallback, useEffect,useState } from "react";
import{ 
    getFilmesBemAvaliados
    ,getFilmesLancamentos
    ,getFilmesPopulares,
    getProcuraFilmePorNome
} from '../services/service'

export function useReturnMovies({ typeOfSearchMovie,nameMovie,pageInicial }) {

    const [page,setPage] = useState( () => pageInicial ?? 1); // se tiver um valor valido em page inicial seta, se nao seta 1,usando funcao para evitar chamar toda vez 
    const [totalPages,setTotalPages] = useState(0);
    const [listMovies,setListMovies] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    const searchData =  useCallback( async (valuePage) => { 
                switch(typeOfSearchMovie){
            case '1' :
                return getFilmesLancamentos(valuePage);
            case '2' :
                return  getFilmesPopulares(valuePage);
            case '3' :
                return getFilmesBemAvaliados(valuePage);
            default :
                return  getProcuraFilmePorNome(nameMovie,valuePage);
        }
    },[typeOfSearchMovie,nameMovie])



    useEffect(()=>{
        setPage( 1 )
    },[typeOfSearchMovie,nameMovie])


   
    useEffect(()=>{
        window.scrollTo(0,0);

            const search = async () =>{
            setLoading(true);
            setError(null);
            try{
                const results = await searchData(page);
                    setListMovies(results?.results);
                    setTotalPages(results?.total_pages);
            }catch(error){
                console.error('Erro ao buscar os filmes:', error);
                setError('Ocorreu um erro ao buscar os filmes. Por favor, tente novamente.');
            }finally{
                setLoading(false);// terminou tudo certo
            }
        }
        search( );

    },[page,searchData]);

    return{listMovies,totalPages,page,setPage,loading,error}
}
