import {useState} from "react";
import '../Styles/MovieServerSelector.css'

const MovieServerSelector = ({ idMovie }) => {

    const [selectedServer, setSelectedServer] = useState(null);
    
    
    const handleServer = (serverId,movieID) => {
        switch (serverId) {
            case 1:
                return (<iframe className="iframe-player"
                        src={`https://myembed.biz/filme/${movieID}`}
                        width="100%" height="70vh"
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowfullscreen
                    ></iframe>)
                
            case 2:
                 return (<iframe 
                        className="iframe-player"
                        src={`https://www.2embed.cc/embed/${movieID}`}
                        width="100%" 
                        height="70vh"
                        frameborder="0" 
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowfullscreen
                    ></iframe>)
                
            case 3:
                 return (<iframe 
                        className="iframe-player"
                        src={`https://vidsrc.sh/embed/movie/${movieID}`} 
                        width="100%" 
                        height="560" 
                        frameborder="0" 
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowfullscreen
                        ></iframe>)
            default:
                return null;                
        }
    };
    return (
        <div  className="div-server-center" >  
            <h2>Selecione um servidor para assistir:</h2> 
            <div className="div-server-buttons" >
                <button  onClick={() => setSelectedServer(1)}> Servidor 1 </button>
                <button  onClick={() => setSelectedServer(2)}> Servidor 2 </button>
                <button  onClick={() => setSelectedServer(3)}> Servidor 3 </button>

            </div>
            {selectedServer && handleServer(selectedServer,idMovie)}
        </div>
    );

};

export default MovieServerSelector; 