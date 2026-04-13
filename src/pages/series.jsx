import Header from "../components/Header";
import Footer from "../components/footer";
import '../Styles/Series.css'
import SerieComponent from'../components/Series'

const Series =  () =>{

    return(
        <section  className="section-div-series">
            <Header/>
            <SerieComponent/>
            <Footer/>
        </section>
    )
}

export default Series ;