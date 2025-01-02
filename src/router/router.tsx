import { createBrowserRouter } from 'react-router-dom'

import { BaseLayout } from '@/components/templates/BaseLayout/BaseLayout'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import TimerPage from '@/pages/TimerPage'

export const routes = [
  {
    path: '/',
    element: (
      <BaseLayout>
        <HomePage />
      </BaseLayout>
    ),
  },
  {
    path: '*',
    element: (
      <BaseLayout>
        <NotFoundPage />
      </BaseLayout>
    ),
  },
  {
    path: '/timer',
    element: (
      <BaseLayout>
        <TimerPage />
      </BaseLayout>
    ),
  },
]

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(routes)
