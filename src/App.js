import React, { Component } from 'react';
import './App.css';
import InputField from './components/InputField';
import ErrorBoundary from './components/ErrorBoundary';
class App extends Component {
  render() {
    return (
      <div className="App">
        <ErrorBoundary> <InputField/></ErrorBoundary>
      </div>
    );
  }
}

export default App;
