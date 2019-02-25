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
                      errorInfo: '',
                      edited: false};
        this.handleChangeId = this.handleChangeId.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.save = this.save.bind(this);
    }

    toggleModal = () => {
        this.setState({show: !this.state.show});
    }
    handleChangeId(event) {
        this.setState({id: event.target.value});
    }
    

    handleSubmit(event){
        event.preventDefault();
        this.setState({edited: false});
        if(isNaN(this.state.id)  || this.state.id === ""){
            this.setState({error: true, errorInfo: "The post ID must be a number"});
        }else{
            fetch(API + this.state.id)
            .then(function(response){
                if(!response.ok){
                    return Promise.reject(new Error("something"));
                }
                return Promise.resolve(response);
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ title: data.title, body: data.body }, () => this.toggleModal())
            })
            .catch(this.setState({error: true, errorInfo: "Not id found"}))

        }
    }

    save(e){
        e.preventDefault();
        var d = new Date();
        var t = this.refs.title.value;
        var b = this.refs.body.value;
        this.setState({time: d.toLocaleString(), edited: true, title: t, body: b}, () => this.toggleModal());
    }
    render (){
        return(
                <div>
                    <Modal onOk={this.state.show}  onCancel={this.toggleModal} header={"Editing:  " + this.state.id}> 
                            <label className="modal-label">Title</label>
                            <input ref="title" className="box" type="text" defaultValue={this.state.title} />
                           
                            <label className="modal-label"> Body</label>
                            <input ref="body" className="box" type="text" defaultValue={this.state.body}  />
                            <button type="submit"  className="btn btn-normal" onClick={this.save}>Save</button>
                    </Modal>
                
                    <form  onSubmit={this.handleSubmit}>
                        <label >Post ID </label>
                        <input className="box" onChange={this.handleChangeId} />
                       
                        <input type="submit" className="btn btn-normal" value="Edit" />
                    </form>

                    <div className={this.state.edited ? "div": "div div-hide"}>
                        <p className="p-edit">Title:</p>
                        <p>{this.state.title}</p>
                        <p className="p-edit">body:</p>
                        <p>{this.state.body}</p>
                        <p className="p-edit">Time:</p>
                        <p>{this.state.time}</p>
                    </div> 
                    <div className={this.state.error ? "div": "div div-hide"}>
                        <p>{this.state.errorInfo}</p>
                    </div>
                </div>            
        );
    }
}

export default InputField;