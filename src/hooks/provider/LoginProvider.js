import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import LoginContext from '../context/LoginContext';

export default function LoginProvider({ children }) {
  const [emailUser, setEmailUser] = useState('');
  const [password, setPassword] = useState('');

  const value = useMemo(() => ({
    emailUser,
    setEmailUser,
    password,
    setPassword,

  }), [emailUser, password]);

  return (
    <LoginContext.Provider value={ value }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
