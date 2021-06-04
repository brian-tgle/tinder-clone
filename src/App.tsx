import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserRepository from './services/userRepository';
import { DEFAULT_API_PARAMS } from 'constant';
import Loading from 'components/loading';
import NotFound from 'pages/notFound';
import routeList from 'routes';
import 'styles/main.scss';

const App = () => {
  const { LIMIT, PAGE } = DEFAULT_API_PARAMS;
  useEffect(() => {
    UserRepository.getAll(LIMIT, PAGE).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-center">
          Simple Tinder
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
