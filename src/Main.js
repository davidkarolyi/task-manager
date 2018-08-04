import React, { Component } from 'react';
import Tutorial from './tutorials/Tutorial';
import App from './App';
import help from './images/lost.png';
import './Main.css';
import StorageManager from './ManageLocalStorage/ManageLocalStorage';

class Main extends Component{
    constructor(){
        super();
        this.maxId=1;
        this.state={
            tutorial:!StorageManager.isStorageExists(),
        }
    }
    switchPage=()=>{
        this.setState({tutorial:!this.state.tutorial});
    }
    prepareStoredData=()=>{
        if (StorageManager.isStorageExists()){
            const {dayItems, maxId}=StorageManager.readStorage();
            this.maxId=maxId;
            return dayItems;
        }else{
            return {itemsMo:[],itemsTu:[],itemsWe:[],itemsTh:[],itemsFr:[]}
        }
    }
    render(){
    return (
        this.state.tutorial? <Tutorial endTutorial={this.switchPage}/>:
        <div>
            <img onClick={this.switchPage} id="helpMe" title="Help" src={help} alt="help" width="32px" />
            <App dayItems={this.prepareStoredData()} maxId={this.maxId+5}/>
        </div>
    );
    }
}
export default Main;