import React from 'react';

import './signin-signup.styles.scss';

import Signin from '../../components/signin/signin.component';
import Signup from '../../components/signup/signup.component';

const SigninSignup = () => (
  <div className="signin-signup">
    <Signin></Signin>
    <Signup></Signup>
  </div>
);

export default SigninSignup;
