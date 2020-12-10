import React from 'react';
// import './ListItems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FlipMove from 'react-flip-move';

function Schedule(props){
    const schedule = props.schedule;

    const scheduleItems = schedule.map(item =>
    {
       return <div className="list" key={item.key}>
     		<p >
        <input type="checkbox" onChange={(e)=>{
             props.setUpdate(e.target.value, item.key)}}/>

         <input type="text" autoComplete="new-password" id={item.key} value={ item.time + ":00 | " + item.task} onChange={(e)=>{
             props.setUpdate(e.target.value, item.key)}} />
        <span>
       
        <FontAwesomeIcon className="faicons" onClick={() => {
            props.deleteItem(item.key)
        }} icon="trash" />
        </span>
     </p>
    </div>})

    return <div>
        <FlipMove duration={300} easing="ease-in-out">
        {scheduleItems}
        </FlipMove>
    </div>;
  }

  export default Schedule;