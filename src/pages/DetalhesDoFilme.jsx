
import { useEffect, useState } from "react";
import { getDetalhesFilme,getElencoFilme } from '../service/service';
import {Play} from 'lucide-react'
import '../Styles/DetalhesDoFilme.css'
import { useParams } from "react-router-dom";

const DetalhesDoFilme = () =>{

    const [filme,setFilme] = useState({});
    const [diretor,setDiretor] = useState('');
    const [assistir,setAssistir] = useState(false);
    const [tempoFilme,setTempoFilme] = useState('')

    const { id } = useParams()

    const assistirFilme = () =>{
        setAssistir(!assistir);
    }
    const converteHoras = (minuto) =>{
        let horas = 0;
        let hora = 60;
        let min = minuto;
        let v = true
        while (v){
            if(min >= hora){
                min-= hora;
                horas+=1
            }else{
                setTempoFilme(`${horas} h   ${min} min`)
                v = false;
            }
        }
    }

    useEffect(()=>{
        const buscaDetalhes = async ()=>{
            console.log("id recebido no  container : ",id)
            const filme = await getDetalhesFilme(id);
            converteHoras(filme.runtime);
            console.log(`o filme tem ${tempoFilme} `)
            setFilme(filme);
        }
        const diretorFilme = async (id) =>{
            const resposta = await getElencoFilme(id);
            const diretor = resposta.crew?.find(dir=> dir.job === 'Director')// procurando o diretor no objeto enviado
            setDiretor(diretor?.name)
        }
        diretorFilme(id);
        buscaDetalhes();

    },[id]);

        if(filme){

            return (
                <div className="filme-container">

                    <div className="background-filme" >
                        <img src={  filme.backdrop_path&&`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt="" />
                    </div>
                    <div className="information-filme" >
                        <div className="dados-filme" >
                            <h1 className="titulo-filme" >{filme.title}</h1>
                            <h3>{filme.release_date?.slice(0,4)} &nbsp; - &nbsp;{tempoFilme} </h3>
                            <h2 className="genero-filme" > {filme.genres?.map((gen)=>' ' + gen.name +' ').join(',')} </h2>
                            <h3><p>{filme.overview}</p></h3>
                            <div className="div-player" onClick={assistirFilme} >
                                <Play color="#ffffff" />
                                <h2>Assistir Filme</h2>
                            </div>
                            <div className="information-filme-nota-e-etc" >
                                <div className="row" >
                                    <h2><strong>Nota&nbsp;:&nbsp;</strong></h2>
                                    <h2 className="nota-filme" >{ filme.vote_average?.toFixed(1) /* toFixed mostra quantas casas decimais foi pedido,no caso foi (1) */ }</h2>
                                </div>
                                <div className="row" >
                                    <h2><strong>Diretor&nbsp;:&nbsp;</strong></h2>
                                    <h2>{diretor?diretor :'não encontrado'}</h2>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className={`${assistir? 'mostrar-div-player-filme': 'nao-mostrar-div-player-filme' }`} >
                        <button onClick={assistirFilme} >fechar</button>
                        {
                            assistir&&<iframe src={`https://superflixapi.rest/filme/${filme.imdb_id}`} title={`${filme.title}`} allowFullScreen={true} allow="autoplay; encrypted-media; picture-in-picture"  frameborder="0" scrolling="no" style={{width:'95%',height:'800px',border:0,borderRadius:'12px' }}></iframe>
                        }
                    </div>
                </div>
            );
        }else{
            return ( <h1>carregando...</h1> )
        }
        
    }
        

export default DetalhesDoFilme ;


