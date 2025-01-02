import { createBrowserRouter } from 'react-router-dom'

import HomePage from '@/pages/HomePage'

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
]

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(routes)
