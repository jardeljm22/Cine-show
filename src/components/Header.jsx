/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState} from "react";
import  '../Styles/Header.css';
import { Link, useNavigate } from 'react-router-dom'
import {ChevronDown,Menu ,X} from'lucide-react'
import logo from '../assets/logo.png'
import { useVerifyScreen } from "../hooks/useVerifyScreen";

const Header = () => {

    const [nomeFilme,setNomeFilme] = useState('');
    const [galeriaFilmes,setGaleriaFilmes] = useState(false);
    const [mensageAlertaNomeVazio,setMensageAlertaNomeVazio] = useState(false)
    const [menu,setMenu] = useState(false);
    const [optionsMenuFilmes,setOptionsMenuFilmes] = useState(false);
    const [optionsMenuSeries,setOptionsMenuSeries] = useState(false);
    const navigate = useNavigate();
    const isMobile = useVerifyScreen(); // verifica se a tela aumentou acima de 678 para remover o menu central caso a tela aumente e ele esteja ativado

    const procurarFilme = (nome) =>{  // funcao q vai buscar o filme desejado
        if(nomeFilme.length === 0 ){  // verificando se o input do nome do filme está vazio
            setMensageAlertaNomeVazio(true)
        }else{
            const  nomeTratado = nome.trim().toLowerCase()    // removendo espacos e colocando tudo em minusculo
                navigate(`/movies/${nomeTratado}`);
        }
    }

    const mostrarMenuFilme = ()=>{
        setGaleriaFilmes(!galeriaFilmes);
    }
    const fechaMenu = () =>{
        setMenu(false) 
        setOptionsMenuFilmes(false)
        setOptionsMenuSeries(false)
    }

    useEffect(()=>{
        if(!isMobile){
            fechaMenu(); // quando nao tiver no mobile e a tela aumentar acima de 850px o menu central e os options do menu filmes e series serao fechados
        }
    },[isMobile]);

    return (
        <header className="header">

            <div className="div-logo">
                <Link to={'/'} className="logo-do-site" > <img src={logo} alt="logo do site" /> </Link>
            </div>
            <div className="header-div-Buscar-filme" >
                <div className={ `${mensageAlertaNomeVazio?'mensage-alerta-header-visivel':''} mensage-alerta-header` } >
                    <strong>digite algum nome antes de pesquisar</strong>
                </div>
                <label htmlFor="nome-filme">
                    <input id="nome-filme" type="text" value={nomeFilme}  onChange={(e)=>{
                        if(mensageAlertaNomeVazio===true){
                            setMensageAlertaNomeVazio(false)
                        }
                        setNomeFilme(e.target.value)
                    }}  placeholder="nome do filme "/>
                </label>
                <button onClick={()=>procurarFilme(nomeFilme)} >procurar</button>
            </div >
            <div className={ `div-menu-central-on ${ menu?'' : 'div-menu-central-off' }` } >
                <div className="nav-information">
                    <X className="close-menu" onClick={fechaMenu} / >
                    <div className="options">
                        <strong onClick={()=>setOptionsMenuFilmes(!optionsMenuFilmes)}>Filmes <ChevronDown className={`seta ${optionsMenuFilmes?'gira-seta' :''}` }/></strong>
                        <ul className={`  ${optionsMenuFilmes ?'options-filmes':'options-filmes-off'}`} >
                            <li ><Link to={'/movies/typeOfSearch/1'} className="links-filmes-header"  onClick={()=>setMenu(false)} >Lançamentos</Link></li>
                            <li  ><Link to={'/movies/typeOfSearch/2'}  className="links-filmes-header" onClick={()=>setMenu(false)} >Populares</Link> </li>
                            <li  ><Link to={'/movies/typeOfSearch/3'}  className="links-filmes-header" onClick={()=>setMenu(false)} >Top avaliados</Link></li>
                        </ul>
                        <strong onClick={()=>setOptionsMenuSeries(!optionsMenuSeries)}>Séries <ChevronDown className={`seta ${optionsMenuSeries?'gira-seta' :''}` }/></strong>
                        <ul className={`  ${optionsMenuSeries ?'options-filmes':'options-filmes-off'}`} >
                            <li><Link to='/series' className="links-filmes-header"  onClick={()=>setMenu(false)} >Lançamentos</Link></li>
                            <li><Link to='/series'  className="links-filmes-header" onClick={()=>setMenu(false)} >Populares</Link> </li>
                            <li><Link  to='/series'  className="links-filmes-header" onClick={()=>setMenu(false)} >Top avaliados</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Menu className="menu-icon-header" onClick={()=>setMenu(true)}/>
                
            <nav className="navbar">
                <div className="div-filmes"  >
                    <div className="btn-filmes" onClick={mostrarMenuFilme}>
                        <strong className="link-filme-header"  >Filmes</strong>
                        <ChevronDown className={`icone-seta-filmes ${galeriaFilmes ?'girar' :''} `} />
                    </div>
                    <ul className={` ${galeriaFilmes ? 'mostra-secao-filmes' : 'secao-de-filmes'} `} onMouseLeave={mostrarMenuFilme} >
                        <li> <Link to={'/movies/typeOfSearch/1'} className="links-filmes-header"   >Lançamentos</Link></li> 
                        <li> <Link to={'/movies/typeOfSearch/2'}  className="links-filmes-header" >Populares</Link></li> 
                        <li><Link to={'/movies/typeOfSearch/3'}  className="links-filmes-header" >Top avaliados</Link></li> 
                    </ul>
                </div>
                <Link to='/series' className="link-filme-header" ><strong>séries</strong></Link>
            </nav>
        </header>
        )
}

export default Header;
    