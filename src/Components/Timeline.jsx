

const Timeline = props =>{   


    
    if(props.yearRange){
        return (
<div className="flex Timeline">

    <div className="stripe fullWidth"> 

        <div style={{overflow:'hidden'}}>
            <div className='centry-container' style={ { transform: `translateY( -${( (props.yearRange.start* props.zoom) % 100  ) }px)` }}> 
                    {
                Array.from({ length: Math.floor(props.yearRange.end - props.yearRange.start)/100 }, (_, i) => (
                    <div className='century' key={i} numb={  Math.floor(props.yearRange.start / 100) + i   }
                        style={{ height:  100 * props.zoom }} />
                ))}
        </div>

        </div>
    </div>

    <div className="children" style={ { transform: `translateY(-${( (props.yearRange.start* props.zoom) % 100  ) }px)` }} >
        {props.children}
    </div>

</div>
)
    } 
}

export default Timeline