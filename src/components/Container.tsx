export function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex flex-1 flex-col gap-10 p-6 min-h-screen bg-white'>
      {children}
    </main>
  );
}
