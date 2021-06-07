import { Suspense } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Loading from 'components/loading';
import NotFound from 'pages/notFound';
import routeList from 'routes';
import 'styles/main.scss';

const App = () => {
  return (
    <div className="app">
      <Router>
        <header className="app-header">
          <span className="profile">
            <Link className="username" to="/profile">Jessica Tran</Link>
            <img className="avatar" src="https://randomuser.me/api/portraits/thumb/women/50.jpg" alt="Jessica" />
          </span>
          <h1 className="text-center">
            <span className="page-title with-border-radius">
              Simple Tinder
            </span>
          </h1>
        </header>
        <main>
          <Suspense fallback={<Loading />}>
            <Switch>
              {routeList.map((route) => (
                <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />))
              }
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </main>
      </Router>
    </div>
  );
};

export default App;
