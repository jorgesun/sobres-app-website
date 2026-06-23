"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { syncNow } from "@/lib/supabase/sync";

type Mode = "signIn" | "signUp";

export default function LoginPage() {
  const configured = isSupabaseConfigured();
  const [mode, setMode] = useState<Mode>("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const sb = supabase();
    if (!sb) return;
    sb.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? null));
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function submit() {
    const sb = supabase();
    if (!sb) return;
    setBusy(true);
    setMessage(null);
    try {
      if (mode === "signUp") {
        const { error } = await sb.auth.signUp({ email, password });
        if (error) throw error;
        setMessage("Cuenta creada. Revisa tu correo para confirmar.");
      } else {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage("Sesión iniciada.");
      }
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Error de autenticación.");
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    const sb = supabase();
    if (!sb || !email) return;
    const { error } = await sb.auth.resetPasswordForEmail(email);
    setMessage(error ? error.message : "Correo de recuperación enviado.");
  }

  async function doSync() {
    const sb = supabase();
    if (!sb) return;
    setBusy(true);
    setMessage("Sincronizando…");
    try {
      await syncNow(sb);
      setMessage("Sincronización completa.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Error al sincronizar.");
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    await supabase()?.auth.signOut();
    setUserEmail(null);
    setMessage("Sesión cerrada.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-field px-5">
      <div className="w-full max-w-sm rounded-card bg-white p-8">
        <Link href="/" className="mb-6 flex items-center justify-center gap-2">
          <Image src="/icon.png" alt="Sobres" width={40} height={40} className="rounded-[10px]" />
          <span className="text-title font-bold text-ink">Sobres</span>
        </Link>

        {!configured ? (
          <div className="rounded-cardSm bg-orSoft p-4 text-sub text-orangeDk">
            La sincronización en la nube no está configurada. La app funciona
            100% local sin necesidad de iniciar sesión. Define{" "}
            <code>NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> para habilitarla.
            <div className="mt-4">
              <Link href="/app/budget" className="text-blue underline">
                Ir al presupuesto →
              </Link>
            </div>
          </div>
        ) : userEmail ? (
          <div className="space-y-4 text-center">
            <p className="text-body text-ink">
              Sesión activa: <strong>{userEmail}</strong>
            </p>
            <button
              onClick={doSync}
              disabled={busy}
              className="w-full rounded-button bg-blue py-3 text-button text-white disabled:opacity-40"
            >
              Sincronizar ahora
            </button>
            <Link
              href="/app/budget"
              className="block w-full rounded-button border border-line py-3 text-button text-ink"
            >
              Ir al presupuesto
            </Link>
            <button onClick={signOut} className="text-sub text-muted underline">
              Cerrar sesión
            </button>
            {message && <p className="text-label text-muted">{message}</p>}
          </div>
        ) : (
          <>
            <div className="mb-4 flex rounded-pill bg-field p-1">
              <button
                onClick={() => setMode("signIn")}
                className={`flex-1 rounded-pill py-2 text-sub font-semibold ${
                  mode === "signIn" ? "bg-white text-ink shadow" : "text-muted"
                }`}
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => setMode("signUp")}
                className={`flex-1 rounded-pill py-2 text-sub font-semibold ${
                  mode === "signUp" ? "bg-white text-ink shadow" : "text-muted"
                }`}
              >
                Crear cuenta
              </button>
            </div>
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3 w-full rounded-field border border-line px-3 py-2 text-input outline-none focus:border-blue"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 w-full rounded-field border border-line px-3 py-2 text-input outline-none focus:border-blue"
            />
            <button
              onClick={submit}
              disabled={busy || !email || !password}
              className="w-full rounded-button bg-blue py-3 text-button text-white disabled:opacity-40"
            >
              {mode === "signUp" ? "Crear cuenta" : "Entrar"}
            </button>
            {mode === "signIn" && (
              <button onClick={reset} className="mt-3 w-full text-label text-muted underline">
                ¿Olvidaste tu contraseña?
              </button>
            )}
            {message && (
              <p className="mt-4 text-center text-label text-muted">{message}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
