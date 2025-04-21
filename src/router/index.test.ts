import { describe, it, expect } from 'vitest';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import router from './index';
import ShowDashboard from '../components/ShowDashboard.vue';

describe('Router Configuration', () => {
  it('should create a router instance', () => {
    expect(router).toBeInstanceOf(Object);
    expect(router).toHaveProperty('options');
  });

  it('should use createWebHistory', () => {
    expect(router.options.history).toBeInstanceOf(
      createWebHistory().constructor,
    );
  });

  it('should have the correct routes', () => {
    const routes = router.options.routes;

    expect(routes).toHaveLength(2);

    expect(routes[0]).toMatchObject({
      path: '/',
      name: 'Dashboard',
      component: ShowDashboard,
    });

    expect(routes[1]).toMatchObject({
      path: '/show/:id',
      name: 'ShowDetails',
      component: ShowDashboard,
    });
  });

  it('should resolve the correct route for "/"', async () => {
    const testRouter: Router = createRouter({
      history: createWebHistory(),
      routes: router.options.routes,
    });

    const route = await testRouter.resolve('/');
    expect(route.name).toBe('Dashboard');
    expect(route.matched[0].components?.default).toBe(ShowDashboard);
  });

  it('should resolve the correct route for "/show/:id"', async () => {
    const testRouter: Router = createRouter({
      history: createWebHistory(),
      routes: router.options.routes,
    });

    const route = await testRouter.resolve('/show/123');
    expect(route.name).toBe('ShowDetails');
    expect(route.params.id).toBe('123');
    expect(route.matched[0].components?.default).toBe(ShowDashboard);
  });
});
