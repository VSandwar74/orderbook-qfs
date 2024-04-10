import { SignIn, TradingRoom, Room } from './screens';
import { useAuthState } from 'react-firebase-hooks/auth'
import * as firebase from './services/firebase';
import RoomNav from './screens/RoomNav';
import {usePrivy} from '@privy-io/react-auth';
import Loading from './screens/Loading';

const App = () => {
  const {ready, authenticated, user} = usePrivy();
  // const [user] = useAuthState(firebase.auth);
  if (!ready) return <Loading/>// Add loading screen

  return (
    <div className="App">
      {authenticated ? <RoomNav /> : <SignIn/> }
    </div>
  )
}

export default App

