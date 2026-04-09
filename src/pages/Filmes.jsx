
import ComponentFilmes  from '../components/Filmes'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'

const Filmes = ()=> {

    // eslint-disable-next-line no-unused-vars
    const { nomefilme ,tipoDeBusca } = useParams()
    console.log('tipo de pesquisa : ', tipoDeBusca)
    
    
    return (

        <div>
            <Header/>
            <ComponentFilmes nomeFilme={nomefilme} tipoDeBuscaFilme={tipoDeBusca} />

        </div>
    )
}

export default Filmes ;