import React from 'react';
import ListItems from './ListItems'
import Schedule from './Schedule'
import Tomorrow from './Tomorrow'
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

var startTime = 0;
var endTime = 0;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date: "",
      items:[],
      schedule: [],
      tomorrow: [],
      currentItem:{
        task:'',
        key:'',
        time: 0,
        completed: false
      }
    }
    this.bindFunctions();
  }

  bindFunctions(){
    this.addTask = this.addTask.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
    this.setStart = this.setStart.bind(this);
    this.setEnd = this.setEnd.bind(this);
    this.createSchedule = this.createSchedule.bind(this);
    this.addToday = this.addToday.bind(this);
    this.addTomorrow = this.addTomorrow.bind(this);
    this.getListItems = this.getListItems.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
  }

  componentDidMount(){
    this.getDate();
    this.getListItems();
  }

  getDate(){
    var options = {  weekday: 'long', month: 'long', day: 'numeric'};
    var prnDt = new Date().toLocaleTimeString('en-us', options);
    const k = prnDt.indexOf(",", prnDt.indexOf(",") + 1);
    this.setState({
      date: prnDt.substring(0,k).toLowerCase()
    })
  }

  getListItems(e){
    if (localStorage.getItem("items") !== null)
        this.setState({ items: JSON.parse(localStorage.getItem("items")) })
    if (localStorage.getItem("schedule") !== null) 
      this.setState({ schedule: JSON.parse(localStorage.getItem("schedule")) }) 
    if (localStorage.getItem("tomorrow") !== null) 
      this.setState({ tomorrow: JSON.parse(localStorage.getItem("tomorrow")) }) 
  }

  logListItems(listName, arr){
    this.setState({[listName]: arr});
    localStorage.setItem(listName, JSON.stringify(arr));
  }

  setStart(e){
    e.preventDefault();
    startTime = e.target.value;
  }

  setEnd(e){
    e.preventDefault();
    endTime = e.target.value;
  }

  addTask(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.task !== ""){
      const taskItems = [...this.state.items, newItem];
        this.setState({ 
         currentItem:{
           task:'',
           key:'',
           time: 0,
           completed: false
         }
       })
      this.logListItems("items", taskItems);          
    }
  }

  addToday(e){
    e.preventDefault();
    const arr = this.createSchedule("schedule");
    this.logListItems("schedule", arr);
  }

  addTomorrow(e){
    e.preventDefault();
    const arr = this.createSchedule("tomorrow");
    this.logListItems("tomorrow", arr);
  }

  //Creates a schedule with given time inputs
  createSchedule(listName){
    const currentArray = this.state[listName];
    const timeArray = Array.from({length: endTime - startTime + 1}, (_, index) => index + parseInt(startTime));
    let taskValue = "";
    const scheduleArray = timeArray.map(time => {
      const match = currentArray.find(x => x.key === time);
      if ( match ){
        taskValue = match.task;
      }
      const scheduleItem = {
        task: taskValue,
        key: time,
        time: time,
        completed: false
      }
      return scheduleItem
    })
    return scheduleArray
  }

  //Creates input for the task list
  handleInput(e){
    this.setState({
      currentItem:{
       task: e.target.value,
       key: Date.now(),
       time: startTime,
       completed: false
     }
   })
  }

  //Deletes an item from the list
  deleteItem(listName, key){
    const filteredItems = this.state[listName].filter(item =>
      item.key!==key);
    this.logListItems(listName, filteredItems);
  }

  deleteAll(listName){
    this.logListItems(listName, []);
  }

  //Updates the task 
  setUpdate(listName, task, key){
    const tempItem = this.state[listName];
    tempItem.map( x =>{      
      if(x.key===key){
        x.task = task;
      }
      return tempItem
    })
    this.logListItems(listName, tempItem);
  }

  //Toggles the completion of a task
  toggleComplete(listName, value, key){
    const tempItem = this.state[listName];
    tempItem.map( x => {      
      if(x.key===key){ 
       x.completed = !x.completed;
      }
      return tempItem
    })
    this.logListItems(listName, tempItem);
  }

  moveToday(){
    this.logListItems("schedule", this.state.tomorrow);
    this.logListItems("tomorrow", []);
  }
  
  render(){
    return (
      <Container>
        <Row className = "top">
          <Col className = "todayDate">
            <FontAwesomeIcon className="calendar" icon={faCalendar}/>
            {this.state.date}
          </Col>
        </Row>
        <Row>
          <Col>
            <h2> today </h2>
            <div className="App">
                <form className="ToDo" onSubmit={this.addToday}>
                  <input type="number" min="0" max="23" placeholder = "start" value = {this.state.currentItem.start} onChange = {this.setStart}></input>
                  <input type="number" min="0" max="23" placeholder = "end" value = {this.state.currentItem.end}  onChange = {this.setEnd}></input>
                  <button type="submit">create</button>
                  <FontAwesomeIcon className="faicons" onClick={() => {this.deleteAll("schedule")}} icon={faTrash}/>
               </form>
                <Schedule schedule = {this.state.schedule} deleteItem={this.deleteItem} setUpdate={this.setUpdate} toggleComplete={this.toggleComplete}/>
            </div>
          </Col>

          <Col>
           <h2> tomorrow </h2>
           <FontAwesomeIcon className="faicons" onClick={() => {this.moveToday()}} icon={faExchangeAlt}/>
  
            <div className="App"> 
                <form className="ToDo" onSubmit={this.addTomorrow}>
                
                  <input type="number" min="0" max="23" placeholder = "start" value = {this.state.currentItem.start} onChange = {this.setStart}></input>
                  <input type="number" min="0" max="23" placeholder = "end" value = {this.state.currentItem.end}  onChange = {this.setEnd}></input>
                  <button type="submit">create</button>
                  <FontAwesomeIcon className="faicons" onClick={() => {this.deleteAll("tomorrow")}} icon={faTrash} />
               </form>
                <Tomorrow schedule = {this.state.tomorrow} deleteItem={this.deleteItem} setUpdate={this.setUpdate} toggleComplete={this.toggleComplete}/>
            </div>
          </Col>

          <Col>
           <h2> tasks </h2>
            <div className="App">
                <form className="ToDo" onSubmit={this.addTask}>
                  <input type="text" id = "taskName" placeholder="enter task" value= {this.state.currentItem.task} onChange={this.handleInput}></input>
                   <button type="submit">add</button>
                   <FontAwesomeIcon className="faicons" onClick={() => {this.deleteAll("items")}} icon={faTrash} />
                </form>
                <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate} toggleComplete={this.toggleComplete}/>
            </div>
          </Col>
        </Row>
      </Container>
     );
  }
} export default App;