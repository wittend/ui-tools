//--------------------------------------------------------------
// rfstack.js
//
// Purpose:         eXtended <img> element with drawable
//                  canvas overlays.
//
// Created:         2019/07/02
// Copyright (c):   David M. Witten II
//--------------------------------------------------------------
// jshint esversion:        6
// jshint unused:           false
// jshint undef:            false


//===============================================================
// <XRFCanvasStack> 
//===============================================================
let tmplStack = document.createElement('template');
tmplStack.innerHTML = `
    <style>
        :host
        {
/*        
            height:                 300px;
            width:                  300px;
*/
            position:               relative;
            display:                block;
/*        
            flex-direction:         column;
            flex-basis:             100%;
*/
            background-color:       #FF66FF00;
            contain:                content;
        }
        ::slotted(rf-canvaslayer)
        {
        /*
            flex-basis: 100%;
        */
        }
    </style>
    <slot id='baseImgSlot' name='baseImgSlot'>
        <summary>Slot to accomodate base image element(s).</summary>
        <img id='stackbaseImg' class='stack-baseImgClass'>
    </slot>
    <slot id='canvasSlot' name='canvasSlot'>
        <summary>Slot to accomodate canvas elements.</summary>
    </slot>
`;

//            border:                 2px #a8a8a8 inset;

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// <XRFCanvasStack>    [A stack of canvas elements]
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
class XRFCanvasStack extends HTMLElement
{   
    //--------------------------------------------
    // ctor()
    //--------------------------------------------
    constructor()
    {
        const self          = super();
        this._imgsrc         = '';
        this._imgalt         = '';
        this._baseImg        = null;
        this._canvasCount    = 0;
        this._imageCount     = 0;

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(tmplStack.content.cloneNode(true));
    
        this._imageLayerSlot = this.shadowRoot.querySelector('slot[name=baseImgSlot]');
        this._imageLayerSlot.addEventListener('slotchange', this._onImgSlotChange);

        this._canvasLayerSlot = this.shadowRoot.querySelector('slot[name=canvasSlot]');
        this._canvasLayerSlot.addEventListener('slotchange', this._onCanvasSlotChange);
    }
    
    //--------------------------------------------
    // Monitored attributes.
    //--------------------------------------------
    static get observedAttributes()
    {
        return ['width', 'height'];
    }

    //--------------------------------------------
    // Reflect changed attributes.
    //--------------------------------------------
    attributeChangedCallback(attrName, oldVal, newVal)
    {
        let cList = this.shadowRoot.querySelectorAll('.layer-canvasClass');
        const hasValue = newVal !== null;
        const len = this.layers.length;
        if(hasValue)
        {
            //console.log(`[XRFCanvasStack]:: Value: ${name} changing from ${oldVal} to ${newVal} :: Stack length: (${len}).`);
            switch(name)
            {
                case 'height':
                    this.style.height = newValue;
                    break;
                case 'width':
                    this.style.width = newValue;
                    break;
                case 'src':
                    this.imgsrc = newVal;
                    this.shadowRoot.querySelector('#baseImg').src = this.imgsrc;
                    break;
                case 'alt':
                    this.imgalt = newVal;
                    this.shadowRoot.querySelector('#baseImg').alt = this.imgalt;
                    break;
                default:
                    break;
            }
        }
    }
    
    //============================================
    // Life-cycle callbacks.
    //============================================
    
    //--------------------------------------------
    // Respond to connection event.
    //--------------------------------------------
    connectedCallback()
    {
        console.log(`[ XRFCanvasStack#${this.id} ].connectedCallback()`);
        if(!this.hasAttribute('role'))
        {
            this.setAttribute('role', 'layerlist');
        }
    }
    
    //--------------------------------------------
    // Respond to disconnection event.
    //--------------------------------------------
    disconnectedCallback()
    {
        console.log(`[ XRFCanvasStack#${this.id} ].disconnectedCallback()}`);
    }

