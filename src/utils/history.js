import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';

const initializeReactGA = () => {
  ReactGA.initialize('UA-164158112-1');
  ReactGA.pageview('/homepage');
}

initializeReactGA();

const history = createBrowserHistory();
history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
})

export default history;