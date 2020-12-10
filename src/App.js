import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ListItems from './ListItems'
import Schedule from './Schedule'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

var startTime = 0;
var endTime = 0;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],
      currentItem:{
        task:'',
        key:'',
        time: 0,
        completed: false
      },
      schedule: []
    }
    // console.log("starting out : " + JSON.stringify(this.state.currentItem));

  

    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
    this.populateList = this.populateList.bind(this);
    this.setStart = this.setStart.bind(this);
    this.setEnd = this.setEnd.bind(this);
    // this.loadItems = this.loadItems.bind(this);
    this.addSchedule = this.addSchedule.bind(this);
    this.getSchedule = this.getSchedule.bind(this);
  }



   // loadItems(){
   //    console.log("continuoous" + this.state.items);
   //    this.state.items = JSON.parse(localStorage.getItem('listItems'));
   // }

    addItem(e){
        e.preventDefault();
        const newItem = this.state.currentItem;
        if(newItem.task !==""){
            const taskItems = [...this.state.items, newItem];
            this.setState({ //Resets to default
               items: taskItems,
               currentItem:{
                 task:'',
                 key:'',
                 time: 0,
                 completed: false
               }
            })

            localStorage.setItem('listItems', JSON.stringify(taskItems));           
        }
    }

    getSchedule(){
      // window.localStorage.clear();
      console.log(localStorage.getItem("schedule"));
      // var tempSched = JSON.parse(localStorage.getItem("schedule")) || [];
      // this.setState({ schedule: tempSched})
    }

    addSchedule(e){
      console.log("initial " + JSON.stringify(this.state.schedule, null, 4));
      e.preventDefault();

      const stepsArray = Array.from({length: endTime - startTime + 1}, (_, index) => index + 1);
      const scheduleArray = stepsArray.map(x => ({
                                                  task:'',
                                                  key:Date.now(),
                                                  time: parseInt(startTime) + parseInt(x) - 1,
                                                  completed: false
                                                })
        
      )
      this.setState({ schedule: scheduleArray})
      localStorage.setItem("schedule", JSON.stringify(this.state.schedule));
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
    this.setState({
      items: filteredItems
    })

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
      console.log("current completion:" + this.state.completed);
  }

  //Updates the task 
  setUpdate(task, key){
    const tempItem = this.state.items;
    tempItem.map( x =>{      
      if(x.key===key){
        x.task = task;
        x.completed = !x.completed;  

        if(x.completed){
            x.textDecor='line';
         }
         else{
            x.textDecor = null;
         }
      }


      console.log("current completion:" + x.completed);
    })
  
    this.setState({
      items: tempItem
    })
    console.log("ITEMS OUTSIDE: " + JSON.stringify(this.state.items));

    
  }

   populateList(){
      console.log("the start is:" + startTime);
      console.log("the END is:" + endTime);

      //take the two key values from the input box
      const total = endTime - startTime;
      for (let i = 0; i < total; i++){
        //create list with the start time and end time as its state
      }
   }



    setStart(e){
        e.preventDefault();
        startTime = e.target.value;
        // populateList();
   }

    setEnd(e){
        e.preventDefault();
        endTime = e.target.value;
        // populateList();
    }

    componentDidMount(){
      var options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      var prnDt = 'Printed on ' + new Date().toLocaleTimeString('en-us', options);

      console.log(prnDt);
      this.getSchedule();
      console.log("finish function");
      }


 render(){
  return (
   // this.state.items = JSON.parse(localStorage.getItem('listItems'))
   <div className = "Container">
    <div className="App">
      <header>

        <form id="to-do-form" onSubmit={this.addItem}>
          <input type="text" id = "taskName" placeholder="Enter task" value= {this.state.currentItem.task} onChange={this.handleInput}></input>
          <button type="submit">Add Task</button>
        </form>
        <p>{this.state.items.task}</p>
          <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>

      </header>
    </div>

    <div className="App">
      <header>
      
        <form id="to-do-form" onSubmit={this.addSchedule}>
          <input type="number" min="0" max="23" value = {this.state.currentItem.start} onChange = {this.setStart}></input>
          <input type="number" min="0" max="23" value = {this.state.currentItem.end}  onChange = {this.setEnd}></input>
          <button type="submit">Create</button>
        </form>
          <Schedule schedule = {this.state.schedule} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
      </header>
    </div>
    </div>
  );
 }
}


export default App;
