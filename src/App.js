import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './components/toDo/ToDoItem';
import ToDos from './components/toDo/ToDos';
import PostToDo from './components/toDo/PostToDo';
import Header from './components/layout/Header';
import About from './components/about/About';


class App extends Component {

	state = {
		post: '',
		responseToPost: '',
		tasks: []
	};

	componentDidMount() {
			this.getTasks();
	}

	getTasks = async () => {
		try {
			const res = await fetch('/api/task');
			const body = await res.json();

			if (res.status !== 200) throw Error(res.message);

			this.setState({ tasks: body });
			
		} catch (err) {
			throw Error(err.message);
		}
	};

	onSubmit = async e => {
		e.preventDefault();
		const response = await fetch ('/api/task',{
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title: this.state.post })
		});
		const body = await response.text();
		const obj = JSON.parse(body);
	
		if(response.status === 201){
			this.setState({responseToPost: obj.title});
			
			this.setState({ tasks: [...this.state.tasks, obj] });
			
			this.setState({post: ''});
	
		};
	};
	
	onChange = async e => this.setState({ post: e.target.value });

	toggleStatus = async (id) => {

		let oldState;
		this.setState({ tasks: [...this.state.tasks.map(task => {
			if(task._id === id) {
				oldState = task.state;
				task.state = !task.state;

			}
			return task;
		})] });
		const response = await fetch(`/api/task/state/${id}`, {
			method: 'PATCH'
		});
		if (response.status !== 200) {
			this.setState({ tasks: [...this.state.tasks.map(task => {
				if(task._id === id) {
					task.state = oldState;
				}
				return task;
			})] });
		}
	}

	deleteTask = async (id) => {
		let oldState = this.state.tasks;
		this.setState({ tasks: [...this.state.tasks.filter(task => task._id !== id)] });
		const response = await fetch(`/api/task/${id}`, {
			method: 'DELETE'
		});
		if (response.status !== 200){
			this.setState({ tasks: oldState });
			console.log(`couldn't delete item with id: ${id}. Error message: ${response.body}`);
		}
		console.log(`deleted item with id: ${id}`);
	}

	render() {
		return (
			<Router>
				<div className="App">

					<Header />
					
					<Route exact path="/" render={props => (
						<React.Fragment>
							<PostToDo tasks={this.state.tasks} res={this.responseToPost} submit={this.onSubmit} update={this.onChange} post={this.state.post}/>
							<ToDos tasks={this.state.tasks} toggleStatus={this.toggleStatus} delete={this.deleteTask}/>
						</React.Fragment>
					)} />

					<Route path="/about" component={About} />

			 
				</div>
			</Router>
		);
	}
}

export default App;