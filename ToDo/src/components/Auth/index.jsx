import React, { useContext } from 'react';
import { LoginContext } from '../../Context/ Auth/index';
import { When } from 'react-if';


function Auth({ capability, children }) {
  const { loggedIn, can } = useContext(LoginContext);
  const okToRender = loggedIn && (capability ? can(capability) : true);

  return <When condition={okToRender}>{children}</When>;
}

export default Auth;
