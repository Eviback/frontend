import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ApplicationSuccess from './pages/ApplicationSuccess';
import ApplicationsAdmin from './pages/ApplicationsAdmin';
import ApplicationDetail from './pages/ApplicationDetail';
import TestScoring from './pages/TestScoring';




function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="min-h-screen bg-gray-50 py-10 px-4">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/success/:id" element={<ApplicationSuccess />} />
              <Route path="/admin" element={<ApplicationsAdmin />} />
              <Route path="/admin/applications/:id" element={<ApplicationDetail />} />
              <Route path="/test-scoring" element={<TestScoring />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;