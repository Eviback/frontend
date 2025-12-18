import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dasApi } from '../api/api';

interface ApplicationDetail {
  id: number;
  userId?: number;
  applicantFirstName: string;
  applicantLastName: string;
  applicantMiddleName?: string;
  applicantBirthDate?: string;
  amount: number;
  termMonths: number;
  currency: string;
  loanType: string;
  monthlyIncome: number;
  scoreValue?: number;
  scoringAttempts: number;
  currentStatus: string;
  statusUpdatedAt?: string;
  createdAt: string;
}

export default function ApplicationDetail() {
  const { id } = useParams<{ id: string }>();
  const [app, setApp] = useState<ApplicationDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const response = await dasApi.get(`/${id}`);
        setApp(response.data);
      } catch (err) {
        alert('Заявка не найдена');
      } finally {
        setLoading(false);
      }
    };
    fetchApp();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (!app) return <p>Заявка не найдена</p>;

  return (
    <div>
      <Link to="/admin" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Назад к списку
      </Link>

      <h1 className="text-3xl font-bold mb-8">Заявка №{app.id}</h1>

      <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Данные заявителя</h2>
          <p><strong>ФИО:</strong> {app.applicantLastName} {app.applicantFirstName} {app.applicantMiddleName || ''}</p>
          {app.applicantBirthDate && <p><strong>Дата рождения:</strong> {new Date(app.applicantBirthDate).toLocaleDateString('ru-RU')}</p>}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Параметры кредита</h2>
          <p><strong>Сумма:</strong> {app.amount.toLocaleString()} {app.currency}</p>
          <p><strong>Срок:</strong> {app.termMonths} месяцев</p>
          <p><strong>Тип кредита:</strong> {app.loanType}</p>
          <p><strong>Ежемесячный доход:</strong> {app.monthlyIncome.toLocaleString()} RUB</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Скоринг и статус</h2>
          <p><strong>Текущий статус:</strong> 
            <span className={`ml-2 px-3 py-1 rounded text-white ${
              app.currentStatus === 'APPROVED' ? 'bg-green-600' :
              app.currentStatus === 'REJECTED' ? 'bg-red-600' :
              app.currentStatus === 'PENDING' ? 'bg-yellow-600' :
              'bg-gray-600'
            }`}>
              {app.currentStatus}
            </span>
          </p>
          <p><strong>Попыток скоринга:</strong> {app.scoringAttempts}</p>
          {app.scoreValue !== undefined && <p><strong>Скоринговый балл:</strong> {app.scoreValue}</p>}
        </div>

        <div>
          <p><strong>Создана:</strong> {new Date(app.createdAt).toLocaleString('ru-RU')}</p>
          {app.statusUpdatedAt && <p><strong>Статус обновлён:</strong> {new Date(app.statusUpdatedAt).toLocaleString('ru-RU')}</p>}
        </div>
      </div>
    </div>
  );
}