
Template.showAll.rendered = function () {
// console.log(window.location.pathname);
//background-color: #FF856F

};

Template.showAll.helpers({
  sketchLinks(){
  	  var finalSketches = [];
  	  Meteor.call('sketches.find', function(err, result) {
  	  	console.log(result);
		for (var i=0; i< result.length; i++){
		  	finalSketches.push({
		  		'title': result[i].title,
		  		'savedAt': result[i].createdAt,
		  	});
		}
  	  });
      //onst found = Sketches.findOne({_id: 'hbdYoFCEehAcK8rzs'});

  	  //because call is async returns before finished loading
  	   //console.log(finalSketches);
	     return finalSketches;
//return found;
}



});
