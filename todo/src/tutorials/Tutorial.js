import React, { Component } from 'react';
import './Tutorial.css';
import Slides from './slides';

class Tutorial extends Component{
    constructor(){
        super();
        this.state={
            activeSlide:Slides.slide_0
        }
    }
    componentDidUpdate(){
        let card=document.getElementById("tutorial");
        card.style.animation="fadeIn 200ms linear";
    }
    slide_Click=(slide_num)=>{
        let card=document.getElementById("tutorial");
        card.style.animation=slide_num.target.className[0]==='4'? "endTutorial 500ms ease-in":"fadeOut 200ms linear";
        const promise=new Promise(()=>{
            const num=slide_num.target.className[0];
            setTimeout(() => {
                switch (num) {
                    case '1': this.setState({activeSlide:Slides.slide_1});
                    break;
                    case '2': this.setState({activeSlide:Slides.slide_2});
                    break;
                    case '3': this.setState({activeSlide:Slides.slide_3});
                    break;
                    default: this.props.endTutorial();
                        break;
                }
            }, 150);
        })
        promise.then(()=>{});
       
    }
    render(){
        return (
        <div id='flexContainer'>
            <div id="filter">
            </div>
            {this.state.activeSlide(this.slide_Click)}
        </div>
        )
    }
}
export default Tutorial;