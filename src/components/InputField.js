import React, {Component} from 'react';
import './InputField.css';
import {Modal} from './Modal';

const API = 'https://jsonplaceholder.typicode.com/posts/';

class InputField extends Component{
    constructor(props){
        super(props);
        this.state = {id: '',
                      title: '',
                      body: '',
                      show: false,
                      error: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal = () => {
        this.setState({show: !this.state.show});
    }

    handleChange(e) {
        let change = {}
        change[e.target.id] = e.target.value
        this.setState(change);
    }
    handleSubmit(event){
        event.preventDefault();
        fetch(API + this.state.id)
            .then(response => response.json())
            .then(data => this.setState({title: data.title, body: data.body}));
        this.toggleModal();
    }

    save(e){
        console.log("---------------");
        
    }


    render (){

        return(
            <div>
                <Modal onOk={this.state.show}  onCancel={this.toggleModal} header={this.state.id} save={this.save}> 
                        <label className="modal-label">
                            Title
                        </label>
                        <input id="title" className="box" type="text"  value={this.state.title} onChange={this.handleChange}/>
                        
                        <label className="modal-label">
                            Body
                        </label>
                        <input id="body" className="box" type="text" value={this.state.body} onChange={this.handleChange}/>
                </Modal>
                <form  onSubmit={this.handleSubmit}>
                    <label className="modal-label">
                        Post ID
                        <input id="id" className="box" value={this.state.id} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" className="btn btn-normal" value="Edit" />
                </form>
            </div>
            
        );
    }
}

export default InputField;