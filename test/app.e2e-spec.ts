import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Место (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let newsId: number;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.init();
  });

  afterAll(async () => app.close());

  it('registers and signs in a reader', async () => {
    await request(app.getHttpServer()).post('/api/auth/register').send({
      firstName: 'Анна',
      lastName: 'Тестова',
      email: 'anna@example.com',
      password: 'testing123',
    }).expect(201);

    const response = await request(app.getHttpServer()).post('/api/auth/login').send({
      email: 'anna@example.com',
      password: 'testing123',
    }).expect(201);
    token = response.body.access_token;
    expect(token).toBeTruthy();
  });

  it('publishes a story and adds a comment', async () => {
    const categories = await request(app.getHttpServer()).get('/api/categories').expect(200);
    const created = await request(app.getHttpServer())
      .post('/api/news')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'История для проверки')
      .field('description', 'Полный текст проверочной публикации.')
      .field('categoryId', String(categories.body[0].id))
      .expect(201);
    newsId = created.body.id;

    await request(app.getHttpServer())
      .post(`/api/news/${newsId}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send({ message: 'Первый комментарий' })
      .expect(201);

    const comments = await request(app.getHttpServer())
      .get(`/api/news/${newsId}/comments`)
      .expect(200);
    expect(comments.body).toHaveLength(1);
    expect(comments.body[0].user.password).toBeUndefined();
  });
});