    //--------------------------------------------
    // Respond to adoption event.
    //--------------------------------------------
    adoptedCallback()
    {
        console.log(`[ XRFCanvasStack${this.id} ].adoptedCallback().`);
    }

    //============================================
    // Executed in Slot context
    //============================================
    
    //--------------------------------------------
    //_onCanvasSlotChange()
    //--------------------------------------------
    _onCanvasSlotChange(e)
    {
        const pEl = this.parentNode.host;    //.querySelector('rf-canvaslayer');
        pEl._canvasCount++;
        console.log(`[ XRFCanvasStack#${this.id} ]._onCanvasSlotChange() : canvasCount: [ ${pEl._canvasCount} ].`);
    }

    //--------------------------------------------
    //_onImgSlotChange()
    //--------------------------------------------
    _onImgSlotChange(e)
    {
        const pEl = this.parentNode.host;
        pEl._imageCount++;
        console.log(`[ XRFCanvasStack#${this.id} ]._onImgSlotChange() : imageCount: [ ${pEl._imageCount} ].`);
    }
    
    //============================================
    // 'Private' methods executed in Layer context.
    //============================================
    
    //--------------------------------------------
    // _layerCount()
    //--------------------------------------------
    _layerCount()
    {
        return this._canvasCount;
    }

    //--------------------------------------------
    // _imageCount()
    //--------------------------------------------
    _imageCount()
    {
        return this._imageCount;
    }

    //--------------------------------------------
    // _selectLayer(newLayer)
    //--------------------------------------------
    _selectLayer(newLayer)
    {
        this.reset();
        //if(!newLayer)
        //{
        //    throw new Error(`No panel with id ${newLayer}`);
        //}
        //newLayer.selected = true;
        //newLayer.hidden = false;
        //newLayer.focus();
    }

    //--------------------------------------------
    // _findLayer(id)
    //--------------------------------------------
    _findLayer(id)
    {
        const layers = this._allLayers();
        for(let i = 0; i < layers.length; i++)
        {
            if(layers[i].id == id)
            {
                return layers[i];
            }
        }
        return null;
    }
    
    //--------------------------------------------
    // _allLayers()
    //--------------------------------------------
    _allLayers = function ()
    {
        return Array.from(this.querySelectorAll('rf-canvaslayer'));
    };
    
    //--------------------------------------------
    // _allImages()
    //--------------------------------------------
    _allImages = function ()
    {
        return Array.from(this.querySelectorAll('img'));
    };
    
    //--------------------------------------------
    // preventDflt
    //--------------------------------------------
    preventDflt(e)
    {
        e.preventDefault();
    }


    //============================================
    // Class Methods
    //============================================

    //--------------------------------------------
    // reset()
    //--------------------------------------------
    reset()
    {
        const layers = this._allLayers();
        layers.forEach(layer => layer.selected = false);
    }
    
