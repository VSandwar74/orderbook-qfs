import { SignIn, TradingRoom } from './screens';
import { useAuthState } from 'react-firebase-hooks/auth'
import * as firebase from './services/firebase';

const App = () => {

  const [user] = useAuthState(firebase.auth);

  return (
    <div className="App">
      {user ? <TradingRoom /> : <SignIn/> }
    </div>
  )
}

export default App
