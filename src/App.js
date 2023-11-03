import './CSS/style.css';
import { Route ,Routes ,BrowserRouter } from 'react-router-dom';
import Start from './Page/start';
import { useEffect, useState } from 'react';
import Quiz from './Page/quiz';

var jsonFiles = ['Countries-Rise and Fall', 'Inventions' ,'US-presidents','WorldPopulation2022' ,"Art" , 'Contemporary era', 'KoreaHistory']



function App() {

  const [jsonDatas, setJsonDatas] = useState();


  useEffect(()=>{
    Promise.all( jsonFiles.map( fName =>
      Promise.resolve(
          fetch(`/json/${fName}.json`).then(async data=> await data.json()) )) )
            .then( JSONDatas =>{
              //var arr = [];
              var data = {}
              var tags = []; 
              JSONDatas.forEach( JSONData => {
                if(JSONData.unit in data){
                  data[JSONData.unit] =[...data[JSONData.unit] , ...JSONData.array]
                }else{
                  data[JSONData.unit] = JSONData.array;
                }
                var JSONTags = JSONData.array.map( item => item.topic )
                tags = [...tags, ...JSONTags[0].map(t=>( { value: t ,label: t , unit: JSONData.unit} ) ) ]

            })
      setJsonDatas({units: data , tags: tags}); 
      console.log( data , tags )
    })
  },[])

  const footer = <div className='footer'>Created by Choi Sohan</div>
  return (
    <BrowserRouter>
  <Routes>
    {
    (!jsonDatas)?  null : <>
    
    <Route path="/" element={ <Start tags={jsonDatas.tags}/>}/>
    <Route path="/:paramID" element={<Quiz jsonDatas={jsonDatas} />}/>


    </> 
    }

  </Routes>
  
  {footer}

    </BrowserRouter>
  )
}


export default App;
