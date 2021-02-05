import React from 'react';

type TokenTypes = {
  contract_ticker_symbol: string;
  balance: string;
  quote: number;
  index: number;
};

const Token: React.FC<TokenTypes> = ({
  contract_ticker_symbol,
  balance,
  quote,
  index,
}) => {
  const formatter = new Intl.NumberFormat('en', {
    notation: 'compact',
  });
  const formattedBalance = formatter.format(Number(balance));
  const formattedQuote = formatter.format(quote);

  const isEvenNumber = index % 2 === 0;

  return (
    <tr className={`${isEvenNumber ? 'bg-white' : 'bg-gray-50'}`}>
      <td className='p-4'>{contract_ticker_symbol}</td>
      <td className='p-4 text-center'>{`${formattedBalance} ${contract_ticker_symbol}`}</td>
      <td className='p-4 text-center'>{`$${formattedQuote}`}</td>

      <td className='p-4 text-right'>
        <button className='focus:outline-none hover:bg-gray-700 hover:text-white transition-all bg-gray-200 px-12 py-1 text-gray-500 text-sm'>
          View contract
        </button>
      </td>
    </tr>
  );
};

export default Token;
