import { useEffect, useState } from "react";
import  {getFilmesLancamentos,getFilmesPopulares,getFilmesBemAvaliados} from '../service/service'
import '../Styles/Container.css';
import { useNavigate } from "react-router-dom";


const Container =  ({ tipoDeBuscaFilme })=>{

    const [lista,setLista] = useState([]);
    const [nomeDescricao,setNomeDescricao] = useState('');
    const urlImage = import.meta.env.VITE_TMDB_URL_IMAGE;

    const navigate = useNavigate()

    const verDetalhesFilme = (id) =>{
        navigate(`/detalhesFilme/${id}`)

    }

    useEffect(()=>{

        switch(tipoDeBuscaFilme){
            case 1 :{
                const filme = async () =>{
                    const resultado = await getFilmesLancamentos();
                    setLista(resultado.data.results);
                    setNomeDescricao('Lançamentos')
                }
                filme();
                break;}
            case 2 :{
                const filme = async () =>{
                    const resultado  = await getFilmesPopulares();
                    setLista(resultado.data.results);
                    setNomeDescricao('Filmes Populares')
                }
                filme();
                break;}
            case 3 :{
                const filme = async () =>{
                    const resultado  = await getFilmesBemAvaliados();
                    setLista(resultado.data.results);
                    setNomeDescricao('Filmes Bem Avaliados');
                }
                filme();}
        }

    },[tipoDeBuscaFilme]);

    return(
        <section className="section-container">
            <div className="description-container" >
                <h1>{ nomeDescricao  }</h1>
            </div>
            <div className="div-container">

                {lista?.map((objeto)=>{
                    return (
                        <div  onClick={()=>{verDetalhesFilme(objeto.id)}} key={objeto.id} className="div-container-information" >
                            <img  src={`${urlImage}${objeto.poster_path}`} alt="imagens do filme" />
                            <h3 > { objeto.title } </h3>
                        </div>
                            )
                        }
                    )
                }
                
            </div>
        </section>
        

    )
}


export default Container;