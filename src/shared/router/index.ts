import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { defineAsyncComponent } from 'vue'

export enum AppRoutes {
  MAIN = 'main',
  LOGIN = 'login',
  RESTORE_PASSWORD = 'restore_password',
  REGISTRATION = 'registration',
  REGISTRATION_SUCCESS = 'registration_success',
  PROFILE = 'profile',
  PROFILE_EDIT = 'edit_profile'
}
export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.RESTORE_PASSWORD]: '/restore-password',
  [AppRoutes.REGISTRATION]: '/registration',
  [AppRoutes.REGISTRATION_SUCCESS]: '/registration-success',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.PROFILE_EDIT]: '/profile/edit'
}
const routes: Array<RouteRecordRaw> = [
  {
    path: RoutePath.main,
    name: 'home',
    component: defineAsyncComponent(() => import('@/pages/HomePage/HomePage.vue'))
  },
  {
    path: RoutePath.login,
    name: 'login',
    component: defineAsyncComponent(() => import('@/pages/LoginPage'))
  },
  {
    path: RoutePath.restore_password,
    name: 'RestorePasswordPage',
    component: defineAsyncComponent(
      () => import('@/pages/RestorePasswordPage/RestorePasswordPage.vue')
    )
  },
  {
    path: RoutePath.registration,
    name: 'RegistrationPage',
    component: defineAsyncComponent(() => import('@/pages/RegistrationPage/RegistrationPage.vue'))
  },
  {
    path: RoutePath.registration_success,
    name: 'RegistrationSuccessPage',
    component: defineAsyncComponent(
      () => import('@/pages/RegistrationSuccessPage/RegistrationSuccessPage.vue')
    )
  },
  {
    path: RoutePath.profile,
    name: 'ProfilePage',
    component: defineAsyncComponent(() => import('@/pages/ProfilePage/ProfilePage.vue'))
  },
  {
    path: RoutePath.edit_profile,
    name: 'ProfileEditPage',
    component: defineAsyncComponent(() => import('@/pages/ProfileEditPage/ProfileEditPage.vue'))
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
