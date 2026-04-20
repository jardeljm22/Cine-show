
import { useEffect, useState } from "react";
import { getDetalhesFilme,getElencoFilme } from '../services/service';


export function useDetalhesFilmes({id}) {

    const [filme,setFilme] = useState({});
    const [diretor,setDiretor] = useState(null);
    const [loading,setLoading] = useState(false);    
    const [error,setError] = useState(null);
    const [tempoFilme,setTempoFilme] = useState('')

    const converteHoras = (minuto) =>{
        let horas = 0;
        let hora = 60;
        let min = minuto;
        let v = true
        while (v){
            if(min >= hora){
                min-= hora;
                horas+=1
            }else{
                setTempoFilme(`${horas} h   ${min} min`)
                v = false;
            }
        }
    }

    useEffect(()=>{
        window.scrollTo(0,0)
        const buscaDetalhes = async ()=>{
            setLoading(true);
            setError(null);
            
                try {
                    const filme = await getDetalhesFilme(id);// buscando os detalhes do filme
                    converteHoras(filme.runtime);// convertendo o tempo do filme de minutos para horas e minutos
                    setFilme(filme);
                    const resposta = await getElencoFilme(id); // buscando o elenco do filme para encontrar o diretor
                    const diretor = resposta.crew?.find(dir=> dir.job === 'Director')// procurando o diretor no elenco do filme
                    setDiretor(diretor?.name)

                } catch (error) {
                    console.error('Erro ao carregar os detalhes do filme:', error);
                    setError('erro ao carregar os detalhes do filme ');
                }finally{
                    setLoading(false);
                }
                
        }
        buscaDetalhes();

    },[id]);

    return {filme,diretor,loading,error,tempoFilme}
}