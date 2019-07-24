//--------------------------------------------------------------
// rflayer.js
//
// Purpose:         Base class for stackable canvas overlays.
//
// Created:         2019/07/02
// Copyright (c):   David M. Witten II
//--------------------------------------------------------------
// jshint esversion:        6
// jshint unused:           false
// jshint undef:            false

//===============================================================
// <XRFCanvasLayer> 
//===============================================================
let layerTmpl = document.createElement('template');
layerTmpl.innerHTML = `
    <style>
        :host
        {
            top:                    0px;
            left:                   0px;
            display:                block;
            position:               absolute;
            background-color:       #FFFF66ee;
            height:                 100%;
            width:                  100%;
            contain:                content;
        }
        .layer-canvasClass
        {
        }
    </style>
    <canvas class='layer-canvasClass'>canvas</canvas>
`;

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// <XRFCanvasLayer>    
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// class XRFCanvasLayer extends HTMLCanvasElement
class XRFCanvasLayer extends HTMLElement
{
    #ctx            = null;
    #offscr         = null;

    //--------------------------------------------
    // ctor()
    //--------------------------------------------
    constructor()
    {
        super();
        this._canvas    = null;
        
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(layerTmpl.content.cloneNode(true));
        
        this._canvas    = this.shadowRoot.querySelector('.layer-canvasClass');
    }
    
    //--------------------------------------------
    // Respond to connection event.
    //--------------------------------------------
    connectedCallback()
    {
        let p = this.parentNode;
        //let im = 
        p.lastChild.style.zIndex = p._canvasCount; 
        console.log(`[ XRFCanvasLayer ].connectedCallback() :: New layer: [ ${this.id} ] :: Parent: [ ${p.id} ] :: Stack length: [ ${p._canvasCount} ].`);
    }
    
    //--------------------------------------------
    // Monitored attributes.
    //--------------------------------------------
    static get observedAttributes()
    {
        return ['width', 'height', 'onmousedown'];
    }
 
    //--------------------------------------------
    // Reflect changed attributes.
    //--------------------------------------------
    attributeChangedCallback(name, oldValue, newValue)
    {
        const hasValue = newValue !== null;
        if(hasValue)
        {
            console.log(`[ XRFCanvasLayer#${this.id} ]:: Attribute: [${name}] changing from [${oldValue}] to [${newValue}]`);
            switch(name)
            {
                case 'height':
                    this.style.height = newValue;
                    break;
                case 'width':
                    this.style.width =  newValue;
                    break;
                case 'selected':
                    this.selected = Boolean(newValue);
                    break;
                case 'onmousedown':
                    this._canvas.onmousedown = newValue;
                    break;
                default:
                    break;
            }
        }
    }

    //--------------------------------------------
    // Respond to connection event.
    //--------------------------------------------
    connectedCallback()
    {
        let p = this.parentNode;
        //let im = 
        p.lastChild.style.zIndex = p._canvasCount; 
        console.log(`[ XRFCanvasLayer ].connectedCallback() :: New layer: [ ${this.id} ] :: Parent: [ ${p.id} ] :: Stack length: [ ${p._canvasCount} ].`);
        if(!this.classList.contains('stackLayer-CanvasClass'))
        {   
            this.classList.add('stackLayer-CanvasClass');
        }
        this._canvas = this.shadowRoot.querySelector('.layer-canvasClass');
        this._canvas.id = this.id + '-canvas';
        this._canvas.height = p.clientHeight;
        this._canvas.width = p.clientWidth;
    }
    
    //--------------------------------------------
    // Respond to disconnection event.
    //--------------------------------------------
    disconnectedCallback()
    {
        console.log(`[ XRFCanvasLayer ].disconnectedCallback().`);
    }

    //--------------------------------------------
    // get canvas
    //--------------------------------------------
    get canvas()
    {
        return this._canvas;
    }

    //--------------------------------------------
    // get/set width.
    //--------------------------------------------
    get width()
    {
        if(!this.hasAttribute('width') || (this.width <= 0))
        {
            this.setAttribute('width', this.style.width);
        }
        return this.getAttribute('width');
    }

    set width(val)
    {
        const isUndef = (val == undefined);
        if(!isUndef)
        {
            this.setAttribute('width', val);
        }
        else
        {
            const isEq = (val !== this.width);
            if(isEq)
            {
                this.removeAttribute('width');
                this.setAttribute('width', val);
            }
        }
    }

    //--------------------------------------------
    // get/set height.
    //--------------------------------------------
    get height()
    {
        if(!this.hasAttribute('height') || (this.getAttribute('height') <= 0))
        {
            this.setAttribute('height', this.style.height);
        }
        return this.getAttribute('height');
    }

    set height(val)
    {
        const isUndef = (val == undefined);
        if(!isUndef)
        {
            this.setAttribute('height', val);
        }
        else
        {
            const isEq = (val !== this.height);
            if(isEq)
            {
                this.removeAttribute('height');
                this.setAttribute('height', val);
            }
        }
    }

    //--------------------------------------------
    // get/set mouseMode.
    //--------------------------------------------
    get onmousedown()
    {
        return this._canvas.onmousedown;
    }
    
    set onmousedown(response)
    {
        this._canvas.onmousedown = response;
    }
}
 
//--------------------------------------------
// Register custom element ('tag').
//--------------------------------------------
customElements.define('rf-canvaslayer', XRFCanvasLayer);


//--------------------------------------------
// save
//--------------------------------------------
    ///**
    // * If run as a requestAnimationFrame callback, this
    // * will be run at the start of the frame.
    // */
    //function updateScreen(time)
    //{
    //  // Make visual updates here.
    //}
    //requestAnimationFrame(updateScreen);
    
    //const ro = new ResizeObserver( entries =>
    //{
    //    for (let entry of entries)
    //    {
    //        const cr = entry.contentRect;
    //        console.log('Element:', entry.target);
    //        console.log(`Element size: ${cr.width}px x ${cr.height}px`);
    //        console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
    //    }
    //});
    //// Observe one or multiple elements
    //ro.observe(this);
