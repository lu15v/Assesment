import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export const Modal = ({children, onCancel, onOk, header}) =>
     onOk
        ? ReactDOM.createPortal(
            <div className="modal">
                <div className="modal-main">
                    <section className="modal-header">
                        <span className="close" onClick={onCancel}><p className="p-header">{header}</p>  &times;</span>
                        
                    </section>
                    <div className="modal-content">
                        <form >
                            {children}
                            <button className="btn btn-cancel " onClick={onCancel}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>,
            document.body
        )
        :null


export default Modal;