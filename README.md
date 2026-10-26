# Место

Небольшое независимое медиа: адаптивная лента публикаций, страницы материалов,
регистрация и вход, редактор с загрузкой обложки и комментарии.

Проект построен на NestJS, TypeORM, Handlebars и обычном JavaScript. По умолчанию
используется локальная файловая база SQL.js, поэтому PostgreSQL для разработки не
нужен.

## Запуск

Требуется Node.js 18 или новее.

```bash
npm install
cp .env.example .env
npm run start:dev
```

После запуска откройте <http://localhost:3000>. Категории создаются автоматически
при первом старте. База сохраняется в `metonest.sqlite`.

## Команды

```bash
npm run build       # production-сборка
npm test            # быстрые unit-тесты
npm run test:e2e    # интеграционные тесты
npm run format      # форматирование TypeScript
```

## Настройки

Переменные перечислены в `.env.example`. Обязательно замените `JWT_SECRET` перед
развёртыванием. Почта отключена, пока не задан `SMTP_URL`.

Основные страницы:

- `/` — лента;
- `/news/:id` — публикация и комментарии;
- `/register`, `/login` — учётная запись;
- `/editor` — создание публикации.

API расположен под префиксом `/api`.

## Важно

Старые SMTP-данные находились в истории Git. Если они когда-либо были рабочими,
пароль почтового аккаунта необходимо сменить.

## Публикация на удалённом сервере

Ниже приведён вариант развёртывания на обычном Linux VPS с systemd, Nginx и
HTTPS. Команды предполагают, что домен уже направлен на IP-адрес сервера.

### 1. Подготовить сервер

Установите Git, Node.js 18 или новее, Nginx, Certbot и инструменты сборки,
необходимые для нативных npm-пакетов. Создайте отдельного непривилегированного
пользователя для приложения. Не запускайте Node.js от `root`.

Откройте во внешнем firewall только SSH, HTTP и HTTPS. Порт `3000` должен быть
доступен лишь локально — запросы к нему будет пересылать Nginx.

### 2. Скачать и собрать проект

Под пользователем приложения выполните:

```bash
git clone --branch DZ7 https://github.com/maxkuku/metonest.git /var/www/metonest
cd /var/www/metonest
npm ci
npm run build
npm prune --omit=dev
```

Убедитесь, что пользователь приложения может записывать базу и обложки:

```bash
mkdir -p /var/www/metonest/public/news-static
```

### 3. Настроить окружение

Создайте `/var/www/metonest/.env` на основе `.env.example`:

```dotenv
NODE_ENV=production
PORT=3000
JWT_SECRET=сгенерированная-длинная-случайная-строка
DB_PATH=/var/www/metonest/data/metonest.sqlite
```

Создайте каталог базы:

```bash
mkdir -p /var/www/metonest/data
chmod 700 /var/www/metonest/data
chmod 600 /var/www/metonest/.env
```

Для генерации JWT-секрета можно использовать:

```bash
openssl rand -hex 32
```

Если нужны письма, дополнительно задайте `SMTP_URL`, `MAIL_FROM` и
`ADMIN_EMAIL`. Не добавляйте файл `.env` в Git.

### 4. Создать systemd-службу

Создайте `/etc/systemd/system/metonest.service`, заменив `metonest` в полях
`User` и `Group` на имя созданного системного пользователя:

```ini
[Unit]
Description=Metonest news portal
After=network.target

[Service]
Type=simple
User=metonest
Group=metonest
WorkingDirectory=/var/www/metonest
EnvironmentFile=/var/www/metonest/.env
ExecStart=/usr/bin/node /var/www/metonest/dist/main.js
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Активируйте приложение:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now metonest
sudo systemctl status metonest
curl http://127.0.0.1:3000/api/categories
```

Логи доступны командой:

```bash
sudo journalctl -u metonest -f
```

### 5. Настроить Nginx

Создайте `/etc/nginx/sites-available/metonest`, заменив `example.com` своим
доменом:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;

    client_max_body_size 10M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Включите конфигурацию и проверьте её:

```bash
sudo ln -s /etc/nginx/sites-available/metonest /etc/nginx/sites-enabled/metonest
sudo nginx -t
sudo systemctl reload nginx
```

### 6. Подключить HTTPS

После проверки DNS и HTTP выпустите сертификат:

```bash
sudo certbot --nginx -d example.com -d www.example.com
sudo certbot renew --dry-run
```

### 7. Обновлять приложение

```bash
cd /var/www/metonest
git pull --ff-only origin DZ7
npm ci
npm run build
npm prune --omit=dev
sudo systemctl restart metonest
sudo systemctl status metonest
```

Перед обновлением сохраните `.env`, файл базы из `DB_PATH` и каталог
`public/news-static`. Для согласованной копии файловой базы сначала остановите
службу, скопируйте данные, затем запустите её снова.

### Ограничения текущей конфигурации

- SQL.js подходит для небольшого проекта с одним процессом приложения. Для
  высокой нагрузки и нескольких экземпляров следует перейти на PostgreSQL.
- Перед публичным запуском обновите устаревшие зависимости и повторно выполните
  `npm audit`: текущая версия учебного проекта содержит известные уязвимости.
- Настройте регулярное внешнее резервное копирование базы, `.env` и загруженных
  изображений.
