import './CSS/style.css';
import { Route ,Routes ,BrowserRouter } from 'react-router-dom';
import Start from './Page/start';
import { useEffect, useState } from 'react';
import Quiz from './Page/quiz';
import {  sortCSV } from './Js/utils';

const files = {
  "year" : ["history" ,"organizations"]//, "inventions", "history" , "korea", "organizations", "usa"  ],
  //"population" : ["world2022"]
}


  function App() {

  const [jsonDatas, setJsonDatas] = useState();

  useEffect(()=>{
    sortCSV(files).then( data => {setJsonDatas(data)})
  },[])

  const footer = <div className='footer'>
    Created by <a href='https://github.com/choisohan' target="_blank" >Choi Sohan</a>
    </div>
    
  return (
    <BrowserRouter>
  <Routes>
    {
    (!jsonDatas)?  null : <>
    
    <Route path="/that-timeline/" element={ <Start keywords={jsonDatas.keywords}/>}/>
    <Route path="/that-timeline/:paramID" element={<Quiz jsonDatas={jsonDatas} />}/>


    </> 
    }

  </Routes>
  
  {footer}

    </BrowserRouter>
  )
}


export default App;
