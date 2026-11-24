'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Aside } from '@/src/components/Aside';
import { Container } from '@/src/components/Container';
import { useAuth } from '@/src/hooks/useAuth';
import { useFetchLaboratories } from '@/src/hooks/useFetchLaboratories';
import { api } from '@/src/http/api';
import { ILaboratory } from '@/src/interfaces/ILaboratory';
import {
  createReservationSchema,
  CreateReservationZodType,
} from '@/src/utils/zod-schemas/createReservationSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ReservationPage() {
  const [laboratories, setLaboratories] = useState<ILaboratory[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createReservationSchema),
    defaultValues: {
      laboratories: laboratories[0]?.id,
    },
  });
  const { user } = useAuth();

  async function handleCreateReservation(
    createReservationData: CreateReservationZodType,
  ) {
    const laboratoryId = createReservationData.laboratories;

    const reservationDate = createReservationData.reservationDate;
    const startTime = createReservationData.startTime;
    const finishTime = createReservationData.finishTime;

    const reservationData = {
      userId: user?.sub,
      startTime: new Date(`${reservationDate}T${startTime}:00`).toISOString(),
      finishTime: new Date(`${reservationDate}T${finishTime}:00`).toISOString(),
    };

    try {
      const reservation = await api.post(
        `/reservations/${laboratoryId}`,
        reservationData,
      );
      console.log(reservation);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchLaboratories() {
      const laboratories = (await useFetchLaboratories()) ?? [];
      setLaboratories(laboratories);
    }

    fetchLaboratories();
  }, []);

  return (
    <div className='flex'>
      <Aside />
      <Container>
        <h1 className='font-bold text-2xl text-zinc-800'>
          Fazer reserva de laboratório
        </h1>

        <form
          onSubmit={handleSubmit(handleCreateReservation)}
          className='flex flex-col gap-4 max-w-lg'
        >
          <div className='flex flex-col gap-1'>
            <div className='flex flex-col gap-2 w-fit'>
              <label htmlFor='laboratories' className='font-bold'>
                Selecione o laboratório
              </label>
              <select
                id='laboratories'
                className='px-2 py-1 border border-zinc-400 rounded-md shadow'
                {...register('laboratories')}
              >
                {laboratories.length > 0 ? (
                  laboratories.map((laboratory) => (
                    <option key={laboratory.id} value={laboratory.id}>
                      {laboratory.name}
                    </option>
                  ))
                ) : (
                  <option value=''>Carregando...</option>
                )}
              </select>
            </div>
            {errors.laboratories?.message && (
              <span className='font-bold text-sm text-red-600'>
                {errors.laboratories?.message}
              </span>
            )}
          </div>

          <div className='flex flex-col gap-1'>
            <div className='flex flex-col gap-2 w-fit'>
              <label htmlFor='reservationDate' className='font-bold'>
                Data da reserva
              </label>
              <input
                type='date'
                id='reservationDate'
                className='px-2 py-1 border border-zinc-400 rounded-md shadow'
                {...register('reservationDate')}
              />
            </div>
            {errors.reservationDate?.message && (
              <span className='font-bold text-sm text-red-600'>
                {errors.reservationDate.message}
              </span>
            )}
          </div>

          <div className='flex gap-10'>
            <div className='flex flex-col gap-1'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='startTime' className='font-bold'>
                  Hora de início
                </label>
                <input
                  type='time'
                  id='startTime'
                  className='px-2 py-1 border border-zinc-400 rounded-md shadow'
                  {...register('startTime')}
                />
              </div>
              {errors.startTime?.message && (
                <span className='font-bold text-sm text-red-600'>
                  {errors.startTime.message}
                </span>
              )}
            </div>

            <div className='flex flex-col gap-1'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='finishTime' className='font-bold'>
                  Hora de término
                </label>
                <input
                  type='time'
                  id='finishTime'
                  className='px-2 py-1 border border-zinc-400 rounded-md shadow'
                  {...register('finishTime')}
                />
              </div>
              {errors.finishTime?.message && (
                <span className='font-bold text-sm text-red-600'>
                  {errors.finishTime.message}
                </span>
              )}
            </div>
          </div>

          <button
            type='submit'
            className='mt-2 px-3 py-2 text-white rounded-sm bg-cyan-700 hover:bg-cyan-600 transition-colors durantion-300 cursor-pointer'
          >
            Reservar
          </button>
        </form>
      </Container>
    </div>
  );
}
