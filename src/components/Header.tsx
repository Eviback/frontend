import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex space-x-8 text-lg font-medium">
          <Link to="/" className="hover:underline">    Подать заявку    </Link>
          <Link to="/admin/applications" className="hover:underline">   Список заявок    </Link>
          <Link to="/test-scoring" className="hover:underline">    Тестовый скоринг    </Link>
          <Link to="/admin" className="hover:underline">    Админка (по ID)    </Link>
        </nav>
      </div>
    </header>
  );
}