import Header from "../components/Header";
import Footer from "../components/footer";
import '../Styles/Series.css'
import SerieComponent from "../components/ContainerMoviesAndSeries";
import { useParams } from 'react-router-dom';

const Series =  () =>{

    const { typeOfSearch } = useParams() ; // tipo de busca ( 4 ) = populares | ( 5 ) = Bem avaliados | ( 6 ) = lançamentos

    return(
        <section  className="section-div-series">
            <Header/>
            <SerieComponent typeOfSearch= {typeOfSearch} />
            <Footer/>
        </section>
    )
}

export default Series ;