
import ComponentFilmes  from '../components/Filmes'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import Footer from '../components/footer'


const Filmes = ()=> {

    // eslint-disable-next-line no-unused-vars
    const { nomefilme ,tipoDeBusca } = useParams()
    
    
    return (

        <div>
            <Header/>
            <ComponentFilmes nomeFilme={nomefilme} tipoDeBuscaFilme={tipoDeBusca} />
            <Footer/>
        </div>
    )
}

export default Filmes ;