"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const accountNavLinks = [
  { name: 'Order History', href: '/account/orders' },
  { name: 'Profile Details', href: '/account/profile' },
  { name: 'Addresses', href: '/account/addresses' },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <main className="min-h-screen bg-black pt-40 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 md:mb-12">Personal Hub</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <aside className="md:col-span-1">
            <div className="flex flex-col gap-4">
              {accountNavLinks.map(link => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-sans uppercase tracking-wider text-sm border-l-2 pl-4 transition-colors ${
                      isActive
                        ? 'text-white border-white'
                        : 'text-white/50 border-white/20 hover:text-white hover:border-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            {/* FIX: Logout is now a visually distinct button */}
            <button
              onClick={handleLogout}
              className="w-full text-left font-sans uppercase tracking-wider text-sm transition-colors mt-8 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
            >
              Logout
            </button>
          </aside>
          <section className="md:col-span-3">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
