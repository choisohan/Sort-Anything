import { useEffect, useState } from "react"


const Timeline = props =>{   
    const [style,setStyle] = useState()//{ transform: `translateY( -${( (props.yearRange.start* props.zoom) % 100  ) }px)` }
    const [centuries, setCenturies] = useState([]);

    useEffect(()=>{
        setStyle({transform : `translateY(${-50*props.zoom}px)`})
    },[props.zoom])

    useEffect(()=>{
        const arr = Array.from({ length: ( Math.round( props.yearRange.end - props.yearRange.start)/100 ) + 1},(_, i )=>1+i + Math.floor(props.yearRange.start/100)  );
        console.log( arr);
        setCenturies(arr);

    },[ props.yearRange])

    if(props.yearRange){
        return (
<div className="flex Timeline">

    <div className="stripe fullWidth"> 

        <div style={{overflow:'hidden'}}>
            <div className='centry-container' style={{transform : `translateY(${-50*props.zoom}px)`}}> 
                    {
               centuries.map( (century, i ) =>
                    <div className='century' key={century} numb={  century }
                    style={{ height: ( centuries.length !== i + 1 ? 100 : 50)  * props.zoom,
                        backgroundImage:  `repeating-linear-gradient(var(--stripe-color),
                        var(--stripe-color)  ${10* props.zoom}px,
                        white ${10* props.zoom}px,
                        white ${20* props.zoom}px)`
                    }} />
               )
                }
        </div>

        </div>
    </div>

    <div className="children">  {props.children}
    </div>

</div>
)
    } 
}

export default Timeline