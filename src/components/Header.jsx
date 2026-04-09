import { useState} from "react";
import  '../Styles/Header.css';
import { Link, useNavigate } from 'react-router-dom'
import {ChevronDown,Menu } from'lucide-react'
import logo from '../assets/logo.png'

const Header = () => {

    const [nomeFilme,setNomeFilme] = useState('');
    const [galeriaFilmes,setGaleriaFilmes] = useState(false);
    const [mensageAlertaNomeVazio,setMensageAlertaNomeVazio] = useState(false)
    const [menu,SetMenu] = useState(false);

    const navigate = useNavigate();

    const procurarFilme = (nome) =>{  // funcao q vai buscar o filmme desejado
        if(nomeFilme.length === 0 ){  // verificando se o input do nome do filme está vázio
            setMensageAlertaNomeVazio(true)
        }else{
            const  nomeTratado = nome.trim().toLowerCase()    // removendo espacos e colocando tudo em minusculo
                navigate(`/filmes/${nomeTratado}`);
        }
        
    }

    const mostrarMenuFilme = ()=>{
     
        setGaleriaFilmes(!galeriaFilmes);
    }

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
            </div  >
            <div className="div-menu-central" >
                <ul>
                    <li><Link to={'/filmes/tipoDeBusca/1'} className="links-filmes-header"   >Lançamentos</Link></li>
                    <li><Link to={'/filmes/tipoDeBusca/2'}  className="links-filmes-header" >Populares</Link> </li>
                    <Link to={'/filmes/tipoDeBusca/3'}  className="links-filmes-header" >Top avaliados</Link>
                </ul>
            </div> 
            <Menu className="menu-icon-header" onClick={''}/>
                
            <nav className="navbar">
                <div  className="div-filmes"  >
                    <div className="btn-filmes" onClick={mostrarMenuFilme}>
                        <strong   className="link-filme-header"  >Filmes</strong>
                        <ChevronDown className={`icone-seta-filmes ${galeriaFilmes ?'girar' :''} `} />
                    </div>
                    
                    <ul className={` ${galeriaFilmes ? 'mostra-secao-filmes' : 'secao-de-filmes'} `} onMouseLeave={mostrarMenuFilme} >
                        <li> <Link to={'/filmes/tipoDeBusca/1'} className="links-filmes-header"   >Lançamentos</Link></li> 
                        <li> <Link to={'/filmes/tipoDeBusca/2'}  className="links-filmes-header" >Populares</Link></li> 
                        <li><Link to={'/filmes/tipoDeBusca/3'}  className="links-filmes-header" >Top avaliados</Link></li> 
                    </ul>
                </div>
                <Link to='' className="link-filme-header" ><strong>series</strong></Link>
            </nav>
        </header>
    )
}

export default Header ;
