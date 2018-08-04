import React, { Component } from 'react';
import './Week.css';
import Plate from '../Plate/Plate';
import Scroll from '../TaskContainer/Scroll';

class Week extends Component {
    removeElement(id){
        console.log("csak feladat nézetben távolíthatsz el elemeket")
    }
    dayGenerator=(day)=>{
        let dayItems=[];
        switch (day) {
            case "mo":dayItems=this.props.items.itemsMo;break;
            case "tu":dayItems=this.props.items.itemsTu;break;
            case "we":dayItems=this.props.items.itemsWe;break;
            case "th":dayItems=this.props.items.itemsTh;break;
            case "fr":dayItems=this.props.items.itemsFr;break;
            default:console.log("default")
                break;
        }
        return(
            <div className="motask">
                <Scroll sty={"scrollbar I"+day}>
                    {dayItems.map(item=>{
                            return <Plate remover={this.removeElement} key={item.id} index={String(item.id)} styles="plate weekCont" task={item.text}/>
                            })
                    }       
                </Scroll>
            </div>
        )
    }
    toggle=(e)=>{
        if(e.target.className!=="plate weekCont"){
            this.props.toggle(e.target.className.substring(11))
        }     
    }
    render() {
        return (
        <div className="weekContainer">
            <div id={this.props.active.includes('mo')? "activemo":""} className="mo" onClick={this.toggle}>
                <div className="textmo">
                    Mon
                </div>
                {this.dayGenerator("mo")}
            </div>
            <div id={this.props.active.includes('tu')? "active":""} className="tu" onClick={this.toggle}>
                <div className="text">
                    Tue
                </div>
                {this.dayGenerator("tu")}
            </div>
            <div id={this.props.active.includes('we')? "active":""} className="we" onClick={this.toggle}>
                <div className="text">
                    Wed
                </div>
                {this.dayGenerator("we")}
            </div>
            <div id={this.props.active.includes('th')? "active":""} className="th" onClick={this.toggle}>
                <div className="text">
                    Thu
                </div>
                {this.dayGenerator("th")}
            </div>
            <div id={this.props.active.includes('fr')? "activefr":""} className="fr" onClick={this.toggle}>
                <div className="textfr">
                    Fri
                </div>
                {this.dayGenerator("fr")}
            </div>
        </div>
        );
    }
}

export default Week;