

import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "../pages/Home";
import DetalhesFilmes from "../pages/DetalhesDoFilme";
import Filmes from "../pages/Filmes";
import Series from "../components/Séries";
const Rotes = () =>{

    return (
        <BrowserRouter>
        <Routes>
        <Route path="/Home" element={<Series/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/detalhesFilme/:id" element={<DetalhesFilmes/>} />
            <Route path="/filmes/:nomefilme" element={<Filmes/>} />
            <Route path="/filmes/tipoDeBusca/:tipoDeBusca" element={<Filmes/>} />
        </Routes>

        </BrowserRouter>
    )

}


export default Rotes;