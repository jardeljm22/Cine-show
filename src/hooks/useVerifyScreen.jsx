import { useState,useEffect } from "react";


export function useVerifyScreen() {


const [isMobile, setIsMobile] = useState( window.innerWidth < 851 );

useEffect(() => {

const handleSize = ()=>{
    setIsMobile(window.innerWidth < 851)
}
window.addEventListener('resize',handleSize)

return ( ) => window.removeEventListener('resize',handleSize) // limpando o evento para evitar vazamento de memória

},[]);

return  isMobile;

}