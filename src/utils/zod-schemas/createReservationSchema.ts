import z from 'zod';

export const createReservationSchema = z.object({
  laboratories: z.string().min(1, 'Selecione um laboratório'),
  reservationDate: z.string().min(1, 'A data é obrigatória'),
  startTime: z.iso.time({ error: 'A hora de início é obrigatória' }),
  finishTime: z.iso.time({ error: 'A hora de término é obrigatória' }),
});

export type CreateReservationZodType = z.infer<typeof createReservationSchema>;
