import Container from "../components/Container";
import Header from "../components/Header";
import Movies from '../components/Movies';
import Footer from "../components/footer";

const Home = () =>{

    return  ( 

        <div style={{overflow : 'hidden'}}> 
            <Header />
            <Container typeOfSearchMovie={'1'} pageInicial={1} />
            <Container typeOfSearchMovie={'2'} pageInicial={4}   />
            <Movies   typeOfSearch={'1'} pageMovie={2} /> {// tipo de filme tem q ser do tipo string
            }
            <Footer/>
        </div>
    )
}

export default Home ;