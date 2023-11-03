import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { TagSelector, NumberInput } from "../Components/Inputs"
import { colorArr } from '../Js/utils';


const Start = props =>{

    const [options,setOptions] = useState([]);
    const [selected, setSelected] = useState([]);

    const [ count, setCount] = useState(5);
    const [ mode , setMode ] = useState(); 

    useEffect(()=>{
        var _options = props.tags.map( (item , index ) =>{ return {...item,  color: colorArr[index]}})
        setOptions(_options)
        setSelected([_options[Math.floor(_options.length * Math.random())]]);
    },[ props.tags ])

    useEffect(()=>{
        if(selected.length == 0 ){
            setMode();
        }else{
            setMode(selected[0].unit)
        }
    },[selected])

    return <div>
    <h1 style={{paddingBottom:'40px'}}>Sort Anything</h1>
    
    <div className="flex column center" style={{gap:'20px'}}>
        <NumberInput value={count} setValue={setCount} range={{min:1, max: 8}}/>
        <TagSelector options={ options } mode={mode} value={selected} setValue={setSelected} />
        {selected.length == 0 ? null : <Link to={`/${mode}?topics=${selected.map(t=>t.value)}&count=${count}`} ><button className="big shadow"> Start </button> </Link>
}
    </div>

   </div>
   
}

export default Start; 