import { NavLink, Link } from 'react-router-dom';

import { cx } from '@/utils/cx';

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/aniimos',       label: 'Анимо' },
  { to: '/elements',      label: 'Элементы' },
  { to: '/home-abilities', label: 'Способности' },
  { to: '/facilities',    label: 'Строения' },
  { to: '/tools/evolution', label: 'Калькулятор', end: true },
  { to: '/about', label: 'О сайте', end: true },
];

export function HeaderNavigation() {
  return (
    <header className="sticky top-0 z-50 bg-primary/95 border-b border-secondary backdrop-blur">
      <div className="px-4 mx-auto max-w-6xl sm:px-6">
        <div className="flex gap-4 justify-between items-center h-16">
          {/* Логотип */}
          <Link
            className="flex gap-2 items-center text-lg font-bold text-primary transition-colors hover:text-brand-600"
            to="/"
          >
            <span className="inline-flex justify-center items-center w-8 h-8 text-sm font-bold text-white bg-brand-600 rounded-lg">
              A
            </span>

            <span className="hidden sm:inline">Aniimo Guide</span>
          </Link>

          {/* Основная навигация */}
          <nav aria-label="Основная навигация" className="flex gap-1 items-center">
            {NAV_ITEMS.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  cx(
                    'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'text-brand-700 bg-brand-50'
                      : 'text-secondary hover:text-primary hover:bg-primary_hover',
                  )
                }
                end={item.end}
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Правая часть (опционально: переключатель темы, GitHub-ссылка) */}
          <div className="hidden gap-2 items-center md:flex">
            <a
              className="text-sm text-tertiary transition-colors hover:text-primary"
              href="https://github.com/neondoll/aniimo-guide"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}