import { useEffect , useState ,useRef } from "react";
import Draggable from "../../Components/DraggableCanvas2"
import { useSearchParams } from "react-router-dom"
import Timeline from "../../Components/Timeline";
import { getRandomYearItem , getRandomColor, getRandomColors } from "../../Js/utils";
import WhatYearScore from "./score";
import { Title } from "../../Components/UIComponents";
const WhatYearQuiz = props => {

    const [ searchParams ]= useSearchParams();
    const [ quizArr, setQuizArr ] = useState();
    const [ yearRange, setYearRange ] = useState()

    const [zoom, setZoom] = useState(1);
    const [score, setScore] = useState();
    const [scores, setScores] = useState()
    const [totalScore, setTotalScore] = useState(0);

    const headerRef = useRef();


    const TimeScale = <div id='zoom-slider'>
    <input type="range" min="0.1" max="10" value={zoom} onChange={e=>{setZoom(parseFloat(e.target.value))}} step=".001"/>
    { zoom.toFixed(1) }
    </div>
    useEffect(()=>{
        getQuiz();
    },[searchParams])
    


    const getQuiz = ()=>{
        setScores()
        var tags = searchParams.get('tags').split(',').map( t=> t.replace('-',' '))
        var centuryTags = tags.filter(t => t.includes('century') )
        console.log( tags, centuryTags)
        tags = tags.filter(t => !t.includes('century') )
        var count = parseInt(searchParams.get('count')) || 4 ;

        var arr = props.jsonDatas.datas['year'].filter(item=> {
            var keywords = item.keywords.map(t => t.trim().toLowerCase());
            return tags.every( t => keywords.includes(t) ) && keywords.length> 0 ? keywords.some(t => centuryTags.includes(t) ) : true
        }).map(item => ({...item, year: item.value})) 


        if(arr.length >0 ){
            arr = getRandomYearItem(arr, count);
            var sortedArr = arr.sort((a, b) => a.year - b.year )
            console.log( sortedArr)
           const startCentury  = Math.floor((sortedArr[0].year)/100) ;
           const endCentry = Math.round((sortedArr[arr.length -1].year)/100 ) +1;
           const _yearRange = { start: (startCentury * 100)-50 , end: (endCentry *100) } 
           setYearRange( _yearRange )
    
           console.log( {start: sortedArr[0].year, end: sortedArr[arr.length -1].year } , _yearRange)
           var colors = getRandomColors(arr.length);

            arr = arr.map( (item, index )=>({...item,
                color :colors[index],
                yearAnswered: Math.max( startCentury * 100 ,
                              Math.min( endCentry * 100 ,
                               startCentury * 100 + Math.floor( (Math.random() * (endCentry- startCentury) * 100-100) )))
            }))

            setQuizArr(arr);
           const centuryCount = (endCentry-startCentury);
           var headerHeight = headerRef.current.getBoundingClientRect().height
           const _zoom = (window.innerHeight - headerHeight )/(centuryCount+1) *.01;
            setZoom(_zoom*1.2);
            setScore(false);
        }


    }



    const onItemMoved = (pos , index )=>{
        //todo : update with zoom
        setQuizArr( prevArr =>{
          var arr = [...prevArr]; 
          arr[index].yearAnswered = Math.floor(pos.y)  ;
          return arr
        })
    }




return (<>
    <Title unit="year" ref={headerRef} />
{ !quizArr ? null :
    <div id='what-year-page' className="content-body">
    <Timeline yearRange={yearRange} zoom={zoom} >
            <div className='quizes'>
        {
    quizArr.map( ( item, index ) =><div  key={index} className="quiz-item">
        <Draggable zoom = {zoom}
                style={{backgroundColor: item.color}}
                offset = { {x: 0 , y : yearRange.start }}
                pos ={ { x : 0 , y: (item.yearAnswered) }}
                onMoving ={ pos => {onItemMoved(pos, index)} }
                className = {`historic-event ${ scores && scores[index] < .7 ? 'failed' : ''} ${index%2 == 0 ? 'left' : 'right'}`}
                >

            {item.image? <img src={item.image}   draggable="false" /> : null }
            <label>{item.summary}</label>

            <span className="year-answer">{ !scores ? item.yearAnswered+'?' :
                item.yearAnswered != item.year ? 
                <><span className="red">{item.yearAnswered}</span> {item.year } </> : <>{item.yearAnswered}</> } 
            </span>

        </Draggable>

    {
        !score? null :<div className="range-container">
        <span key={item.summary} className="correction-range-bar" style={ {
            top: `${ (item.year - yearRange.start) * zoom}px`,
            //height: `${25 * zoom}px`,
            left: `${index*100/quizArr.length}px`,
            width:100/quizArr.length+'px'}}
            >
            {
                Array.from({length:5},(_,int)=>(<span style={{backgroundColor: item.color}} />))
            }
        </span>
    </div>
    }



            </div>
            )
        }

            </div>
        </Timeline>
        {score ? <WhatYearScore quizArr={quizArr} onQuizArrFeedback ={(_scores,_totalScore)=>{setScores(_scores);setTotalScore(x=>x+_totalScore) }}
            yearRange={yearRange} onPlayAgain={()=>{getQuiz()}}/> :
        <button className='shadow big fixed bottom right' onClick={()=>{setScore(true)}} >Get Score</button> }

        </div>
      }
    {TimeScale} 

    <div className="fixed top right">{totalScore}</div>
    <button className="fixed top left shadow hide-in-mobile" onClick={()=>{window.location.href=window.location.origin+'/that-timeline'}}>Go back</button>
    </>
    
)



}

export default WhatYearQuiz
