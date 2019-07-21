//------------------------------------
// splitter.js
//
// Code for the:   ui-tools project.
// Created:        2019/06/24
// Copyright (c):  David M. Witten II
//------------------------------------
// jshint unused:           false
// jshint undef:            false
window.addEventListener("load", function()
{
    let content = `
        <div id='topFrame'>
            <div id='frameDiv'>
                <div id='one'>
                </div>
                <div id='two'>
                    <div id='three'>
                    </div>
                    <div id='four'>
                    </div>
                </div>
            </div>
        </div>`;
        
    document.getElementById('theBody').innerHTML = content;
    
    //Split(['#one', '#two']);
    
    let sizeOneTwo    = [50, 50];  // default sizes
    let sizeThreeFour = [50, 50];  // default sizes

    //------------------------------------------
    // activate the splitters - left Upper/Lower
    //------------------------------------------
    let splitThreeFour = window.Split(['#three', '#four'],
    {
        direction:      'vertical',
        gutterSize:     10,
        sizes:          sizeThreeFour,
        minSize:        100,
        expanedToMin:   true
    });

    //------------------------------------------
    // activate the splitters - left Upper/Lower
    //------------------------------------------
    let splitOneTwo = window.Split(['#one', '#two'],
    {
        direction:      'horizontal',
        gutterSize:     10,
        sizes:          sizeOneTwo,
        minSize:        100,
        expanedToMin:   true
    });

});
