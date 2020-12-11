import React from 'react';
// import logo from './logo.svg';
import ListItems from './ListItems'
import Schedule from './Schedule'

import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
// import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
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
      currentItem:{
        task:'',
        key:'',
        time: 0,
        completed: false
      },
    }
    // console.log("starting out : " + JSON.stringify(this.state.currentItem));



    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.deleteScheduleItem = this.deleteScheduleItem.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
    this.setScheduleUpdate = this.setScheduleUpdate.bind(this);
    this.setStart = this.setStart.bind(this);
    this.setEnd = this.setEnd.bind(this);
    this.addSchedule = this.addSchedule.bind(this);
    this.displayItems = this.displayItems.bind(this);
  }

   displayItems(e){
    if (localStorage.getItem("taskList") !== null) {
        this.setState({ items: JSON.parse(localStorage.getItem("taskList")) })
    }
    if (localStorage.getItem("scheduleItems") !== null) {
      this.setState({ schedule: JSON.parse(localStorage.getItem("scheduleItems")) }) 
     }
   }

  logTaskList(arr){
    this.setState({ items: arr })
    localStorage.setItem("taskList", JSON.stringify(arr));
  }

  logScheduleItems(arr){
    this.setState({ schedule: arr })
    localStorage.setItem("scheduleItems", JSON.stringify(arr));
  }

  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.task !== ""){
      const taskItems = [...this.state.items, newItem];
        this.setState({ //Resets to default
         currentItem:{
           task:'',
           key:'',
           time: 0,
           completed: false
         }
       })
      this.logTaskList(taskItems);          
    }
  }


    //check if this.state.schedule is empty
    //cycle through it and check if the task is == ''
      //if not, replace the new task with it
    //send array to the this.statesscheudle

    // const scheduleArray = timeArray.map(time => { currentArray[x].key === time }
       // if (currentArray && currentArray.length){ //if the stored array is not empty
        // if (x < currentArray.length){
          // if (currentArray.filter(item => item.key === parseInt(startTime) + parseInt(x))) {
          //   taskValue = item.task;
          // }
          // console.log("time: " + currentArray[x].time);
          // console.log(parseInt(startTime) + parseInt(x));
          // taskValue = currentArray[x].task;
          // console.log("x: " + x + " task value: " + JSON.stringify(currentArray[x].task));
        // }
      // }
  addSchedule(e){
    e.preventDefault();

    const currentArray = this.state.schedule;
    const timeArray = Array.from({length: endTime - startTime + 1}, (_, index) => index + parseInt(startTime));

    console.log("current array:  " + JSON.stringify(currentArray));
    
    // let scheduleItem = {}
    let taskValue = "";

    const scheduleArray = timeArray.map(time => {
      // if (currentArray.some(x => x.key === time )){
      //   taskValue = x.task;
      // }

    const scheduleItem = {
                      task:taskValue,
                      key: time,
                      time: time,
                      completed: false
                      }
      
      return scheduleItem
    }) // end of thee map function
      console.log("final schedule:" + JSON.stringify(scheduleArray));
      this.logScheduleItems(scheduleArray);
  }

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
  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.logTaskList(filteredItems);
  }

  //Deletes an item from the schedule
  deleteScheduleItem(key){
    console.log("in the deleteScheduleItem method");
    const filteredItems= this.state.schedule.filter(item =>
      item.key!==key);
    console.log("schedule from js:  " + JSON.stringify(filteredItems, null, 4));
    this.logScheduleItems(filteredItems);
  }

  //Updates the task 
  setUpdate(task, key){
    const tempItem = this.state.items;
    tempItem.map( x =>{      
      if(x.key===key){
        x.task = task;
      }
      return tempItem
    })
    this.logTaskList(tempItem);
  }

  //Updates the task in the schedule
  setScheduleUpdate(input, key){
    const tempItem = this.state.schedule;
    tempItem.map( x =>{      
      if(x.key===key){
        x.task = input;

        return tempItem
        // x.completed = !x.completed;  
      }
    })
    // console.log("tempItem variable: " + JSON.stringify(tempItem));
    this.logScheduleItems(tempItem);
}


   //Toggles the completion of a task
   toggleComplete(value, key){
    const tempItem = this.state.items;
    tempItem.map( x =>{      
         if(x.key===key){ //If it is the item we are looking for 
           x.completed = !x.completed;
         }
       })
    this.setState({
     items: tempItem
   })
  }
  setStart(e){
    e.preventDefault();
    startTime = e.target.value;

  }

  setEnd(e){
    e.preventDefault();
    endTime = e.target.value;

  }

  componentDidMount(){
    var options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    var prnDt = new Date().toLocaleTimeString('en-us', options);
    const k = prnDt.indexOf(",", prnDt.indexOf(",") + 1);

    this.setState({
      date: prnDt.substring(0,k)
    })
    this.displayItems();
    console.log("finish function");
  }


  render(){
    return (
      <Container>
        <Row className = "top">
        <Col className = "todayDate">
          <FontAwesomeIcon className="calendar" icon={faCalendar}/>
          {this.state.date}
        </Col>
        <Col>
           <h2> tasks </h2>
            <div className="App">
                <form id="to-do-form" onSubmit={this.addItem}>
                   <input type="text" id = "taskName" placeholder="Enter task" value= {this.state.currentItem.task} onChange={this.handleInput}></input>
                   <button type="submit">Add Task</button>
                </form>
                <p>{this.state.items.task}</p>
                <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>

            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2> today </h2>
            <div className="App">
                <form id="to-do-form" onSubmit={this.addSchedule}>
                  <input type="number" min="0" max="23" placeholder = "Start" value = {this.state.currentItem.start} onChange = {this.setStart}></input>
                  <input type="number" min="0" max="23" placeholder = "End" value = {this.state.currentItem.end}  onChange = {this.setEnd}></input>
                  <button type="submit">Create Schedule</button>
                </form>
                <Schedule schedule = {this.state.schedule} deleteScheduleItem={this.deleteScheduleItem} setScheduleUpdate={this.setScheduleUpdate}/>
            </div>
          </Col>

          <Col>
           <h2> tomorrow </h2>
            <div className="App">
                <form id="to-do-form" onSubmit={this.addItem}>
                   <input type="text" id = "taskName" placeholder="Enter task" value= {this.state.currentItem.task} onChange={this.handleInput}></input>
                   <button type="submit">Add Task</button>
                </form>
                <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>

            </div>
          </Col>
        </Row>
      </Container>
     );
  }
} export default App;
