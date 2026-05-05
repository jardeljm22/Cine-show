
import { useState } from "react";
import {Play} from 'lucide-react'
import '../Styles/DetalhesDoFilme.css'
import { useParams } from "react-router-dom";
import Footer from "../components/footer";
import Loading from "../components/Loading";
import { useDetailsMovie } from "../hooks/useDetailsMovie";


const DetailsMovies = () =>{

    const [assistir,setAssistir] = useState(false);
    const { id } = useParams()
    const { filme,diretor,loading,error,tempoFilme } = useDetailsMovie({id : id});


    const assistirFilme = () =>{
        setAssistir(!assistir);
    }

    if(loading){
        return (
            < div>
                <Loading/>
                <Footer/>
            </ div>
        )
    }
    if(error){
        return (   
            <div className="center-screen" >
                <div className="mensage-error-deltalhes-filme" >
                    <h1>{ error } <br/> tente novamente mais tarde. </h1>
                </div>
                <Footer/>
            </div> )
    }  
    return (
        <div className= 'filme-container' >          
            <div className="background-filme" >
                <img src={  filme?.backdrop_path&&`https://image.tmdb.org/t/p/original/${filme?.backdrop_path}`} alt="" />
            </div>
            <div className="information-filme" >
                <div className="dados-filme" >
                    <h1 className="titulo-filme" >{filme?.title}</h1>
                    <h3 className="data-tempo-filme" >{filme?.release_date?.slice(0,4)} &nbsp; - &nbsp;{tempoFilme} </h3>
                    <h2 className="genero-filme" > {filme?.genres?.map((gen)=>' ' + gen.name +' ').join(',')} </h2>
                    <h3><p className="descfilmes-description-filme" >{filme?.overview}</p></h3>
                    <div className="div-player" onClick={assistirFilme} >
                        <Play color="#ffffff" />
                        <h2>Assistir Filme</h2>
                    </div>
                    <div className="information-filme-nota-e-etc" >
                        <div className="row" >
                            <h2><strong>Nota&nbsp;:&nbsp;</strong></h2>
                            <h2 className="nota-filme" >{ filme?.vote_average?.toFixed(1) /* toFixed mostra quantas casas decimais foi pedido,no caso foi (1) */ }</h2>
                        </div>
                        <div className="row" >
                            <h2><strong>Diretor&nbsp;:&nbsp;</strong></h2>
                            <h2>{diretor?diretor : 'não encontrado'}</h2>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className={`${assistir? 'mostrar-div-player-filme': 'nao-mostrar-div-player-filme' }`} >
                <button onClick={assistirFilme} >fechar</button>
                {
                    assistir&&<iframe
                        src={`https://superflixapi.rest/filme/${filme?.imdb_id}`}
                        title={filme?.title}
                        allowFullScreen
                        allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
                        frameBorder="0"
                        style={{ width: '95%', height: '800px', border: 0 }}
                ></iframe>
                }
            </div>
            <Footer/>
        </div>
    );
    }

export default DetailsMovies ;


