// User accounts setup
    AccountsTemplates.configure({
        //showForgotPasswordLink: true,
        defaultLayout: 'layout',
        defaultLayoutRegions: {},
        defaultContentRegion: 'main',
        negativeValidation: true,
        positiveValidation: true,
        negativeFeedback: false,
        positiveFeedback: true,
    });

AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');