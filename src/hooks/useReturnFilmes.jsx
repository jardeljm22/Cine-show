import { useEffect, useState } from "react";
import{ 
    getFilmesBemAvaliados
    ,getFilmesLancamentos
    ,getFilmesPopulares,
    getProcuraFilmePorNome
} from '../services/service'
import "../Styles/Filmes_component.css"
import { useRef } from "react";

export function useReturnFilmes({ tipoDeBuscaFilme,nomeFilme,pageInicial }) {

    const [page,setPage] = useState(pageInicial?pageInicial:1);
    const [totalPagesDaBusca,setTotalPagesDaBusca] = useState()
    const [listaFilmes,setListaFilmes] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null)
    const nomeRef = useRef('')

 useEffect(()=>{
        window.scrollTo(0,0);
        const buscaFilmes = async () =>{
            setLoading(true);
            setError(null);
            try{
                let resultado ;
    
                switch(tipoDeBuscaFilme){
                    case '1' :
                         resultado = await getFilmesLancamentos(page);
                        break;
                    case '2' :
                         resultado = await getFilmesPopulares(page);
                         break;
                    case '3' :
                        resultado = await getFilmesBemAvaliados(page);
                        break;
                    default :
                        if(nomeRef.current !== nomeFilme){ // verifica se o nome do filme mudou para resetar a paginação, e atualizar o nome do filme na referencia caso tenha mudado
                            setPage(1);
                            nomeRef.current = nomeFilme;
                        }
                        resultado = await getProcuraFilmePorNome(nomeFilme,page);
                        console.log('esta funcionando',resultado)
                }

                    setListaFilmes(resultado.results);
                    setTotalPagesDaBusca(resultado.total_pages);
            }catch(error){
                console.error('Erro ao buscar os filmes:', error);
                setError('Ocorreu um erro ao buscar os filmes. Por favor, tente novamente.');
            }finally{
                setLoading(false);// terminou tudo certo
            }
        }
        buscaFilmes();

     // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page,tipoDeBuscaFilme,nomeFilme]);

    return{listaFilmes,totalPagesDaBusca,page,setPage,loading,error}

}
