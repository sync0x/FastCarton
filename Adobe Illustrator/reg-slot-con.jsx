/* This is released under the GNU LGPL by Andrew Sinclair.
   e-mail: fastcarton@asyn3c.net
   */

﻿/* 
  I will attempt to cite references I used as a template for this file here.
  The fundamental structure of the user interface and framework is based primarily on:
  https://github.com/alexander-ladygin/illustrator-scripts/blob/master/harmonizer.jsx
*/

var scriptName = 'Reg-Slot-Con',
    settingFile = {
        name: scriptName + '__0100.json',
        folder: Folder.myDocuments + '/' //LA_AI_Scripts
    },
    useClippingMask = true;

var isUndo = false,
    win0 = new Window('dialog', scriptName + ' by Andrew Sinclair', undefined);
    win0.orientation = 'column';
    win0.alignChildren = 'fill';

//  //  //  Section for Settings (all jobs)  //  //  //
var p0 = win0.add('panel', undefined, 'Settings: ');
    p0.orientation = 'column';
    p0.alignChildren = 'fill';
    p0.margins = 20;

// Caliper & Ratio
var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = ['fill', 'fill'];

var g1 = g0.add('group');
    g1.orientation = 'row';
    g1.alignChildren = 'left';
var cCaliper = g1.add('statictext', undefined, 'Caliper (μm):'),
    vCaliper = g1.add('dropdownlist', [0, 0, 60, 25], ['450', '500', '550', '600', '700 Greyback', '900 Boxboard', '1500 E-Flute', '1800 BoxBoard', '3000 B-Flute', '4000 C-Flute', '5500 EC-Flute', '7000 BC-Flute']);
    //vCaliper.selection = 3;

var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = ['fill', 'fill'];
var g1 = g0.add('group'); // spacer

var g1 = g0.add('group');
    g1.orientation = 'column';
    g1.alignChildren = 'left';
var cRatio = g1.add('statictext', undefined, 'Slot Ratio (n*μm):'),
    vRatio = g1.add('edittext', [0, 0, 60, 25], 1.5);
var g1 = g0.add('group');
    g1.orientation = 'column';
    g1.alignChildren = 'left';
var cInnerCurl = g1.add('statictext', undefined, 'In-curl-Out:'),
    vInnerCurl = g1.add('edittext', [0, 0, 60, 25], 1.20);
var g1 = g0.add('group');
    g1.orientation = 'column';
    g1.alignChildren = 'left';
var cOuterCurl = g1.add('statictext', undefined, 'Out-curl-In:'),
    vOuterCurl = g1.add('edittext', [0, 0, 60, 25], 0.8);

// Orientation
var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = 'left';
var cOrient = g0.add('statictext', undefined, 'Orientation'),
    vOrient = g0.add('dropdownlist', [0, 0, 300, 25], ['Vertical Flat Form and Horizontal Impositions']); //, 'Horiz. Flat'
    vOrient.selection = 0;

// Offset
var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = ['fill', 'fill'];
var g1 = g0.add('group'); // spacer

var gX = g0.add('group');
    gX.orientation = 'column';
    gX.alignChildren = 'left';
var cX = gX.add('statictext', undefined, 'Offset-X:'),
    vX = gX.add('edittext', [0, 0, 60, 25], 20);

var gY = g0.add('group');
    gY.orientation = 'column';
    gY.alignChildren = 'left';
var cY = gY.add('statictext', undefined, 'Offset-Y:'),
    vY = gY.add('edittext', [0, 0, 60, 25], 20);

// Registration
var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = 'left';
var cRegCam = g0.add('statictext', undefined, 'Registration'),
    vRegCam = g0.add('dropdownlist', [0, 0, 200, 25], ['Plot Only', '5mm filled dot']);
    vRegCam.selection = 1;

// Register
var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = ['fill', 'fill'];
var g1 = g0.add('group'); // spacer

var gRegCamX = g0.add('group');
    gRegCamX.orientation = 'column';
    gRegCamX.alignChildren = 'left';
var cRegCamX = gRegCamX.add('statictext', undefined, 'Register-X:'),
    vRegCamX = gRegCamX.add('edittext', [0, 0, 60, 25], 10);

var gRegCamY = g0.add('group');
    gRegCamY.orientation = 'column';
    gRegCamY.alignChildren = 'left';
var cRegCamY = gRegCamY.add('statictext', undefined, 'Register-Y:'),
    vRegCamY = gRegCamY.add('edittext', [0, 0, 60, 25], 10);

//  //  //  Section for Design (one job)  //  //  //
var p0 = win0.add('panel', undefined, 'Design: ');
    p0.orientation = 'column';
    p0.alignChildren = 'fill';
    p0.margins = 20;

// Dimension
var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = 'left';
var cID = g0.add('statictext', undefined, 'Identity:'),
    vID = g0.add('edittext', [0, 0, 160, 25], 'asCCS_0000');

// Dimension
var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = 'left';
var cDim = g0.add('statictext', undefined, 'Dimension applies to:'),
    vDim = g0.add('dropdownlist', [0, 0, 160, 25], ['Inner', 'Middle', 'Outer']);
    vDim.selection = 1;

// Dimensions
var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = ['fill', 'fill'];
var g1 = g0.add('group'); // spacer
var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = ['fill', 'fill'];
var g1 = g0.add('group'); // spacer

var gL = g0.add('group');
    gL.orientation = 'column';
    gL.alignChildren = 'left';
var cL = gL.add('statictext', undefined, 'Length:'),
    vL = gL.add('edittext', [0, 0, 60, 25], 0);
var dL = gL.add('statictext', undefined, '(and outer flap)');

var gW = g0.add('group');
    gW.orientation = 'column';
    gW.alignChildren = 'left';
var cW = gW.add('statictext', undefined, 'Width:'),
    vW = gW.add('edittext', [0, 0, 60, 25], 0);
var dW = gW.add('statictext', undefined, '(and inner flap)');

var gH = g0.add('group');
    gH.orientation = 'column';
    gH.alignChildren = 'left';
var cH = gH.add('statictext', undefined, 'Height:'),
    vH = gH.add('edittext', [0, 0, 60, 25], 0);

