import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Filters from './components/Filters';
import PropertyGrid from './components/PropertyGrid';
import AuthModal from './components/AuthModal';

const AppContent: React.FC = () => {
  const { state } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Filters />
      <PropertyGrid />
      
      {state.isAuthModalOpen && <AuthModal />}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;