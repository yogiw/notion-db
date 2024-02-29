'use client';
import { loginAction } from '../actions';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Login = () => {
  const router = useRouter();
  const [state, formAction] = useFormState(loginAction, null);

  useEffect(() => {
    if (state?.status === 'ok') {
      router.replace('/');
    }
  }, [state, router]);

  return (
    <main className="bg-slate-100 min-h-screen flex justify-center items-center p-4">
      <div className="bg-white p-10 rounded border border-slate-200">
        <form action={formAction} className="flex flex-col gap-4 w-96">
          <input
            placeholder="Username"
            type="text"
            name="username"
            className="rounded p-2 border-slate-200 border"
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            className="rounded p-2 border-slate-200 border"
          />

          <button
            type="submit"
            className="rounded-full bg-green-300 text-green-800 p-2 font-medium"
          >
            Login
          </button>

          {state?.status === 'error' && (
            <p className="bg-red-100 p-1 rounded text-red-800 font-medium">
              Incorect password
            </p>
          )}
        </form>
      </div>
    </main>
  );
};

export default Login;