var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = ['fill', 'fill'];
var g1 = g0.add('group'); // spacer
var d0 = g0.add('statictext', undefined, '(The inner flap will always be less than or equal to the outer flap in length.)');


// Glue tab
var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = ['fill', 'fill'];
var d0 = g0.add('statictext', undefined, 'Glue flap:');
var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = ['fill', 'fill'];
var g1 = g0.add('group'); // spacer
var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = ['fill', 'fill'];
var g1 = g0.add('group'); // spacer

var gTabX = g0.add('group');
    gTabX.orientation = 'column';
    gTabX.alignChildren = 'left';
var cTabX = gTabX.add('statictext', undefined, 'Taper (X):'),
    vTabX = gTabX.add('edittext', [0, 0, 60, 25], 40);

var gTabY = g0.add('group');
    gTabY.orientation = 'column';
    gTabY.alignChildren = 'left';
var cTabY = gTabY.add('statictext', undefined, 'Diameter (Y):'),
    vTabY = gTabY.add('edittext', [0, 0, 60, 25], 80);

// Impressions
var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = ['fill', 'fill'];
var g1 = g0.add('group'); // spacer
var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = ['fill', 'fill'];
var g1 = g0.add('group'); // spacer

var gIterator = g0.add('group');
    gIterator.orientation = 'column';
    gIterator.alignChildren = 'left';
var cIterator = gTabX.add('statictext', undefined, 'Impressions:'),
    vIterator = gTabX.add('edittext', [0, 0, 60, 25], 3);

// Optimise
var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = ['fill', 'fill'];
var g1 = g0.add('group'); // spacer

var g1 = g0.add('group');
    g1.orientation = 'column';
    g1.alignChildren = 'left';
var cImpo1 = g1.add('statictext', undefined, 'Multiple impression optimise'),
    vImpo1 = g1.add('dropdownlist', [0, 0, 200, 25], ['Complete closed contours', 'Partial in-between contours']);
    vImpo1.selection = 1;
    
var g1 = g0.add('group');
    g1.orientation = 'Column';
    g1.alignChildren = 'left';
var cImpo2 = g1.add('statictext', undefined, 'Strip Aid'),
    vImpo2 = g1.add('dropdownlist', [0, 0, 200, 25], ['None', 'Basic-01']); //, 'Zealous-01'
    vImpo2.selection = 0;
    
//vC.onClick= vX.onClick= vY.onClick= vL.onClick= vW.onClick= vH.onClick= previewStart;
//vC.addEventListener('change', function (e) { previewStart(); });
//vX.addEventListener('change', function (e) { previewStart(); });
//vY.addEventListener('change', function (e) { previewStart(); });
//vL.addEventListener('change', function (e) { previewStart(); });
//vW.addEventListener('change', function (e) { previewStart(); });
//vH.addEventListener('change', function (e) { previewStart(); });

//var preview = win0.add('checkbox', undefined, 'Preview');

var winButtons = win0.add('group');
    winButtons.orientation = 'row';
    winButtons.alignChildren = ['fill', 'fill'];
    winButtons.margins = 0;

var cancel = winButtons.add('button', undefined, 'Cancel');
    cancel.helpTip = 'Press Esc to Close';
    cancel.onClick = function () { win0.close(); }

var ok = winButtons.add('button', undefined, 'OK');
    ok.helpTip = 'Press Enter to Run';
    ok.onClick = function (e) {
        //if (preview.value && isUndo) app.undo();
        startAction();
        //if (toGroupCheckbox.value) toGroupItems();
        isUndo = false;
        win0.close();
    };
    ok.active = true;

