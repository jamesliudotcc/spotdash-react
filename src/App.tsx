import React from 'react';

import 'typeface-roboto';
import './App.css';

import SimpleAppBar from './SimpleAppBar';
import { Main } from './Main';

const App: React.FC = () => {
  return (
    <div>
      <SimpleAppBar />
      <Main />
    </div>
  );
};

export default App;
