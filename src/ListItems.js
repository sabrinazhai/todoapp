import React from 'react';
import './ListItems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FlipMove from 'react-flip-move';

function ListItems(props){
    const items = props.items;
    // console.log("strung" + JSON.stringify(props.items));
    const listItems = items.map(item =>
    {

        // console.log("HELLOOJOJJF"+ item.time)
        // console.log("second"+ item.task)
        // console.log("strung" + JSON.stringify(item));
        // str = JSON.stringify(obj, null, 4); // (Optional) beautiful indented output.
  
       return <div className="list" key={item.key}>
     <p >
        <input type="checkbox" onChange={(e)=>{
             props.setUpdate(e.target.value, item.key)}}/>

         <input type="text" autoComplete="new-password" id={item.key} value={ item.time + ":00 | " + item.task} onChange={(e)=>{
             props.setUpdate(e.target.value, item.key)}} style = {{
                    textDecoration: item.completed ? "line-through" : null
                }}/>
        <span>
       
        <FontAwesomeIcon className="faicons" onClick={() => {
            props.deleteItem(item.key)
        }} icon="trash" />
        </span>
     </p>
    </div>})
    return <div>
        <FlipMove duration={300} easing="ease-in-out">
        {listItems}
        </FlipMove>
    </div>;
  }

  export default ListItems;