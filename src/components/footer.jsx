
import '../Styles/Footer.css'
import { Link } from 'react-router-dom';
import { Copyright,Clapperboard } from 'lucide-react'

const Footer = () =>{

    return (
       <footer className="footer">
            <div className="footer-container">
                <h2 className="logo"><Clapperboard /> CineShow</h2>
                <div className="links-footer">
                    <Link className='link-footer' to="/">Início</Link>
                    <Link className='link-footer' to="/filmes/tipoDeBusca/1">Filmes</Link>
                    <Link className='link-footer' to="/series">Séries</Link>

                </div>
                <p className="copy" >
                    <Copyright size={13}/> 2026 CineShow &nbsp;• &nbsp;Desenvolvido por Jardel Mendes  •  Dados fornecidos por TMDB
                </p>
            </div>
            </footer> 

    )
}

export default Footer ;