//https://ai-scripting.docsforadobe.dev/jsobjref/PathItem.html
//https://graphicdesign.stackexchange.com/questions/138570/can-i-use-script-to-move-items-to-a-named-layer-in-illustrator
//https://ai-scripting.docsforadobe.dev/jsobjref/Document.html
function startAction() {
  app.defaultStroked = true;
  Major_GRID=[]; Minor_PLOT=[];

  // User Input
  Ratio_SLOT=parseFloat(vRatio.text);
  Ratio_Inner_CURL=parseFloat(vInnerCurl.text);
  Ratio_Outer_CURL=parseFloat(vOuterCurl.text);
  Iterator=parseInt(vIterator.text);
  sDim=vDim.selection.text;
  iImpo=[ vImpo1.selection.valueOf(), vImpo2.selection.valueOf() ];
  iRegCamX=parseFloat(vRegCamX.text); iRegCamY=parseFloat(vRegCamY.text);
  iX=parseFloat(vX.text); iY=parseFloat(vY.text); iC=parseInt(vCaliper.selection.text.split(' ')[0]);
  iL=parseFloat(vL.text); iW=parseFloat(vW.text); iH=parseFloat(vH.text);
  Tab_PLOT=[ parseFloat(vTabX.text), parseFloat(vTabY.text) ];

  // Sort minimum and maximum practical flap height proportional to length and width.
  var jI=iL, jJ=iW; if( iW>iL ) { jI=iW, jJ=iL; }
  
  // Adjust dimensions based on substrate caliper relative to Inner or Outer Dimensions.
  if (sDim=="Middle") {
      // no action
  } else if (sDim=="Inner") { // if measuring inner walls, middle must grow!!!
      iL+=(iC/1000)*Ratio_Inner_CURL;
      iW+=(iC/1000)*Ratio_Inner_CURL;
      iH+=(iC/1000)*Ratio_Inner_CURL;
  } else if (sDim=="Outer") { // if measuring outer walls, middle must shrink.
      iL-=(iC/1000)*Ratio_Outer_CURL;
      iW-=(iC/1000)*Ratio_Outer_CURL;
      iH-=(iC/1000)*Ratio_Outer_CURL;
  }
  
  // Technically, fine adjustments should not be in the Major_GRID; they ought to be
  // in the Minor_PLOT instead, where we can be specific about what folds ascend each other.
  // In this script, we do not need to remember exactly where the first plot before folding
  // calliper adjustment was, so we can break that Major_GRID rule. Also, as Minor_PLOT goes
  // directly into Illustrator JavaScript's plotting commands, what I prefer to do here instead
  // is convert from millimetres into Adobe's native point system for PS/PDF; 72 divisions to the inch.
  Major_GRID=[ // [X,Y][0-9]
    [ // X
      (iX), // tall top flaps
      (iX+(iW/2)-(jJ/2)), // short top flaps
      (iX+(iW/2)), // top
      (iX+(iW/2))+Tab_PLOT[0], // glue tab top
      (iX+(iW/2)+iH)-Tab_PLOT[0], // glue tab base
      (iX+(iW/2)+iH), // base
      (iX+(iW/2)+iH)+(jJ/2), // short base flaps
      (iX+iW+iH), // tall base flaps

      (iX)+((iW+iH)*Iterator)+(8), // text left-origin
      (iX)+((iW+iH)*Iterator)+(128), // legend width
      (iX)+((iW+iH)*Iterator)+(168), // title width

    ],[ // Y
      iY+((iC/1000)*Ratio_SLOT), // caliper tail compensation
      iY+(1*iL)+(0*iW),iY+(1*iL)+(1*iW), // length and width 1
      iY+(2*iL)+(1*iW),iY+(2*iL)+(2*iW), // length and width 2
      iY+(2*iL)+(2*iW)+(Tab_PLOT[1]), // glue tab

      iY+(2*iL)+(2*iW)+(Tab_PLOT[1])+(8), // text base-origin
      iY+(2*iL)+(2*iW)+(Tab_PLOT[1])+(48), // suppliment height
      iY+(2*iL)+(2*iW)+(Tab_PLOT[1])+(88), // suppliment height
      iY+(2*iL)+(2*iW)+(Tab_PLOT[1])+(108), // compliment height
    ],
  ];

  //var units = 1; //(0 to 6)
  //app.preferences.setIntegerPreference("rulerType", units);
  /*https://community.adobe.com/t5/illustrator-discussions/set-unit-preferences-javascript/td-p/6369389
    Unit list:     
      0: inches, 2: points, 3: pica,
      1: mm, 4: cm,
      5: custom, 6: pixels; */

  //https://github.com/eccegordo/Illustrator-Script-Template/blob/master/Measurement.jsx
  // Unfortunately, Illustrator seems to be hard-coded into measuring everything as 72 divisions to the inch.
  // This conversion compensates for that, allowing our macro to stick with metric calculations internally.
  //   millimeters:  2.834645669291339 points = 1 millimeter
  var mm=2.834645669291339;
  // Major_GRID is metric; course positioning of dielines only. Flap heights sourced directly from this will collide into each other.
  // Minor_PLOT is points; 72 divisions to the inch. Fine positioning with crease adjustments and paper calliper glue flap shortening.
  
  var docset = new DocumentPreset; // document properties are provisioned separately to the document created,
  docset.units = RulerUnits.Millimeters; // I do not want any more to do with Imperial units!
  docset.width = mm*( Major_GRID[0][Major_GRID[0].length-1]+iX ); // allow room for text legend and guideline arrows for size.
  docset.height = mm*( Major_GRID[1][Major_GRID[1].length-1]+iY ); // the start margin is already factored into the major grid but not the end margin.
  docset.artboardLayout = DocumentArtboardLayout.GridByCol;
  docset.numArtboards = 1
  var doc = app.documents.addDocument(DocumentColorSpace.CMYK, docset);

  //https://stackoverflow.com/questions/43540803/how-to-add-an-artboard-to-a-document-in-adobe-illustrator
  //doc.artboards.add([ 0, Major_GRID[3][0]+256, 0, Major_GRID[5][1] ]);
  //doc.artboards[0].remove();
  //art=doc.artboards[0];
  
  // Kiss Cuts can be used for blade scored positional/indicative assembly marks and annotations.
  // Full Cuts can also be used to make waste separation as simple as it is for the lithographic carton process.
  /*
  _chopscribe_layout=doc.layers.add();
  _chopscribe_layout.name='ChopScribe';
  _stripwaste_layout=doc.layers.add();
  _stripwaste_layout.name='StripWaste';
  */

  // text identifies the artwork, by name or number, on screen or in print.
  // legend indicates numerically the dimension and caliper.
  _text_layout=doc.layers.add();
  _text_layout.name='Text';
  _legend_layout=doc.layers.add();
  _legend_layout.name='Legend';
  
  // there has to be at least one layer other than the default in order to remove the default layer;
  // or, so maybe it is not that much fun to find ways of crashing software I depend on in production.
  for(i=doc.layers.length-1; i>=0; i--){
      if(doc.layers[i].name=="Layer 1"){
          doc.layers[i].remove();
      }
  }
  
  // These layers are present if waste matrix removal assistance is requested.
  if(true) {
    _knifeboard_layout=doc.layers.add();
    _knifeboard_layout.name='KnifeBoard';
    _stripaid_layout=doc.layers.add();
    _stripaid_layout.name='StripAid';
  }
  
  // The following can be used for positional/indicative assembly marks as well as annotation of a design number.
  /*
  _scar_layout=doc.layers.add();
  _scar_layout.name='Half Cut';
  _nick_layout=doc.layers.add();
  _nick_layout.name='Kiss Cut';
  */

  // The names used here 
  _chop_layout=doc.layers.add();
  _chop_layout.name='Full Cut';
  _fold_layout=doc.layers.add();
  _fold_layout.name='Crease';
  
  // The following layers are for diagnostics and registration. The laser is an appropriate tool for diagnostics.
  _laser_layout=doc.layers.add();
  _laser_layout.name='Laser';
  _regmark_layout=doc.layers.add();
  _regmark_layout.name='Regmark';

  //https://github.com/creold/illustrator-scripts/blob/master/jsx/StrokeColorFromFill.jsx
  //_fold_colour=doc.swatches.getByName('crease');
  //_chop_colour=doc.swatches.getByName('cut');
  var _regmark_colour=new CMYKColor();     var _laser_colour=new CMYKColor();
  var _fold_colour=new CMYKColor();        var _chop_colour=new CMYKColor();
  var _knifeboard_colour=new CMYKColor();  var _stripaid_colour=new CMYKColor();
  var _legend_colour=new CMYKColor();      var _text_colour=new CMYKColor();
  _regmark_colour.black=100;_regmark_colour.cyan=0;_regmark_colour.magenta=0;_regmark_colour.yellow=0;
  _laser_colour.black=10;_laser_colour.cyan=10;_laser_colour.magenta=10;_laser_colour.yellow=80;
  _fold_colour.black=0;_fold_colour.cyan=100;_fold_colour.magenta=0;_fold_colour.yellow=0; // cyan fold
  _chop_colour.black=0;_chop_colour.cyan=0;_chop_colour.magenta=100;_chop_colour.yellow=0; // magenta chop
  _stripaid_colour.black=10;_stripaid_colour.cyan=0;_stripaid_colour.magenta=100;_stripaid_colour.yellow=60;
  _knifeboard_colour.black=50;_knifeboard_colour.cyan=0;_knifeboard_colour.magenta=70;_knifeboard_colour.yellow=70;
  _legend_colour.black= 30;_legend_colour.cyan=100;_legend_colour.magenta= 10;_legend_colour.yellow=100; // green legend
  _text_colour.black=   50;_text_colour.cyan=   20;_text_colour.magenta=   50;_text_colour.yellow=  100; // orange text
  
for (jJJ=0; jJJ<Iterator; jJJ++){
  jjJJ=(iW+iH)*jJJ;

  // fold 90degree permanent corners; exclude cut lines and top legend.
  for (i = 1; i <= 4; i++) { // crease between cut lines
    iTab=(i==Major_GRID[1].length-3) // top of the carton?
    Minor_PLOT=[];
    Minor_PLOT.push([ mm*(Major_GRID[0][2]+jjJJ), mm*(Major_GRID[1][i]), ]);
    Minor_PLOT.push([ mm*(Major_GRID[0][5]+jjJJ), mm*(Major_GRID[1][i]), ]);
    fP=lineAction(doc,Minor_PLOT,_fold_colour,_fold_layout);
  }
  // fold lid and dust flaps; avoid crease within the glue tab.
  for (i = 1; i <= 4; i++) { // it is okay for vertical crease to reach lower cut line.
    var jW=i%2; // crease height compensation; alternate between lid and dust flap heights.
    //var jU=(i==1 | i==Major_GRID[1].length-1 ? 0:1)
    for (j = -1; j<=1; j+=2) {
      var jV=2; if (j==1) {jV=5;} // creases are pressed into the top and bottom of box between flaps.
      Minor_PLOT=[];
      Minor_PLOT.push([
        mm*(( Major_GRID[0][jV]  + ( ((iC/1000)*Ratio_SLOT) *jW *j )+jjJJ) ),
        mm*( Major_GRID[1][i-1] +
         (
          ((iC/1000)*Ratio_SLOT) //*(i==1 ? 1:1) // bottom flush compensation
         )
        ),
      ]);
      Minor_PLOT.push([
        mm*(( Major_GRID[0][jV]  + ( ((iC/1000)*Ratio_SLOT) *jW *j) )+jjJJ),
        mm*( Major_GRID[1][i+0] -
         (
          ((iC/1000)*Ratio_SLOT) //*(i==Major_GRID[1].length-4 ? 1:1) // top flush compensation
         )
        ),
      ]);
      fP=lineAction(doc,Minor_PLOT,_fold_colour,_fold_layout);
    }
  }

  // chop singular outside contour including slots
  Minor_PLOT=[]; // stake a claim on this level of variable scope
  if(iImpo[0]==1 && jJJ>0){
  } else {
  } {
    Minor_PLOT.push([
      mm*( Major_GRID[0][0]+jjJJ ),
      mm*( Major_GRID[1][0] + ((iC/1000)*Ratio_SLOT) )
    ]); // low left
    Minor_PLOT.push([
      mm*( Major_GRID[0][2]+jjJJ ),
      mm*( Major_GRID[1][0] + ((iC/1000)*Ratio_SLOT) )
    ]); // low body left
    Minor_PLOT.push([
      mm*( Major_GRID[0][2]+jjJJ ),
      mm*( Major_GRID[1][0] )
    ]); // low body left
    Minor_PLOT.push([
      mm*( (Major_GRID[0][2]+jjJJ) + ( (Major_GRID[0][5]-Major_GRID[0][2]) /2) ),
      mm*( Major_GRID[1][0] )
    ]); // low centre
    Minor_PLOT.push([
      mm*( Major_GRID[0][5]+jjJJ ),
      mm*( Major_GRID[1][0] )
    ]); // low body right
    Minor_PLOT.push([
      mm*( Major_GRID[0][5]+jjJJ ),
      mm*( Major_GRID[1][0] + ((iC/1000)*Ratio_SLOT)  )
    ]); // low body right
    Minor_PLOT.push([
      mm*( Major_GRID[0][7]+jjJJ ),
      mm*( Major_GRID[1][0] + ((iC/1000)*Ratio_SLOT) )
    ]); // low right
    for (i = 1; i <= 3; i++) {
      Minor_PLOT.push([ mm*(Major_GRID[0][((iW>iL)&(i%2)==0?6:7)]+jjJJ), mm*( Major_GRID[1][i] - ((iC/1000)*Ratio_SLOT) ) ]);
      Minor_PLOT.push([ mm*(Major_GRID[0][5]+jjJJ), mm*( Major_GRID[1][i] - ((iC/1000)*Ratio_SLOT) ) ]);
      Minor_PLOT.push([ mm*(Major_GRID[0][5]+jjJJ), mm*( Major_GRID[1][i] + ((iC/1000)*Ratio_SLOT) ) ]);
      Minor_PLOT.push([ mm*(Major_GRID[0][((iW>iL)&(i%2)==1?6:7)]+jjJJ), mm*( Major_GRID[1][i] + ((iC/1000)*Ratio_SLOT) ) ]);
    }
    Minor_PLOT.push([ mm*(Major_GRID[0][((iW>iL)?6:7)]+jjJJ), mm*( Major_GRID[1][4] - ((iC/1000)*Ratio_SLOT) ) ]); // glue tab right
    Minor_PLOT.push([ mm*(Major_GRID[0][5]+jjJJ), mm*( Major_GRID[1][4] - ((iC/1000)*Ratio_SLOT) ) ]); // glue tab right
    Minor_PLOT.push([ mm*(Major_GRID[0][5]+jjJJ), mm*( Major_GRID[1][4] ) ]); // glue tab right
    Minor_PLOT.push([ mm*(Major_GRID[0][4]+jjJJ), mm*( Major_GRID[1][5] ) ]); // glue tip left
  }
  Minor_PLOT.push([
    mm*( (Major_GRID[0][3]+jjJJ) + ( (Major_GRID[0][4]-Major_GRID[0][3]) /2) ),
    mm*( Major_GRID[1][5] )
  ]); // glue tip high centre
  {
    Minor_PLOT.push([ mm*(Major_GRID[0][3]+jjJJ), mm*( Major_GRID[1][5] ) ]); // glue tip right
    Minor_PLOT.push([ mm*(Major_GRID[0][2]+jjJJ), mm*( Major_GRID[1][4] ) ]); // glue tab left
    Minor_PLOT.push([ mm*(Major_GRID[0][2]+jjJJ), mm*( Major_GRID[1][4] - ((iC/1000)*Ratio_SLOT) ) ]); // glue tab left
    Minor_PLOT.push([ mm*(Major_GRID[0][((iW>iL)?1:0)]+jjJJ), mm*( Major_GRID[1][4] - ((iC/1000)*Ratio_SLOT) ) ]); // glue tab left
  }
  if(iImpo[0]==1 && jJJ>0) {
    if(iW>iL) {
      Minor_PLOT.push([ mm*(Major_GRID[0][1]+jjJJ), mm*( Major_GRID[1][3] + ((iC/1000)*Ratio_SLOT) ) ]);
      Minor_PLOT.push([ mm*(Major_GRID[0][2]+jjJJ), mm*( Major_GRID[1][3] + ((iC/1000)*Ratio_SLOT) ) ]);
      Minor_PLOT.push([ mm*(Major_GRID[0][2]+jjJJ), mm*( Major_GRID[1][3] - ((iC/1000)*Ratio_SLOT) ) ]);
      Minor_PLOT.push([ mm*(Major_GRID[0][0]+jjJJ), mm*( Major_GRID[1][3] - ((iC/1000)*Ratio_SLOT) ) ]);
      Subor_PLOT=[];
      for (i = 2; i >= 1; i--) {
        Subor_PLOT.push([ mm*(Major_GRID[0][(i%2)==1?1:0]+jjJJ), mm*( Major_GRID[1][i] + ((iC/1000)*Ratio_SLOT) ) ]);
        Subor_PLOT.push([ mm*(Major_GRID[0][2]+jjJJ), mm*( Major_GRID[1][i] + ((iC/1000)*Ratio_SLOT) ) ]);
        Subor_PLOT.push([ mm*(Major_GRID[0][2]+jjJJ), mm*( Major_GRID[1][i] - ((iC/1000)*Ratio_SLOT) ) ]);
        Subor_PLOT.push([ mm*(Major_GRID[0][(i%2)==0?1:0]+jjJJ), mm*( Major_GRID[1][i] - ((iC/1000)*Ratio_SLOT) ) ]);
      }
      cQ=lineAction(doc,Subor_PLOT,_chop_colour,_chop_layout);
    } else {
      for (i = 3; i >= 1; i--) {
        Subor_PLOT=[];
        Subor_PLOT.push([ mm*(Major_GRID[0][(i%2)==1?1:0]+jjJJ), mm*( Major_GRID[1][i] + ((iC/1000)*Ratio_SLOT) ) ]);
        Subor_PLOT.push([ mm*(Major_GRID[0][2]+jjJJ), mm*( Major_GRID[1][i] + ((iC/1000)*Ratio_SLOT) ) ]);
        Subor_PLOT.push([ mm*(Major_GRID[0][2]+jjJJ), mm*( Major_GRID[1][i] - ((iC/1000)*Ratio_SLOT) ) ]);
        Subor_PLOT.push([ mm*(Major_GRID[0][(i%2)==0?1:0]+jjJJ), mm*( Major_GRID[1][i] - ((iC/1000)*Ratio_SLOT) ) ]);
        cQ=lineAction(doc,Subor_PLOT,_chop_colour,_chop_layout);
      }
    }
  } else {
    for (i = 3; i >= 1; i--) {
      Minor_PLOT.push([ mm*(Major_GRID[0][((iW>iL)&(i%2)==1?1:0)]+jjJJ), mm*( Major_GRID[1][i] + ((iC/1000)*Ratio_SLOT) ) ]);
      Minor_PLOT.push([ mm*(Major_GRID[0][2]+jjJJ), mm*( Major_GRID[1][i] + ((iC/1000)*Ratio_SLOT) ) ]);
      Minor_PLOT.push([ mm*(Major_GRID[0][2]+jjJJ), mm*( Major_GRID[1][i] - ((iC/1000)*Ratio_SLOT) ) ]);
      Minor_PLOT.push([ mm*(Major_GRID[0][((iW>iL)&(i%2)==0?1:0)]+jjJJ), mm*( Major_GRID[1][i] - ((iC/1000)*Ratio_SLOT) ) ]);
    }
    Minor_PLOT.push([
      mm*( Major_GRID[0][0]+jjJJ ),
      mm*( Major_GRID[1][0] + ((iC/1000)*Ratio_SLOT) )
    ]); // low left return stroke
  }
  cP=lineAction(doc,Minor_PLOT,_chop_colour,_chop_layout);
} //jJJ
  
  for (i = 0; i <= 5; i++) { // crease between cut lines
    Minor_PLOT=[];
    Minor_PLOT.push([ mm*(Major_GRID[0][8]), mm*(Major_GRID[1][i]), ]);
    Minor_PLOT.push([ mm*(Major_GRID[0][9]), mm*(Major_GRID[1][i]), ]);
    fP=lineAction(doc,Minor_PLOT,_legend_colour,_legend_layout);
    fP.strokeDashes=[3,3];
  }

    Minor_PLOT=[];
    Minor_PLOT.push([ mm*(Major_GRID[0][9]), mm*(Major_GRID[1][0]), ]);
    Minor_PLOT.push([ mm*(Major_GRID[0][9]), mm*(Major_GRID[1][5]), ]);
    fP=lineAction(doc,Minor_PLOT,_legend_colour,_legend_layout);
    fP.strokeDashes=[3,3];

    Minor_PLOT=[];
    Minor_PLOT.push([ mm*(Major_GRID[0][10]), mm*(Major_GRID[1][0]), ]);
    Minor_PLOT.push([ mm*(Major_GRID[0][10]), mm*(Major_GRID[1][5]), ]);
    fP=lineAction(doc,Minor_PLOT,_legend_colour,_legend_layout);
    fP.strokeDashes=[3,3];

    Minor_PLOT=[];
    Minor_PLOT.push([ mm*(Major_GRID[0][8]), mm*(Major_GRID[1][0]), ]);
    Minor_PLOT.push([ mm*(Major_GRID[0][10]), mm*(Major_GRID[1][0]), ]);
    fP=lineAction(doc,Minor_PLOT,_legend_colour,_legend_layout);
    fP.strokeDashes=[3,3];
    
    Minor_PLOT=[];
    Minor_PLOT.push([ mm*(Major_GRID[0][8]), mm*(Major_GRID[1][5]), ]);
    Minor_PLOT.push([ mm*(Major_GRID[0][10]), mm*(Major_GRID[1][5]), ]);
    fP=lineAction(doc,Minor_PLOT,_legend_colour,_legend_layout);
    fP.strokeDashes=[3,3];
      
    Minor_PLOT=[];
    Minor_PLOT.push([ mm*(Major_GRID[0][0]), mm*(Major_GRID[1][Major_GRID[1].length-1]), ]);
    Minor_PLOT.push([ mm*(Major_GRID[0][0]), mm*(Major_GRID[1][((iW+2)>iL)?3:4]+8), ]); // extend down only if flap height differs
    fP=lineAction(doc,Minor_PLOT,_legend_colour,_legend_layout);
    fP.strokeDashes=[3,3];
  
    Minor_PLOT=[];
    Minor_PLOT.push([ mm*(Major_GRID[0][7]), mm*(Major_GRID[1][Major_GRID[1].length-1]), ]);
    Minor_PLOT.push([ mm*(Major_GRID[0][7]), mm*(Major_GRID[1][((iW+2)>iL)?3:4]+8), ]);
    fP=lineAction(doc,Minor_PLOT,_legend_colour,_legend_layout);
    fP.strokeDashes=[3,3];
  
    if(iL<iW){
    Minor_PLOT=[];
    Minor_PLOT.push([ mm*(Major_GRID[0][1]), mm*(Major_GRID[1][Major_GRID[1].length-3]), ]);
    Minor_PLOT.push([ mm*(Major_GRID[0][1]), mm*(Major_GRID[1][4]+8), ]);
    fP=lineAction(doc,Minor_PLOT,_legend_colour,_legend_layout);
    fP.strokeDashes=[3,3];
    }
  
    Minor_PLOT=[];
    Minor_PLOT.push([ mm*(Major_GRID[0][2]), mm*(Major_GRID[1][Major_GRID[1].length-2]), ]);
    Minor_PLOT.push([ mm*(Major_GRID[0][2]), mm*(Major_GRID[1][4]+8), ]); //+((iC/1000)*2.0) // avoid glue tab stroke
    fP=lineAction(doc,Minor_PLOT,_legend_colour,_legend_layout);
    fP.strokeDashes=[3,3];
  
    Minor_PLOT=[];
    Minor_PLOT.push([ mm*(Major_GRID[0][5]), mm*(Major_GRID[1][Major_GRID[1].length-2]), ]);
    Minor_PLOT.push([ mm*(Major_GRID[0][5]), mm*(Major_GRID[1][4]+8), ]); //+((iC/1000)*2.0) // avoid glue tab stroke
    fP=lineAction(doc,Minor_PLOT,_legend_colour,_legend_layout);
    fP.strokeDashes=[3,3];
  
    Minor_PLOT=[];
    Minor_PLOT.push([ mm*(Major_GRID[0][0]), mm*(Major_GRID[1][Major_GRID[1].length-1]), ]);
    Minor_PLOT.push([ mm*(Major_GRID[0][7]), mm*(Major_GRID[1][Major_GRID[1].length-1]), ]);
    fP=lineAction(doc,Minor_PLOT,_legend_colour,_legend_layout);
    fP.strokeDashes=[2,5];
  
    Minor_PLOT=[];
    Minor_PLOT.push([ mm*(Major_GRID[0][0]), mm*(Major_GRID[1][Major_GRID[1].length-2]), ]);
    Minor_PLOT.push([ mm*(Major_GRID[0][5]), mm*(Major_GRID[1][Major_GRID[1].length-2]), ]);
    fP=lineAction(doc,Minor_PLOT,_legend_colour,_legend_layout);
    fP.strokeDashes=[2,5];
    
    if(iL<iW){
    Minor_PLOT=[];
    Minor_PLOT.push([ mm*(Major_GRID[0][1]), mm*(Major_GRID[1][Major_GRID[1].length-3]), ]);
    Minor_PLOT.push([ mm*(Major_GRID[0][2]), mm*(Major_GRID[1][Major_GRID[1].length-3]), ]);
    fP=lineAction(doc,Minor_PLOT,_legend_colour,_legend_layout);
    fP.strokeDashes=[2,5];
    }
  
  //https://ai-scripting.docsforadobe.dev/jsobjref/TextFrameItems.html
  // [text]
  rR=[]; aT=[]; rR0=rR1=null; aT0=aT1=null;
  rR0 = doc.pathItems.rectangle(
    mm*(Major_GRID[1][Major_GRID[1].length-1]   ),
    mm*(Major_GRID[0][Major_GRID[0].length-3]),
    mm*(Major_GRID[0][Major_GRID[0].length-1]-Major_GRID[0][Major_GRID[0].length-3]),
    mm*(Major_GRID[1][Major_GRID[1].length-1]-Major_GRID[1][Major_GRID[1].length-4]) );
  aT0 = doc.textFrames.areaText(rR0);
  aT0.textRange.characterAttributes.size=24; // whole story attribute
  aTz=aT0.paragraphs.add(vID.text); // we created the first paragraph! individual paragraph styles are not yet available.
  aTz=aT0.paragraphs.add('Flat area:'); // second paragraph; individual paragraph styles are now available.
  //aTz.paragraphAttributes.spaceBefore=16;
  aTz.paragraphAttributes.justification = Justification.LEFT; // second paragraph attribute
  aT0.paragraphs[0].characterAttributes.size=60; // setting assignment is delayed until 2 paragraphs are present.
  aT0.paragraphs[0].paragraphAttributes.justification = Justification.RIGHT; // first paragraph attribute
  aT0.paragraphs[0].paragraphAttributes.spaceAfter=16;
  aTz=aT0.paragraphs.add(
   "X="+(Major_GRID[0][Major_GRID[0].length-4]-Major_GRID[0][0])+"mm, "
  +"Y="+(Major_GRID[1][Major_GRID[1].length-3]-Major_GRID[1][0])+"mm; " ); // second paragraph
  //aTz.paragraphAttributes.spaceBefore=0;
  aTz=aT0.paragraphs.add("Dimension reference: "+sDim+".");
  //aTz.paragraphAttributes.spaceBefore=16;
  aTz=aT0.paragraphs.add(
   "L="+iL+"mm, "
  +"W="+iW+"mm, "
  +"H="+iH+"mm; " );
  //aTz.paragraphAttributes.spaceBefore=0;
  //aTz.paragraphAttributes.spaceBefore=4;
  aTz=aT0.paragraphs.add("C="+iC+"μm.");
  aT0.move(_text_layout, ElementPlacement.PLACEATBEGINNING);
  textAction( [aT0], _text_colour );

  // [legend]
  i=0; // iterator scope must be outside as we will continue iterating after the loop.
  for (; i<=4; i++) {
    rR1=rR.push(null)-1;
    rR[rR1] = doc.pathItems.rectangle(
      mm*(Major_GRID[1][i+1]-5), 
      mm*(Major_GRID[0][Major_GRID[0].length-3]),
      mm*(Major_GRID[0][Major_GRID[0].length-2]-Major_GRID[0][Major_GRID[0].length-3]-(5)),// wide
      mm*(Major_GRID[1][i+1]-Major_GRID[1][i]-(5)) ); // (-5): ideally, label should be vertically centred.
    aT1=aT.push(null)-1;
    aT[aT1] = doc.textFrames.areaText(rR[i]);
    aT[aT1].contents = (i>=4?"Glue":(i%2==0?"L":"W"))+": "+(Major_GRID[1][i+1] - Major_GRID[1][i])+"mm";
    aT[aT1].paragraphs[0].characterAttributes.size=32; //48;
    aT[aT1].paragraphs[0].paragraphAttributes.justification = Justification.RIGHT;
    //aT[aT1].paragraphs[0].paragraphAttributes.spaceBefore=18;
  }
  // counter will have iterated correctly to the next empty spot before ending this loop.
  rR1=rR.push(null)-1;
  rR[rR1] = doc.pathItems.rectangle(
    mm*(Major_GRID[1][5]),
    mm*(Major_GRID[0][9]),
    mm*(Major_GRID[0][10]-Major_GRID[0][9]),
    mm*(Major_GRID[1][5]-Major_GRID[1][0]), // tall
  );// wide
  aT1=aT.push(null)-1;
  aT[aT1] = doc.textFrames.areaText(rR[i]);
  //aT[aT1].rotate(-90); // this rotates the whole shape out of its slot! not what we want.
  aT[aT1].contents = "Y: "+(Major_GRID[1][5] - Major_GRID[1][0]) +"mm"; // created a paragraph!
  aT[aT1].paragraphs[0].characterAttributes.size=13; // Go back to 40 when properly rotated. //56;
  aT[aT1].paragraphs[0].paragraphAttributes.justification = Justification.CENTER;
  i++;
  rR1=rR.push(null)-1;
  rR[rR1] = doc.pathItems.rectangle(
    mm*(Major_GRID[1][Major_GRID[1].length-1]),
    mm*(Major_GRID[0][0]),
    mm*(Major_GRID[0][Major_GRID[0].length-4]-Major_GRID[0][0]),// wide
    mm*(Major_GRID[1][Major_GRID[1].length-1]-Major_GRID[1][Major_GRID[1].length-2]) ); // tall
  aT1=aT.push(null)-1;
  aT[aT1] = doc.textFrames.areaText(rR[i]);
  aT[aT1].contents = "X: "+(Major_GRID[0][7] - Major_GRID[0][0]) +"mm"; // created a paragraph!
  aT[aT1].paragraphs[0].characterAttributes.size=40; //56;
  aT[aT1].paragraphs[0].paragraphAttributes.justification = Justification.CENTER;
  i++;
  rR1=rR.push(null)-1;
  rR[rR1] = doc.pathItems.rectangle(
    mm*(Major_GRID[1][Major_GRID[1].length-2]),
    mm*(Major_GRID[0][2]),
    mm*(Major_GRID[0][5]-Major_GRID[0][2]),// wide
    mm*(Major_GRID[1][Major_GRID[1].length-2]-Major_GRID[1][Major_GRID[1].length-3]) ); // tall
  aT1=aT.push(null)-1;
  aT[aT1] = doc.textFrames.areaText(rR[i]);
  aTz=aT[aT1].paragraphs.add( "H: "+ (iW/2) +"mm" ); // created a paragraph!
  aTz.characterAttributes.size=32; //56;
  aTz.paragraphAttributes.justification = Justification.CENTER;
  i++;
  rR1=rR.push(null)-1;
  rR[rR1] = doc.pathItems.rectangle(
    mm*(Major_GRID[1][Major_GRID[1].length-2]),
    mm*(Major_GRID[0][0]),
    mm*(Major_GRID[0][2]-Major_GRID[0][0]),// wide
    mm*(Major_GRID[1][Major_GRID[1].length-2]-Major_GRID[1][Major_GRID[1].length-3]) ); // tall
  aT1=aT.push(null)-1;
  aT[aT1] = doc.textFrames.areaText(rR[i]);
  aTz=aT[aT1].paragraphs.add( (iW/2) +"mm" ); // created a paragraph!
  aTz.characterAttributes.size=28; //56;
  aTz.paragraphAttributes.justification = Justification.CENTER;
  aTz=aT[aT1].paragraphs.add( "(1/2 of W)" ); // created a paragraph!
  aTz.characterAttributes.size=24; //56;
  aTz.paragraphAttributes.justification = Justification.CENTER;
  i++;
  if(iL<iW){
  rR1=rR.push(null)-1;
  rR[rR1] = doc.pathItems.rectangle(
    mm*(Major_GRID[1][Major_GRID[1].length-3]),
    mm*(Major_GRID[0][1]),
    mm*(Major_GRID[0][2]-Major_GRID[0][1]),// wide
    mm*(Major_GRID[1][Major_GRID[1].length-3]-Major_GRID[1][Major_GRID[1].length-4]) ); // tall
  aT1=aT.push(null)-1;
  aT[aT1] = doc.textFrames.areaText(rR[i]);
  aTz=aT[aT1].paragraphs.add( (jJ/2) +"mm" ); // created a paragraph!
  aTz.characterAttributes.size=24; //56;
  aTz.paragraphAttributes.justification = Justification.CENTER;
  aTz=aT[aT1].paragraphs.add( "(1/2 of "+(iL<iW?"L":"W")+")" ); // created a paragraph!
  aTz.characterAttributes.size=20; //56;
  aTz.paragraphAttributes.justification = Justification.CENTER;
  }
  textAction( aT, _legend_colour ); // this one crashes if in a loop; do it all at once outside the loop.
  for (i=0; i<aT.length; i++) { // a separarate loop is required or the folllowing action(s) will crash.
    aT[i].move(_legend_layout, ElementPlacement.PLACEATBEGINNING);
  }

  var register = [];
  if(vRegCam.selection.text=='5mm filled dot'){
    register.push(_regmark_layout.pathItems.ellipse(
      mm*((Major_GRID[1][5]+2.5)+iRegCamY), mm*((Major_GRID[0][0]-2.5)-iRegCamX), 
      mm*5, mm*5, false, true));
    register.push(_regmark_layout.pathItems.ellipse(
      mm*((Major_GRID[1][0]+2.5)-iRegCamY), mm*((Major_GRID[0][0]-2.5)-iRegCamX), 
      mm*5, mm*5, false, true));
    register.push(_regmark_layout.pathItems.ellipse(
      mm*((Major_GRID[1][0]+2.5)-iRegCamY), mm*((Major_GRID[0][7]-2.5)+iRegCamX), 
      mm*5, mm*5, false, true));
    if(Iterator>1){
    register.push(_regmark_layout.pathItems.ellipse(
      mm*((Major_GRID[1][0]+2.5)-iRegCamY),
      mm*((Major_GRID[0][7]-2.5)+((Major_GRID[0][7]-Major_GRID[0][0])*(Iterator-1))+iRegCamX), 
      mm*5, mm*5, false, true));
    }
    for(i=0; i<register.length; i++){
      register[i].fillColor=_regmark_colour; //color
      register[i].filled=true;
      register[i].stroked=false;
    }
  }
}


