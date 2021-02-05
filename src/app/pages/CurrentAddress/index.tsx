import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Actions } from '../../redux/common/actions';

import Home from '../Home';

const CurrentAddress: React.FC = () => {
 const dispatch = useDispatch();
 const { address }: { address: string } = useParams();

 useEffect(() => {
  if (address) {
   dispatch(Actions.getBalancesRequest({ address }));
  }
 }, [address, dispatch]);

 return <Home viewAddress={address} />;
};

export default CurrentAddress;
