import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

export default function renderWithRouter(component, route = '/') {
  const history = createMemoryHistory();
  history.push(route);
  return ({ ...render(

    <Router history={ history }>
      {component}
    </Router>,
  ),
  history });
}
