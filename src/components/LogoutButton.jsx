import {usePrivy} from '@privy-io/react-auth';

const LogoutButton = () => {
  const {ready, authenticated, logout} = usePrivy();
  // Disable logout when Privy is not ready or the user is not authenticated
  const disableLogout = !ready || (ready && !authenticated);

  return (
    <button 
        disabled={disableLogout}
        onClick={logout}
        className="border-4 border-violet-900 flex flex-row items-center bg-white rounded-lg p-4"
        >
        <p className="text-violet-900"> 
            Log out
        </p>    
    </button>
  );
}

export default LogoutButton;