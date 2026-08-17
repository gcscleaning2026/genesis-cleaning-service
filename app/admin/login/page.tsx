'use client';

import { useActionState } from 'react';
import { login, type LoginState } from './actions';

const field = { padding: 10, border: '1px solid #E3ECF3', borderRadius: 8, fontSize: 15 };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, {} as LoginState);
  return (
    <main style={{ maxWidth: 360, margin: '96px auto', padding: 24 }}>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>Reviews sign in</h1>
      <form action={formAction} style={{ display: 'grid', gap: 12 }}>
        <input name="user" placeholder="Username" autoComplete="username" required style={field} />
        <input name="password" type="password" placeholder="Password" autoComplete="current-password" required style={field} />
        <button
          type="submit"
          disabled={pending}
          style={{ padding: '10px 18px', borderRadius: 999, border: 0, background: '#D42A80', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
        >
          {pending ? 'Checking…' : 'Sign in'}
        </button>
        {state?.error && <p role="alert" style={{ color: '#B3123F', margin: 0 }}>{state.error}</p>}
      </form>
    </main>
  );
}
