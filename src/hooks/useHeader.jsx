import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyScreen } from "./useVerifyScreen";


export function useHeader( ) {

    const [nomeFilme,setNomeFilme] = useState('');
    const [mensageAlertaNomeVazio,setMensageAlertaNomeVazio] = useState(false)
    const [menu,setMenu] = useState(false);
    const [optionsMenuFilmes,setOptionsMenuFilmes] = useState(false);
    const [optionsMenuSeries,setOptionsMenuSeries] = useState(false);
    const [menuOpen,setMenuOpen] = useState(null) // para saber qual menu esta aberto filmes ou series
    const navigate = useNavigate();
    const isMobile = useVerifyScreen(); // verifica se a tela aumentou acima de 678 para remover o menu central caso a tela aumente e ele esteja ativado

    const procurarFilme = (nome) =>{  // funcao q vai buscar o filme desejado
        if(nome.length === 0 ){  // verificando se o input do nome do filme está vazio
            setMensageAlertaNomeVazio(true)
        }else{
            const  nomeTratado = nome.trim().toLowerCase()    // removendo espacos e colocando tudo em minusculo
                navigate(`/movies/${nomeTratado}`);
        }
    }

    const openMenu = (option)=>{
        setMenuOpen(prev=> prev === option ? null : option) // seta qual menu esta aberto filmes ou series
    }
    const fechaMenu = () =>{
        setMenu(false) 
        setOptionsMenuFilmes(false)
        setOptionsMenuSeries(false)
        setMenuOpen(null) // fecha o menu central e os options do menu filmes e series
    }

    useEffect(()=>{
        if(!isMobile){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fechaMenu(); // quando nao tiver no mobile e a tela aumentar acima de 850px o menu central e os options do menu filmes e series serao fechados
        }
    },[isMobile]);

    return (
        {nomeFilme,
        optionsMenuFilmes,
        optionsMenuSeries,
        menu,
        mensageAlertaNomeVazio,
        procurarFilme,
        setNomeFilme,
        setMensageAlertaNomeVazio,
        setOptionsMenuFilmes,
        setOptionsMenuSeries,
        setMenu,
        fechaMenu,
        openMenu,
        menuOpen}
        
    )
}
