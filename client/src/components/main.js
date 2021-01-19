import React, { Component } from 'react';
import {Link} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';


class Main extends Component {
  
  state = {
    items: [],
  
    
  }

  

  componentDidMount = () =>{
    // console.log("mounted");
    fetch("http://localhost:8000/items").then(res => {
      return res.json();
    }).then(blob => {
      console.log(blob)
      this.setState({items: blob.data});
      
    //  console.log(this.state.items)
    })
  }
        



  render() {
    return (
      <React.Fragment>
        
        <section>
          
          <div className="itemsContainer">
          
          
          
          
          {this.state.items.map(item => {
            return(
              <div className="item" key={item._id}>
                 <div className="cover" style={{backgroundImage: "url(" + item.image + ")" }}></div>
                  <div className="my" >
                   <Link to={"item/" + item._id}><h3>{item.name}</h3></Link> 
                  <p>
                  
                  <span  className="likes"><i className="fa fa-thumbs-up" aria-hidden="true"></i>{item.likes}</span> 
                  <span className="comments"><i className="fa fa-commenting" aria-hidden="true"></i>{item.comments} </span>
                  </p>
   
                  </div>
              </div>
            )
          })}
          </div>
        </section>
          
      </React.Fragment>
    );
  }
}

export default Main;