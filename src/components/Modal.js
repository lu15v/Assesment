import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export const Modal = ({children, onCancel, onOk, header, save}) =>
     onOk
        ? ReactDOM.createPortal(
            <div className="modal">
                <div className="modal-main">
                    <section className="modal-header">
                        <span className="close" onClick={onCancel}>&times;</span>
                        <p className="p-header">Editing: {header}</p> 
                    </section>
                    <form onSubmit={save}>
                        {children}
                    
                        
                        <button type="button"  className="btn btn-normal" onClick={save}>Save</button>
                        <button className="btn btn-cancel " onClick={onCancel}>Cancel</button>
                        
                    </form>
                </div>
            </div>,
            document.body
        )
        :null


export default Modal;