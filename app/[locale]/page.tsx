import 'server-only';
import { getDictionary } from '@/i18n/get-dictionary';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <main>
      <h1>{dict.title}</h1>
      <p>{dict.description}</p>
      <nav>
        <a href="/en">English</a> | <a href="/es">Español</a> | <a href="/ru">Русский</a>
      </nav>
    </main>
  );
}


