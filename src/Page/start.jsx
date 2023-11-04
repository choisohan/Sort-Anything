import React, { useEffect, useState , useRef } from "react"
import { Link } from "react-router-dom"
import { TagSelector, NumberInput } from "../Components/Inputs"
import { colorArr } from '../Js/utils';
import { Title } from "../Components/UIComponents";

const Start = props =>{

    const [options,setOptions] = useState([]);
    const [selected, setSelected] = useState([]);

    const [ count, setCount] = useState(5);
    const [ mode , setMode ] = useState(); 
    const titleRef = useRef();

    useEffect(()=>{
        var _options = props.keywords.map( (item , index ) =>{ return {...item,  color: colorArr[index]}})
        setOptions(_options || [])
        setSelected( _options.length > 0 ?  [_options[Math.floor(_options.length * Math.random())]] : [] );
    },[ props.keywords ])

    useEffect(()=>{
        if(selected.length == 0 ){
            setMode();
        }else{
            setMode(selected[0].unit)
        }
    },[selected])



    return <div className="center">
    <Title unit={mode} ref={titleRef}/>
    
    <div className="flex column center" style={{gap:'20px'}}>
        <NumberInput value={count} setValue={setCount} range={{min:1, max: 8}}/>
        <TagSelector options={ options } mode={mode} value={selected} setValue={setSelected} />
        {selected.length == 0 ? null : <Link to={`/sort-anything/${mode}?tags=${selected.map(t=>t.value)}&count=${count}`} ><button className="big shadow"> Start </button> </Link>
}
    </div>

   </div>
   
}

export default Start; 