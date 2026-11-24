'use client';

import { useEffect, useState } from 'react';
import { CiLogout } from 'react-icons/ci';
import { FaComputer, FaNetworkWired, FaRegClock } from 'react-icons/fa6';

import { useAuth } from '../hooks/useAuth';
import { api } from '../http/api';
import { ILaboratory } from '../interfaces/ILaboratory';
import { ITINERARIES, LABORATORIES, RESERVATIONS } from '../utils/mocks';
import { Container } from '../components/Container';
import { Aside } from '../components/Aside';

export default function Home() {
  const [laboratories, setLaboratories] = useState<ILaboratory[]>();
  const { user } = useAuth();

  async function handleFetchLaboratories() {
    try {
      const { data: laboratories } = await api.get('/laboratories');
      console.log(laboratories);
      setLaboratories(laboratories);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleFetchLaboratories();
  }, []);

  return (
    <div className='flex justify-center bg-red-50'>
      <Aside />

      <Container>
        <header className='flex justify-end'>
          <div className='flex items-center gap-3'>
            <div className='flex flex-col items-end'>
              <span className='text-lg font-bold text-gray-700'>
                Nome do usuário
              </span>
              <span className='text-sm font-light text-zinc-800'>
                {user?.email}
              </span>
            </div>
            <div className='w-12 h-12 rounded-full bg-gray-700' />
          </div>
        </header>

        <section className='flex flex-col gap-5'>
          <h1 className='text-2xl text-zinc-700 font-bold'>Laboratórios</h1>

          <div className='flex flex-wrap justify-center md:justify-start gap-5'>
            {laboratories ? (
              laboratories.map((lab) => (
                <div
                  key={lab.id}
                  className='flex flex-col items-center justify-center border border-blue-200 bg-blue-50 h-24 w-52 p-4 rounded-lg hover:border-blue-300 cursor-pointer transition-all'
                >
                  <span className='text-center text-gray-800 font-bold'>
                    {lab.name}
                  </span>
                </div>
              ))
            ) : (
              <span>Não há laboratórios cadastrados</span>
            )}
          </div>
        </section>

        <section className='flex flex-col'>
          <h1 className='text-2xl text-zinc-700 font-bold'>Agendamentos</h1>

          <span className='mt-4 mb-2'>Segunda-feira, 19 de Outubro</span>

          <div className='flex flex-col gap-2'>
            {RESERVATIONS.map((reservation) => (
              <div
                key={reservation.id}
                className='flex gap-2 items-center max-w-4xl text-sm border-l-6 border-blue-900 bg-white p-2 rounded-lg border-t border-b border-r cursor-pointer hover:bg-blue-50 hover:translate-x-1 transition-all'
              >
                <FaRegClock size={16} />
                <span>
                  {reservation.startTime}-{reservation.finishTime}
                </span>
                <span>-</span>
                <span className='text-center text-gray-800'>
                  {reservation.reservedTo}
                </span>
                <span>-</span>
                <span>{reservation.local}</span>
              </div>
            ))}
          </div>
        </section>

        <section className='flex flex-col'>
          <h1 className='text-2xl text-zinc-700 font-bold'>
            Itenerário de Aulas
          </h1>

          <span className='mt-4 mb-2'>Dessa semana</span>

          <div className='flex flex-col gap-2'>
            {ITINERARIES.map((itinerary) => (
              <div
                key={itinerary.id}
                className={`flex gap-2 items-center max-w-4xl text-sm border-l-6 ${itinerary.local === LABORATORIES[0].name ? 'border-blue-900 hover:bg-blue-50' : 'border-green-900 hover:bg-green-50'} bg-white p-2 rounded-lg border-t border-b border-r cursor-pointer hover:translate-x-1 transition-all`}
              >
                {LABORATORIES[0].name === itinerary.local ? (
                  <FaComputer size={18} />
                ) : (
                  <FaNetworkWired size={18} />
                )}
                <span>
                  {itinerary.startTime}-{itinerary.finishTime}
                </span>
                <span>-</span>
                <span className='text-center text-gray-800'>
                  {itinerary.reservedTo}
                </span>
                <span>-</span>
                <span className='text-center text-gray-800'>
                  {itinerary.local}
                </span>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
