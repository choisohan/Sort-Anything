import { useState , useEffect } from "react";


const OrderedByScore = props =>{

    const [result, setResult] = useState(0);
    const [texts, setTexts] = useState([]);

    useEffect(()=>{
        var textArr = [];
        var _result = props.quizArr.length * 10 ;//props.quizArr.length * 100;

       var correctOrder = [...props.quizArr].sort( (a,b)=> b.value -a.value);
       correctOrder.forEach((item,index) =>{
            var arr= []; 
            var indexDiff = Math.abs(index - props.quizArr.indexOf(item)) 
            if(indexDiff == 0 ){
                arr.push(<>Perfect!<b>+30</b></>) 
                _result +=30; 

            }else {
                arr.push(<> <i>-{indexDiff * 10} </i></>) 
                _result -= indexDiff * 10; 
            }
            textArr.push(arr)
       })
       setTexts(textArr)
       setResult(_result)
       
    },[props.quizArr])

    const resultImage =()=>{
        var className = 'result-image '
        if(result >= 100 ){
            className += 'best-'
        }
        else if( result >= 50 && result < 100){
            className += 'good-'
        }
        else if(result > 0 ){
            className += 'ehh-'
        }else{
            className += 'failed-'
        }
        className+= Math.floor( Math.random()* 2 ); 

        return <div className={className} />
    }


    return<div id='score-page' style={{marginLeft: '60px'}}>
        {resultImage()}

<h2>Your Score is {result}.</h2>
<div>

    <button className="shadow" onClick={props.onPlayAgain}>Play Again</button>

</div>

    {texts.map((item, index) => <ul>
        <div>
            <h5 style={{color: props.quizArr[index].color , display:'flex'}}>
                <span className="rank-numb" style={{backgroundColor:props.quizArr[index].color}}>{index+1}</span>{props.quizArr[index].summary} </h5>
            { props.quizArr[index].description ? <span> ({props.quizArr[index].description}) </span> : null }
        </div>
             {
item.map( line => <li>{line}</li>)}</ul>)}

        
    </div>
}

export default OrderedByScore