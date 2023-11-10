import {  useState } from "react";


const Draggable = props => {

    const [clicked, setClicked] = useState();
    const [moved, setMoved] = useState({x:0, y:0});
    const [pos, setPos] = useState(props.pos || {x:0, y:0 });


    const onMouseDown = e =>{
        var _pos
        if(!e.touches){
             _pos = {x:e.clientX,y:e.clientY}
            window.addEventListener('mouseup', onMouseUp)
            window.addEventListener('mousemove', onMouseMove)
        }else{
             _pos = {x:e.touches[0].clientX,y:e.touches[0].clientY}
            window.addEventListener('touchend', onMouseUp)
            window.addEventListener('touchmove', onTouchMove)
        }
        setClicked(_pos)
    }
    const onMouseUp = e => {
            setClicked()

            window.removeEventListener('mouseup', onMouseUp)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('touchend', onMouseUp)
            window.removeEventListener('touchmove', onTouchMove)

            setMoved(_moved =>{
                setPos(prev =>  {
                    var _pos =  { x : prev.x + _moved.x, y: prev.y + _moved.y };
                    return _pos; 
                } );
                return {x: 0, y: 0}
            })
        
    }

    const onMouseMove = e =>{
            setClicked(_clicked =>{
                var x = ( e.clientX - _clicked.x);
                var y =  (e.clientY - _clicked.y)/props.zoom;
                setMoved({x:x, y:y});
                props.onMoving({x: x+ pos.x , y: y + pos.y });
                return _clicked; 
            })
        
    }

    const onTouchMove = e=>{
        setClicked(_clicked =>{
            var x = ( e.touches[0].clientX - _clicked.x);
            var y =  (e.touches[0].clientY - _clicked.y)/props.zoom;
            setMoved({x:x, y:y});
            props.onMoving({x: x+ pos.x , y: y + pos.y });
            return _clicked; 
        })
    
}






    return <div  className={props.className}
                style={{...props.style, transform:`translate(${pos.x + moved.x}px ,${((pos.y-props.offset.y) + moved.y)*props.zoom}px )`,
                    cursor: clicked? 'grabbing':'grab'}}
                year ={Math.floor( ( pos.y + moved.y ) )}
                onMouseDown={onMouseDown} onTouchStart={onMouseDown}
                >
                {props.children}
            </div>

}

export default Draggable;