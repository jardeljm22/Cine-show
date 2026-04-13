import { useEffect, useState } from "react";
import{ 
    getFilmesBemAvaliados
    ,getFilmesLancamentos
    ,getFilmesPopulares,
    getProcuraFilmePorNome
} from '../service/service'
import "../Styles/Filmes_component.css"
import { SkipBack,SkipForward }  from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Filmes = ({ tipoDeBuscaFilme , nomeFilme='' }) =>{ // sempre será retornado ou tipo de filme ou o nome do filme

    const [page,setPage] = useState(1);
    const [totalPagesDaBusca,setTotalPagesDaBusca] = useState()
    const [listaFilmes,setListaFilmes] = useState([]);
    const nomeRef = useRef('')
    const navigate = useNavigate() 

    const detalhesFilme = (id) =>{
        navigate(`/detalhesFilme/${id}`) // direciona para a pagina detalhes do filme
    }

    useEffect(()=>{
        window.scrollTo(0,0);
        if(tipoDeBuscaFilme){
            switch( tipoDeBuscaFilme ){
                case "1" : {
                    const filmes = async () =>{
                        const resultado = await getFilmesLancamentos(page);
                        setListaFilmes(resultado.data.results);
                        console.log('resultado de paginas totais :',resultado.data.total_pages)
                        setTotalPagesDaBusca(resultado.data.total_pages)
                    }
                    filmes();
                    break;
                }                          
                case "2" : {
                    const filmes = async () =>{
                        const resultado = await getFilmesPopulares(page);
                        setListaFilmes(resultado.data.results);
                        setTotalPagesDaBusca(resultado.data.total_pages)
                        console.log('resultado de total de paginas : ',resultado.data.total_pages)
                    }
                    filmes();
                    break;
                }

                case "3" : {
                    const filmes = async () =>{
                        const resultado = await getFilmesBemAvaliados(page);
                        setListaFilmes(resultado.data.results);
                        setTotalPagesDaBusca(resultado.data.total_pages)
                        console.log('resltado da paginas totais :' ,resultado.data.total_pages)
                    }
                    filmes();
                    break;
                }
            }
        }else{
            if( nomeRef.current !== nomeFilme){ // verificando se a nome pesquisado atualmente é diferente do nome pesquisado anteriormente para mudar o valor da página para 1
                setPage(1)
                nomeRef.current = nomeFilme ; // salvando o nome do filme pesquisado atualmente
            }
            
            const buscaFilme = async () => {
                const resultado = await getProcuraFilmePorNome(nomeFilme,page);
                setListaFilmes(resultado.data.results);
                setTotalPagesDaBusca(resultado.data.total_pages)
            }
            buscaFilme() 
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page,tipoDeBuscaFilme,nomeFilme]);

    useEffect(()=>{
    },[nomeFilme]);

    
    if(!listaFilmes){
        return (  <h1> Carregando ... </h1> )
    }else{
        if(listaFilmes[0]?.erro){
            return <h1> { listaFilmes[0].erro } </h1>
        }else{
                   return (
            <article className="article-filmes"  >
                <hr />
                <div className="container-article-filmes" >
                    {   listaFilmes?.map((filme)=>( 
                            <div key={filme.id} onClick={()=>{detalhesFilme(filme.id)}}  className="informations-article-filme" >
                                <img src={ `${import.meta.env.VITE_TMDB_URL_IMAGE}${filme.poster_path} `} alt={filme.title} />
                                <h2>{ filme.title }</h2>
                                <h2>{ filme.release_date?.slice(0,4) }</h2>
                            </div>

                            )
                        )
                    }

                </div>
                <div className="mudar-pagina-filmes" >
                    <SkipBack className="botoes-pagina-filmes-left" onClick={()=>{ if(page >1){ setPage(page-1 )}}} />
                     <h3>{page}</h3> 
                    <h3>Total de páginas &nbsp; { totalPagesDaBusca }</h3>
                    <SkipForward  className="botoes-pagina-filmes-right" onClick={()=>{ if(page < totalPagesDaBusca ){ setPage(page+1) }}}  />
                </div>
            </article>
        ) 
        }
    }
}

export default Filmes;