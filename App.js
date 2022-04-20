import 'react-native-gesture-handler';
import React from 'react';
import { AuthProvider } from './app/src/authentication/AuthProvider';
import Routes from './app/src/views/Routes';

const App = () => {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
};

export default App;
