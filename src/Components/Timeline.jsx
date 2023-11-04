import { useState } from "react"


const Timeline = props =>{   
    const [style,setStyle] = useState({})//{ transform: `translateY( -${( (props.yearRange.start* props.zoom) % 100  ) }px)` }

    
    if(props.yearRange){
        return (
<div className="flex Timeline">

    <div className="stripe fullWidth"> 

        <div style={{overflow:'hidden'}}>
            <div className='centry-container' style={style}> 
                    {
                Array.from({ length: Math.floor(props.yearRange.end - props.yearRange.start)/100 }, (_, i) => (
                    <div className='century' key={i} numb={  Math.floor(props.yearRange.start / 100) + i   }
                        style={{ height:  100 * props.zoom }} />
                ))}
        </div>

        </div>
    </div>

    <div className="children" style={style}>  {props.children}
    </div>

</div>
)
    } 
}

export default Timeline