
    // Setup routing.
    FlowRouter.route('/', {
    	name: 'homeScreen',
    	action: function() {
    		BlazeLayout.render('layout', { main: 'index'});
    	}
    });

    FlowRouter.route('/newCanvas', {
      name: 'newCanvas',
      triggersEnter: [AccountsTemplates.ensureSignedIn],
	    action: function(params, queryParams) {
	      BlazeLayout.render('layout', { main: 'canvas_template' });
	    }
	  });


    FlowRouter.notFound = {
        action: function() {
          BlazeLayout.render('layout', {
          main: "pageNotFound",
          });
        }
     };



   


