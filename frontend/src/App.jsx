import { useState, useEffect } from 'react'
import Header from './components/Header'
import './App.css'
import Search from './components/Search'
import axios from "axios";

function App() {
  const [count, setCount] = useState(0)
  const [ecom, setEcom] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7001/data')
        setEcom(response.data);
      }
      catch (error) {
        console.error(error)
      }
    }
    fetchData();
  }, [])
  //console.log(ecom);
  return (
    <>
      <Header></Header>
      <Search ecom={ecom}></Search>
    </>
  )
}

export default App
