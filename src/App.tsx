import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';

import Compose from './context/compose';
import { AppRoutes } from './constants/routes';


export default function App () {

  return (
      <Compose components={[]}>
          <Router>
              <AppRoutes />
          </Router>
      </Compose>
  );
};
