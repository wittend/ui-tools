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

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// DrawMouseHandler Class
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
class DrawMouseHandler
{
    // private class properties
    _ctx           = null;     // mot really private
    _mouseDownFlag = false;     // mot really private 

    //--------------------------------------------
    // ctor()
    //--------------------------------------------
    constructor()
    {
        // const self      = super();
    }
    
    //------------------------------------------
    // Draw _mouseDown()
    //------------------------------------------
     _mouseDown(e)
    {
        console.log(`assigned mouseDown received by: [ '#${this.parentNode.host.id}' ].`);

        let canvas = this.parentNode.host._canvas;
        this._ctx = canvas.getContext('2d');
        this._ctx.strokeStyle = "#FF0000";
        this._mouseDownFlag = true;
        this._ctx.beginPath();
        this._ctx.moveTo(e.offsetX, e.offsetY);
    }
    
    //------------------------------------------
    // Draw _mouseMove()
    //------------------------------------------
    _mouseMove(e)
    {
        if(this._mouseDownFlag)
        {
            this._ctx.lineTo(e.offsetX, e.offsetY);
            this._ctx.stroke();
        }
    }
    
    //------------------------------------------
    // Draw _mouseUp()
    //------------------------------------------
    _mouseUp(e)
    {
        console.log(`assigned mouseUp received by: [ '#${this.parentNode.host.id}' ].`);
        //let ctx = this.parentNode.host._canvas.getContext('2d');
        //let canvas = this.parentNode.host._canvas;
        //let ctx2 = this.parentNode.host.canvas.getContext('2d');
        if(this._mouseDownFlag)
        {
            this._ctx.lineTo(e.offsetX, e.offsetY);
            this._ctx.stroke();
        }
        this._mouseDownFlag = false;                
    }

    //============================================
    // getters/setters properties.
    //============================================

    //--------------------------------------------
    // get/set mouseDown.
    //--------------------------------------------
    get mouseDown()
    {
        return this._mouseDown;
    }
    
    set mouseDown(val)
    {
        this._mouseDown = val;
    }

    //--------------------------------------------
    // get/set mouseMove.
    //--------------------------------------------
    get mouseMove()
    {
        return this._mouseMove;
    }
    
    set mouseMove(val)
    {
        this._mouseMove = val;
    }

    //--------------------------------------------
    // get/set mouseUp.
    //--------------------------------------------
    get mouseUp()
    {
        return this._mouseUp;
    }
    
    set mouseUp(val)
    {
        this._mouseUp = val;
    }
}           

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// MeasureMouseHandler Class
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
class MeasureMouseHandler
{
    // private class properties
    _ctx           = null;     // mot really private
    _mouseDownFlag = null;     // mot really private 

    //--------------------------------------------
    // ctor()
    //--------------------------------------------
    constructor()
    {
        // const self      = super();
    }
    
    //------------------------------------------
    // Measure MouseDown
    //------------------------------------------
    _mouseDown(e)
    {
        e.stopImmediatePropagation();
        this._ctx = this.getContext('2d');
    
        this._mouseDownFlag = true;
        this.px = e.offsetX;
        this.py = e.offsetY;
    
        let h = this.height;
        let w = this.width;
    
        this._ctx.clearRect(0, 0, w, h);
    }
    
    //------------------------------------------
    // Measure MouseMove
    //------------------------------------------
    _mouseMove(e)
    {
        e.stopImmediatePropagation();
        if(this._mouseDownFlag)
        {
            //let _ctx = this.getContext('2d');
    
            let h = this.height;
            let w = this.width;
    
            this._ctx.clearRect(0, 0, w, h);
            this._ctx.lineWidth       = 2;
            this._ctx.strokeStyle     = '#afafaf';
            this._ctx.setLineDash([3, 4]);
            this._ctx.beginPath();
            this._ctx.rect(this.px, this.py, e.offsetX - this.px, e.offsetY - this.py);
            this._ctx.stroke();
        }
    }
    
    //------------------------------------------
    // Measure MouseUp
    //------------------------------------------
    _mouseUp(e)
    {
        let p = this.parentElement;
        e.stopImmediatePropagation();
        if(this._mouseDownFlag)
        {
            //this._ctx = this.getContext('2d');
    
            let h = this.height;
            let w = this.width;
            this._ctx.clearRect(0, 0, w, h);
    
            let x1              = this.px;
            let y1              = this.py;
            let x2              = e.offsetX;
            let y2              = e.offsetY;
    
            this._ctx.lineWidth       = 1;
            this._ctx.strokeStyle     = '#FF0000';
            this._ctx.setLineDash([]);
            this._ctx.beginPath();
            if((x1 - x2) < (y1-y2))
            {
                this._ctx.moveTo(x1, y1-10);
                this._ctx.lineTo(x1, y1+10);
                this._ctx.moveTo(x2, y2-10);
                this._ctx.lineTo(x2, y2+10);
            }
            else
            {
                this._ctx.moveTo(x1-10, y1);
                this._ctx.lineTo(x1+10, y1);
                this._ctx.moveTo(x2-10, y2);
                this._ctx.lineTo(x2+10, y2);
            }
            let val = Math.sqrt(Math.pow((x2 - x1), 2)  +  Math.pow((y2 - y1), 2));
            // $('#measureLen').get(0).value = Math.round(val);
            // Math.sqrt(Math.pow((x2 - x1), 2)  +  Math.pow((y2 - y1), 2));
            console.log('Distance: ' + Math.round(val));
    
            this._ctx.moveTo(x1, y1);
            this._ctx.lineTo(x2, y2);
            this._ctx.stroke();
        }
        this._mouseDownFlag = false;
    }

