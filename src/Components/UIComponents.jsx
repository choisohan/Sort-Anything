import { forwardRef } from "react"

export const Title = forwardRef((props, ref) => {


    return  <div className="title" ref={ref}>{
        props.unit == 'year' ? <><span className="subtitle">Timeline</span>
        <h1>That Time</h1></> : <>
        <span className="subtitle"> Ascending order by {props.unit} </span>
        <h1>That Time</h1>
        </>
    }</div>


})
 