import { useEffect, useState } from "react";
//import  {getFilmesLancamentos,getFilmesPopulares,getFilmesBemAvaliados} from '../services/service'
import '../Styles/Container.css';
import { useNavigate } from "react-router-dom";
import { useReturnMovies } from "../hooks/useReturnMovies";
import Loading from "./Loading";

const Container =  ({ typeOfSearchMovie,pageInicial })=>{

    const [nameDescription,setNameDescription] = useState('');
    const {listMovies,loading,error} = useReturnMovies({typeOfSearchMovie,pageInicial})
    const urlImage = import.meta.env.VITE_TMDB_URL_IMAGE;

    const navigate = useNavigate()

    const seeDetailsMovie = (id) =>{
        navigate(`/detailsMovie/${id}`)
    }

    const typeOfSearch = (tipo) =>{
        switch(tipo){
            case '1' :
                navigate('movies/typeOfSearch/1')
                break;
            case '2' :
                navigate('movies/typeOfSearch/2')
                break;
            case '3' :
                navigate('movies/typeOfSearch/3')
                break;
        }
    }

    useEffect(()=>{
        let results;
        switch(typeOfSearchMovie){   
            case '1' :
                results = 'Lançamentos'
                break;
            case '2' :
                results = 'Filmes Populares'
                break;
            case '3' :
                results = 'Filmes Bem Avaliados'
                break;
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNameDescription(results);
    },[]) ;   
    
    if(loading){
        return <Loading />
    }
    if(error){
        return(
            <div className="centraliza-div" >
                <h1>{error}</h1>
            </div> 
        ) 
    }
    return(
        <section className="section-container">
            <div className="description-container" >
                <h1 onClick={()=>{typeOfSearch(typeOfSearchMovie)}} >{ nameDescription  }</h1>
            </div>
            <div className="div-container">
                {listMovies?.map((movie)=>{
                    return (
                        <div  onClick={()=>{seeDetailsMovie(movie.id)}} key={movie.id} className="div-container-information" >
                            <img  src={`${urlImage}${movie.poster_path}`} alt="imagens do filme" />
                            <h3 > { movie.title } </h3>
                        </div>
                    )
                    })
                }
                <div  onClick={()=>{typeOfSearch(typeOfSearchMovie)}} className="div-container-information" >
                        <p style={{marginTop:'120px'}}>mais filmes...</p>      
                </div>
            </div>
        </section>
    )
    
}
export default Container;