console.log("cheeses");

// Ewan's Notes / Test starting point:

// To unit test track extractor:
// 	-Unit test the converter from the canvas to generate a track
// 	-Can't exhaustively test because there are infinite possiblities
// 	-Test (8 cases in all):
// 		-empty canvas, full canvas, one line, intersecting lines, invalid 		
// 		files (negative values for RGB), one line around the boundary 		
// 		(or in the corners), two pitches playing at the same time  

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



