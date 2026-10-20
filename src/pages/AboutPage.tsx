import { Badge } from '@/components/base/badges/badges';
import { Card } from '@/components/Card';

export function AboutPage() {
  return (
    <div className="p-6 mx-auto space-y-6 max-w-3xl">
      <h1 className="text-3xl font-bold text-primary">О проекте</h1>

      <Card className="overflow-hidden relative space-y-6 p-6 sm:p-8">
        {/* Декоративная надпись на фоне */}
        <div className="absolute -top-6 -right-4 text-8xl font-black text-secondary/5 uppercase pointer-events-none select-none">
          GUIDE
        </div>

        <div className="relative z-10 space-y-4 text-secondary">
          <p className="text-lg">
            <strong className="text-xl text-primary">Aniimo Guide</strong> — фанатский гид по игре ANIIMO.
            Здесь собраны данные об анимо, их формах, способностях, эволюциях и рекомендациях для работы на Родине.
          </p>

          <p>
            Данные структурированы и хранятся в JSON, что позволяет быстро обновлять информацию и кэшировать её на
            стороне клиента. Сайт не использует сторонние изображения, чтобы избежать проблем с авторскими правами.
          </p>
        </div>

        <div className="relative z-10 pt-6 border-t border-secondary">
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-primary uppercase">Технологический стек</h2>

          <div className="flex flex-wrap gap-2">
            <Badge color="brand" size="md">Vite</Badge>
            <Badge color="brand" size="md">TypeScript</Badge>
            <Badge color="brand" size="md">React</Badge>
            <Badge color="brand" size="md">Tailwind CSS</Badge>
            <Badge color="brand" size="md">Untitled UI</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
