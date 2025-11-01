/** @type {import('tailwindcss').Config} */
export default {
  // Passo 1: O 'content' deve estar correto (como discutimos anteriormente)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Passo 2: Configurar o Dark Mode para usar a classe .dark
  darkMode: ["class"],
  
  theme: {
    // A seção 'container' é opcional, mas útil para layouts centrados
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // 🚨 Configuração das Cores com Variáveis CSS
      colors: {
        border: "var(--border)", // Usando a cor de borda
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        primary: {
          DEFAULT: "var(--primary)", // Ex: text-primary
          foreground: "var(--primary-foreground)", // Ex: text-primary-foreground
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        // Adicione as cores de Chart se precisar usá-las diretamente
        'chart-1': 'var(--chart-1)',
        'chart-2': 'var(--chart-2)',
        // ... e assim por diante para todas as cores definidas
      },
      // 🚨 Configuração de Sombra de Borda (Ring)
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)", // Usando a variável base e o cálculo
        sm: "calc(var(--radius) - 4px)",
      },
      // 🚨 Configuração de Sidebar (se for um layout específico)
      // Você pode mapear essas variáveis para cores de fundo específicas
      // ou usá-las diretamente no seu código.
    },
  },
  plugins: [],
}