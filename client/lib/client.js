if (Meteor.isClient) {
    // Setup routing.
    FlowRouter.route('/', {
    	name: 'homeScreen',
    	action: function() {
    		BlazeLayout.render('layout', { main: 'index'});
    	}
    });

    FlowRouter.route('/newCanvas', {
      name: 'newCanvas',
	  action: function() {
	    BlazeLayout.render('layout', { main: 'canvas_template' });
	  }
	});
    
}