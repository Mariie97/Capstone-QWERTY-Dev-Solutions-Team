import React, {Component, createRef} from 'react';
import '../Layouts/ChatPage.css';
import {Box, CircularProgress} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import {getQueryParams, verifyUserAuth} from "../Utilities";
import {Link, Redirect} from "react-router-dom";
import RefreshIcon from '@material-ui/icons/Refresh';
import ErrorPage from './ErrorPage';


class MessagesContainer extends Component{
  currentUser = {
    id: parseInt(localStorage.getItem('user_id')),
    type: parseInt(localStorage.getItem('type'))
  };

  constructor(props) {
    super(props);
    this.state = {
      messagesRef: createRef(),
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
    return this.props.messages.map((message, index) => (
        <li
            key={`message-${index}`}
            className={`message ${message.sender_id===this.currentUser.id? "right": "left"} appeared`}
        >
          {message.sender_id!==this.currentUser.id &&
          <Link to={`profile/${message.sender_id}`}>
            <Avatar
                className='avatar'
                alt={`${message.sender_name} ${message.sender_last}`}
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
  receiverId = undefined;
  job_title = undefined;
  currentUser = {
    id: parseInt(localStorage.getItem('user_id')),
    type: parseInt(localStorage.getItem('type'))
  };

  constructor(props){
    super(props);
    this.queryParams = getQueryParams(props.queryParams);
    this.state = {
      is_auth: true,
      messages: [],
      current_message: '',
      refreshComplete: true,
      allowAccess: true,
      pageLoaded: false,
      pageNotFound: this.queryParams.get('job_id') === null
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addMessageBox = this.addMessageBox.bind(this);
    this.getChatMessages = this.getChatMessages.bind(this);
    this.verifyUserAccess = this.verifyUserAccess.bind(this);
  }

  getChatMessages() {
    fetch(`/retrieve_messages/${this.queryParams.get('job_id')}?user_id=${this.currentUser.id}`, {
      method: 'GET',
      headers: {
        'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
      }
    }).then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          this.setState({
            messages: data,
            refreshComplete: true,
          });
        })
      }
      this.setState({pageLoaded: true})
    })
  }

  async verifyUserAccess() {
    const response = await fetch(`/job_details/${this.queryParams.get('job_id')}`, {
      method:'GET',
      headers: {
        'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
      }
    })
    let data = undefined;
    if (response.status === 200) {
      data = await response.json();
      if (this.currentUser.id === data.owner_id || this.currentUser.id === data.student_id) {
        this.receiverId = this.currentUser.id === data.owner_id ? data.student_id : data.owner_id;
        this.job_title = data.title;
      }
      else {
        this.setState({allowAccess: false});
      }
    }
  }

  componentDidMount() {
    this.setState({
      is_auth: verifyUserAuth(this.props.cookies.get('csrf_access_token'))
    });
    this.verifyUserAccess().then(this.getChatMessages);
  }

  addMessageBox(enter=true){
    const {messages, current_message} = this.state;
    const newMsg = {
      content: current_message,
      sender_id: this.currentUser.id,
    };

    if (current_message && enter){
      fetch("/add_message", {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
        },
        body: JSON.stringify({
          job_id: this.queryParams.get('job_id'),
          sender_id: this.currentUser.id,
          receiver_id: this.receiverId,
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
    this.setState({current_message: event.target.value});
  }

  handleKeyPress(event) {
    let enter_pressed = false;
    if (event.key === "Enter"){
      enter_pressed = true;
    }
    this.addMessageBox(enter_pressed);
  }

  render() {
    const { is_auth, messages, current_message, refreshComplete, allowAccess, pageLoaded, pageNotFound } = this.state;
    return (
        <React.Fragment>
          {pageNotFound ?  <ErrorPage errorNumber="404" errorType="Page Not Found" inside/> :
            <div className='parent-container'>
              {!is_auth && <Redirect to='/' />}
              {!allowAccess ?  <ErrorPage errorNumber="403" errorType="Forbidden/Access Not Allowed" inside/>:
              <React.Fragment>
                {!pageLoaded ?
                    <div className='loading-icon'>
                      <Box sx={{display: 'flex'}}>
                        <CircularProgress />
                      </Box>
                    </div>
                    :
                    <React.Fragment>
                      <div className='header-flex-container'>
                        <div className="button-flex-container">
                          <Link to={`/job/${this.queryParams.get('job_id')}`}
                                className='custom-buttons'
                                id="view-job-button">
                            View Job
                          </Link>
                        </div>
                        <h1 className="page-title-header">Chat: {this.job_title} </h1>
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
                              <div>
                                <CircularProgress style={{fill: 'white'}}/>
                              </div> :
                              <RefreshIcon
                                  className='refresh-msg-icon'
                                  onClick={() => {
                                    this.setState({refreshComplete: false});
                                    this.getChatMessages();
                                  }}
                              />
                          }
                        </div>
                      </div>
                    </React.Fragment>}
                </React.Fragment>
              }
            </div>
          }
        </React.Fragment>
    );
  }
}

export default ChatApp;