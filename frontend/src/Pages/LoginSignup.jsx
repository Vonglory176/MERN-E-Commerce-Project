import React from 'react'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
        <div className='loginsignup-container'>
            <h1>Sign Up</h1>
            <div className="loginsignup-fields">
              <input type="text" placeholder='Your Name' />
              <input type="email" placeholder='Email Address' />
              <input type="password" placeholder='Password' />
            </div>
            <button>Continue</button>
            <p className='loginsignup-login'>Already have an account? <span>Login here</span></p>
            <div className="loginsignup-agree">
              <input type="checkbox" name='' id='' />
              <p>By continuing, you agree to our <span>Terms of Service</span> and <span>Privacy Policy</span></p>
            </div>
        </div>
    </div>
  )
}

export default LoginSignup
