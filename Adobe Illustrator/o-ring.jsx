/* This is released under the GNU LGPL by Andrew Sinclair.
   e-mail: fastcarton@asyn3c.net
   */

﻿/* 
  I will attempt to cite references I used as a template for this file here.
  The fundamental structure of the user interface and framework is based primarily on:
  https://github.com/alexander-ladygin/illustrator-scripts/blob/master/harmonizer.jsx
*/

var scriptName = 'O-Ring',
    settingFile = {
        name: scriptName + '__0100.json',
        folder: Folder.myDocuments + '/' //LA_AI_Scripts
    },
    useClippingMask = true;

var isUndo = false,
    win0 = new Window('dialog', scriptName + ' by Andrew Sinclair', undefined);
    win0.orientation = 'column';
    win0.alignChildren = 'fill';

//0
var p0 = win0.add('panel', undefined, scriptName);
    p0.orientation = 'column';
    p0.alignChildren = 'fill';
    p0.margins = 20;

//1
var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = 'center';
var cC = g0.add('statictext', undefined, 'Caliper (μm):'),
    vC = g0.add('edittext', [0, 0, 110, 25], 4);

//2
var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = ['fill', 'fill'];

var gX = g0.add('group');
    gX.orientation = 'column';
    gX.alignChildren = 'left';
var cX = gX.add('statictext', undefined, 'X:'),
    vX = gX.add('edittext', [0, 0, 80, 25], 0);

var gY = g0.add('group');
    gY.orientation = 'column';
    gY.alignChildren = 'left';
var cY = gY.add('statictext', undefined, 'Y:'),
    vY = gY.add('edittext', [0, 0, 80, 25], 0);

//3
var g0 = p0.add('group');
    g0.orientation = 'row';
    g0.alignChildren = ['fill', 'fill'];

var gL = g0.add('group');
    gL.orientation = 'column';
    gL.alignChildren = 'left';
var cL = gL.add('statictext', undefined, 'Length:'),
    vL = gL.add('edittext', [0, 0, 80, 25], 0);
    //positionX = groupGutterX.add('dropdownlist', [0, 0, 80, 25], ['Left', 'Center', 'Right']);
    //positionX.selection = 1;

var gW = g0.add('group');
    gW.orientation = 'column';
    gW.alignChildren = 'left';
var cW = gW.add('statictext', undefined, 'Width:'),
    vW = gW.add('edittext', [0, 0, 80, 25], 0);
    //positionY = groupGutterY.add('dropdownlist', [0, 0, 80, 25], ['Top', 'Middle', 'Bottom']);
    //positionY.selection = 1;

var gH = g0.add('group');
    gH.orientation = 'column';
    gH.alignChildren = 'left';
