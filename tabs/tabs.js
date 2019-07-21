//--------------------------------------------------------------
// tabs.js
//
// Purpose:         create a mechanism for using a tabbed interface 
//                  without requiring external 3rd party frameworks.
//
// Date created:    2019-06-26
// Copyright (c):   David M. Witten II
//--------------------------------------------------------------
// jshint unused:           false
// jshint undef:            false
window.addEventListener("load", function()
{
    makeTabs(".tabset");
});

function makeTabs(selector)
{
    let clickListener = function(e)
    {
        for (i = 0; i < divs.length; i++)
        {
            divs[i].style.display = "none";
        }
        for (i = 0; i < tab_lists_anchors.length; i++)
        {
            tab_lists_anchors[i].classList.remove("active");
        }
        clicked_tab = e.target || e.srcElement;
        clicked_tab.classList.add('active');
        div_to_show = clicked_tab.getAttribute('href');
        document.querySelector(div_to_show).style.display = "block";
    };

    tab_lists_anchors = document.querySelectorAll(selector + " li a");
    divs = document.querySelector(selector).getElementsByTagName("div");
    for (var i = 0; i < tab_lists_anchors.length; i++)
    {
        if (tab_lists_anchors[i].classList.contains('active'))
        {
            divs[i].style.display = "block";
        }
    }
    let anchors = document.querySelectorAll(".tabset li a");
    for (i = 0; i < tab_lists_anchors.length; i++)
    {
        anchors[i].addEventListener('click', clickListener);
    }
}