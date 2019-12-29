import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem';
import './ToDo.css';

export class ToDos extends Component {

	render() {

		return (
			<div className="ToDos">
				{[...this.props.tasks].reverse().map((task) => (
					<ToDoItem key={ task._id } task={task} toggleStatus={this.props.toggleStatus} delete={this.props.delete}/>
        		))}
			</div>
		)
	}

}

ToDos.propTypes = {
	tasks: PropTypes.array.isRequired
}

export default ToDos;