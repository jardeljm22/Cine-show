/* eslint-disable react-hooks/set-state-in-effect */
import  '../Styles/Header.css';
import { Link,} from 'react-router-dom'
import {ChevronDown,Menu ,X} from'lucide-react'
import logo from '../assets/logo.png'
import {useHeader} from '../hooks/useHeader'

const Header = () => {

    const {nomeFilme,
        setNomeFilme,
        procurarFilme,
        menu,
        setMenu,
        optionsMenuFilmes,
        setOptionsMenuFilmes,
        optionsMenuSeries,
        setOptionsMenuSeries,
        mensageAlertaNomeVazio,
        setMensageAlertaNomeVazio,
        fechaMenu,
        openMenu,
        menuOpen

    } = useHeader()

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
                            <li><Link to='/series/6' className="links-filmes-header"  onClick={()=>setMenu(false)} >Lançamentos</Link></li>
                            <li><Link to='/series/4'  className="links-filmes-header" onClick={()=>setMenu(false)} >Populares</Link> </li>
                            <li><Link  to='/series/5'  className="links-filmes-header" onClick={()=>setMenu(false)} >Top avaliados</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Menu className="menu-icon-header" onClick={()=>setMenu(true)}/>
                
            <nav className="navbar">
                <div className="div-filmes"  >
                    <div className="btn-filmes" onClick={()=>{openMenu('filmes')}}  >
                        <strong className="link-filme-header"  >Filmes</strong>
                        <ChevronDown className={`icone-seta-filmes ${ menuOpen === 'filmes' ?'girar' :''} `} />
                    </div>
                    <ul className={` ${menuOpen === 'filmes' ? 'mostra-secao-filmes' : 'secao-de-filmes'} ` } onMouseLeave={fechaMenu} >
                        <li> <Link to={'/movies/typeOfSearch/1'} className="links-filmes-header"   >Lançamentos</Link></li> 
                        <li> <Link to={'/movies/typeOfSearch/2'}  className="links-filmes-header" >Populares</Link></li> 
                        <li><Link to={'/movies/typeOfSearch/3'}  className="links-filmes-header" >Top avaliados</Link></li> 
                    </ul>
                </div>
                <div className="div-filmes" >
                    <div className="btn-filmes" onClick={()=>{openMenu('series')}} onMouseLeave={()=>{menu}} >
                        <strong className="link-filme-header"  >séries</strong>
                        <ChevronDown className={`icone-seta-filmes ${ menuOpen === 'series' ?'girar' :''} `} />
                    </div>
                    <ul className={` ${ menuOpen === 'series' ? 'mostra-secao-filmes' : 'secao-de-filmes'} `} onMouseLeave={fechaMenu}>
                        <li> <Link to={'/series/6'} className="links-filmes-header"   >Lançamentos</Link></li> 
                        <li> <Link to={'/series/4'}  className="links-filmes-header" >Populares</Link></li> 
                        <li><Link to={'/series/5'}  className="links-filmes-header" >Top avaliados</Link></li> 
                    </ul>
                </div>
                {/*<Link to='/series' className="link-filme-header" ><strong>séries</strong></Link>*/}
            </nav>
        </header>
        )
}

export default Header;
    