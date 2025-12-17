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
    <div>
      <h1 className="text-3xl font-bold mb-8">Админка: Заявки по ID</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-md">
        <label className="block text-lg font-medium mb-2">Введите ID заявки:</label>
        <div className="flex gap-4">
          <input
            type="number"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLoad()}
            placeholder="Например: 5"
            className="border rounded-lg px-4 py-2 flex-1"
          />
          <button
            onClick={handleLoad}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Загрузка...' : 'Загрузить'}
          </button>
        </div>
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>

      {applications.length === 0 ? (
        <p className="text-gray-600">Загруженные заявки появятся здесь. Попробуйте ввести ID 5 (или другой существующий).</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">ФИО</th>
              <th className="border px-4 py-2 text-left">Сумма</th>
              <th className="border px-4 py-2 text-left">Статус</th>
              <th className="border px-4 py-2 text-left">Создано</th>
              <th className="border px-4 py-2 text-left">Действия</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{app.id}</td>
                <td className="border px-4 py-2">
                  {app.applicantLastName} {app.applicantFirstName} {app.applicantMiddleName || ''}
                </td>
                <td className="border px-4 py-2">{app.amount.toLocaleString()} RUB</td>
                <td className="border px-4 py-2">
                  <span className={`px-2 py-1 rounded text-white text-sm ${
                    app.currentStatus === 'APPROVED' ? 'bg-green-600' :
                    app.currentStatus === 'REJECTED' ? 'bg-red-600' :
                    app.currentStatus === 'PENDING' ? 'bg-yellow-600' :
                    'bg-gray-600'
                  }`}>
                    {app.currentStatus}
                  </span>
                </td>
                <td className="border px-4 py-2">{formatDate(app.createdAt)}</td>
                <td className="border px-4 py-2">
                  <Link
                    to={`/admin/applications/${app.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Детали →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}