var cH = gH.add('statictext', undefined, 'Height:'),
    vH = gH.add('edittext', [0, 0, 80, 25], 0);
    //positionY = groupGutterZZZ.add('dropdownlist', [0, 0, 80, 25], ['Top', 'Middle', 'Bottom']);
    //positionY.selection = 1;

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
        if (preview.value && isUndo) app.undo();
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
  iC=parseInt(vC.text); iX=parseFloat(vX.text); iY=parseFloat(vY.text);
  iL=parseFloat(vL.text); iW=parseFloat(vW.text); iH=parseFloat(vH.text);
  //alert('user options defined; caliper: '+iC+';');

  Major_GRID=[
    [ iX+(0), iY + ((iC/1000)*1.5) ], // shorten tail by 1.5x of paper calliper.
    // Technically, fine adjustments should not be in the Major_GRID; they ought to be
    // in the Minor_PLOT instead where we can be specific about what folds ascend each other.
    // In this script, we do not need to remember exactly where the first plot before folding
    // calliper adjustment was, so we can break that Major_GRID rule. Also, as Minor_PLOT goes
    // directly into Illustrator JavaScript's plotting commands, what I prefer to do here instead
    // is convert from millimetres into Adobe's native point system for PS/PDF; 72 divisions to the inch.

    [ iX+(10), iY+(iH) ], // height 1
    [ iX+iL-(10), iY+(iH)+(iW) ], // width 1
    [ iX+iL-(0), iY+(2*iH)+(iW) ], // height 2
    [ 0, iY+(2*iH)+(2*iW) ], // width 2, crease of tab

    [ 0, iY+(20)+(2*iH)+(2*iW) ], // top of tab
    [ 0, iY+(40)+(2*iH)+(2*iW) ], // length legend
  ];
  //alert('grid defined; max dimension: '+Major_GRID[3][0]+','+Major_GRID[6][1]+';');

  //var units = 1; //(0 to 6)
  //app.preferences.setIntegerPreference("rulerType", units);  
  /* Unit list
     https://community.adobe.com/t5/illustrator-discussions/set-unit-preferences-javascript/td-p/6369389
  new:
    0: inches, 2: points, 3: pica,
    1: mm, 4: cm,
    5: custom, 6: pixels;
  old:
    0: point,  1: pica,  2: inch
    3: mm,  4: cm,
    5: H/Q, 6: px; */

  //https://github.com/eccegordo/Illustrator-Script-Template/blob/master/Measurement.jsx
  // Unfortunately, Illustrator seems to be hard-coded into measuring everything as 72 divisions to the inch.
  // This conversion compensates for that, allowing our macro to stick with metric calculations internally.
  //  millimeters:  2.834645 points = 1 millimeter
  var mm=2.834645;
  // Major_GRID is metric; course positioning of dielines only. Flap heights sourced directly from this will collide into each other.
  // Minor_PLOT is points (72 divisions to the inch); fine positioning with crease adjustments and paper calliper glue flap shortening.
  //alert('scale defined');

  //doc=app.documents.add();
  var docPreset = new DocumentPreset; // document properties are provisioned separately to the document created,
  //alert('preset initiated; about to set width and height; height from: '+Major_GRID.length);
  docPreset.units = RulerUnits.Millimeters; // I do not want any more to do with Imperial units!
  docPreset.width = mm*(Major_GRID[3][0]+150); // allow room for text legend and guideline arrows for size.
  docPreset.height = mm*(Major_GRID[Major_GRID.length-1][1]+iY); // the start margin is already factored into the major grid but not the end margin.
  //alert('width and height set');
  docPreset.artboardLayout = DocumentArtboardLayout.GridByCol;
  docPreset.numArtboards = 1
  //alert('preset defined');

  var doc = app.documents.addDocument(DocumentColorSpace.CMYK, docPreset);
  //alert('document defined');

  //https://stackoverflow.com/questions/43540803/how-to-add-an-artboard-to-a-document-in-adobe-illustrator
  //doc.artboards.add([ 0, Major_GRID[3][0]+256, 0, Major_GRID[5][1] ]);
  //doc.artboards[0].remove();
  //art=doc.artboards[0];
  
  //Minor_PLOT=[];
  _fold_layout=app.activeDocument.layers.add();
  _fold_layout.name='Crease';
  _chop_layout=app.activeDocument.layers.add();
  _chop_layout.name='Full Cut';
  _legend_layout=app.activeDocument.layers.add();
  _legend_layout.name='Legend';
  _text_layout=app.activeDocument.layers.add();
  _text_layout.name='Text';
  //app.activeDocument.layers[0].remove();
  
  //https://github.com/creold/illustrator-scripts/blob/master/jsx/StrokeColorFromFill.jsx
  //_fold_colour=app.activeDocument.swatches.getByName('crease');
  //_chop_colour=app.activeDocument.swatches.getByName('cut');
  var _fold_colour=new CMYKColor();  var _chop_colour=new CMYKColor();
  var _legend_colour=new CMYKColor();  var _text_colour=new CMYKColor();
  _fold_colour.black=0;_fold_colour.cyan=100;_fold_colour.magenta=0;_fold_colour.yellow=0; // cyan fold
  _chop_colour.black=0;_chop_colour.cyan=0;_chop_colour.magenta=100;_chop_colour.yellow=0; // magenta chop
  _legend_colour.black= 30;_legend_colour.cyan=100;_legend_colour.magenta=  0;_legend_colour.yellow=100; // green legend
  _text_colour.black=   40;_text_colour.cyan=    0;_text_colour.magenta=   35;_text_colour.yellow=  100; // orange text

  // [fold]; start creasing from one above the cut line, and two before cutline and width legend.
  for (i = 1; i < Major_GRID.length-2; i++) { // exclude last two boundaries; the cut line and legend text height.
    Minor_PLOT=[];
    Minor_PLOT.push([ mm*(Major_GRID[0][0]), mm*(Major_GRID[i][1]) ]);
    Minor_PLOT.push([ mm*(Major_GRID[3][0]), mm*(Major_GRID[i][1]) ]);
    fP = app.activeDocument.pathItems.add();
    fP.setEntirePath(Minor_PLOT);
    fP.filled=false;
    fP.stroked=true;
    fP.strokeColor=_fold_colour; //color
    fP.move(_fold_layout, ElementPlacement.PLACEATBEGINNING);
  }

  // [chop]; complete cutline including tapered glue tab.
  Minor_PLOT=[ // include only the rectangular cut outline, including the tapered tab.
    [ mm*Major_GRID[0][0], mm*Major_GRID[0][1] ],
    [ mm*Major_GRID[3][0], mm*Major_GRID[0][1] ],
    [ mm*Major_GRID[3][0], mm*Major_GRID[4][1] ],
    [ mm*Major_GRID[2][0], mm*Major_GRID[5][1] ],
    [ mm*Major_GRID[1][0], mm*Major_GRID[5][1] ],
    [ mm*Major_GRID[0][0], mm*Major_GRID[4][1] ],
    [ mm*Major_GRID[0][0], mm*Major_GRID[0][1] ],
  ];
  cP = app.activeDocument.pathItems.add();
  cP.setEntirePath(Minor_PLOT);
  cP.filled=false;
  cP.stroked=true;
  cP.strokeColor=_chop_colour; //color
  cP.move(_chop_layout, ElementPlacement.PLACEATBEGINNING);
  
  // [legend art]; these are the straight lines separating each item of legend text only.
  // start from very first cut line, all creasing in between, and the last cutline before the legend.
  // Arrows will come later. Anything beyond these lines and legend text is an embellishment which
  // I do not have the luxury to test for stability without offsite access to Adobe Illustrator.
  for (i = 0; i < Major_GRID.length-1; i++) { // exclude last two boundaries; the cut line and legend text height.
    Minor_PLOT=[];
    Minor_PLOT.push([ mm*(Major_GRID[3][0]+ 5), mm*(Major_GRID[i][1]) ]);
    Minor_PLOT.push([ mm*(Major_GRID[3][0]+75), mm*(Major_GRID[i][1]) ]);
    fP = app.activeDocument.pathItems.add();
    fP.setEntirePath(Minor_PLOT);
    fP.filled=false;
    fP.stroked=true;
    fP.strokeColor=_legend_colour; //color
    fP.move(_legend_layout, ElementPlacement.PLACEATBEGINNING);
  }

  //https://ai-scripting.docsforadobe.dev/jsobjref/TextFrameItems.html
  // [title text]; the mandatory design number and perhaps an optional finished knife number.
  Minor_PLOT=[];
  rR=[]; aT=[]; rR0=rR1=null; aT0=aT1=null;
  rR0 = doc.pathItems.rectangle(
    mm*(Major_GRID[5][1]),
    mm*(Major_GRID[3][0]+90),
    mm*(Major_GRID[3][0]+60), // 60 wide, not 150 absolute position
    mm*(Major_GRID[5][1]-Major_GRID[4][1]) );
  aT0 = doc.textFrames.areaText(rR0);
  aT0.contents = "asCCS_0000";
  aT0.textRange.characterAttributes.size=16;
  //aT0.selected = true;
  aT0.move(_text_layout, ElementPlacement.PLACEATBEGINNING);
  textAction( [aT0], _text_colour );

  i=1; // [legend text]; 5 mm right of dieline, 70mm wide.
  //for (i=1; i<=4; i++) {
    var rR1 = doc.pathItems.rectangle(
      mm*(Major_GRID[i][1]-4),
      mm*(Major_GRID[3][0]+5),
      mm*(Major_GRID[3][0]+75),
      mm*(Major_GRID[i][1]-Major_GRID[i-1][1]) );
    var aT1 = doc.textFrames.areaText(rR1);
    aT1.contents = (Major_GRID[i][1] - Major_GRID[i-1][1]) +"mm";
    //aT1.move(_legend_layout, ElementPlacement.PLACEATBEGINNING);
    //textAction( [aT1, ], _legend_colour );
    rR.push(rR1);
    aT.push(aT1);
  //}

  i++;
  var rR2 = doc.pathItems.rectangle(
    mm*(Major_GRID[i][1]-4),
    mm*(Major_GRID[3][0]+5),
    mm*(Major_GRID[3][0]+75),
    mm*(Major_GRID[i][1]-Major_GRID[i-1][1]) );
  var aT2 = doc.textFrames.areaText(rR2);
  aT2.contents = (Major_GRID[2][1] - Major_GRID[1][1]) +"mm";
  rR.push(rR2);
  aT.push(aT2);

  i++;
  var rR3 = doc.pathItems.rectangle(
    mm*(Major_GRID[i][1]-4),
    mm*(Major_GRID[3][0]+5),
    mm*(Major_GRID[3][0]+75),
    mm*(Major_GRID[i][1]-Major_GRID[i-1][1]) );
  var aT3 = doc.textFrames.areaText(rR3);
  aT3.contents = (Major_GRID[3][1] - Major_GRID[2][1]) +"mm";
  rR.push(rR3);
  aT.push(aT3);

  i++;
  var rR4 = doc.pathItems.rectangle(
    mm*(Major_GRID[i][1]-4),
    mm*(Major_GRID[3][0]+5),
    mm*(Major_GRID[3][0]+75),
    mm*(Major_GRID[i][1]-Major_GRID[i-1][1]) );
  var aT4 = doc.textFrames.areaText(rR4);
  aT4.contents = (Major_GRID[4][1] - Major_GRID[3][1]) +"mm";
  rR.push(rR4);
  aT.push(aT4);

  i++;
  var rR5 = doc.pathItems.rectangle(
    mm*(Major_GRID[i][1]-4),
    mm*(Major_GRID[3][0]+5),
    mm*(Major_GRID[3][0]+75),
    mm*(Major_GRID[i][1]-Major_GRID[i-1][1]) );
  var aT5 = doc.textFrames.areaText(rR5);
  aT5.contents = (Major_GRID[5][1] - Major_GRID[4][1]) +"mm";
  rR.push(rR5);
  aT.push(aT5);
  
  //https://ai-scripting.docsforadobe.dev/jsobjref/ParagraphStyles.html
  i++; // [legend text]; in line with dieline, as wide as dieline.
  var rR6 = doc.pathItems.rectangle(
    mm*(Major_GRID[i][1]),
    mm*(Major_GRID[0][0]),
    mm*(Major_GRID[3][0]-Major_GRID[0][0]),
    mm*(Major_GRID[i][1]-Major_GRID[i-1][1]) );
  var aT6 = doc.textFrames.areaText(rR6);
  aT6.contents = (Major_GRID[3][0] - Major_GRID[0][0]) +"mm";
  var aP6 = aT6.paragraphs[0].paragraphAttributes;
  aP6.justification = Justification.CENTER;
  rR.push(rR6);
  aT.push(aT6);

  aT0.move(_text_layout, ElementPlacement.PLACEATBEGINNING);
  textAction( [aT0], _text_colour );

  aT1.move(_legend_layout, ElementPlacement.PLACEATBEGINNING);
  aT2.move(_legend_layout, ElementPlacement.PLACEATBEGINNING);
  aT3.move(_legend_layout, ElementPlacement.PLACEATBEGINNING);
  aT4.move(_legend_layout, ElementPlacement.PLACEATBEGINNING);
  aT5.move(_legend_layout, ElementPlacement.PLACEATBEGINNING);
  aT6.move(_legend_layout, ElementPlacement.PLACEATBEGINNING);
  textAction( [aT1, aT2, aT3, aT4, aT5, aT6], _legend_colour );

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

function previewStart() {
    if (preview.value) {
        if (isUndo) app.undo();
            else isUndo = true;
        startAction();
        app.redraw();
    } else if (isUndo) {
        app.undo();
        app.redraw();
        isUndo = false;
    }
}

function saveSettings() {
  var
    $file = new File(settingFile.folder + settingFile.name),
    data = [
      vC.text,
      vX.text,
      vY.text,
      vL.text,
      vW.text,
      vH.text,
    ].toString();

  $file.open('w');
  $file.write(data);
  $file.close();
}

function loadSettings() {
  var $file = File(settingFile.folder + settingFile.name);
  if ($file.exists) {
    try {
      $file.open('r');
      var
        data = $file.read().split('\n'),
        $main = data[0].split(',');
      vC.text = $main[0];
      vX.text = $main[1];
      vY.text = $main[2];
      vL.text = $main[3];
      vW.text = $main[4];
      vH.text = $main[5];
    } catch (e) {}
    $file.close();
  }
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

function checkSettingFolder() {
  var $folder = new Folder(settingFile.folder);
  if (!$folder.exists) $folder.create();
}

checkSettingFolder();
loadSettings();

win0.center();
win0.show();

