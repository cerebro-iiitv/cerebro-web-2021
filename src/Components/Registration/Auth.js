import axios from 'axios';
import React,{Component} from 'react';

class Auth extends Component {

  state= {
    Auth:false
  }


  insertGapiScript(){
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/platform.js'
    script.onload = () => {
      this.initializeGoogleSignin()
    }
    document.body.appendChild(script)
  }

  initializeGoogleSignin(){
    window.gapi.load('auth2', ()=>{
      window.gapi.auth2.init({
        client_id:'158321300884-hubsg7qr9frflo7ah3kkkurlvelooulj.apps.googleusercontent.com'
      })
      console.log('Api inited')

      const params = {
        onSuccess: (res) => {
          console.log(res.uc.access_token)
          axios.post('https://cerebro.pythonanywhere.com/account/googlelogin/', {'Token':res.uc.access_token})
          .then(res=>console.log(res))
        }
      }
      window.gapi.signin2.render('loginButton', params)
    })
  }

  componentDidMount(){
    console.log('Loading')
    this.insertGapiScript()
  }



  render(){
    return (
      <div id="loginButton"></div>
    );
  }
}

export default Auth;
