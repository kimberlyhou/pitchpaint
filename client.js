if (Meteor.isClient) {
    // Setup routing.
    Router.configure({
    	layoutTemplate: 'navbar'
    });

    Router.route('/', function () {
    	this.render('hello');
    });
    
    Router.route('/new', function (){
    	this.render('newDraw')
 	}); 
}