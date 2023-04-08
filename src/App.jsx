import { SignIn, TradingRoom, Room } from './screens';
import { useAuthState } from 'react-firebase-hooks/auth'
import * as firebase from './services/firebase';

const App = () => {

  const [user] = useAuthState(firebase.auth);

  return (
    <div className="App">
      {user ? <Room /> : <SignIn/> }
    </div>
  )
}

export default App
