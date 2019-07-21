//--------------------------------------------------------------
// rflayer.js
//
// Purpose:         Base class for stackable canvas overlays.
//
// Created:        2019/07/02
// Copyright (c):   David M. Witten II
//--------------------------------------------------------------
// jshint esversion:        6
// jshint unused:           false
// jshint undef:            false

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// MouseHandlerClass
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
class MouseHandler
{
    // private class properties
    __ctx           = null;     // mot really private
    __mouseDownFlag = null;     // mot really private

    //--------------------------------------------
    // ctor()
    //--------------------------------------------
    constructor()
    {
        // const self      = super();
    }
    
    _mouseDown(e)
    {
        console.log(`assigned mouseDown received by: [ '#${this.parentNode.host.id}' ].`);

        let canvas = this.parentNode.host._canvas;
        this.__ctx = canvas.getContext('2d');
        this.__ctx.strokeStyle = "#FF0000";
        this.__mouseDownFlag = true;
        this.__ctx.beginPath();
        this.__ctx.moveTo(e.offsetX, e.offsetY);
    }
    
    _mouseMove(e)
    {
        if(this.__mouseDownFlag)
        {
            this.__ctx.lineTo(e.offsetX, e.offsetY);
            this.__ctx.stroke();
        }
    }
    
    _mouseUp(e)
    {
        console.log(`assigned mouseUp received by: [ '#${this.parentNode.host.id}' ].`);
        //let ctx = this.parentNode.host._canvas.getContext('2d');
        //let canvas = this.parentNode.host._canvas;
        //let ctx2 = this.parentNode.host.canvas.getContext('2d');
        if(this.__mouseDownFlag)
        {
            this.__ctx.lineTo(e.offsetX, e.offsetY);
            this.__ctx.stroke();
        }
        this.__mouseDownFlag = false;                
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
