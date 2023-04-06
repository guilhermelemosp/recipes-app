import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SearchBarProvider from '../../hooks/provider/SearchBarProvider';
import LoginProvider from '../../hooks/provider/LoginProvider';

export default function renderWithRouter(component, route = '/') {
  const history = createMemoryHistory();
  history.push(route);
  return ({ ...render(

    <Router history={ history }>
      <SearchBarProvider>
        <LoginProvider>
          {component}
        </LoginProvider>
      </SearchBarProvider>
    </Router>,
  ),
  history });
}
