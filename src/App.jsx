import { SignIn, TradingRoom, Room } from './screens';
import { useAuthState } from 'react-firebase-hooks/auth'
import * as firebase from './services/firebase';
import RoomNav from './screens/RoomNav';

const App = () => {

  const [user] = useAuthState(firebase.auth);

  return (
    <div className="App">
      {user ? <RoomNav /> : <SignIn/> }
    </div>
  )
}

export default App
