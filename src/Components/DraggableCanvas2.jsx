import {  useEffect, useState } from "react";


const Draggable = props => {

    const [clicked, setClicked] = useState();
    const [moved, setMoved] = useState({x:0, y:0});
    const [pos, setPos] = useState(props.pos || {x:0, y:0 });

    const onMouseDown = e =>{
        setClicked({x:e.clientX,y:e.clientY})
        window.addEventListener('mouseup', onMouseUp)
        window.addEventListener('mousemove', onMouseMove)
    }
    const onMouseUp = e=> {
        setClicked()

        window.removeEventListener('mouseup', onMouseUp)
        window.removeEventListener('mousemove', onMouseMove)

        setMoved(_moved =>{
            setPos(prev =>  {
                var _pos =  { x : prev.x + _moved.x/2, y: prev.y + _moved.y/2 };
                console.log(_pos )
                return _pos; 
            } );
            return {x: 0, y: 0}
        })
    }
    useEffect(()=>{
        props.onMoved(pos);

    },[pos])

    const onMouseMove = e =>{
        setClicked(_clicked =>{
            var x =  e.clientX - _clicked.x;
            var y =  e.clientY - _clicked.y;
            setMoved({x:x, y:y/props.zoom});
            return _clicked; 
        })
    }



    return <div  className={props.className} onMouseDown={onMouseDown}
                style={{...props.style, transform:`translate(${pos.x + moved.x}px ,${((pos.y-props.offset.y) + moved.y)*props.zoom}px )`,
                    cursor: clicked? 'grabbing':'grab'}}
                year ={Math.floor( ( pos.y + moved.y ) )}
                >
                {props.children}
            </div>

}

export default Draggable;