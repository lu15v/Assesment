import React, {Component} from 'react';
import './InputField.css';
import Modal from './Modal';

const API = 'https://jsonplaceholder.typicode.com/posts/';

class InputField extends React.Component{
    constructor(props){
        super(props);
        this.state = {id: '',
                      title: null,
                      body: null,
                      show: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    show = () => {
        this.setState({show: true});
    }

    hide = () => {
        this.setState({show: false});
    }

    handleChange(event) {
        this.setState({id: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(API + this.state.id)
            .then(response => response.json())
            .then(data => this.setState({title: data.title, body: data.body}));
        this.show();   
    }
    render (){
        return(
            <div>
                <Modal show={this.state.show} header={this.state.id} hide={this.hide}> 
                    <div>
                        <label className="modal-label">
                            Title
                            <input className="bx" type="text"/>
                        </label>
                        <label className="modal-label">
                            Body
                            <input className="bx bx-body" type="text"/>
                        </label>
                    </div>
                </Modal>
                <form  onSubmit={this.handleSubmit}>
                    <label>
                        Post ID 
                        <input type="text" value={this.state.id} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" className="btn btn-normal" value="Edit" />
                </form>
            </div>
            
        );
    }
}

export default InputField;