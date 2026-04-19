import { useEffect, useState } from "react";
//import  {getFilmesLancamentos,getFilmesPopulares,getFilmesBemAvaliados} from '../services/service'
import '../Styles/Container.css';
import { useNavigate } from "react-router-dom";
import { useReturnFilmes } from "../hooks/useReturnFilmes";


const Container =  ({ tipoDeBuscaFilme,page })=>{

    const [nomeDescricao,setNomeDescricao] = useState('');
    const {listaFilmes} = useReturnFilmes({tipoDeBuscaFilme : tipoDeBuscaFilme,pageInicial : page})
    const urlImage = import.meta.env.VITE_TMDB_URL_IMAGE;

    const navigate = useNavigate()

    const verDetalhesFilme = (id) =>{
        navigate(`/detalhesFilme/${id}`)
    }

    const tipoDeBusca = (tipo) =>{
        switch(tipo){
            case '1' :
                navigate('filmes/tipoDeBusca/1')
                break;
            case '2' :
                navigate('filmes/tipoDeBusca/2')
                break;
            case '3' :
                navigate('filmes/tipoDeBusca/3')
                break;
        }
    }

    useEffect(()=>{
        let resultado;
        switch(tipoDeBuscaFilme){   
            case '1' :
                resultado = 'Lançamentos'
                break;
            case '2' :
                resultado = 'Filmes Populares'
                break;
            case '3' :
                resultado = 'Filmes Bem Avaliados'
                break;
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNomeDescricao(resultado);
    },[]) ;   
    
    if(listaFilmes.sucess === true ){
        return(
            <section className="section-container">
                <div className="description-container" >
                    <h1 onClick={()=>{tipoDeBusca(tipoDeBuscaFilme)}} >{ nomeDescricao  }</h1>
                </div>
                <div className="div-container">
                    {listaFilmes?.data?.data?.results?.map((objeto)=>{
                        return (
                            <div  onClick={()=>{verDetalhesFilme(objeto.id)}} key={objeto.id} className="div-container-information" >
                                <img  src={`${urlImage}${objeto.poster_path}`} alt="imagens do filme" />
                                <h3 > { objeto.title } </h3>
                            </div>
                        )
                        })
                    }
                    <div  onClick={()=>{tipoDeBusca(tipoDeBuscaFilme)}} key={25} className="div-container-information" >
                          <p style={{marginTop:'120px'}}>mais filmes...</p>      
                    </div>
                </div>
            </section>
        )
    }else{
        return <h1> carregando dados ...</h1>
    }
}
export default Container;