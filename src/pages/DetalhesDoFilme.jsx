
import { useEffect, useState } from "react";
import { getDetalhesFilme,getElencoFilme } from '../services/service';
import {Play} from 'lucide-react'
import '../Styles/DetalhesDoFilme.css'
import { useParams } from "react-router-dom";
import Footer from "../components/footer";
import Loading from "../components/loading";


const DetalhesDoFilme = () =>{

    const [filme,setFilme] = useState({});
    const [diretor,setDiretor] = useState(null);
    const [assistir,setAssistir] = useState(false);
    const [tempoFilme,setTempoFilme] = useState('')
    const [loading,setLoading] = useState(false);    
    const [error,setError] = useState(null);

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
        window.scrollTo(0,0)
        const buscaDetalhes = async ()=>{
            setLoading(true);
            setError(null);
            
                try {
                    const filme = await getDetalhesFilme(id);// buscando os detalhes do filme
                    converteHoras(filme.data.runtime);// convertendo o tempo do filme de minutos para horas e minutos
                    console.log(filme)
                    setFilme(filme);
                    const resposta = await getElencoFilme(id); // buscando o elenco do filme para encontrar o diretor
                    const diretor = resposta.crew?.find(dir=> dir.job === 'Director')// procurando o diretor no elenco do filme
                    setDiretor(diretor?.name)

                } catch (error) {
                    console.error('Erro ao carregar os detalhes do filme:', error);
                    setError('erro ao carregar os detalhes do filme ');
                }finally{
                    setLoading(false);
                }
                
        }
        buscaDetalhes();

    },[id,tempoFilme]);

    if(loading){
        return <Loading/>
    }
    if(error){
        return <div className="center-screen" >
            <h1>{error}</h1>
        </div>
    }  
    return (
        <div className="filme-container">
            <div className="background-filme" >
                <img src={  filme.data?.backdrop_path&&`https://image.tmdb.org/t/p/original/${filme.data?.backdrop_path}`} alt="" />
            </div>
            <div className="information-filme" >
                <div className="dados-filme" >
                    <h1 className="titulo-filme" >{filme.data?.title}</h1>
                    <h3 className="data-tempo-filme" >{filme.data?.release_date?.slice(0,4)} &nbsp; - &nbsp;{tempoFilme} </h3>
                    <h2 className="genero-filme" > {filme.data?.genres?.map((gen)=>' ' + gen.name +' ').join(',')} </h2>
                    <h3><p className="descfilmes-description-filme" >{filme.data?.overview}</p></h3>
                    <div className="div-player" onClick={assistirFilme} >
                        <Play color="#ffffff" />
                        <h2>Assistir Filme</h2>
                    </div>
                    <div className="information-filme-nota-e-etc" >
                        <div className="row" >
                            <h2><strong>Nota&nbsp;:&nbsp;</strong></h2>
                            <h2 className="nota-filme" >{ filme.data?.vote_average?.toFixed(1) /* toFixed mostra quantas casas decimais foi pedido,no caso foi (1) */ }</h2>
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
                    assistir&&<iframe src={`https://superflixapi.rest/filme/${filme.data.imdb_id}`} title={`${filme.data.title}`} allowFullScreen={true} allow="autoplay; encrypted-media; picture-in-picture"  frameborder="0" style={{width:'95%',height:'800px',border:0 }}></iframe>
                }
            </div>
            <Footer/>

        </div>
    );
    }

export default DetalhesDoFilme ;


