import React from 'react';
import './custom-button.styles.scss';

export const CustomButton = ({
  children,
  isGoogleSignin,
  inverted,
  ...otherProps
}) => (
  <button
    className={`${inverted ? 'inverted' : ''} ${
      isGoogleSignin ? 'google-signin' : ''
    } custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);
