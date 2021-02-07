import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SearchAddress: React.FC = () => {
  const history = useHistory();

  const searchAddressInitialState = {
    address: '',
  };

  const [searchAddress, setSearchAddress] = useState<{ address: string }>(
    searchAddressInitialState
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress({
      address: event.target.value,
    });
  };

  const handleSubmitAddress = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchAddress.address) {
      history.push(searchAddress.address);
      setSearchAddress(searchAddressInitialState);
    }
  };

  return (
    <form
      className='flex justify-between w-full mb-5'
      onSubmit={handleSubmitAddress}
    >
      <input
        type='text'
        name='address'
        placeholder='Put your address 0x...'
        className='w-full rounded-l-md py-2 px-5 outline-none'
        onChange={handleInputChange}
        value={searchAddress.address}
      />
      <button className='border rounded-r-md border-l-0 hover:bg-gray-700 hover:text-white transition-all focus:outline-none py-2 px-5 shadow-inner'>
        Search
      </button>
    </form>
  );
};

export default SearchAddress;
