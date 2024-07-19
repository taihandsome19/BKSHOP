import React, { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes/'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute
                    component={() => (
                      <div>
                        <Layout>
                          <Page />
                        </Layout>
                      </div>
                    )}
                    isProtected={route.isProtected}
                    redirectTo={route.redirectTo}
                    trigger={route.trigger}
                  />
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App