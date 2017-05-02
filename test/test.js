console.log("cheeses");
var expect    = require("chai").expect;
var file_exists = require("../client/lib/canvas_template.js");

// Ewan's Notes / Test starting point:

// Just for practice

describe("Color Converter", function() {
	it("converts rgb to hex", function() {
		var red = canvas_template.rgbToHex(255, 0, 0)
		var green = canvas_template.rgbToHex(0, 255, 0)
		var blue = canvas_template.rgbToHex(0, 0, 255)

		expect(redHex).to.equal("ff0000")
		expect(greenHex).to.equal("00ff00")
		expect(blueHex).to.equal("0000ff")
	});

});

// To unit test track extractor:
// 	-Unit test the converter from the canvas to generate a track
// 	-Can't exhaustively test because there are infinite possiblities
// 	-Test (8 cases in all):
// 		-empty canvas, full canvas, one line, intersecting lines, invalid 		
// 		files (negative values for RGB), one line around the boundary 		
// 		(or in the corners), two pitches playing at the same time  

describe("Track extractor", function() {
	it("recognizes emmpty canvas", function() {
		var empty = [
			["000000","000000"],
			["000000","000000"]
		];
		var empty_converted = play(empty)
		expect(empty_converted).to.equal("ff0000")
	});
	it("converts the edges", function() {
		var edges = [
			["ff0000", "000000", "ff0000"],
			["000000", "000000", "000000"],
			["ff0000", "000000", "ff0000"]
		];
		var edges_converted = play(edges)
		expect(edges_converted).to.equal("ff0000")

	});
	it("handles intersecting lines", function() {
		var intersection = [
			["000000", "ff0000", "000000"],
			["00ff00", "ff0000", "00ff00"],
			["000000", "ff0000", "000000"]
		];
		
		var intersection_converted = play(intersection)
		expect(intersection_converted).to.equal("ff0000")

	});
	it("converts full canvas and line properly", function() {
		var full_canvas = [
			["ff0000", "ff0000", "ff0000", "ff0000", "ff0000"],
			["ff0000", "ff0000", "ff0000", "ff0000", "ff0000"],
			["ff0000", "ff0000", "ff0000", "ff0000", "ff0000"],
			["ff0000", "ff0000", "ff0000", "ff0000", "ff0000"],
			["ff0000", "ff0000", "ff0000", "ff0000", "ff0000"]
		];
		var line = [
			["000000", "000000", "000000", "000000", "000000"],
			["000000", "000000", "000000", "000000", "000000"],
			["ff0000", "ff0000", "ff0000", "ff0000", "ff0000"],
			["000000", "000000", "000000", "000000", "000000"],
			["000000", "000000", "000000", "000000", "000000"]
		];
		
		var line_converted = play(line)
		var full_canvas_converted = play(full_canvas)
		expect(line_converted).to.equal("ff0000")
		expect(full_canvas_converted).to.equal("ff0000")
	});
});

// To unit test the renderer (takes "score" and output sounds):
// 	-Test cases:
// 		-empty track, track with one notes, track with two simultaneous 		notes,
// 	-How to test:
// Test Renderer()
// 	r = new Renderer()
// 	mockS = new MockSpeaker()
// 	r.setSpeaker(mockS)

// 	input = {red, ......}
// 	r.render(input)
// 	result = mockS.getCalls()
// 	assert(res = [G.......]



// What we need to change:
// 	-Renderer does not output sounds directly, rather it calls the sounds

// How to integration test:

// IntTest()
// te = newTE()
// r = new Renderer()
// ms = new MS()
// te.setR(r)
// r.setS(ms)

// te.extractor([..])
// res = ms.get()
// assert(GGGGGG)



