import React, { Component } from 'react';
import './TaskContainer.css';
import Plate from '../Plate/Plate';
import Scroll from './Scroll';
import Add from './Add';
import HandleDrag from './handleDrag';


class TaskContainer extends Component {
  constructor(){
    super();
    this.state={
      dragged:'',//ITT
    }
    this.children=[];//[{id:-1,y:100},....]
  }
  componentDidUpdate(){
  }
  handleDrag=(yValue,id,text)=>{
    let obj=this.props.items.filter(item=>item.text===text);
    if (this.children.filter(child=>child.text===text).length===0){
      let newObject={id:String(-1*obj[0].id),y:yValue,text:text};
      this.children.push(newObject);
    }else{//ha már van adott text az adatbázisban
      this.children.forEach((child,i)=>{
        if(child.text===text && child.y!==yValue){
          let newObj={id:String(-1*obj[0].id),y:yValue,text:text};
          this.children[i]=newObj;
        }
      })
    }

    
    
  }
  toggleDrag=(id,str)=>{
    if (str==='release'){
      const sortedItems=HandleDrag.Sort(this.children,this.props.items);
      // this.state.dragged=0;
      this.setState({dragged:''});
      this.props.sortItems(sortedItems);
    }else{
      // this.state.dragged=id;
      this.setState({dragged:id});
    }
    
  }
  remove=(textToRemove,id)=>{
    this.children=this.children.filter(child=>child.id===id? false:true);
    this.props.remove(textToRemove);
  }
  generateContent=()=>{
    let animationStyles=0;
    if (this.props.active===0){
      return(
        <h1 className="warning">Please select at least 1 weekday</h1>
      )
    }else{
        animationStyles=HandleDrag.needToAnimate(this.children,this.state.dragged);
      return(
            this.props.items.map((item)=>{
              const styles=animationStyles.includes(item.text)? "plate taskCont animate" : "plate taskCont";
              return <Plate dragged={this.toggleDrag} getY={this.handleDrag} remover={this.remove} key={item.id*-1} index={String(item.id*-1)} styles={styles} task={item.text}/>
            })          
      )
    }
  }
  render() {
    return (
      <div className="myContainer">
        <Scroll sty="scrollbar taskContAdd">
        {this.generateContent()}
        </Scroll>
        <Add addItem={this.props.add}/>
      </div>
    );
  }
}

export default TaskContainer;
