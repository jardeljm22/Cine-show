
import "../Styles/Filmes_component.css"
import { SkipBack,SkipForward }  from 'lucide-react'
import { useNavigate } from "react-router-dom";
import {useReturnFilmes} from "../hooks/useReturnFilmes";
import Loading from "./Loading";

const Filmes = ({ tipoDeBuscaFilme , nomeFilme='' ,pageFilme}) =>{ // sempre será retornado ou tipo de filme ou o nome do filme

   
    const navigate = useNavigate() 
    const {listaFilmes,totalPagesDaBusca,page,setPage,loading,error} = useReturnFilmes({tipoDeBuscaFilme : tipoDeBuscaFilme,nomeFilme : nomeFilme,pageInicial : pageFilme})


    const detalhesFilme = (id) =>{
        navigate(`/detalhesFilme/${id}`) // direciona para a pagina detalhes do filme
    }


    if(loading){
        return <Loading/>
    }
    if(error){
        return (
            <div className="center-screen">
                <h1>{error}</h1>
            </div>
        )
    }
    return (
        <article className="article-filmes"  >
            <hr />
            <div className="container-article-filmes" >
                {   listaFilmes?.map((filme)=>( 
                        <div key={filme.id} onClick={()=>{detalhesFilme(filme.id)}}  className="informations-article-filme" >
                            <img src={ `${import.meta.env.VITE_TMDB_URL_IMAGE}${filme.poster_path}` } alt={filme.title} />
                            <h2>{ filme.title }</h2>
                            <h2>{ filme.release_date?.slice(0,4) }</h2>
                        </div>
                    ))}
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

export default Filmes;