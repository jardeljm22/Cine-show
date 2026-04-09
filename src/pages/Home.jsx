
import Container from "../components/Container";
import Header from "../components/header";
import Filmes from '../components/Filmes'

const Home = () =>{


    return  (

        <div style={{overflow : 'hidden'}}>
            <Header />
            <Container tipoDeBuscaFilme={1} />
            <Container tipoDeBuscaFilme={2} />
            <Filmes categoria={true}  tipoDeBuscaFilme={'1'} /> {// tipo de filme tem q ser do tipo string
            }
        </div>
      


    )
}


export default Home ;