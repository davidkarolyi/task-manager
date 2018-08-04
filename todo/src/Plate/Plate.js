import React, { Component } from 'react';
import './Plate.css';

class Plate extends Component {
  constructor(){
    super();
    this.state={dragged:false,draggedPos:[0,0],newPos:[0,0],width:0,offsetX:0,offsetY:0};
    this.needToMove=false;
    this.animated=false;
    this.virgin=true;
  }
  componentDidMount(){
    let thisPlate=document.getElementById(this.props.index);
    thisPlate.addEventListener("mousedown",this.dragPlate);
    if(this.props.styles==="plate taskCont"){
      this.props.getY(thisPlate.getBoundingClientRect().top,this.props.index,this.props.task);
    }
    
  }
  componentDidUpdate(){
    let thisPlate=document.getElementById(this.props.index)
    if(this.props.styles==="plate taskCont"){
      this.props.getY(thisPlate.getBoundingClientRect().top,this.props.index,this.props.task);
    }
    
  }
  componentWillUnmount(){
    const thisPlate=document.getElementById(this.props.index);
    const body=document.querySelector("body");
    thisPlate.removeEventListener("click",this.dragPlate);
    thisPlate.removeEventListener("mousedown",this.dragPlate);
    body.removeEventListener("mouseup",this.handleReleaseIfNotDragged);
    body.removeEventListener("mousemove",this.evListener);
    body.removeEventListener("mouseup",this.releasePlate);
  }
  evListener=pos=>{
    this.setState({newPos:[pos.clientX-this.state.draggedPos[0],pos.clientY-this.state.draggedPos[1]]});
    this.props.dragged(this.props.task,'');
  }
  handleReleaseIfNotDragged=()=>{
    this.needToMove=false;
    const body=document.querySelector("body");
    body.removeEventListener("mouseup",this.handleReleaseIfNotDragged);
  }
  dragPlate=(e)=>{
    this.needToMove=this.props.styles==="plate weekCont"? false:true;
    let animation=new Promise((res,err)=>{
      setTimeout(() => {
          res("done")
      }, 650);
    })
    const body=document.querySelector("body");
    animation.then(()=>{
      if(this.needToMove){
        let thisPlate=document.getElementById(this.props.index)
        thisPlate.style.cursor="none";
        body.style.cursor="none";
        this.setState({dragged:true,draggedPos:[e.clientX,e.clientY],offsetX:e.offsetX,offsetY:e.offsetY});
        this.props.dragged(this.props.task,'');
        body.addEventListener("mousemove",this.evListener);
        body.addEventListener("mouseup",this.releasePlate);
      }     
    }
    )
    body.addEventListener("mouseup",this.handleReleaseIfNotDragged);
  }
  releasePlate=(e)=>{
    if(this.state.dragged){
      this.needToMove=false;
      let thisPlate=document.getElementById(this.props.index)
      const body=document.querySelector("body");
      thisPlate.style.cursor="default";
      body.style.cursor="default";
      body.removeEventListener("mousemove",this.evListener);
      body.removeEventListener("mouseup",this.releasePlate);
      this.props.dragged(this.props.task,'release');
      this.setState({dragged:false,draggedPos:[0,0],newPos:[0,0]}); 
    }
  }
  delete=()=>{
    this.props.remover(String(this.props.task),this.props.index);
  }
  render() {
    let thisPlate=document.getElementById(this.props.index);
    let width=this.state.dragged? (String(thisPlate.offsetWidth)+"px"):"100%";
    let sty={
      transform:`translateY(${this.state.newPos[1]+0}px)`,width:width
    };
    if (this.props.styles.includes("animate")){
      this.animated=true;
    }
    let styles=this.props.styles;
    if(this.virgin &&this.props.styles.includes("taskCont")){
      styles+=" virgin";
      this.virgin=false;
    }
    return (
      <div onDoubleClick={this.delete} id={this.props.index} style={sty} className={this.state.dragged ? 'dragged':`notdragged ${this.props.needToAnimate}`}>
          <p className={styles}>
            {this.props.task}
            
          </p>
      </div>
    );
  }
}

export default Plate;
