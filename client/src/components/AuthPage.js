import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Link from '@material-ui/core/Link';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? (
        <LoginForm />
      ) : (
        <RegisterForm />
      )}
      <Link
        component="button"
        variant="body2"
        onClick={handleSwitchForm}
        style={{ marginTop: 10 }}
      >
        {isLogin ? 'Click here to register' : 'Click here to login'}
      </Link>
    </div>
  );
};

export default AuthPage;
