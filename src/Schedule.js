import React from 'react';
import './ListItems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import FlipMove from 'react-flip-move';
import { Container, Row } from 'react-bootstrap';


function Schedule(props){
    const schedule = props.schedule;
    //       <p> {item.time + ":00"} </p>
    // console.log("schedule from js:  " + JSON.stringify(schedule, null, 4));
    const scheduleItems = schedule.map(item =>
    {
      return <Container className = "list" key={item.key}>
	       <Row className = "taskItem">

	       		<input type="checkbox" onChange={(e)=>{
                    props.setScheduleUpdate(e.target.value, item.key)}}/>

                <label htmlFor = "checkbox"> {item.time + ":00"} </label>
		 

		        <input type="text" autoComplete="new-password" id={item.key} 
		         		value={item.task} onChange={(e)=>{ 
		         							props.setScheduleUpdate(e.target.value, item.key)}} />

		 		<span>
		 		<FontAwesomeIcon className="faicons" onClick={() => {
												            props.deleteScheduleItem(item.key)
												        	}} icon={faMinus} /></span>
	        </Row>
        </Container>
    })

    return <div>
        <FlipMove duration={300} easing="ease-in-out">
        {scheduleItems}
        </FlipMove>
    </div>;
  }

  export default Schedule;