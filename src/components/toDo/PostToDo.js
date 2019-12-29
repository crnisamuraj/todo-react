import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ToDo.css';

export class PostToDo extends Component {

	render() {
		return (
			<div className="Form-container" >
				<form className="Form" onSubmit={this.props.submit}>
          			<input
					  	className="Input-text"
            			type="text"
						name="title"
						placeholder="Add ToDo..."
            			value={this.props.post}
            			onChange={this.props.update}
          			/>
        			<input className="Submit btn" type="submit" value="Add" />
				</form>

			</div>
		)
	}

}

PostToDo.propTypes = {
	tasks: PropTypes.array.isRequired,
	res: PropTypes.object,
	submit: PropTypes.func,
	update: PropTypes.func
}

export default PostToDo;