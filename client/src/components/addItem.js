import React, { Component } from 'react';
import defaultImage from "../assets/images.png";
import { Redirect } from 'react-router';

class AddItem extends Component {

  state = {
    name: null,
    comments: null,
    image: null,
    likes: null,
    redirect: false
  }
  
  getInputValues = (e) => {
    this.setState({[e.target.name]: e.target.value });

  }

  createItem = (e) => {
    e.preventDefault();
    const item = {
      name : this.state.name,
      comments :  this.state.comments,
      image: this.state.image,
      likes: this.state.likes
    }
    const options = { 
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
         body: JSON.stringify(item)
    
    } 

    if(this.state.comments && this.state.image && this.state.name && this.state.likes ){
      fetch("http://localhost:8000/items", options)
      .then(res => {
        console.log(res);
        this.setState({redirect: true});
      })
    }else {
      console.log("The form is not valid to be sent")
    }

  }


  render() {
    const isImgReady = this.state.image;
    let imagePreview;

    if(isImgReady) {
      imagePreview = <img src={this.state.image} alt="post "/>
    }else {
      imagePreview = <img src={defaultImage} alt="default preview"/>
    }

    const redirect = this.state.redirect;
    if(redirect){
        return <Redirect to="/" />  
    }
    return (
      <React.Fragment>
          <section >
          <div className="banner"></div>
          <h2>Create a new Post</h2>

      <div className="itemCreation">
          <form onSubmit={this.createItem}>
           <div className="control">
            <label htmlFor="name">post Name: </label>
            <input type="text" name="name" onChange={this.getInputValues} />
            </div>

            <div className="control">
            <label htmlFor="comments">post comments: </label>
            <textarea name="comments" onChange={this.getInputValues} ></textarea>
            </div>

            <div className="control">
            <label htmlFor="likes">post likes: </label>
            <input type="number" name="likes" onChange={this.getInputValues} />
            </div>
            
            <div className="control">
            <label htmlFor="image">post Image: </label>
            <input type="text" name="image" onChange={this.getInputValues} />
            </div>
            
            <input type="submit" value="create post" />
         </form>

          <div className="preview">
          
            {imagePreview}
            <p>post Name: <strong> {this.state.name}</strong></p>
            <p>post comments: <strong> {this.state.comments}</strong> </p>
            <p>post likes: <strong> {this.state.likes} </strong></p>
            
          </div>

        </div>

         </section>


      </React.Fragment>
    );
  }
}

export default AddItem;