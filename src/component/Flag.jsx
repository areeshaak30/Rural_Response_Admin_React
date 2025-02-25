
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
const Flag = () => {

const location=useLocation()
const [data,setdata]=useState('location.pathname')
const handleclick=(path)=>{
    setdata(path)
}
  return (
    <>
    
    <Link  to='/home' 
    className={data==='/home data ? bg-black :null' }
    onClick={()=>handleclick()}
    > 


    </Link>
    
    
    </>
  )
}

export default Flag