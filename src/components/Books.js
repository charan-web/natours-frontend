import axios from "axios";
import { useEffect, useState } from "react";
import Tours from "./Tours"
axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('jwt')}`
const Books = () => {
    const [tourss,setTourss] = useState([])
  async  function bookings(){
      const tours= await axios({
        method:'get',
        url:'https://infinite-spire-90765.herokuapp.com/webhook-checkout',
        withCredentials:true,
      })
      setTourss(tours)
     
    }
   

    useEffect(()=>{
        bookings()
    },[])
    return ( 
    <>
     {tourss.length===0? <h1>No tours</h1>:<>
      {tourss.map(el=>{
         return <Tours/>
      })}  </>}
    </> 
    );
}
 
export default Books;