import React from 'react';
import './ListItems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import FlipMove from 'react-flip-move';
import { Container, Row } from 'react-bootstrap';

function ListItems(props){
    const items = props.items;
    const listItems = items.map(item => {
        return <Container className="list" key={item.key}>
            <Row className = "taskItem">
                <input type="checkbox" checked = {item.completed} onChange={(e)=>{
                props.toggleComplete("items", e.target.value, item.key)}}/>
                <input type="text" autoComplete="new-password" value={item.task} onChange={(e)=>{
                props.setUpdate("items", e.target.value, item.key)}} />
               <span>
               <FontAwesomeIcon className="faicons" onClick={() => {
                                                        props.deleteItem("items", item.key)
                                                            }} icon={faMinus} />
                </span>
            </Row>
        </Container>
    })

    return <div>
        <FlipMove duration={100} easing="ease-in-out">
            {listItems}
        </FlipMove>
    </div>;
}

export default ListItems;