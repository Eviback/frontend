import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    email: '',
    phone: '',
    amount: '',
    termMonths: '',
    monthlyIncome: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requestBody = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        middleName: formData.middleName.trim() || null,
        birthDate: formData.birthDate,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        amount: Number(formData.amount),
        termMonths: Number(formData.termMonths),
        monthlyIncome: Number(formData.monthlyIncome),
        currency: "RUB",
        loanType: "PERSONAL",
        applicationData: {
          purpose: "Потребительский кредит",
          hasOtherLoans: false
        }
      };

      console.log('Отправляем:', requestBody);  // для отладки

      const response = await api.post('', requestBody);
      const applicationId = response.data.id;

      navigate(`/success/${applicationId}`);
    } catch (error: any) {
      console.error('Ошибка:', error);
      alert(`Ошибка: ${error.response?.data?.message || error.message || 'Неизвестная ошибка'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-10 mt-10">
      <h1 className="text-3xl font-bold text-center mb-8">Подать заявку на кредит</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="lastName" placeholder="Фамилия" required onChange={handleChange} className="border rounded-lg px-4 py-2" />
          <input name="firstName" placeholder="Имя" required onChange={handleChange} className="border rounded-lg px-4 py-2" />
          <input name="middleName" placeholder="Отчество" onChange={handleChange} className="border rounded-lg px-4 py-2" />
          <input name="birthDate" type="date" placeholder="Дата рождения" required onChange={handleChange} className="border rounded-lg px-4 py-2" />
          <input name="email" type="email" placeholder="Email" required onChange={handleChange} className="border rounded-lg px-4 py-2" />
          <input name="phone" placeholder="Телефон" required onChange={handleChange} className="border rounded-lg px-4 py-2" />
          <input name="amount"
            type="number"
            min="0" step="1"
            placeholder="Сумма кредита (RUB)"
            onKeyDown={(e) => ['-', 'e', 'E'].includes(e.key) && e.preventDefault()}
            required onChange={handleChange} className="border rounded-lg px-4 py-2" />
          <input name="termMonths"
            type="number"
            min="1" step="1"
            placeholder="Срок (в месяцах)"
            onKeyDown={(e) => ['-', 'e', 'E'].includes(e.key) && e.preventDefault()}
            required onChange={handleChange} className="border rounded-lg px-4 py-2" />
          <input name="monthlyIncome"
            type="number"
            min="0" step="1"
            placeholder="Ежемесячный доход (RUB)"
            onKeyDown={(e) => ['-', 'e', 'E'].includes(e.key) && e.preventDefault()}
            required onChange={handleChange} className="col-span-2 border rounded-lg px-4 py-2" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Отправляем...' : 'Отправить заявку'}
        </button>
      </form>
    </div>
  );
}