import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export const Modal = ({children, onCancel, onOk, header, save}) =>
     onOk
        ? ReactDOM.createPortal(
            <div className="modal">
                <div className="modal-main">
                    <div className="modal-header">
                    <p className="p-header">{header} <span className="close" onClick={onCancel}>  &times;</span></p> 
                        
                    </div>
                        <form >
                            {children}
                            <div className="btn-position">
                                <button type="submit"  className="btn btn-normal" onClick={save}>Save</button>
                                <button className="btn btn-cancel " onClick={onCancel}>Cancel</button>
                            </div>
                        </form>
                </div>
            </div>,
            document.body
        )
        :null


export default Modal;