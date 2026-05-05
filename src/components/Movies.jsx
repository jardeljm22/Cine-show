
import "../Styles/Filmes_component.css";
import { SkipBack,SkipForward }  from 'lucide-react';
import { useNavigate } from "react-router-dom";
import {useReturnMovies} from "../hooks/useReturnMovies";
import Loading from "./Loading";

const Movies = ({ typeOfSearch , nameMovie='' ,pageMovie}) =>{ // sempre será retornado ou tipo de filme ou o nome do filme

    const navigate = useNavigate() 
    const {listMovies,totalPages,page,setPage,loading,error} = useReturnMovies({ typeOfSearchMovie :typeOfSearch, nameMovie,pageInicial : pageMovie})
                                                                       
    const detailsMovie = (id) =>{
        navigate(`/detailsMovie/${id}`) // direciona para a pagina detalhes do filme
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
                {   listMovies?.map((movie)=>( 
                        <div key={movie.id} onClick={()=>{detailsMovie(movie.id)}}  className="informations-article-filme" >
                            <img src={ `${import.meta.env.VITE_TMDB_URL_IMAGE}${movie.poster_path}` } alt={movie.title} />
                            <h2>{ movie.title }</h2>
                            <h2>{ movie.release_date?.slice(0,4) }</h2>
                        </div>
                    ))}
            </div>
            <div className="mudar-pagina-filmes" >
                <SkipBack className="botoes-pagina-filmes-left" onClick={()=>{ if(page >1){ setPage(page-1 )}}} />
                <h3>{page}</h3> 
                <h3>Total de páginas &nbsp; { totalPages }</h3>
                <SkipForward  className="botoes-pagina-filmes-right" onClick={()=>{ if(page < totalPages ){ setPage(page+1) }}}  />
            </div>
        </article>
    )
}

export default Movies;