import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListItems from './ListItems'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

var startTime = 0;
var endTime = 0;
var totalTime = 0;

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
      }
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
    this.loadItems = this.loadItems.bind(this);
  }



   loadItems(){
      console.log("continuoous" + this.state.items);
      this.state.items = JSON.parse(localStorage.getItem('listItems'));
   }

    addItem(e){
      // loadItems();
      
      
      console.log("should be objjects:    " + this.state.items);
        e.preventDefault();
        const newItem = this.state.currentItem;
        // console.log("newItem: " + JSON.stringify(this.state.items));
        if(newItem.task !==""){
            // console.log("logging new item");
            const taskItems = [...this.state.items, newItem];
            // console.log("after added item: " + JSON.stringify(this.state));
            this.setState({ //Resets to default
               items: taskItems,
               currentItem:{
                 task:'',
                 key:'',
                 time: 0,
                 completed: false,
                 textDecor: null
               }
            })

            localStorage.setItem('listItems', JSON.stringify(taskItems));           
        }
      
    }

  handleInput(e){
    this.setState({
      currentItem:{
         task: e.target.value,
         key: Date.now(),
         time: startTime,
         completed: false,
         textDecor: null
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

  crossLine = event => {
        const element = event.target;
        element.classList.toggle("crossed-line");
    };


   populateList(){
      console.log("the start is:" + startTime);
      console.log("the END is:" + endTime);

      //take the two key values from the input box
      const total = endTime - startTime;
      for (let i = 0; i < total; i++){
        //create list with the start time and end time as its state
      }
   }

   //delete this function later
   // addItem(e){
   //      e.preventDefault();
   //      const newItem = this.state.currentItem;
   //      if(newItem.task !==""){
   //          const items = [...this.state.items, newItem];
   //          this.setState({
   //              items: items,
   //              currentItem:{
   //                  task:'',
   //                  key:'',
   //                  time: 0
   //                }
   //          })
   //      }
   //  }


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


 render(){
  return (
   // this.state.items = JSON.parse(localStorage.getItem('listItems'))
    <div className="App">
      <header>
        <form id="to-do-form" onSubmit={this.addItem}>
          <input type="number" min="0" max="23" value = {this.state.currentItem.start} onChange = {this.setStart}></input>
          <input type="number" min="0" max="23" value = {this.state.currentItem.end}  onChange = {this.setEnd}></input>
          <input type="text" id = "taskName" placeholder="Enter task" value= {this.state.currentItem.task} onChange={this.handleInput}></input>
          <button type="submit">Add Task</button>
        </form>
        <p>{this.state.items.task}</p>
          <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
        <p> Today </p>

      </header>
    </div>
  );
 }
}


export default App;
