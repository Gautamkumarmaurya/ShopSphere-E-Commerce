export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#050816',
        panel: '#0D1422',
        panel2: '#111827',
        violet: '#7C3AED',
        purple: '#A855F7',
        cyan: '#22D3EE',
      },
      boxShadow: {
        glow: '0 0 40px rgba(124,58,237,.18)',
        card: '0 18px 60px rgba(0,0,0,.24)',
      },
    },
  },
  plugins: [],
};