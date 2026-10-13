'use client';

import { Button } from '@/src/components/Button';
import { Input } from '@/src/components/Input';
import { PasswordInput } from '@/src/components/PasswordInput';
import { useAuth } from '@/src/hooks/useAuth';
import { api } from '@/src/http/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();

  async function handleLogin(event: SubmitEvent) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const loginData = Object.fromEntries(formData);

    try {
      const response = await api.post('/auth/login', loginData);
      const accessToken = response.data.access_token;
      signIn(accessToken);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <main className='flex flex-col justify-center items-center gap-4 w-full min-h-screen'>
        <h1 className='font-bold text-xl'>Faça login</h1>

        <form
          onSubmit={handleLogin}
          className='flex flex-col justify-center items-center gap-4'
        >
          <div className='flex flex-col'>
            <Input type='email' id='email' name='email' placeholder='E-mail' />
          </div>

          <div className='flex flex-col'>
            <PasswordInput id='password' name='password' placeholder='Senha' />
          </div>

          {/* <Button title='Login' /> */}
          <Button type='submit'>Login</Button>

          <span className='hover:underline cursor-pointer hover:opacity-90'>
            Esqueceu a senha?
          </span>
        </form>
      </main>
    </>
  );
}
