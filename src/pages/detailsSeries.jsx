import Header from "../components/Header";
import Footer from "../components/footer";
 import '../Styles/SeriesComponent.css';

const DetailsSeries = () => {

    window.scrollTo(0,0);
    return (
        <div className='div-serie' >
            <Header/>
          <div className="div-mensagem-serie" >
                <h1> &nbsp; &nbsp; &nbsp; Em breve...</h1>
            </div>
            <Footer/>
        </div>

    )
}


export default DetailsSeries ;