
import Container from "../components/Container";
import Header from "../components/Header";
import Filmes from '../components/Filmes';
import Footer from "../components/footer";

const Home = () =>{

    return  (

        <div style={{overflow : 'hidden'}}>
            <Header />
            <Container tipoDeBuscaFilme={'1'} page={1} />
            <Container tipoDeBuscaFilme={'2'} page={4}   />
            <Filmes   tipoDeBuscaFilme={'1'} pageFilme={2} /> {// tipo de filme tem q ser do tipo string
            }
            <Footer/>
        </div>
      


    )
}


export default Home ;