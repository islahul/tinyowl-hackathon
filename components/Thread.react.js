/** @jsx React.DOM */

var React = require('react');

module.exports = Thread = React.createClass({
  render: function(){
    var thread = this.props.thread;
    return (
      <li className={"thread"}>        
        <blockquote>
          <cite>
            <a href={"/users/" + thread.uid}>{thread.user.name}</a> 
            <span className="screen-name">@{thread.user.name}</span> 
          </cite>
          <span className="content">{thread.body}</span>
        </blockquote>
      </li>
    )
  }
});