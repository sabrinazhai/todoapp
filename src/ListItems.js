import React from 'react';
import './ListItems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import FlipMove from 'react-flip-move';
import { Container, Row } from 'react-bootstrap';

function ListItems(props){
    const items = props.items;
    // console.log("strung" + JSON.stringify(props.items));
    const listItems = items.map(item =>
    {
     return <Container className="list" key={item.key}>
                <Row className = "taskItem">
                    <input type="checkbox" onChange={(e)=>{
                    props.setUpdate(e.target.value, item.key)}}/>

                    <input type="text" autoComplete="new-password" id={item.key} value={item.task} onChange={(e)=>{
                    props.setUpdate(e.target.value, item.key)}} />
                   
                   <span>
                   <FontAwesomeIcon className="faicons" onClick={() => {
                                                                props.deleteItem(item.key)
                                                                }} icon={faMinus} />
                    </span>
                </Row>
            </Container>
    })

    return <div>
        <FlipMove duration={300} easing="ease-in-out">
            {listItems}
        </FlipMove>
    </div>;
}

export default ListItems;