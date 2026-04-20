
import { useState } from "react";
import {Play} from 'lucide-react'
import '../Styles/DetalhesDoFilme.css'
import { useParams } from "react-router-dom";
import Footer from "../components/footer";
import Loading from "../components/Loading";
import { useDetalhesFilmes } from "../hooks/useDetalhesFilmes";


const DetalhesDoFilme = () =>{

    const [assistir,setAssistir] = useState(false);
    const { id } = useParams()
    const { filme,diretor,loading,error,tempoFilme } = useDetalhesFilmes({id : id});


    const assistirFilme = () =>{
        setAssistir(!assistir);
    }

    if(loading){
        return <Loading/>
    }
    if(error){
        return <div className="center-screen" >
            <h1>{error}</h1>
            <Footer/>
        </div>
    }  
    return (
        <div className="filme-container">
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
                    assistir&&<iframe src={`https://superflixapi.rest/filme/${filme?.imdb_id}`} title={`${filme?.title}`} allowFullScreen={true} allow="autoplay; encrypted-media; picture-in-picture"  frameborder="0" style={{width:'95%',height:'800px',border:0 }}></iframe>
                }
            </div>
            <Footer/>
        </div>
    );
    }

export default DetalhesDoFilme ;


