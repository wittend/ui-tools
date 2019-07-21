//--------------------------------------------------------------
// treeview.js
//
// Purpose:         control a tree view controlling without 
//                  requiring external 3rd party frameworks.
//
// Date created:    2019-06-26
// Copyright (c):   David M. Witten II
//--------------------------------------------------------------
// jshint unused:           false
// jshint undef:            false
window.addEventListener("load", function()
{
    makeTreeView(".tabset");
});

function makeTreeView(selector)
{
    let toggler = document.getElementsByClassName("caret");
    
    for(let i = 0; i < toggler.length; i++)
    {
        toggler[i].addEventListener("click", function()
        {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
        });
    }
}