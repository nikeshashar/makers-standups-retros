import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios'

class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicks: 0
    };
    this.updatePlusClick = this.updatePlusClick.bind(this);
    this.notifyServer = this.notifyServer.bind(this);
    this.axiosGet = this.axiosGet.bind(this);
  }

  componentDidMount(){
    var _this = this
    this.socket = io('/');
    this.socket.on('update counter', data => {
      if (data.item === this.props.id) this.updatePlusClick(this.state.clicks);
    });
    this.axiosGet();
    let items = document.getElementsByClassName(this.props.userId)
    for(let i = 0; i < items.length; i += 1){
      items[i].style.color = this.props.color;
      items[i].style.fontFamily = this.props.font;
    }
    // console.log(document.getElementsByClassName(this.props.userId)[0]);
  };

  axiosGet() {
    var _this = this
    axios.get('/items').then(res =>{
      res.data.forEach(function(item){
        if (item.itemId === _this.props.id) _this.updatePlusClick(item.clicks)
      })
    });
  }

  notifyServer(){
    this.socket.emit('counter event', { item: this.props.id });
    this.updatePlusClick(this.state.clicks);
    let clicks = {itemId: this.props.id, clicks: this.state.clicks}
    axios.post('/items',clicks )
  };

  updatePlusClick(event) {
    this.setState({
      clicks: event + 1
    })
  }

  render() {
    let image = <img src="/images/plus.png" onClick={this.notifyServer.bind(this)} alt="Plus" height="20" width="20"/>
    if (this.props.search === "yes") {
      let searchQuery = this.props.text.split(" ").join("+")
      let searchURL = "http://stackoverflow.com/search?q=" + searchQuery
      let searchLink = <a href={ searchURL } target="_blank"><img src="/images/so-icon.png" alt="SOSearch" height="20" width="20"/></a>
      return <li className={"item " + this.props.userId} >{this.props.text}{image}{this.state.clicks}{searchLink}</li>
    } else {
      return <li className={"item " + this.props.userId} >{this.props.text}{image}{this.state.clicks}</li>
    }
  }
};

export default Item;
