import React from 'react'
import { Link } from 'react-router-dom'
import mainlayout from '../layouts/mainlayout'

function Homepage() {
  return (
    <mainlayout>
       <div className='bg-light p-5 mt-4 rounded-3'>
            <h1>Welcome to the POS for Small Business</h1>
            <p>A Point of Sale (POS) system is a combination of hardware and software that enables businesses to process transactions, manage inventory, and track customer data at the point of sale. It is an essential tool for retailers, restaurants, and other businesses that accept payments from customer</p>
            <p>if you have any issue occour during the order please contact whth us</p>
            <Link to='/pos' className='btn btn-primary'>Click here to sell product</Link>
          </div>
    </mainlayout>
  )
}

export default Homepage
