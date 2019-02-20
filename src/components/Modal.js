import React, { Component } from 'react';
import './Modal.css';




class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            error: null,
            errMessage: null
        };
    }

    componentDidCatch(error, errMessage){
        this.setState({
            error: error,
            errMessage: errMessage
        });
    }

    render(){

       /* if(typeof this.props.header === this.props.validType){
            throw new Error('NaN');
        }*/

        if(this.state.error){
            return(
                <div>
                    <p>the id must be a number</p>
                </div>
            );
        }
        
       var show  = this.props.show ? "modal display-block" : "modal display-none";
        
        return(
            <div className={show}>
                <section className="modal-main">
                    {this.props.children}
                    <button className="btn btn-normal" >Save</button>
                    <button className="btn btn-cancel" onClick={this.props.hide}>Cancel</button>
                </section>
            </div>
        );
    }
}


export default Modal;
