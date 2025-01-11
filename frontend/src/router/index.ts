import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/views/ProductList.vue';
import ProductForm from '@/views/ProductForm.vue';

const routes = [
  { path: '/', name: 'ProductList', component: ProductList },
  { path: '/products/new', name: 'ProductNew', component: ProductForm },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
