
import Container from "../components/Container";
import Header from "../components/Header";
import Filmes from '../components/Filmes';
import Footer from "../components/footer";

const Home = () =>{

    return  (

        <div style={{overflow : 'hidden'}}>
            <Header />
            <Container tipoDeBuscaFilme={1} />
            <Container tipoDeBuscaFilme={2} />
            <Filmes categoria={true}  tipoDeBuscaFilme={'1'} /> {// tipo de filme tem q ser do tipo string
            }
            <Footer/>
        </div>
      


    )
}


export default Home ;