    //============================================
    // getters/setters properties.
    //============================================

    //--------------------------------------------
    // get/set mouseDown.
    //--------------------------------------------
    get mouseDown()
    {
        return this._mouseDown;
    }
    
    set mouseDown(val)
    {
        this._mouseDown = val;
    }

    //--------------------------------------------
    // get/set mouseMove.
    //--------------------------------------------
    get mouseMove()
    {
        return this._mouseMove;
    }
    
    set mouseMove(val)
    {
        this._mouseMove = val;
    }

    //--------------------------------------------
    // get/set mouseUp.
    //--------------------------------------------
    get mouseUp()
    {
        return this._mouseUp;
    }
    
    set mouseUp(val)
    {
        this._mouseUp = val;
    }
}           

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// MagnifierMouseHandler Class
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
class MagnifierMouseHandler
{
    // private class properties
    _ctx           = null;     // mot really private
    _mouseDownFlag = null;     // mot really private 

    //--------------------------------------------
    // ctor()
    //--------------------------------------------
    constructor()
    {
        // const self      = super();
    }
    
    //------------------------------------------
    // Magnifying Glass MouseDown
    //------------------------------------------
    _mouseDown(e)
    {
        e.stopImmediatePropagation();
        this.p          = this.parentElement;
        this.cc         = this.p.children.copyCanvas;
        this._ctx       = this.getContext('2d');
        this.dCtx       = this.parentElement.extView.getContext('2d');
        this.sCtx       = this.cc.getContext('2d');
        this._mouseDownFlag  = true;
        
        _ctx.clearRect(0, 0, this.width, this.height);
        _ctx.strokeRect(e.offsetX - (this.p.cursorWid/2), e.offsetY - (this.p.cursorHt/2), this.p.cursorWid, this.p.cursorHt);
        //let tData = this.sCtx.getImageData(e.offsetX - (this.p.cursorWid/2), e.offsetY - (this.p.cursorHt/2), this.p.cursorWid, this.p.cursorHt);
        this.dCtx.drawImage(this.cc, e.offsetX - (this.p.cursorWid/2), e.offsetY - (this.p.cursorHt/2), this.p.cursorWid, this.p.cursorHt, 0, 0, 250, 250);
   }
    
    //------------------------------------------
    // Magnifying Glass MouseMove
    //------------------------------------------
    _mouseMove(e)
    {
        e.stopImmediatePropagation();
        if(this._mouseDownFlag)
        {
            this._ctx.clearRect(0, 0, this.width, this.height);
            this._ctx.strokeRect(e.offsetX - (this.p.cursorWid/2), e.offsetY - (this.p.cursorHt/2), this.p.cursorWid, this.p.cursorHt);
            //let tData = this.sCtx.getImageData(e.offsetX - (this.p.cursorWid/2), e.offsetY - (this.p.cursorHt/2), this.p.cursorWid, this.p.cursorHt);
            this.dCtx.drawImage(this.cc, e.offsetX - (this.p.cursorWid/2), e.offsetY - (this.p.cursorHt/2), this.p.cursorWid, this.p.cursorHt, 0, 0, 250, 250);
        }
    }
    
    //------------------------------------------
    // Magnifying Glass MouseUp
    //------------------------------------------
    _mouseUp(e)
    {
        e.stopImmediatePropagation();
        if(this._mouseDownFlag)
        {
            this._ctx.clearRect(0, 0, this.width, this.height);
            //this.sCtx.strokeRect(e.offsetX - (this.p.cursorWid/2), e.offsetY - (this.p.cursorHt/2), this.p.cursorWid, this.p.cursorHt);
            // let tData = this.sCtx.getImageData(e.offsetX - (this.p.cursorWid/2), e.offsetY - (this.p.cursorHt/2), this.p.cursorWid, this.p.cursorHt);
            this.dCtx.drawImage(this.cc, e.offsetX - (this.p.cursorWid/2), e.offsetY - (this.p.cursorHt/2), this.p.cursorWid, this.p.cursorHt, 0, 0, 250, 250);
        }
        this._mouseDownFlag = false;
    }
    //============================================
    // getters/setters properties.
    //============================================

    //--------------------------------------------
    // get/set mouseDown.
    //--------------------------------------------
    get mouseDown()
    {
        return this._mouseDown;
    }
    
    set mouseDown(val)
    {
        this._mouseDown = val;
    }

    //--------------------------------------------
    // get/set mouseMove.
    //--------------------------------------------
    get mouseMove()
    {
        return this._mouseMove;
    }
    
    set mouseMove(val)
    {
        this._mouseMove = val;
    }

    //--------------------------------------------
    // get/set mouseUp.
    //--------------------------------------------
    get mouseUp()
    {
        return this._mouseUp;
    }
    
    set mouseUp(val)
    {
        this._mouseUp = val;
    }
}    
