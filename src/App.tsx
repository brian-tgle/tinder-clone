import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from 'components/loading';
import NotFound from 'pages/notFound';
import routeList from 'routes';
import 'styles/main.scss';

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="text-center">
          <span className="page-title with-border-radius">
            Simple Tinder
          </span>
        </h1>
      </header>
      <main>
        <Router>
          <Suspense fallback={<Loading />}>
            <Switch>
              {routeList.map((route) => (
                <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />))
              }
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </main>
    </div>
  );
};

export default App;
