import './App.css';
import './components/style.css'
import { Create } from './components/Create';
import { Home } from './components/Home';
import { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Update } from './components/Update';

function App() {
  const route = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/create',
      element: <Create/>
    },
    {
      path: '/update/:id',
      element: <Update/>
    }
  ])
  return (
    <>
      <RouterProvider router={route}></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;