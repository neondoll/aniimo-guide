import { Card } from '@/components/Card';

export function AboutPage() {
  return (
    <div className="p-6 mx-auto space-y-6 max-w-3xl">
      <h1 className="text-3xl font-bold text-primary">О проекте</h1>

      <Card className="p-6 space-y-4 text-secondary">
        <p>
          <strong className="text-primary">Aniimo Guide</strong> — фанатский гид по игре ANIIMO.
          Здесь собраны данные об анимо, их формах, способностях, эволюциях и рекомендациях для работы на Родине.
        </p>

        <p>
          Данные структурированы и хранятся в JSON, что позволяет быстро обновлять информацию
          и кэшировать её на стороне клиента.
        </p>

        <p>
          Проект создан с использованием Vite, TypeScript, React, Tailwind CSS и компонентов Untitled UI.
        </p>
      </Card>
    </div>
  );
}
