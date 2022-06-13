import React, { useState } from 'react';

import "./CustomButton.css"

function CustomButton(props) {
    return ( 
    <button type={props.type} onClick={props.onClick} className="custom-button"> {props.children}
        </button>)
}


export default CustomButton;