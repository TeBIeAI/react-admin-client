import store from './store'
import { Provider } from 'react-redux'
import AppRouter from './router'

import '@/assets/styles/common.less'

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
