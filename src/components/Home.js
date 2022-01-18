import React from 'react';
import AccountBalance from './AccountBalance';
import { Link } from 'react-router-dom';
import LogIn from './LogIn';

function Home(props) {
  
    return (
        <>
        <div className='container'>
          <div className='text-center'>
          <img src="https://res.cloudinary.com/andreahabib/image/upload/v1642026304/React_Bank_dk7n1a.png" style={{width: "300px"}} alt="bank"/>
          <h1>Bank of React</h1>
          {/* <Link to="/userProfile">User Profile</Link> */}
          <AccountBalance accountBalance={props.accountBalance}/>
          <LogIn />
          
          </div>
          </div>
        </>
    );
  }

export default Home;