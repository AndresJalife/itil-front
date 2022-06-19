import React, { useState } from 'react';

// import InfoIcon from '../../images/info3.png'

import InfoIcon from '../../images/info.png';

import "./InfoButton.css"

// import "./CustomButton.css"

function InfoButton(props) {
    return ( 
    <button type={props.type} onClick={props.onClick} className="info-button">
        <img src={InfoIcon} className="icon"/>
    </button>)
}


export default InfoButton;