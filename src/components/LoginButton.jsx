import {usePrivy} from '@privy-io/react-auth';
import { FcGoogle } from 'react-icons/fc';

const LoginButton = () => {
  const {ready, authenticated, login} = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    <button 
        disabled={disableLogin}
        onClick={login}
        className="border-4 border-violet-900 flex flex-row items-center bg-white rounded-lg p-4 mt-20"
        >
        <FcGoogle
            className="mr-4"
        />
        <p className="text-violet-900"> 
            Sign in with Google!
        </p>    
    </button>
  )
}

export default LoginButton;