function lineAction(o_file, o_plot, o_colour, o_layout){
  o_path = o_file.pathItems.add();
  o_path.setEntirePath(o_plot);
  o_path.filled=false;
  o_path.stroked=true;
  o_path.strokeColor=o_colour; //color
  o_path.move(o_layout, ElementPlacement.PLACEATBEGINNING);
  return o_path;
}
function fillAction(o_file, o_plot, o_colour, o_layout){
  o_path = o_file.pathItems.add();
  o_path.setEntirePath(o_plot);
  o_path.filled=true;
  o_path.stroked=false;
  o_path.strokeColor=o_colour; //color
  o_path.move(o_layout, ElementPlacement.PLACEATBEGINNING);
  return o_path;
}

function textAction(source, target) {
  //https://stackoverflow.com/questions/32548680/illustrator-script-to-recolor-text
  var n = 0, selectionArray = [], converted_counter = 0;
  //doc = app.activeDocument;
  //source = doc.textFrames;
  
  // number of text frames
  n = source.length;
  // loop over text frames
  for ( i = 0 ; i < n ; i++ )
  {
    // To prevent errors with source[i].textRange.size when == 0
    if(source[i].textRange.length > 0)
    {
      // text frames counting
      selectionArray [ selectionArray.length ] = source[i];
      // get all the paragraphs from the current text frame
      var current_paragraphs = source[i].textRange.paragraphs;
      // loop over paragraphs
      for (j = 0; j < current_paragraphs.length; j++)
      {
        // proceed only with non-zero-length paragraphs
        if(current_paragraphs[j].characters.length > 0)
        {
          converted_counter++;
          current_paragraphs[j].fillColor = target;
        }
      }
    }
  }
}

