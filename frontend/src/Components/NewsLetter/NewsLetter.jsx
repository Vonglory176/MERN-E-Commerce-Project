import React from 'react'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Get Exclusive Offers In Your Email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div>
            <input type="email" placeholder='Enter Your Email' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter
