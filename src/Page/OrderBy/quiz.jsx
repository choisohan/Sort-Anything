import { useSearchParams } from "react-router-dom";
import { getRandomColor, shuffleArray } from "../../Js/utils";
import Draggable from "../../Components/DraggableCanvas2";
import { useState, useEffect, useRef } from "react";
import OrderedByScore from "./score";

const OrderByQuiz = props=>{
    const [ searchParams ]= useSearchParams();
    const [ quizArr, setQuizArr ] = useState([]);
    const [score, setScore] = useState();
    const headerRef =useRef();
    const [unitHeight, setUnitHeight] = useState(100);


    useEffect(()=>{
        getQuiz();
    },[searchParams])
    


    const getQuiz = ()=>{

        var topics = searchParams.get('topics').split(',').map( t=> t.trim().toLowerCase()) 
        var count = parseInt(searchParams.get('count')) || 4 
 
        var arr = props.jsonDatas.units[props.unit].filter(item=> {
            return  item.topic.some(word => topics.includes(word.trim().toLowerCase()))})
        arr = shuffleArray(arr).map( item => ({...item, color: getRandomColor()})).slice(0,count)

        var headerHeight = headerRef.current.getBoundingClientRect().height
        var _unitHeight = (window.innerHeight - headerHeight )/count; 
        setUnitHeight(_unitHeight);
        arr = arr.map( (item, index) => ({...item, valueAnswered :  (_unitHeight* index)+ headerHeight}))
        setQuizArr(arr);
        setScore()

    }

    const onItemMoved = ( pos , index )=>{
        setQuizArr( prevArr =>{
          var arr = [...prevArr]; 
          arr[index].valueAnswered = pos.y;
          return arr
        })
    }

    return <>
    <div ref={headerRef}>
        <span style={{position:'absolute', width: '-webkit-fill-available', transform:'translateY(10px)'}}>Ascending order by <span id="mode-tag">{props.unit}</span></span>

        <h1 >Sort Anything</h1>
    </div>

    <div className="content-body">
        <div className="quizes order-by">
            {quizArr.map((item, index)=><div key={index}>
                 <h3 style={{height: unitHeight+'px'}}>{index+1}.</h3>
                <Draggable
                    className = 'quiz-item'
                    style={{backgroundColor: item.color}}
                    offset = { {x: 0 , y : 0 }}
                    pos ={ { x : Math.random()*100 +50 , y: item.valueAnswered }}
                    onMoved={ pos => {onItemMoved(pos, index)} }
                    zoom = {1}
                >{item.summary}</Draggable>
            </div>)}
        </div>

        {score ? <OrderedByScore quizArr={quizArr} onPlayAgain={()=>{getQuiz()}}/> :
        <button className='shadow big fixed bottom right' onClick={()=>{setScore(true)}} >Get Score</button> }


    </div>
    </>
}

export default OrderByQuiz