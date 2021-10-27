import React, {Component, createRef} from 'react';
import '../Layouts/ChatPage.css';
import {CircularProgress} from "@material-ui/core";
import Avatar from '@mui/material/Avatar';
import {current_user} from "../Utilities";
import {Link} from "react-router-dom";
import RefreshIcon from '@material-ui/icons/Refresh';


class MessagesContainer extends Component{

  constructor(props) {
    super(props);
    this.state = {
      messagesRef: createRef()
    };

    this.addMessages = this.addMessages.bind(this);
  }

  scrollToBottom = () => {
    const {messagesRef} = this.state;
    if (messagesRef.current !== undefined)
      messagesRef.current.scrollTop = messagesRef.current?.scrollHeight;
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  addMessages(){
    return this.props.messages.map((message) => (
        <li className={`message ${message.sender_id===current_user.id? "right": "left"} appeared`}>
          {message.sender_id!==current_user.id &&
          <Link to={`profile/${message.sender_id}`}>
            <Avatar
                className='avatar'
                alt="Remy Sharp"
                src={message.sender_image}
            />
          </Link>
          }
          <div className="text_wrapper">
            <div className="text">{message.content}</div>
          </div>
        </li>
    ));
  }

  render(){
    const {messagesRef} = this.state;
    return(
        <ul className="messages" ref={messagesRef}>
          {this.addMessages()}
        </ul>
    );
  }
}


class ChatApp extends Component {
  queryParams = undefined;
  receiver_id = undefined;

  constructor(props){
    super(props);
    this.state = {
      'messages': [],
      'current_message': '',
      'refreshComplete': true,
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addMessageBox = this.addMessageBox.bind(this);
    this.getChatMessages = this.getChatMessages.bind(this);
  }

  getChatMessages() {
    fetch(`/retrieve_messages/${this.queryParams.get('job_id')}?user_id=${current_user.id}`, {
      method: 'GET'
    }).then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          this.setState({
            messages: data,
            refreshComplete: true,
          });
          this.receiver_id = data[0].sender_id===current_user.id ? data[0].receiver_id : data[0].sender_id;
        })
      }
    })

  }

  componentDidMount() {
    this.queryParams = this.getQueryParams();
    this.getChatMessages();
  }

  addMessageBox(enter=true){
    const {messages, current_message} = this.state;
    const newMsg = {
      content: current_message,
      sender_id: current_user.id,
    };

    if( current_message && enter){
      fetch("/add_message", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
        },
        body: JSON.stringify({
          job_id: this.queryParams.get('job_id'),
          sender_id: current_user.id,
          receiver_id: this.receiver_id,
          content: current_message
        })
      }).then(response => {
        if (response.status === 201){
          this.setState({
            messages: [...messages, newMsg],
            current_message: ''
          })}})
    }
  }

  onChange(event) {
    this.setState({
      current_message: event.target.value
    });
  }

  handleKeyPress(event) {
    let enter_pressed = false;
    if(event.key === "Enter"){
      enter_pressed = true;
    }
    this.addMessageBox(enter_pressed);
  }

  getQueryParams() {
    return new URLSearchParams(this.props.queryParams);
  }

  render() {
    const {messages, current_message, refreshComplete} = this.state;
    return (
        <div className='parent-container'>
          <div className='header-flex-container'>
            <Link to={`/job/${this.queryParams?.get('job_id')}`}
                  className='header-button button'
                  id="view-job-button">View Job
            </Link>
            <h1 className="page-header">Chat: {this.queryParams?.get('title')} </h1>

          </div>
          <div className='chat-flex-container'>
            <div className="chat-window">
              <MessagesContainer messages={messages} />
              <div className="bottom_wrapper clearfix">
                <div className="message_input_wrapper">
                  <input
                      id="msg_input"
                      className="message_input"
                      placeholder="Type your messages here..."
                      value={current_message}
                      onChange={this.onChange}
                      onKeyPress={this.handleKeyPress}/>
                </div>
                <button className="send_message" onClick={this.addMessageBox}>Send</button>
              </div>
            </div>
            <div className='refresh-message-container'>
              {!refreshComplete ?
                  <div className='refresh-msg-icon'>
                    <CircularProgress style={{fill: 'white'}}/>
                  </div> :
                  <RefreshIcon
                      className='refresh-msg-icon'
                      style={{fill: 'white', fontSize: '100px'}}
                      onClick={() => {
                        this.setState({refreshComplete: false});
                        this.getChatMessages();
                      }}
                  />
              }
            </div>
          </div>
        </div>
    );
  }
}

export default ChatApp;