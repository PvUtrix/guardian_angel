# Guardian Angel - Child Route Safety Platform

## Обзор

Guardian Angel - это платформа безопасности для детей, которая позволяет родителям контролировать маршруты своих детей (от 12 лет) с помощью GPS-отслеживания в реальном времени и интеллектуальных систем оповещения.

## Проблема

Многие родители испытывают тревогу, отпуская детей одних в школу, на кружки или к друзьям. Невозможно:
- Настроить безопасный маршрут для нескольких детей
- Получать уведомления при отклонении от согласованного пути
- Знать о потенциально опасных местах на маршруте
- Быть уверенными в безопасности ребенка

## Решение

Guardian Angel предоставляет:
- **Мониторинг маршрута в реальном времени** с GPS-отслеживанием
- **Мгновенные оповещения** при отклонении от маршрута
- **Безопасные зоны** вокруг важных мест
- **Семейную безопасность** с настройкой прав доступа

## Архитектура

### Технологический стек
- **Frontend**: Next.js 14+ с TypeScript, Tailwind CSS
- **Mobile**: React Native (iOS/Android)
- **Backend**: NestJS (Node.js), PostgreSQL, Redis
- **Real-time**: WebSockets, Firebase Cloud Messaging
- **Maps**: Google Maps API / Mapbox
- **Infrastructure**: Docker, Kubernetes, AWS

### Основные сервисы
- **Authentication Service** - JWT, OAuth, роли пользователей
- **Route Management** - создание и управление маршрутами
- **Location Tracking** - GPS-отслеживание с оптимизацией батареи
- **Alert System** - многоуровневые оповещения (Push → SMS → Звонок)
- **User Management** - семейные группы и настройки приватности

## Безопасность и приватность

- **Шифрование данных** end-to-end для геолокации
- **Соблюдение GDPR/COPPA** с согласием родителей
- **Политики хранения данных** (автоудаление через 30 дней)
- **Гранулярные настройки приватности** для каждого пользователя

## Структура проекта

```
/
├── docs/                    # Документация архитектуры
│   ├── ARCHITECTURE.md      # Системная архитектура
│   ├── API_DESIGN.md        # REST/GraphQL API
│   └── DATABASE_SCHEMA.md   # Схема базы данных
├── landing/                 # Лендинг страница (Next.js)
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── styles/
│   ├── public/
│   └── package.json
└── README.md
```

## Запуск проекта

### Лендинг страница

```bash
cd landing
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Docker

```bash
# Сборка образа
docker build -t guardian-angel-landing .

# Запуск контейнера
docker run -p 3000:3000 guardian-angel-landing
```

## Функциональность MVP

### Лендинг страница
- ✅ **Главная секция** с ценностным предложением
- ✅ **Описание проблемы** и решения
- ✅ **Ключевые возможности** (4 основные функции)
- ✅ **Форма ожидания** с валидацией email
- ✅ **Адаптивный дизайн** для всех устройств
- ✅ **Русская локализация** всего контента

### Планируемая функциональность
- 🔄 **Мобильные приложения** (iOS/Android)
- 🔄 **Веб-дашборд** для родителей
- 🔄 **API сервер** с аутентификацией
- 🔄 **Real-time отслеживание** с WebSockets
- 🔄 **Система оповещений** (Push, SMS, звонки)

## Развертывание

### Требования
- Node.js 18+
- Docker (опционально)
- PostgreSQL (для production)
- Redis (для кеширования)

### Переменные окружения

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/guardian_angel
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# External Services
GOOGLE_MAPS_API_KEY=your-google-maps-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
FIREBASE_SERVER_KEY=your-firebase-key
```

## Лицензия

MIT License - см. файл [LICENSE](LICENSE) для деталей.

## Контакты

- **Email**: hello@guardianangel.app
- **Telegram**: [@guardian_angel_support](https://t.me/guardian_angel_support)
- **Website**: [guardianangel.app](https://guardianangel.app)

---

*Спокойствие для родителей. Свобода для детей.*
