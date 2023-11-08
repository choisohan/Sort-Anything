import { forwardRef } from "react"

export const Title = forwardRef((props, ref) => {


    return  <div className="title" ref={ref}>{
        props.unit == 'year' ? <>
        <h1>That Timeline</h1></> : <>
        {/* <span className="subtitle">  {props.unit} </span> */ }
        <h1>That Timeline</h1>
        </>
    }</div>


})
 