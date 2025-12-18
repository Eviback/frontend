import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <nav className="flex justify-center items-center gap-12 text-xl font-semibold">
          <Link 
            to="/" 
            className="hover:text-yellow-300 transition-colors duration-200 whitespace-nowrap"
          >
            Подать заявку
          </Link>
          <Link 
            to="/test-scoring" 
            className="hover:text-yellow-300 transition-colors duration-200 whitespace-nowrap"
          >
            Тестовый скоринг
          </Link>
          <Link 
            to="/admin" 
            className="hover:text-yellow-300 transition-colors duration-200 whitespace-nowrap"
          >
            Просмотр заявки (по ID)
          </Link>
        </nav>
      </div>
    </header>
  );
}