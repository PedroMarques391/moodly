# Moodly Mobile

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)

Aplicativo mobile de rastreamento de humor desenvolvido com React Native e Expo. Permite aos usuários registrar, visualizar e analisar seus estados emocionais ao longo do tempo.

## Funcionalidades

- **Registro de Humor**: Adicione entradas diárias com emoji, nota (1-5) e descrição
- **Dashboard**: Visualize estatísticas, gráficos de tendências e calendário mensal
- **Histórico**: Navegue por todos os registros em formato de lista ou grid
- **Perfil**: Gerencie informações pessoais e configurações
- **Autenticação**: Login e registro de usuários

## Telas Principais

### Home

Tela inicial onde o usuário pode:

- Ver saudação personalizada
- Adicionar novo registro de humor
- Visualizar registros recentes
- Acessar calendário de moods

### Dashboard

Painel com análises e insights:

- **Cards de Estatísticas**: Total de moods, sequência, média e emoji mais frequente
- **Gráfico de Tendências**: Visualização dos últimos 7 dias
- **Calendário Mensal**: Grid com todos os moods do mês atual

### Moods

Lista completa de registros com:

- Visualização em lista ou grid
- Filtros e busca
- Acesso aos detalhes de cada mood

### Settings

Configurações do usuário:

- Edição de perfil (nome, email, foto)
- Preferências (lembretes diários)
- Segurança e aparência
- Logout

### Mood Detail

Detalhes completos de um registro:

- Visualização do emoji, nota e descrição
- Edição de informações
- Exclusão de registro

## Navegação

O app utiliza **Expo Router** (file-based routing) com a seguinte estrutura:

```
app/
├── (auth)/              # Grupo de autenticação
│   ├── login.tsx        # Tela de login
│   └── register.tsx     # Tela de registro
├── (home)/              # Grupo principal (tabs)
│   ├── (dashboard)/     # Stack do dashboard
│   │   └── dashboard.tsx
│   ├── home.tsx         # Tab: Home
│   ├── moods.tsx        # Tab: Lista de moods
│   └── settings.tsx     # Tab: Configurações
├── mood/
│   └── [id].tsx         # Detalhes do mood (dinâmico)
└── _layout.tsx          # Layout raiz
```

**Navegação em Tabs** (Bottom Navigation):

- Home
- Dashboard
- Moods
- Settings

## Tecnologias Principais

### Core

- **React Native** - Framework mobile
- **Expo** (~52) - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **Expo Router** - Navegação file-based

### State Management

- **Zustand** - Gerenciamento de estado global
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

### UI/UX

- **React Native Paper** - Componentes Material Design
- **React Native Vector Icons** - Ícones
- **React Native SVG Charts** - Gráficos
- **Expo Image Picker** - Seleção de imagens

## Estrutura de Pastas

```
mobile/
├── app/                 # Telas (Expo Router)
├── components/          # Componentes reutilizáveis
│   ├── sections/        # Seções complexas
│   └── ui/              # Componentes UI básicos
├── hooks/               # Custom hooks
├── interfaces/          # Tipos TypeScript
├── services/            # Serviços de API
├── store/               # Stores Zustand
├── styles/              # Estilos globais
├── theme/               # Configuração de tema
├── utils/               # Funções utilitárias
└── validations/         # Schemas Zod
```

## Design System

O app utiliza um design system customizado com:

- **Cores**: Paleta baseada em tons de azul (#5CA3C3)
- **Espaçamento**: Sistema de 4px (xs: 4, sm: 8, md: 16, lg: 24, xl: 32)
- **Bordas**: Raios consistentes (sm: 8, md: 16, lg: 24, xl: 32)
- **Tipografia**: Hierarquia clara com variantes do Paper

## Componentes Principais

### UI Components

- `StatCard` - Cards de estatísticas
- `MoodCard` - Card de mood (lista/grid)
- `CalendarDay` - Dia do calendário
- `ProfileAvatar` - Avatar com upload
- `Modal` - Modal customizado
- `Picker` - Seletor customizado
- `Input` - Input de texto
- `Skeleton` - Loading state

### Section Components

- `MoodChart` - Gráfico de tendências
- `MoodCalendar` - Calendário mensal
- `RecentMoods` - Lista de moods recentes
- `SecuritySection` - Configurações de segurança
- `Preferences` - Preferências do usuário

## Autenticação

O app utiliza autenticação JWT com:

- Login/Registro
- Token armazenado no AsyncStorage
- Redirecionamento automático

## Estado Global (Zustand)

Stores principais:

- `useMoodStore` - Gerencia moods
- `useUserStore` - Gerencia usuário e autenticação

## Validação

Schemas Zod para:

- Login/Registro
- Criação/Edição de mood
- Atualização de perfil

## Compatibilidade

- **Expo Go**: ✅ Totalmente compatível
- **Android**: ✅ Testado
- **iOS**: ✅ Testado
