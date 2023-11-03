import { useParams } from "react-router-dom";
import WhatYearQuiz from "./What-Year/quiz";
import OrderByQuiz from "./OrderBy/quiz";

const Quiz = props =>{
    const {paramID} = useParams();

    switch(paramID){
        case 'year' :
            return <WhatYearQuiz jsonDatas={props.jsonDatas} />
            break;

        default:
            return <OrderByQuiz jsonDatas={props.jsonDatas} unit={paramID}/>
    }
}

export default Quiz; 