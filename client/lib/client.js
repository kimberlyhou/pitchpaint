if (Meteor.isClient) {
    // Setup routing.
    FlowRouter.route('/', {
    	action: function() {
    		BlazeLayout.render('navigationBar', { main: 'home'});
    	}
    });
    
}