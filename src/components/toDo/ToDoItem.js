import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ToDoItem extends Component {

	divStyle = () => {
		return {
			display: 'flex',
			background: '#f4f4f4',
			padding: '1%',
			borderBottom: '1px #ccc dotted',
			textDecorationLine: this.props.task.state ? 'line-through' : 'none',
			flexDirection: 'row',
			flex: 0,
			justifyContent: 'space-between',
			alignItems: 'center'
		}
	}



	render() {
		const { _id, title, state } = this.props.task;

		return (
			<div style={this.divStyle()}>

			{/* LAZY LOAD 
        		<p>{this.state.tasks.length > 0 && this.state.tasks[0].title}</p>
			*/}
			<input type="checkbox" checked={state} onChange={this.props.toggleStatus.bind(this, _id)} />
			<p>{title}</p>
			<button style={btnStyle} onClick={this.props.delete.bind(this, _id)}>X</button>
 
			</div>
		)
	}

}

const btnStyle = {
	background: '#ff0000',
	color: 'white',
	border: 'none',
	padding: '1% 2%',
	borderRadius: '50%',
	cursor: 'pointer',
	float: 'right'
}

ToDoItem.propTypes = {
	task: PropTypes.object.isRequired,
	delete: PropTypes.func
}

export default ToDoItem;