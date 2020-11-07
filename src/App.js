import { Route } from 'react-router-dom';
import './App.css';
import CounterContainer from './containers/CounterContainer';
import PostListContainer from './containers/PostListContainer';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <div className="App">
      <Route path="/" component={PostListPage} exact={true} />
      <Route path="/:id" component={PostPage} />
      <CounterContainer />
    </div>
  );
}

export default App;
