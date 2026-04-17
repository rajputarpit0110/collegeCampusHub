import { useTheme } from '../context/ThemeContext';
import ClubCard from './ClubCard';

export default function ClubSection({ title, clubs, category }) {
  const { isDark } = useTheme();

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2
          className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
        >
          {title}
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <ClubCard key={club.id} club={club} category={category} />
        ))}
      </div>
    </section>
  );
}
