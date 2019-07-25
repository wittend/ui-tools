//--------------------------------------------------------------
// rfimage.js
//
// Purpose:         Base class for stackable image layer(s).
//
// Created:         2019/07/24
// Copyright (c):   David M. Witten II
//--------------------------------------------------------------
// jshint esversion:        6
// jshint unused:           false
// jshint undef:            false

//===============================================================
// <XRFImageLayer> 
//===============================================================
let imgTmpl = document.createElement('template');
imgTmpl.innerHTML = `
    <style>
        :host
        {
            top:                    0px;
            left:                   0px;
            display:                inline-block;
            position:               absolute;
            background-color:       #FFFF66ee;
            height:                 100%;
            width:                  100%;
            contain:                content;
        }
    </style>
`;
 
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// <XRFImageLayer>    [eXtended Img element]
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// class XRFCanvasLayer extends HTMLCanvasElement
class XRFImageLayer extends HTMLImageElement
{
    //--------------------------------------------
    // ctor()
    //--------------------------------------------
    constructor()
    {
        super();
    }
    //--------------------------------------------
    // Monitored attributes.
    //--------------------------------------------
    //static get observedAttributes()
    //{
    //    return ['width', 'height', 'src'];
    //}
    //
    ////--------------------------------------------
    //// Reflect changed attributes.
    ////--------------------------------------------
    //attributeChangedCallback(name, oldValue, newValue)
    //{
    //    const hasValue = newValue !== null;
    //    if(hasValue)
    //    {
    //        console.log(`[ XRFImageLayer#${this.id} ]:: Attribute: [${name}] changing from [${oldValue}] to [${newValue}]`);
    //        switch(name)
    //        {
    //            case 'height':
    //                this.style.height = newValue;
    //                break;
    //            case 'width':
    //                this.style.width = newValue;
    //                break;
    //            case 'src':
    //                this.src = newValue;
    //                break;
    //            default:
    //                break;
    //        }
    //    }
    //}
    //        
    ////--------------------------------------------
    //// get/set src.
    ////--------------------------------------------
    //set src(val)
    //{
    //    this._baseImg.src = val;
    //}
    //
    //get src()
    //{
    //    return this._baseImg.src;
    //}
}
 
//--------------------------------------------
// Register custom element ('tag').
//--------------------------------------------
customElements.define('rf-imagelayer', XRFImageLayer, {extends: 'img'});

