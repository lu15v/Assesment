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
        this.title = React.createRef();
        this.body = React.createRef();
    }

    toggleModal = () => {
        this.setState({show: !this.state.show});
    }
    handleChangeId(event) {
        this.setState({id: event.target.value});
    }
    handleAnwser(response){
        if(!response.ok){
            return Promise.reject(new Error("something"));
        }
        return Promise.resolve(response.json());
    }

    settingData(data){
        this.setState({ title: data.title, body: data.body, error: false }, () => this.toggleModal());
    }
    settingError(){
        this.setState({error: true, errorInfo: "Not id found"});
    }
    handleSubmit(event){
            event.preventDefault();
            this.setState({edited: false});
            if(isNaN(this.state.id)  || this.state.id === ""){
                this.setState({error: true, errorInfo: "The post ID must be a number"});
            }else{
                fetch(API + this.state.id)
                .then(response => this.handleAnwser(response))
                .then(data => {this.settingData(data)})
                .catch(() => this.settingError())
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
                    <Modal onOk={this.state.show}  onCancel={this.toggleModal} header={"Editing:  " + this.state.id} save={this.save}>
                            <ul className="flex-outer">
                                <li>
                                    <label>Title</label>
                                    <input ref="title" type="text" className="input-normal" defaultValue={this.state.title} />
                                </li>
                                <li>
                                    <label>Body</label>
                                    <input ref="body"  className="input-body" type="text" defaultValue={this.state.body}  />
                                </li>
                            </ul>  
                    </Modal>
                
                    <form  onSubmit={this.handleSubmit}>
                        <label >Post ID </label>
                        <input className="box" onChange={this.handleChangeId} />
                       
                        <input type="submit" className="btn btn-normal" value="Edit" />
                    </form>

                    <div className={this.state.edited ? "div div-info": "div div-hide"}>
                        <p className="p-edit">Title:</p>
                        <p>{this.state.title}</p>
                        <p className="p-edit">body:</p>
                        <p>{this.state.body}</p>
                        <p className="p-edit">Time:</p>
                        <p>{this.state.time}</p>
                    </div> 
                    <div className={this.state.error ? "div div-m": "div div-hide"}>
                        <p>{this.state.errorInfo}</p>
                    </div>
                </div>            
        );
    }
}

export default InputField;