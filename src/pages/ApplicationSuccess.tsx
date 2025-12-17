import { useParams, Link } from 'react-router-dom';

export default function ApplicationSuccess() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-green-600 mb-6">Заявка успешно принята!</h1>
      <p className="text-xl mb-8">Номер вашей заявки: <strong>{id}</strong></p>
      <p className="text-gray-600 mb-8">
        Мы рассмотрим вашу заявку в ближайшее время. Скоринг запускается автоматически.
      </p>
      <Link to="/admin/applications" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Перейти к списку заявок
      </Link>
    </div>
  );
}