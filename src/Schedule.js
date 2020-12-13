import React from 'react';
import './ListItems.css';
import FlipMove from 'react-flip-move';
import { Container, Row } from 'react-bootstrap';


function Schedule(props){
    const schedule = props.schedule;
    const scheduleItems = schedule.map(item => {
        return <Container className = "list" key={item.key}>
	       <Row className = "taskItem">
	       		<input type="checkbox" checked = {item.completed} onChange={(e)=>{
                    props.toggleComplete("schedule", e.target.value, item.key)}}/>
                <label htmlFor = "checkbox"> {item.time + ":00"} </label>
		        <input type="text" autoComplete="new-password"
		         		value={item.task} onChange={(e)=>{ 
		         		   props.setUpdate("schedule", e.target.value, item.key)}} />
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