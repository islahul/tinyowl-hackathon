/** @jsx React.DOM */

var React = require('react');
var Thread = require('./Thread.react.js');

module.exports = Threads = React.createClass({
  handleChange: function(event) {
    this.setState({
      new_thread: {
        body: event.target.value
      }
    });
  },

  postNewThread: function() {    
    // Setup our ajax request
    var request = new XMLHttpRequest(), self = this;
    
    request.open('POST', 'page/' + page + "/" + this.state.skip, true);
    
    request.onload = function() {
      // If everything is cool...
      if (request.status >= 200 && request.status < 400){
        // Load our next page
        self.loadPagedThreads(JSON.parse(request.responseText));
      } 
      else {
        // Set application state (Not paging, paging complete)
        self.setState({
          paging: false, 
          done: true
        });
      }
    };

    // Fire!
    request.send();
  },

  // Render our threads
  render: function() {
    // Build list items of single tweet components using map
    var content = this.props.threads.map(function(thread) {
      return (
        <Thread key={thread._id} thread={thread} />
      )
    });

    // Return ul filled with our mapped threads
    return (      
      <input type="text" value={value} onChange={this.handleNewThreadChange} />
      <button onClick={this.postNewThread}>Submit</button>
      <ul className="threads">{content}</ul>
    )
  }

}); 