function checkSettingFolder() {
  var $folder = new Folder(settingFile.folder);
  if (!$folder.exists) $folder.create();
}

function previewStart() {
    //if (preview.value) {
    //    if (isUndo) app.undo();
    //        else isUndo = true;
        startAction();
        app.redraw();
    //} else if (isUndo) {
    //    app.undo();
    //    app.redraw();
        isUndo = false;
    //}
}

win0.onClose = function () {
    if (isUndo) {
        app.undo();
        app.redraw();
        isUndo = false;
    }

    saveSettings();
    return true;
}

function loadSettings() {
  var $file = File(settingFile.folder + settingFile.name);
  if ($file.exists) {
    try {
      $file.open('r');
      var
        data = $file.read().split('\n'),
        $main = data[0].split(',');
      vCaliper.text = $main[0];
      vX.text = $main[1];
      vY.text = $main[2];
      vL.text = $main[3];
      vW.text = $main[4];
      vH.text = $main[5];
      vTabX.text = $main[6];
      vTabY.text = $main[7];
      vRegCamX.text = $main[8];
      vRegCamY.text = $main[9];
      for(i=0; i<vCaliper.items.length; i++) {
        if(vCaliper.items[i].text.split(' ')[0]==$main[0].split(' ')[0]){
          vCaliper.selection=i;
          break;
        }
      }
    } catch (e) {}
    $file.close();
  }
}

function saveSettings() {
  var
    $file = new File(settingFile.folder + settingFile.name),
    data = [
      vCaliper.selection.text,
      vX.text,
      vY.text,
      vL.text,
      vW.text,
      vH.text,
      vTabX.text,
      vTabY.text,
      vRegCamX.text,
      vRegCamY.text,
    ].toString();

  $file.open('w');
  $file.write(data);
  $file.close();
}

checkSettingFolder();
loadSettings();

win0.center();
win0.show();

