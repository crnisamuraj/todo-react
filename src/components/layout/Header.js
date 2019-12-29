import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import logo from '../../logo.svg';

export default function Header() {
	return(
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h1 className="Header-title">ToDoList</h1>
			<Link to="/" >Home</Link>
			<Link to="/about" >About</Link>
		</header>
	)
}