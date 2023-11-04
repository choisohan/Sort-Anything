import { useEffect, useState } from "react";

const WhatYearScore = props => {

    const [result, setResult] = useState(0);
    const [texts, setTexts] = useState([]);


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
    useEffect(()=>{
        var textArr = [];
        var _result = 100;//props.quizArr.length * 100; 

        props.quizArr.forEach(item => {
            const arr = [];
            var diffYear = Math.abs(item.yearAnswered - item.year);

            if(diffYear==0){
                arr.push(<> Perfect match. <b>+100</b> </>);
                _result+= 100;

            }else if(diffYear < 5){
                arr.push(<>Very Close Bonus. <b> +${20-diffYear}`</b> </>);
                _result += 20- diffYear
            }
            else if(diffYear < 10){
                arr.push( <>Close Bonus. <b>+${10-diffYear}</b></>);
                _result += 10 - diffYear; 
            }
            else{
                arr.push(<><i>-${diffYear}</i></>);
                _result -= diffYear; 
            }
            textArr.push(arr)
        });
        setTexts(textArr)
        setResult(_result)
    },[props.quizArr])


    return <div id='score-page'>
{resultImage()}
<h2>Your Score is {result}.</h2>

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