import React, { Component } from 'react';
import './Add.css';
import img from './addButton.svg'

class Add extends Component{
    constructor(){
        super();
        this.state={text:""};
    }
    componentDidMount(){
        let textField=document.getElementById('inputField');
        textField.addEventListener("keydown",key=>{
            if (key.keyCode === 13){
            this.addItem();
            }
        })
    }
    onTextChange=(e)=>{
        this.setState({text:e.target.value});
    }
    addItem=()=>{
        if(this.state.text!==""){
            this.props.addItem(this.state.text);
            document.getElementById('inputField').value="";
            this.setState({text:""});
        }
    }
    render(){
        return (
            <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                <img onClick={this.addItem} src={img} height="50" alt="" className="addButton"/>
                <input onChange={this.onTextChange} placeholder="Add a new task" id="inputField" type="text"/>
            </div>
        )
    }
}
export default Add;