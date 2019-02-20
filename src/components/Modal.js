import React, { Component } from 'react';
import './Modal.css';




class Modal extends React.Component{


    render(){
        
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
