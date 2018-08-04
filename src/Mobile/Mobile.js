import React from 'react';
import './Mobile.css';
import android from '../images/android.png';
import apple from '../images/apple.png';

class Mobile extends React.Component{
    constructor(){
        super();
        this.state={
            clicked:false
        }
    }
    componentDidMount(){
        const body=document.querySelector("body");
        body.style.backgroundSize="auto";
    }
    changeState=()=>{
        this.setState(prevState=>({clicked:!prevState.clicked}));
    }
    render(){
        return(
            this.state.clicked?
            <div id="Container">
                <h1 style={{width:"100%"}} onClick={this.changeState}>&larr;</h1>
                <p>Almost forget...
                Doesn't have a mobile app, so grab a PC</p>
            </div>
            :
            <div id="Container">
                <p>This web app doesn't support mobile browsers.
                You can download the mobile app</p>
                <div id="pics">
                    <img onClick={this.changeState} id="apple" src={apple} width="50%" alt="Download from app store" />
                    <img onClick={this.changeState} src={android} width="50%" alt="Download from play store" />
                </div>
            </div>
        )
    }
}
export default Mobile