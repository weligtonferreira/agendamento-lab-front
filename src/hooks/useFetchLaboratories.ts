import { api } from '../http/api';
import { ILaboratory } from '../interfaces/ILaboratory';

export const useFetchLaboratories = async (): Promise<
  ILaboratory[] | undefined
> => {
  try {
    const { data: laboratories } = await api.get('/laboratories');
    return laboratories;
  } catch (error) {
    console.log(error);
  }
};
