

import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "../pages/Home";
import DetailsMovies from "../pages/DetailsMovies";
import Movie from "../pages/Movies";
import Series from "../pages/series";
import DetailsSeries from '../pages/detailsSeries';

const Rotes = () =>{

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/series/:typeOfSearch" element={<Series/>} />
            <Route path="/movies/:nameMovie" element={<Movie/>} />
            <Route path="/movies/typeOfSearch/:typeOfSearch" element={<Movie/>} />
            <Route path="/detailsMovie/:id" element={<DetailsMovies/>} />
            <Route path="/detailsSerie/:id" element={<DetailsSeries/>} />
        </Routes>

        </BrowserRouter>
    )

}


export default Rotes;