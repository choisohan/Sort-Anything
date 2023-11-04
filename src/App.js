import './CSS/style.css';
import { Route ,Routes ,BrowserRouter } from 'react-router-dom';
import Start from './Page/start';
import { useEffect, useState } from 'react';
import Quiz from './Page/quiz';
import { getCSVObject , sortCSV } from './Js/utils';
var jsonFiles = ['Countries-Rise and Fall', 'Inventions' ,'US-presidents','WorldPopulation2022' ,"Art" , 'Contemporary era', 'KoreaHistory']

const files = {
  "year" : ["country", "inventions", "history" , "korea", "organizations", "usa"  ],
  "population" : ["world2022"]
}


  function App() {

  const [jsonDatas, setJsonDatas] = useState();

  useEffect(()=>{
    sortCSV(files).then( data => {setJsonDatas(data)})
  },[])

  const footer = <div className='footer'>Created by <a href='https://github.com/choisohan'>Choi Sohan</a></div>
  return (
    <BrowserRouter>
  <Routes>
    {
    (!jsonDatas)?  null : <>
    
    <Route path="/" element={ <Start keywords={jsonDatas.keywords}/>}/>
    <Route path="/:paramID" element={<Quiz jsonDatas={jsonDatas} />}/>


    </> 
    }

  </Routes>
  
  {footer}

    </BrowserRouter>
  )
}


export default App;
