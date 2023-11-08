import { useEffect, useState } from "react";

const WhatYearScore = props => {

    const [result, setResult] = useState(0);
    const [texts, setTexts] = useState([]);
    const [resultImg, setResultImg] = useState(); 

    useEffect(()=>{
        var textArr = [];
        var _result = 0;
        var quizArr = [...props.quizArr];
        var scores = []; 
        var yearLength = props.yearRange.end- props.yearRange.start;

        for(var i = 0 ; i < quizArr.length; i ++ ){
            const arr = [];
            var diffYear = Math.abs(quizArr[i].yearAnswered - quizArr[i].year);
            var accuracy = 1 - (diffYear/yearLength);
            if( diffYear < 20){
                scores.push(accuracy);
                _result += (accuracy); 
                if(diffYear == 0 ){
                    arr.push(<><b>Perfect!!</b></>);
                }else{
                    arr.push(<><b>+{Math.round(accuracy/quizArr.length * ( yearLength-150 ) )}</b></>);
                }
            }else{
                arr.push(<><i>Failed</i></>);
            }
            textArr.push(arr)
        }
        setTexts(textArr)
        var totalScore = (_result/quizArr.length) * ( yearLength-150 )
        setResult( totalScore )
        props.onQuizArrFeedback(scores , Math.floor(totalScore));


        var className = 'result-image ';
        //var yearLength = ( props.yearRange.end- props.yearRange.start-150 ) ; 
        console.log( totalScore , (yearLength-150) )
        if( totalScore >= (yearLength-150)*.9 ){
            className += 'best-'
        }
        else if( totalScore >= (yearLength-150)*.7 && totalScore <  (yearLength-150)*.9){
            className += 'good-'
        }
        else if(totalScore > (yearLength-150)*.4 ){
            className += 'ehh-'
        }else{
            className += 'failed-'
        }
        className+= Math.floor( Math.random()* 2 ); 

        setResultImg( <div className={className} />)
    },[])


    return <div id='score-page'>
{resultImg}
<h2>Your Score : {result.toFixed(0)} / { props.yearRange.end- props.yearRange.start-150 } </h2>

<div>

<button className="shadow" onClick={props.onPlayAgain}>Play Again</button>

</div>


            {texts.map((item, index) => <ul>
                <div key={index}>
                    <h5 style={{color: props.quizArr[index].color}}> {props.quizArr[index].summary} </h5>
                    { props.quizArr[index].description ? <span> {props.quizArr[index].description} </span> : null }
                </div>
             {
                item.map( (line, i ) => <li key={i}>{line}</li>)}</ul>)}

    </div>
}


export default WhatYearScore