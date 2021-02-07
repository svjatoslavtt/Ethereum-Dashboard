import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Asset from './components/Asset';
import Token from './components/Token';
import ChartPart from './components/ChartPart';
import SearchAddress from './components/SearchAddress';

import Section from '../../shared/components/Section';
import Header from '../../shared/components/Header';
import {
  getAddress,
  getEthBalance,
  getLoadingState,
  getPieChartData,
  getTokens,
} from '../../redux/common/selectors';
import { Actions } from '../../redux/common/actions';
import { PieChartType, TokenItemType } from '../../shared/types/address.types';

type HomeTypes = {
  viewAddress: string;
};

const Home: React.FC<HomeTypes> = ({ viewAddress }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const tokens = useSelector(getTokens);
  const ethBalance = useSelector(getEthBalance);
  const pieChartData = useSelector(getPieChartData);
  const isLoading = useSelector(getLoadingState);
  const address = useSelector(getAddress);

  const handleBackToProfile = () => {
    history.push('/');

    if (!address) {
      dispatch(Actions.clearPieChartData());
    }
  };

  const handleLogin = () => {
    dispatch(Actions.loginRequest());
  };

  const formatter = new Intl.NumberFormat('en', {
    notation: 'compact',
  });

  const formattedData = {
    eth: formatter.format(Number(ethBalance)),
  };

  let pieChartTotalValue = 0;

  pieChartData.forEach((item: PieChartType) => {
    pieChartTotalValue += item.value;
  });

  return (
    <>
      <Header />

      <main className='w-full max-w-screen-lg px-5 mx-auto mb-20'>
        <SearchAddress />

        {viewAddress && (
          <section className='w-full sm:flex-row sm:items-center flex justify-between mb-5 bg-white p-4 rounded-md flex-col'>
            <div className='flex flex-col w-full sm:mb-0 mb-3'>
              <span className='text-2xl mb-2'>Address</span>
              <span className='text-md block overflow-hidden overflow-ellipsis'>
                {viewAddress}
              </span>
            </div>

            <button
              onClick={handleBackToProfile}
              className='bg-gray-700 rounded-md hover:bg-gray-600 text-white transition-all focus:outline-none py-2 px-10'
            >
              Back
            </button>
          </section>
        )}

        <section className='bg-white rounded-md p-4'>
          <Section title='Asset distribution'>
            <div className='w-full flex md:flex-row md:justify-between flex-col items-center'>
              <div className='flex items-center justify-center w-8/12 md:mb-0 mb-16'>
                {!isLoading ? (
                  pieChartTotalValue ? (
                    <div className='w-full flex items-center flex-col'>
                      <div className='w-full max-w-sm flex flex-wrap justify-between mb-7 max-h-20 overflow-hidden overflow-y-auto'>
                        {pieChartData.map((item: PieChartType, idx: number) => (
                          <ChartPart
                            key={idx}
                            color={item.color}
                            title={item.title}
                          />
                        ))}
                      </div>

                      <PieChart
                        className='w-60 overflow-visible'
                        totalValue={pieChartTotalValue}
                        data={pieChartData}
                        segmentsShift={0}
                      />
                    </div>
                  ) : (
                    <div className='uppercase'>Not enough data</div>
                  )
                ) : (
                  <div>Loading...</div>
                )}
              </div>

              <div className='md:w-3/12 flex flex-col md:justify-center w-full'>
                <Asset
                  title='eth balance'
                  balance={`${formattedData.eth} eth`}
                />
                <Asset
                  title='total usd'
                  balance={`$ ${formatter.format(pieChartTotalValue)}`}
                />
                <Asset
                  title='total tokens'
                  balance={(tokens && String(tokens.length)) ?? '0'}
                />
              </div>
            </div>
          </Section>

          <Section title='Token balances' icon={true}>
            <div className='w-full overflow-hidden overflow-x-auto'>
              {address || viewAddress ? (
                !isLoading ? (
                  <table
                    className='w-full border border-gray-300 mb-10'
                    style={{ minWidth: '800px' }}
                  >
                    <tbody>
                      {tokens &&
                        tokens.limit &&
                        tokens.limit.map((item: TokenItemType, idx: number) => {
                          return (
                            <Token
                              key={idx}
                              index={idx}
                              contract_ticker_symbol={
                                item.contract_ticker_symbol
                              }
                              balance={item.balance}
                              quote={item.quote}
                            />
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  <div className='text-center'>Loading...</div>
                )
              ) : (
                <div className='w-full flex items-center justify-center h-40 bg-gray-100'>
                  <span className='text-xl font-black text-gray-500'>
                    Please,{' '}
                    <span
                      onClick={handleLogin}
                      className='underline cursor-pointer'
                    >
                      login
                    </span>{' '}
                    to see your token balances
                  </span>
                </div>
              )}

              {!isLoading && tokens && tokens?.length > 9 ? (
                <div className='flex justify-center'>
                  <button className='bg-gray-700 rounded-md hover:bg-gray-600 text-white transition-all focus:outline-none py-2 px-10'>
                    Load more
                  </button>
                </div>
              ) : null}
            </div>
          </Section>
        </section>
      </main>
    </>
  );
};

export default Home;
