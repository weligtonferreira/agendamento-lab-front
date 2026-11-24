'use client';

import { CiLogout } from 'react-icons/ci';
import { useAuth } from '../hooks/useAuth';

export function Aside() {
  const { signOut } = useAuth();

  return (
    <aside className='flex flex-col justify-between px-6 py-10 bg-gray-300'>
      <nav className='flex'>
        <ul className='flex flex-col'>
          <li className='p-1 hover:bg-gray-400 transition-colors rounded-sm cursor-pointer'>
            Horários
          </li>
          <li className='p-1 hover:bg-gray-400 transition-colors rounded-sm cursor-pointer'>
            Agendamentos
          </li>
          <li className='p-1 hover:bg-gray-400 transition-colors rounded-sm cursor-pointer'>
            Notificações
          </li>
          <li className='p-1 hover:bg-gray-400 transition-colors rounded-sm cursor-pointer'>
            Laboratórios
          </li>
          <li className='p-1 hover:bg-gray-400 transition-colors rounded-sm cursor-pointer'>
            Monitores
          </li>
        </ul>
      </nav>

      <button
        onClick={signOut}
        className='py-2 px-1 rounded-lg text-zinc-700 border border-transparent hover:border-gray-400 transition-all cursor-pointer'
      >
        <div className='flex justify-center items-center gap-2'>
          <span className='text-xl'>Sair</span>
          <CiLogout size={20} className='text-zinc-700' />
        </div>
      </button>
    </aside>
  );
}
