import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar_style.scss'
import 'font-awesome/css/font-awesome.min.css';
import { GoogleLogin } from "react-google-login";
import axios from 'axios';
import Cookies from 'js-cookie';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drawerOut: false,
			open: false,
			user_id:null,
			imageUrl:'',
			accessToken: Cookies.get("accessToken")
		};
	}
	onOpenModal = () => {
		this.setState({ open: true });
	};

	onCloseModal = () => {
		this.setState({
			open: false,
		});
	};

	showDrawer = () => {
		this.setState({
			drawerOut: true
		});

		try {
			document.getElementById('user-profile-main').style.zIndex = -1;
			document.getElementById('social-icons').style.zIndex = -1;
		} catch { }
	};

	hideDrawer = () => {
		this.setState({
			drawerOut: false
		});
		try {
			document.getElementById('user-profile-main').style.zIndex = 0;
			document.getElementById('social-icons').style.zIndex = 2000;
		} catch { }
	};

	componentDidMount() {
		// console.log('Loading')
		const token = Cookies.get("accessToken");
		const user = JSON.parse(localStorage.getItem('user'));
		if (token && user) {
			this.setState({
				user_id:user.user_id,
				imageUrl:user.imageUrl
			})
		} else {
		  Cookies.set('accessToken', null);
		}
	  }

	componentDidUpdate() {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}

	responseGoogle = async (res) => {
		console.log(res);
		try {
		  // Storing accessToken as a cookie
		  Cookies.set('accessToken', res.uc.access_token)
	
		  // Post access token to get user_id
		  let result = await axios.post('https://cerebro.pythonanywhere.com/account/googlelogin/', { 'Token': res.uc.access_token });
		  console.log(result.data.user_id)
		  const user = {
			user_id: result.data.user_id,
			firstName: res.profileObj.givenName,
			lastName: res.profileObj.familyName,
			email: res.profileObj.email,
			mobile_number: '',
			imageUrl: res.profileObj.imageUrl
		  };
	
		  // updating values in localstorage
		  localStorage.setItem('user', JSON.stringify(user));
	
		  // Updating values in state
		  this.setState({
			user_id:user.user_id,
			imageUrl:user.imageUrl
		  })
		} catch (e) {
		  console.log(e)
		}
	  }

	render() {
		return (
			<div id="hamburger-container">
				<nav id='navbar-container' >
					<div id="drawer-button" className="container">
						<img src="media/menu.svg" alt="Open menu" onClick={this.showDrawer} />
					</div>

					<div
						id="black-background"
						className={this.state.drawerOut ? 'black-background-visible' : null}
						onClick={this.hideDrawer}
					/>

					<div id="drawer" className={this.state.drawerOut ? 'drawer-visible' : null}>
						<NavLink className="list_element" onClick={this.hideDrawer} exact to="/">
							<i className="fa fa-home"></i>
							<span className="elements">home</span>
						</NavLink>
						<NavLink className="list_element" onClick={this.hideDrawer} to="/events">
							<i className="fa fa-calendar"></i>
							<span className="elements">EVENTS</span>
						</NavLink>
						<NavLink className="list_element" onClick={this.hideDrawer} to="/team">
							<i className="fa fa-users"></i>
							<span className="elements">TEAM</span>
						</NavLink>
						<NavLink className="list_element" onClick={this.hideDrawer} to="/timeline">
							<i className="fa fa-hourglass-half"></i>
							<span className="elements">TIMELINE</span>
						</NavLink>

						<a className="list_element" onClick={this.hideDrawer} href="https://yashshah2820.pythonanywhere.com/media/pdfs/cerebro-brochure.pdf">
							<i className="fa fa-info"></i>
							<span className="elements">BROCHURE</span>
						</a>
						{
							this.state.user_id ?
							<NavLink className="list_element" onClick={this.hideDrawer} to="/user-dashboard">
								<img src = {this.state.imageUrl} alt="profile_img" className="loginImg" />
								<span className="elements">DASHBOARD</span>
							</NavLink>
							: 
							<GoogleLogin
								clientId="158321300884-hubsg7qr9frflo7ah3kkkurlvelooulj.apps.googleusercontent.com"
								render={renderProps => (
								<button onClick={renderProps.onClick} disabled={renderProps.disabled} className="loginBtn">
									SIGNIN
								</button>
								)}
								onSuccess={this.responseGoogle}
								onFailure={this.responseGoogle}
								cookiePolicy={'single_host_origin'}
              				/>
						}
					</div>
				</nav>
			</div>
		);
	}
}
export default Navbar;