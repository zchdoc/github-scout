import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GitHub Scout | GitHub 拾光",
  description: "精选 GitHub 开源项目库 - X/Twitter 内容运营工具",
};

function ThemeToggle() {
  return (
    <button
      id="theme-toggle"
      className="p-2 rounded-lg hover:bg-[var(--card-bg)] transition-colors"
      aria-label="切换深色模式"
    >
      <svg
        className="w-5 h-5 hidden dark:block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <svg
        className="w-5 h-5 block dark:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <header className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-2xl">🔭</span>
              <h1 className="text-xl font-bold">
                GitHub Scout <span className="text-[var(--muted)] font-normal">| GitHub 拾光</span>
              </h1>
            </Link>
            <nav className="flex items-center gap-4">
              <a
                href="https://github.com/zchdoc/github-scout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-[var(--accent)] transition-colors"
              >
                项目库
              </a>
              <Link
                href="/about"
                className="text-sm hover:text-[var(--accent)] transition-colors"
              >
                关于
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-[var(--card-border)] mt-16 py-8 text-center text-sm text-[var(--muted)]">
          <p>GitHub Scout / GitHub 拾光 — 每日精选优质开源项目</p>
          <p className="mt-1">为 X/Twitter 内容运营而生</p>
        </footer>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.getElementById('theme-toggle').addEventListener('click', function() {
                document.documentElement.classList.toggle('dark');
                localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
