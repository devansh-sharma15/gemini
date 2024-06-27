import React from 'react';
import Sidebar from './components/sidebar/sidebar'; // Assuming default export in sidebar.js
import Main from './components/main/Main';

const App = () => {
  return (
    <>
      <Sidebar /> {/* Use the correct import syntax */}
      <Main/>
    </>
  );
};

export default App;
