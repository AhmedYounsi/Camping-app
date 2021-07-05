import React, { Component } from 'react';

class like extends Component {
    state={
        count:0
    }
    incrementMe =() =>{
        console.log("give Adele some likes")
    }
    render() { 
        return (
            <div>
                <p></p>
                <img alt="adele-pic" src="http://www.gstatic.com/tv/thumb/persons/521029/521029_v9_ba.jpg"></img>
                <button> likes:{this.state.count}</button>
                
            </div>
        );
    }
}
 
export default like;