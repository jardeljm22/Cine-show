

import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "../pages/Home";
import DetalhesFilmes from "../pages/DetalhesDoFilme";
import Filmes from "../pages/Filmes";
import Series from "../pages/series";
const Rotes = () =>{

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/series" element={<Series/>} />
            <Route path="/filmes/:nomefilme" element={<Filmes/>} />
            <Route path="/filmes/tipoDeBusca/:tipoDeBusca" element={<Filmes/>} />
            <Route path="/detalhesFilme/:id" element={<DetalhesFilmes/>} />

        </Routes>

        </BrowserRouter>
    )

}


export default Rotes;