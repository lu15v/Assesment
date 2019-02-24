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
        this.setState({edited: false});
        if(isNaN(this.state.id)){
            this.setState({error: true});
        }else{
            fetch(API + this.state.id)
            .then(function(response){
                if(!response.ok){
                    throw Error(response.statusText);
                }
                return response;
            }).then(response => response.json())
            .then(data => this.setState({ title: data.title, body: data.body }))
            .then(this.toggleModal())
            .catch(console.log("error"));
        }
    }

    save(title, body){
       return( e =>{
            e.preventDefault();
            this.toggleModal();
            this.setState({edited: true});
            var d = new Date();
            this.setState({time: d.toLocaleString()})
        });
    }
    render (){
        return(
                <div>
                    <Modal onOk={this.state.show}  onCancel={this.toggleModal} header={"Editing:  " + this.state.id}> 
                            <label className="modal-label">Title</label>
                            <input className="box" type="text" value={this.state.title} onChange={this.handleChangeT} />
                           
                            <label className="modal-label"> Body</label>
                            <input className="box" type="text" value={this.state.body} onChange={this.handleChangeB} />
                            <button type="submit"  className="btn btn-normal" onClick={this.save(this.state.title, this.state.body)}>Save</button>
                    </Modal>
                
                    <form  onSubmit={this.handleSubmit}>
                        <label >Post ID </label>
                        <input className="box" onChange={this.handleChange} />
                       
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
                        <p>The post ID is not a number</p>
                    </div>
                </div>            
        );
    }
}

export default InputField;