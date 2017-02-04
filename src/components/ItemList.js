import React, { Component } from 'react';
import Item from './Item';
import io  from 'socket.io-client';
import axios from 'axios'

class ItemList extends Component {
	constructor(props) {
		super(props);
		this.state = { data: [{text: "I am the first item"}, {text: "I am the second item"}] };
		this.notifyServer = this.notifyServer.bind(this);
		this.updateList = this.updateList.bind(this);
	}

	componentDidMount () {
		this.socket = io('/');
		this.socket.on('update list', data => {
			if (data.itemList === this.props.id) {
				this.updateList(data.text);
			}
		});
	}

	notifyServer(event) {
		axios.post('/items').then(res => {
			this.setState({
				data: this.state.data.concat({text: res.data.text})
			})
		})
		event.preventDefault();
		let comment = this.refs.comment.value;
		this.socket.emit('comment event', {itemList: this.props.id, text: comment});
		this.updateList(comment);
	}

	updateList(newItem){
		this.setState({
			data: this.state.data.concat({text: newItem})
		});
		this.refs.comment.value = "";
	}

	render() {
		let items = this.state.data.map((item, index) => {
			return (
				<Item id={this.props.id + String(index)} text={item.text} key={index}>
					{ item.text }
				</Item>
			)
		})
		return (
			<div>
				<ul className="list">
					{ items }
				</ul>
				<div>
					<form onSubmit={this.notifyServer.bind(this)}>
					<input type="text" ref="comment" />
					<input type="submit" value="Add" />
					</form>
				</div>
			</div>
		);
	}
}

export default ItemList;
