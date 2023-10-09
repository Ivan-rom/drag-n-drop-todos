import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Project from './components/project/Project'
import Projects from './components/projects/Projects'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Projects />,
  },
  {
    path: '/project/:id',
    element: <Project />,
  },
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
