import { useEffect, useState } from "react";


export const NumberInput = props =>{

    const [numb, setNumb] = useState( props.value || 0 );

    const updateNumb = (add)=>{
        setNumb(x => Math.max( props.range.min||0, Math.min(props.range.max||10, x + add ) ))
    }

    useEffect(()=>{
        props.setValue(numb)
    },[numb])

    return <div className="flex center " style={{gap:'20px'}}>
        <button className='shadow square' onClick={()=>{updateNumb(-1)}}>-</button>
            <h3> {numb} </h3>
        <button className='shadow square'  onClick={()=>{updateNumb(+1)}}>+</button>
    </div>
} 




export const TagSelector = props =>{

  const onAdd=(item)=>{
    props.setValue([...props.value,item])
  }
  const onRemove = (item)=>{
    props.setValue(props.value.filter(v => v!= item ))
  }

  useEffect(()=>{
    console.log( props.options)
  }, [props.options] )

  return <div style={{display:'flex' , flexDirection:'column',gap:'5px'}}>
  <div className="TagSelector">{props.value.map( item =><span className='pill big on' style={{backgroundColor:'#'+item.color, borderColor:'#'+item.color, }} key={item.value} >
        {item.value}<button id='x-button' className="square" label='remove' onClick={()=>{onRemove(item)}}>X</button></span>)}

{ props.value.length > 0 ? <button className="shadow" onClick={_=>{props.setValue([])}}>Clear</button> : null }
      
      </div>
    <div className="TagSelector">{props.options.filter( item => !props.value.includes(item) )
        .map( item=>
            <span key={item.value} className={ "pill " + (!props.mode ? '' : props.mode != item.unit ? 'disabled' :'')} onClick={()=>{onAdd(item)}}
              style={{borderColor:'#'+item.color , color: '#'+item.color }}
            >{item.value}</span>)}
    </div>
  </div>
}