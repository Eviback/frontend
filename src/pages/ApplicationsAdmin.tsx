import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { dasApi } from '../api/api';

interface ApplicationShort {
  id: number;
  applicantFirstName: string;
  applicantLastName: string;
  applicantMiddleName?: string;
  amount: number;
  termMonths: number;
  currentStatus: string;
  createdAt: string;
}

export default function ApplicationsAdmin() {
  const navigate = useNavigate();
  const [idInput, setIdInput] = useState('');
  const [applications, setApplications] = useState<ApplicationShort[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoad = async () => {
    const id = Number(idInput.trim());
    if (!id || id <= 0) {
      setError('Введите валидный ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await dasApi.get(`/api/loan-applications/${id}`);
      const app = response.data;

      const shortApp: ApplicationShort = {
        id: app.id,
        applicantFirstName: app.applicantFirstName,
        applicantLastName: app.applicantLastName,
        applicantMiddleName: app.applicantMiddleName,
        amount: app.amount,
        termMonths: app.termMonths,
        currentStatus: app.currentStatus,
        createdAt: app.createdAt,
      };

      // Добавляем в начало списка (новые сверху)
      setApplications(prev => [shortApp, ...prev.filter(a => a.id !== shortApp.id)]);
      setIdInput('');
    } catch (err: any) {
      setError(err.response?.status === 404 
        ? 'Заявка с таким ID не найдена' 
        : 'Ошибка загрузки заявки');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('ru-RU');
  };

 return (
  <div className="space-y-12">
    <h1 className="text-4xl font-bold text-center text-gray-800">Админка: Заявки по ID</h1>

    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-md">
      <label className="block text-xl font-semibold text-gray-700 mb-4">Введите ID заявки:</label>
      <div className="flex gap-6 items-end max-w-md">
        <div className="flex-1">
          <input
            type="number"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLoad()}
            placeholder="Например: 5"
            className="w-full border-2 border-gray-300 rounded-xl px-6 py-4 text-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleLoad}
          disabled={loading}
          className="bg-blue-600 text-white font-bold px-10 py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 shadow-lg text-lg"
        >
          {loading ? 'Загрузка...' : 'Загрузить'}
        </button>
      </div>
      {error && <p className="text-red-600 mt-6 text-lg font-medium">{error}</p>}
    </div>

    {applications.length === 0 ? (
      <p className="text-center text-gray-600 text-xl mt-12">
        Загруженные заявки появятся здесь.<br />
        Попробуйте ввести ID <strong>5</strong> или другой существующий.
      </p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
              <th className="border-b-2 border-gray-300 px-8 py-6 text-left text-lg font-semibold">ID</th>
              <th className="border-b-2 border-gray-300 px-8 py-6 text-left text-lg font-semibold">ФИО</th>
              <th className="border-b-2 border-gray-300 px-8 py-6 text-left text-lg font-semibold">Сумма</th>
              <th className="border-b-2 border-gray-300 px-8 py-6 text-left text-lg font-semibold">Статус</th>
              <th className="border-b-2 border-gray-300 px-8 py-6 text-left text-lg font-semibold">Создано</th>
              <th className="border-b-2 border-gray-300 px-8 py-6 text-left text-lg font-semibold">Действия</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50 transition">
                <td className="border-b px-8 py-6 text-lg">{app.id}</td>
                <td className="border-b px-8 py-6 text-lg">
                  {app.applicantLastName} {app.applicantFirstName} {app.applicantMiddleName || ''}
                </td>
                <td className="border-b px-8 py-6 text-lg">{app.amount.toLocaleString()} RUB</td>
                <td className="border-b px-8 py-6">
                  <span className={`px-5 py-2 rounded-full text-white font-bold ${
                    app.currentStatus === 'APPROVED' ? 'bg-green-600' :
                    app.currentStatus === 'REJECTED' ? 'bg-red-600' :
                    app.currentStatus === 'PENDING' ? 'bg-yellow-600' :
                    'bg-gray-600'
                  }`}>
                    {app.currentStatus}
                  </span>
                </td>
                <td className="border-b px-8 py-6 text-lg">{formatDate(app.createdAt)}</td>
                <td className="border-b px-8 py-6">
                  <Link
                    to={`/admin/applications/${app.id}`}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 font-medium shadow"
                  >
                    Детали →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
}