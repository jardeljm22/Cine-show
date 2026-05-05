
import ComponentMovie  from '../components/Movies'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import Footer from '../components/footer'


const Movies = ()=> {

    // eslint-disable-next-line no-unused-vars
    const { nameMovie ,typeOfSearch } = useParams()
    
    
    return (

        <div>
            <Header/>
            <ComponentMovie nameMovie={nameMovie} typeOfSearch={typeOfSearch} />
            <Footer/>
        </div>
    )
}

export default Movies ;