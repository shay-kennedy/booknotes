import React from 'react';


const Login = () => {
	return (
		<div id="login">
			<h1>Booknotes</h1>
			<p>Bookmarks with notes.</p>
			<a href="/auth/google"><input className="login" type="button" value="Log In" /></a>
		</div>
	)
};


export default Login;