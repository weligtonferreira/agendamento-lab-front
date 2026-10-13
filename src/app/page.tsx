'use client';

import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <div className='flex items-center justify-center bg-zinc-50 min-h-dvh'>
      <aside className='flex flex-col justify-between px-6 py-10 bg-gray-300 min-w-56 min-h-dvh'>
        <nav>
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
          className='text-lg py-2 px-1 rounded-lg hover:bg-gray-400 hover:text-gray-300 transition-colors cursor-pointer'
        >
          Sair
        </button>
      </aside>

      <main className='flex flex-1 flex-col p-6 bg-gray-500 min-h-screen'>
        <header className='flex justify-end'>
          <div className='flex items-center gap-3'>
            <div className='flex flex-col items-end'>
              <span className='text-lg font-bold text-gray-700'>
                Nome do usuário
              </span>
              <span className='text-xs font-light text-white'>
                {user?.email}
              </span>
            </div>
            <div className='w-12 h-12 rounded-full bg-gray-700' />
          </div>
        </header>
      </main>
    </div>
  );
}
