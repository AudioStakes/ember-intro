App = Ember.Application.create();

App.Router.map(function() {
    this.resource('posts', function() {
      this.route('show', {path: '/:post_id'});
    });
  });

  App.Router.reopen({
    location: 'none'
  });
  
  // Route 定義
  
  App.PostsRoute = Ember.Route.extend({
    model: function() {
        return $.getJSON('http://emberjs.jsbin.com/goqene/2.json');
        },
    actions: {
        error: function(jqXHR) {
          if (jqXHR.status === 404) {
            this.transitionTo('not_found');
          } else {
            this.transitionTo('something_went_wrong');
          }
        }
    }
  });
  
  App.PostsShowRoute = Ember.Route.extend({
    model: function(params) {
      var id = Number(params.post_id);
      var posts = this.modelFor('posts');
  
      return posts.filter(function(post) {
        return post.id === id;
      })[0];
    }
  });

  App.LoadingRoute = Ember.Route.extend({
    activate: function() {
      console.log('読み込み中です');
    }
  });

  App.ErrorRoute = Ember.Route.extend({
    activate: function() {
      console.log('エラーです');
    }
  });