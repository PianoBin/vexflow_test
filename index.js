VF = Vex.Flow;
var context;

var notes = [
    // A quarter-note C.
    new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "q" }),
  
    // A quarter-note D.
    new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
  
    // A quarter-note rest. Note that the key (b/4) specifies the vertical
    // position of the rest.
    new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
  
    // A C-Major chord.
    new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })
];

var notes2 = [
    new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "w" })
];

// Create a voice in 4/4 and add above notes
var voices = [
	new VF.Voice({num_beats: 4,  beat_value: 4}).addTickables(notes),
    new VF.Voice({num_beats: 4,  beat_value: 4}).addTickables(notes2)
];

function startup() {
    // Create an SVG renderer and attach it to the DIV element named "boo".
    var div = document.getElementById("boo")
    var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    // Configure the rendering context.
    renderer.resize(500, 500);
    context = renderer.getContext();
}

function styleStaff() {
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
}

function simpleStaff() {
    // Create a stave of width 400 at position 10, 40 on the canvas.
    var stave = new VF.Stave(10, 40, 400);
    // Add a clef and time signature.
    stave.addClef("treble").addTimeSignature("4/4");
    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();
    return stave;
}

function addNotes(stave, voices) {
    // Format and justify the notes to 400 pixels.
    var formatter = new VF.Formatter().joinVoices(voices).format(voices, 400);
    // Render voices
    voices.forEach(function(v) { v.draw(context, stave); })
}

startup();
styleStaff();
stave = simpleStaff();
addNotes(stave, voices);