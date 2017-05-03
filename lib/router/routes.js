
    // Setup routing.
    FlowRouter.route('/', {
    	name: 'homeScreen',
    	action: function() {
        
        if (Meteor.isCordova) {

    		  BlazeLayout.render('mobileLayout', { main: 'mobileIndex'});
        } else if (Meteor.isClient) {
          BlazeLayout.render('layout', { main: 'index'});
        }
        
    	}
    });

    FlowRouter.route('/newCanvas', {
      name: 'newCanvas',
      triggersEnter: [AccountsTemplates.ensureSignedIn],
	    action: function(params, queryParams) {
        
        if (Meteor.isCordova) {

	         BlazeLayout.render('mobileLayout', { main: 'canvas_template' });
        } else if (Meteor.isClient) {
           BlazeLayout.render('layout', { main: 'canvas_template'});
        }
        
	    }
	  });


    FlowRouter.route('/all', {
      name: 'showAll',
      action: function() {
        
        if (Meteor.isCordova) {

          BlazeLayout.render('mobileLayout', { main: 'showAll'});
        } else if (Meteor.isClient) {
          BlazeLayout.render('layout', { main: 'showAll'});
        }
        
      }
    });


    FlowRouter.notFound = {
        action: function() {
          BlazeLayout.render('layout', {
          main: "pageNotFound",
          });
        }
     };



   


