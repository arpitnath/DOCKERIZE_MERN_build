import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Item extends Component {
  state = {
    name: "",
    comments: "",
    image: "",
    likes: "",
    redirect: false
  }

  

  componentDidMount = () => {
    fetch("http://localhost:8000/item/" + this.props.match.params.id).then(res => {
    console.log('props',this.props)  
    return res.json();
    }).then(blob => {
     console.log(blob)
      this.setState({name: blob.item.name});
      this.setState({comments: blob.item.comments});
      this.setState({image: blob.item.image});
      this.setState({likes: blob.item.likes});
      
    });
  }

  // handleIncrement = () => {
  //   this.setState({likes : this.state.likes + 1})
  // }

  getInputValues = (e) => {
    
    this.setState({[e.target.name]: e.target.value})
    console.log(this.state[e.target.name])
  }
  updateItem = (e) => {
    e.preventDefault();
    //update the item
    const item = {
      name : this.state.name,
      comments :  this.state.comments,
      image: this.state.image,
      likes: this.state.likes
    }
    const options = { 
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
         body: JSON.stringify(item)
    
    } 
   
    fetch("http://localhost:8000/item/"+ this.props.match.params.id, options)
    .then(res => {
      console.log(res);
      this.setState({redirect: true});
    }).catch(err => {
      console.log(err);
    })
  }

deleteItem = () => {
  let confirmDelete = window.confirm("Are you sure you want to delete this item?");
  if(confirmDelete){
    const options = { 
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: this.props.match.params.id})
    
    } 
    
    fetch("http://localhost:8000/item/"+ this.props.match.params.id, options)
    .then(res => {
      console.log(res);
      this.setState({redirect: true});
    })
  }else{
    console.log("Item was not deleted")
  }

}

  render() {
    
    const redirect = this.state.redirect;
    if(redirect){
        return <Redirect to="/" />  
    }
    return (
      <React.Fragment>
          <section >
          <div className="banner"></div>
          <h2>Update an item</h2>

      <div className="itemCreation">
          <form onSubmit={this.updateItem}>
           <div className="control">
            <label htmlFor="name">post Name: </label>
            <input type="text" name="name" onChange={this.getInputValues} defaultValue={this.state.name} />
            </div>

            <div className="control">
            <label htmlFor="comments">post comments: </label>
            <textarea name="comments" onChange={this.getInputValues} value={this.state.comments} >
            </textarea>
            </div>

            <div className="control">
            <label htmlFor="likes">post likes: </label>
            <input type="number" name="likes" onChange={this.getInputValues} defaultValue={this.state.likes} />
            </div>
            
            <div className="control">
            <label htmlFor="image">post Image: </label>
            <input type="text" name="image" onChange={this.getInputValues} defaultValue={this.state.image} />
            </div>
            
            <input type="submit" value="Update post" />
         </form>

          <div className="preview">
          
           <img src={this.state.image} alt="post" />
            <p>post Name: <strong> {this.state.name}</strong></p>
            <p>post comments: <strong> {this.state.comments}</strong> </p>
            <p>post likes: <strong> {this.state.likes} </strong></p>
            <button className="delete" onClick={this.deleteItem}>Delete this Item</button>
          </div>
         
        </div>

         </section>

      </React.Fragment>
    );
  }
}

export default Item;