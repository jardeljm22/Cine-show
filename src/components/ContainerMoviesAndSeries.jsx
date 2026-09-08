
import "../Styles/Filmes_component.css";
import { SkipBack,SkipForward }  from 'lucide-react';
import {useReturnContainerMoviesAndSeries} from "../hooks/useReturnContainerMoviesAndSeries";
import Loading from "./Loading";

const ContainerMoviesAndSeries = ({ typeOfSearch , nameMovie='' ,pageMovie}) =>{ // sempre será retornado ou tipo de filme ou o nome do filme

    const {listMovies,totalPages,page,setPage,detailsMovie,detailsSerie,loading,error} = useReturnContainerMoviesAndSeries({ typeOfSearchMovie :typeOfSearch, nameMovie,pageInicial : pageMovie})
                                                                       
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
    if(listMovies.length === 0){
        return (
            <div className="center-screen mensage-error">
                <h1  >nenhum filme encontrado com esse nome! tente novamente!</h1>
            </div>
        )
    }
    return (
        <article className="article-filmes"  >
            <hr />
            <div className="container-article-filmes" >
                {   listMovies?.map((movie)=>( 
                        <div key={movie.id} onClick={()=>{ 
                            if(movie.title){
                                detailsMovie(movie)
                            }else{
                                detailsSerie(movie)
                            }
                         }}  className="informations-article-filme" >
                            <img src={ `${import.meta.env.VITE_TMDB_URL_IMAGE}${movie.poster_path}` } alt={movie.title||movie.name} />
                            <h2>{ movie.title || movie.name }</h2>
                            <h2>{  movie.release_date ? movie.release_date.slice(0,4) : movie.first_air_date?.slice(0,4) }</h2>
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

export default ContainerMoviesAndSeries;