    //------------------------------------------
    // fillBackground()
    //------------------------------------------
    fillBackground()
    {
        //debugger;
        let ctx = this.copyCanvas.getContext('2d');
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.copyCanvas.width, this.copyCanvas.height);
     }

    //------------------------------------------
    // clearAll()
    //------------------------------------------
    clearAll()
    {
        const layers = this._allLayers();
        for(let i = 0; i < layers.length; i++)
        {
            let ctx = layers[i]._canvas.getContext('2d');
            let h   = layers[i]._canvas.height;
            let w   = layers[i]._canvas.width;
            ctx.clearRect(0, 0, w, h);
        }
    }

    //------------------------------------------
    // showAll()
    //------------------------------------------
    showAll()
    {
        const layers = this._allLayers();
        for(let i = 0; i < layers.length; i++)
        {
            layers[i]._canvas.style.visibility = 'visible';
        }
    }

    //------------------------------------------
    // hideAll()
    //------------------------------------------
    hideAll()
    {
        const layers = this._allLayers();
        for(let i = 0; i < layers.length; i++)
        {
            this.layers[i].style.visibility = 'hidden';
        }
    }

    //--------------------------------------------
    // layerByID
    //--------------------------------------------
    layerByID(id)
    {
        return this.shadowRoot.querySelector('canvas#' + id);
    }

    //--------------------------------------------
    // imageByID
    //--------------------------------------------
    imageByID(id)
    {
        return this.shadowRoot.querySelector('img#' + id);
    }
    
    //--------------------------------------------
    // layerMouseDown()
    //--------------------------------------------
    layerMouseDown(id, fn)
    {
        const l = this._findLayer(id);
        l._canvas.onmousedown = fn;
    }

    //--------------------------------------------
    // layerMouseDown()
    //--------------------------------------------
    layerMouseMove(id, fn)
    {
         const l = this._findLayer(id);
        l._canvas.onmousemove = fn;
    }

    //--------------------------------------------
    // layerMouseDown()
    //--------------------------------------------
    layerMouseUp(id, fn)
    {
        const l = this._findLayer(id);
        l._canvas.onmouseup = fn;
    }

    //============================================
    // Class getters/setters (properties).
    //============================================
    //--------------------------------------------
    // get layerCount.
    //--------------------------------------------
    get layerCount()
    {
        return this._layerCount();
    }
    
    //--------------------------------------------
    // get imgCount.
    //--------------------------------------------
    get imgCount()
    {
        return this._imageCount;
    }

    //--------------------------------------------
    // get layerList
    //--------------------------------------------
    get layerList()
    {
        return this.shadowRoot.querySelectorAll('.layer-canvasClass');
    }
    
    //--------------------------------------------
    // get imgList
    //--------------------------------------------
    get imgList()
    {
        return this.shadowRoot.querySelectorAll('img');
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
        return this.getAttribute(this.style.width);
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
            this.removeAttribute('width');
            this.setAttribute('width', this.style.width);
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
        return this.getAttribute(this.style.height);
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
            this.removeAttribute('height');
            this.setAttribute('height', this.style.height);
        }
    }

    //--------------------------------------------
    // get/set mouseMode.
    //--------------------------------------------
    get mouseMode()
    {
        return this.mode;
    }

    set mouseMode(mode)
    {
        this.mode = mode;
    }
}

//--------------------------------------------
// Register custom element ('tag').
//--------------------------------------------
customElements.define('rf-canvasstack', XRFCanvasStack);

//--------------------------------------------
// save
//--------------------------------------------
    ////--------------------------------------------
    //// get/set src.
    ////--------------------------------------------
    //get src()
    //{
    //    return this.hasAttribute('src');
    //}
    //
    //set src(val)
    //{
    //    const isEq = (val !== this.imgsrc);
    //    if(isEq)
    //    {
    //        this.setAttribute('src', val);
    //    }
    //}
    //
    ////--------------------------------------------
    //// get/set alt.
    ////--------------------------------------------
    //get alt()
    //{
    //    return this.hasAttribute('alt');
    //}
    //
    //set alt(val)
    //{
    //    const isEq = (val !== this.imgalt);
    //    if(isEq)
    //    {
    //        this.setAttribute('alt', val);
    //    }
    //}
    //
    ////--------------------------------------------
    //// _linkLayers()
    ////--------------------------------------------
    //_linkLayers()
    //{
    //    console.log(`[XRFCanvasStack${this.id}]._linkLayers()`);
    //    const layers = this._allLayers();
    //    layers.forEach(layer =>
    //    {
    //        //layer = layer.nextElementSibling;
    //        if(layer.tagName.toLowerCase() !== 'rf-canvaslayer')
    //        {
    //            console.error(`layer #${layer.id} is not a` + `sibling of a <rf-canvaslayer>`);
    //            return;
    //        }
    //        layer.setAttribute('aria-controls', layer.id);
    //    });
    //    const selectedLayer = layers.find(layer => layer.selected) || layers[0];
    //    this._selectLayer(selectedLayer);
    //}

