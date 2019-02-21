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
                      time: '',
                      show: false,
                      error: false,
                      edited: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeT = this.handleChangeT.bind(this);
        this.handleChangeB = this.handleChangeB.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal = () => {
        this.setState({show: !this.state.show});
    }

    
    handleChange(event) {
        this.setState({id: event.target.value});
    }
    
    handleChangeT(event) {
        this.setState({title: event.target.value});
    }

    handleChangeB(event) {
        this.setState({body: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        
        fetch(API + this.state.id)
            .then(response => response.json())
            .then(data => this.setState({title: data.title, body: data.body}));
        this.toggleModal();
    }

    save(title, body){
       return( e =>{
            e.preventDefault();
            this.toggleModal();
            this.setState({edited: !this.state.edited});
            var d = new Date();
            this.setState({time: d.toLocaleString()})
        });
    }
    render (){
       /* if(isNaN(this.state.id)){
            throw new Error('It is not a number');
        }*/

        return(
                <div>
                    <Modal onOk={this.state.show}  onCancel={this.toggleModal} header={"Editing:  " + this.state.id}> 
                            <label className="modal-label">
                                Title
                            </label>
                            <input className="box" type="text" value={this.state.title} onChange={this.handleChangeT} />
                            
                            <label className="modal-label">
                                Body
                            </label>
                            <input className="box" type="text" value={this.state.body} onChange={this.handleChangeB} />
                            <button type="submit"  className="btn btn-normal" onClick={this.save(this.state.title, this.state.body)}>Save</button>
                    </Modal>
                
                    <form  onSubmit={this.handleSubmit}>
                        <label className="modal-label">
                            Post ID
                            <input className="box" onChange={this.handleChange} />
                        </label>
                        <input type="submit" className="btn btn-normal" value="Edit" />
                    </form>

                    <div className={this.state.edited ? "div-edit": "div-edit-hide"}>
                        <p className="p-edit">Title:</p>
                        <p>{this.state.title}</p>
                        <p>body:</p>
                        <p>{this.state.body}</p>
                        <p>Time:</p>
                        <p>{this.state.time}</p>
                    </div>
                </div>            
        );
    }
}

export default InputField;