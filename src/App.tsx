import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ApplicationSuccess from './pages/ApplicationSuccess';
import ApplicationsAdmin from './pages/ApplicationsAdmin';
import ApplicationDetail from './pages/ApplicationDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/success/:id" element={<ApplicationSuccess />} />
            {/* Остальные страницы добавим позже */}
            <Route path="/admin" element={<ApplicationsAdmin />} />
            <Route path="/admin/applications/:id" element={<ApplicationDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;