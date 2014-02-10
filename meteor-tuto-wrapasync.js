if (Meteor.isClient) {
  Template.tuto.helpers({
    getResult: function() {
      return Session.get('result');
    }
  });
  
  Template.tuto.events({
    'click button' : function() {
      Meteor.call('sayHello', document.querySelector('#btn-name').value, function(err, res) {
        if (err) {
          console.log('erreur', err);
          return;
        }
        Session.set('result', res);
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    var callMeLaterAsync = function(name, cb) {
      setTimeout(function() {
        if (name) {
          cb && cb(null, 'Hello ' + name);
        } else {
          cb && cb('name is mandatory');
        }
      }, 4000);
    };
    
    Meteor.methods({
      sayHello: function(name) {
        var callMeLaterSync = Meteor._wrapAsync(callMeLaterAsync),
            result;
        try {
          callMeLaterSync(name);
          
          console.log(result);
          return result;
        } catch (e) {
          console.log('erreur', e.message);
          throw new Meteor.Error(500, e);
        }
      }
    });
  });

}
