// let Router = require ('ampersand-router');

// module.exports = Router.extend({

//     routes: {
//         'view': 'showAll',
//         'details/:id': 'printDetailId',
//         'add': 'addChair',
//         '': 'showAll',
//     },

//     printDetailId: function (id) {
//         console.log(id);
//     },

//     showAll: function(){
//         console.log('show all');
//         this.views.group.el.classList.add('show');
//         this.views.add.el.classList.remove('show');
//     },

//     addChair: function(){
//         console.log('add chair');
//         this.views.group.el.classList.remove('show');
//         this.views.add.el.classList.add('show');
//     },

// });