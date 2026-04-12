/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-light': 'var(--primary-light)',
        accent: 'var(--accent)',
        'accent-light': 'var(--accent-light)',
        gold: 'var(--gold)',
        'gold-light': 'var(--gold-light)',
        purple: 'var(--purple)',
        'purple-light': 'var(--purple-light)',
        bg: 'var(--bg)',
        card: 'var(--card)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        // Dashboard colors
        indigo: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
          950: '#1E1B4B',
        },
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        prompt: ['Prompt', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
