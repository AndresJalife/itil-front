import React, { useState } from 'react';

import MessageIcon from '../../images/message.png';

import "./MessageButton.css"

function MessageButton(props) {
    return ( 
    <button type={props.type} onClick={props.onClick} className={props.className}>
        <img src={MessageIcon} className="message-button"/>
    </button>)
}


export default MessageButton;