import { useEffect, useState } from "react";

const WhatYearScore = props => {

    const [result, setResult] = useState(0);
    const [texts, setTexts] = useState([]);


    const resultImage =()=>{
        var className = 'result-image '
        if(result >= 100 ){
            className += 'best-'
        }
        else if( result >= 80 && result < 100){
            className += 'good-'
        }
        else if(result > 40 ){
            className += 'ehh-'
        }else{
            className += 'failed-'
        }
        className+= Math.floor( Math.random()* 2 ); 

        return <div className={className} />


    }
    useEffect(()=>{
        var textArr = [];
        var _result = 0;//props.quizArr.length * 100; 
        var quizArr = [...props.quizArr];
        var scores = []; 
        for(var i = 0 ; i < quizArr.length; i ++ ){
            const arr = [];
            var diffYear = Math.abs(quizArr[i].yearAnswered - quizArr[i].year);
            var yearLength = props.yearRange.end- props.yearRange.start;
            var accuracy = 1 - (diffYear/yearLength);
            if(accuracy > .7){
                arr.push(<><b>{(accuracy*100).toFixed(0)}%</b></>);
            }else{
                arr.push(<><i>{(accuracy*100).toFixed(0)}%</i></>);
            }
            scores.push(accuracy);
            _result+= accuracy*100; 
            textArr.push(arr)
        }
        setTexts(textArr)
        setResult( _result/quizArr.length )
        props.onQuizArrFeedback(scores);
    },[props.quizArr])


    return <div id='score-page'>
{resultImage()}
<h2>Your Accuracy : {result}%</h2>

<div>

<button className="shadow" onClick={props.onPlayAgain}>Play Again</button>

</div>


            {texts.map((item, index) => <ul>
                <div>
                    <h5 style={{color: props.quizArr[index].color}}> {props.quizArr[index].summary} </h5>
                    { props.quizArr[index].description ? <span> {props.quizArr[index].description} </span> : null }
                </div>
             {
                item.map( line => <li>{line}</li>)}</ul>)}

    </div>
}


export default WhatYearScore