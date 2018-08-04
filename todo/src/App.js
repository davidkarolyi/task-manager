import React, { Component } from 'react';
import TaskContainer from './TaskContainer/TaskContainer';
import Week from './Week/Week';
import './App.css';
import processor from './taskProcessor';
import SortItems from './TaskContainer/handleDrag';
import StorageManager from './ManageLocalStorage/ManageLocalStorage';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      activeDays:[],
      dayItems:props.dayItems, //{id:1,text:"hello"} =>this is a task
      itemsToShow:[],
      maxId:props.maxId,
    };
  }
  
  toggleActiveDay=(day)=>{
    let days=this.state.activeDays;
    const itemsToShow=processor(this.state.activeDays,this.state.dayItems);
    if (days.includes(day)){
      days.splice(days.indexOf(day), 1);
      this.setState({activeDays:days,itemsToShow:itemsToShow});
    }else{
      days.push(day);
      this.setState({activeDays:days,itemsToShow:itemsToShow});
    }
    
  }
  remover=(textToRemove)=>{
    let stateDayItems={itemsMo:[],itemsTu:[],itemsWe:[],itemsTh:[],itemsFr:[]};
    let objectNames=[];
    this.state.activeDays.forEach((day)=>{
      switch (day) {
        case 'mo': objectNames.push('itemsMo');break;
        case 'tu': objectNames.push('itemsTu');break;
        case 'we': objectNames.push('itemsWe');break;
        case 'th': objectNames.push('itemsTh');break;
        case 'fr': objectNames.push('itemsFr');break;
        default:break;
      }
    })
    Object.keys(stateDayItems).forEach(name=>{
      if(objectNames.includes(name)){
        let newState=[];
        this.state.dayItems[name].forEach((taskObject)=>{
          if(textToRemove!==taskObject.text){
            // console.log(textToRemove,taskObject.text);
            newState.push(taskObject);
          }
        })
        stateDayItems[name]=newState;
      }else{
        stateDayItems[name]=this.state.dayItems[name];
      }
    })
    this.setState({dayItems:stateDayItems});
    StorageManager.reFreshStorge(stateDayItems);
  }
  onChange=(e)=>{
    let stateDayItems=this.state.dayItems;
    // this.setState({items:[...items,{text:e,id:id}],maxId:id})
    let objectNames=[];
    this.state.activeDays.forEach((day)=>{
      switch (day) {
        case 'mo': objectNames.push('itemsMo');break;
        case 'tu': objectNames.push('itemsTu');break;
        case 'we': objectNames.push('itemsWe');break;
        case 'th': objectNames.push('itemsTh');break;
        case 'fr': objectNames.push('itemsFr');break;
        default:break;
      }
    })
    let id=this.state.maxId;
    let needAlert=0;
    objectNames.forEach(name=>{
      let existingTexts=stateDayItems[name].map(item=>item.text);
      if(!existingTexts.includes(e)){
        stateDayItems[name].push({id:id,text:e})
        id++;
      }
      else{
        needAlert++;
      }
    })
    if (needAlert!==this.state.activeDays.length){
      this.setState({dayItems:stateDayItems,maxId:id})
      StorageManager.reFreshStorge(stateDayItems);
    }else if(this.state.activeDays.length!==0){
      alert("This task is already exists in all selected days");
    }else{
      alert("There is no selected weekdays, please select the weekdays you want to add tasks to");
    }
    
  }
  AppSort=(presortedItems)=>{//like [{id:1,text:"hello"},]
    if(this.state.activeDays.length===1){
      let newOrder=SortItems.sortApp(this.state.activeDays,this.state.dayItems,presortedItems);
      this.setState({dayItems:newOrder});
      StorageManager.reFreshStorge(newOrder);
    }
    else{setTimeout(() => {
      alert("Please select exactly 1 day, if you want to sort the tasks in it")
    }, 100);}
  }
  render() {
    return (
      <div className="main">
        <TaskContainer sortItems={this.AppSort} active={this.state.activeDays.length} add={this.onChange} remove={this.remover} items={processor(this.state.activeDays,this.state.dayItems)}/>
        <Week active={this.state.activeDays} items={this.state.dayItems} toggle={this.toggleActiveDay}/>
      </div>
    );
  }
}

export default App;