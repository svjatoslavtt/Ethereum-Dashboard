import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { Actions } from '../../redux/common/actions';
import { getAddress } from '../../redux/common/selectors';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params: { address: string } = useParams();

  const address = useSelector(getAddress);

  const { ethereum } = window as any;

  const handleLogin = () => {
    if (!address) {
      dispatch(Actions.loginRequest());
    }
  };

  const handleAccountChange = useCallback(
    (accounts: Array<string>) => {
      if (accounts[0]) {
        dispatch(Actions.switchAccount({ address: accounts[0] }));
        localStorage.setItem('address', accounts[0]);
      } else {
        localStorage.removeItem('address');
        dispatch(Actions.logout());
      }

      history.push('/');
    },
    [dispatch, history]
  );

  useEffect(() => {
    ethereum.on('accountsChanged', handleAccountChange);

    return () => {
      ethereum.removeAllListeners('accountsChanged', handleAccountChange);
    };
  }, [ethereum, handleAccountChange]);

  useEffect(() => {
    if (address && !params.address) {
      dispatch(Actions.getBalancesRequest({ address }));
    }
  }, [address, dispatch, params.address]);

  return (
    <header className='w-full max-w-screen-xl mx-auto flex justify-between items-center h-20 px-5 mb-10'>
      <h1 className='text-2xl uppercase'>Quick Dashboard</h1>
      <div onClick={handleLogin} className='flex items-center cursor-pointer'>
        {!address ? (
          <span>Login</span>
        ) : (
          <span>
            {address.substring(0, 8) +
              '...' +
              address.substring(address.length - 8, address.length)}
          </span>
        )}
        <i className='far fa-user-circle text-3xl ml-2' />
      </div>
    </header>
  );
};

export default Header;
