import { useState } from 'react';
import { scoringApi } from '../api/api';

interface Rule {
    id: string;
    matched: boolean;
    points: number;
    weight: number;
    added: number;
    description: string;
}

interface ScoringResult {
    scoreValue: number;
    decision: string;
    scoringResult: {
        rules?: Rule[];
    };
}

export default function TestScoring() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ScoringResult | null>(null);
    const [error, setError] = useState('');
    const [showDetails, setShowDetails] = useState(false);

    const [formData, setFormData] = useState({
        firstName: 'Иван',
        lastName: 'Иванов',
        middleName: 'Иванович',
        birthDate: '1990-01-01',
        email: 'ivan@example.com',
        phone: '+79991234567',
        amount: '100000',
        termMonths: '12',
        monthlyIncome: '80000',
        currency: 'RUB',
        loanType: 'PERSONAL',
        scoringAttempts: '0',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

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
                currency: formData.currency,
                loanType: formData.loanType,
                monthlyIncome: Number(formData.monthlyIncome),
                scoringAttempts: Number(formData.scoringAttempts),
                applicationData: {},
                nameMismatch: false,
            };

            const response = await scoringApi.post('/api/scoring/evaluate', requestBody);
            setResult(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Ошибка при скоринге');
        } finally {
            setLoading(false);
        }
    };

    const totalAdded = result?.scoringResult.rules?.reduce((sum, rule) => sum + rule.added, 0) || 0;

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Тестовый скоринг</h1>

            <div className="bg-white shadow-xl rounded-2xl p-10 mb-12">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Имя</label>
                        <input name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Фамилия</label>
                        <input name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Отчество</label>
                        <input name="middleName" value={formData.middleName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Дата рождения</label>
                        <input name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Телефон</label>
                        <input name="phone" value={formData.phone} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Сумма кредита (RUB)</label>
                        <input name="amount" type="number" value={formData.amount} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Срок (месяцев)</label>
                        <input name="termMonths" type="number" value={formData.termMonths} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Ежемесячный доход (RUB)</label>
                        <input name="monthlyIncome" type="number" value={formData.monthlyIncome} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Тип кредита</label>
                        <select name="loanType" value={formData.loanType} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                            <option value="PERSONAL">PERSONAL</option>
                            <option value="CAR">CAR</option>
                            <option value="MORTGAGE">MORTGAGE</option>
                            <option value="BUSINESS">BUSINESS</option>
                        </select>
                    </div>
                </form>

                <button
                    type="submit"
                    disabled={loading}
                    onClick={handleSubmit}
                    className="mt-10 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg py-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-60 shadow-lg"
                >
                    {loading ? 'Запуск скоринга...' : 'Запустить скоринг'}
                </button>
            </div>

            {error && <div className="p-6 bg-red-100 text-red-700 rounded-xl text-center font-medium">{error}</div>}

            {result && (
                <div className="mt-12">
                    <div className="bg-white shadow-xl rounded-2xl p-10 text-center">
                        <h2 className="text-3xl font-bold mb-8 text-gray-800">Результат скоринга</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            <div className="bg-blue-50 p-10 rounded-2xl">
                                <p className="text-xl text-gray-600 mb-4">Скоринговый балл</p>
                                <p className="text-6xl font-extrabold text-blue-700">{result.scoreValue}</p>
                            </div>
                            <div className={`p-10 rounded-2xl ${result.decision.includes('DECLINE') || result.decision.includes('REJECT') ? 'bg-red-50' : 'bg-green-50'}`}>
                                <p className="text-xl text-gray-600 mb-4">Решение</p>
                                <p className={`text-6xl font-extrabold ${result.decision.includes('DECLINE') || result.decision.includes('REJECT') ? 'text-red-700' : 'text-green-700'}`}>
                                    {result.decision}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="bg-indigo-600 text-white font-bold px-10 py-4 rounded-xl hover:bg-indigo-700 text-xl shadow-lg"
                        >
                            {showDetails ? 'Скрыть детали' : 'Показать подробные правила'}
                        </button>
                    </div>

                    {showDetails && result.scoringResult?.rules && (
                        <div className="mt-10 bg-white shadow-xl rounded-2xl p-10">
                            <h3 className="text-2xl font-bold mb-8 text-center">Подробный расчёт по правилам</h3>
                            <div className="space-y-4">
                                {result.scoringResult.rules.map((rule, index) => (
                                    <div key={index} className={`p-6 rounded-xl border-2 ${rule.matched ? 'bg-green-50 border-green-400' : 'bg-gray-50 border-gray-300'}`}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-lg font-semibold">{rule.description || rule.id}</p>
                                                <p className="text-gray-600 mt-2">
                                                    Базовые баллы: {rule.points} × Вес: {rule.weight} = <strong className={rule.added >= 0 ? 'text-green-700' : 'text-red-700'}>{rule.added > 0 ? '+' : ''}{rule.added}</strong>
                                                </p>
                                            </div>
                                            <span className={`px-5 py-2 rounded-full font-bold ${rule.matched ? 'bg-green-600 text-white' : 'bg-gray-500 text-white'}`}>
                                                {rule.matched ? 'Сработало' : 'Не сработало'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 p-6 bg-indigo-50 rounded-xl text-center">
                                <p className="text-2xl font-bold">Итого: <span className={totalAdded >= 0 ? 'text-green-700' : 'text-red-700'}>{totalAdded > 0 ? '+' : ''}{totalAdded}</span> баллов</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}