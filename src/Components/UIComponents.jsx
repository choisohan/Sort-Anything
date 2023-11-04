import { forwardRef } from "react"

export const Title = forwardRef((props, ref) => {


    return  <div className="title" ref={ref}>{
        props.unit == 'year' ? <><span className="subtitle">Sort Anything</span>
        <h1>What Year?</h1></> : <>
        <span className="subtitle"> Ascending order by {props.unit} </span>
        <h1>Sort Anything</h1>
        </>
    }</div>


})
 