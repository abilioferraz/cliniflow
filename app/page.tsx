import Image from "next/image";
import {
  CalendarCheck2,
  Camera,
 CircleUserRound,
 ClipboardList,
 HeartPulse,
 Lock,
 MessageSquareText,
 ShieldCheck,
 Stethoscope,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f2f3] p-3 md:p-5">
      <section className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1360px] flex-col overflow-hidden rounded-[28px] border border-[#eadbe0] bg-[#fdf8f8] shadow-sm">
        <div className="grid flex-1 grid-cols-1 lg:grid-cols-[1.25fr_0.85fr]">
          <div className="flex flex-col border-b border-[#efdee3] p-8 lg:border-b-0 lg:border-r lg:p-10">
            <div className="flex items-center gap-3">
              <HeartPulse className="h-8 w-8 text-[#801B33]" />
              <div>
                <p className="text-4xl leading-8 font-semibold text-[#801B33]">CliniFlow</p>
                <p className="mt-1 text-sm text-[#6e6a6b]">Cuidado que te acompanha</p>
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]">
              <div className="space-y-5">
                <h1 className="max-w-[480px] text-5xl leading-[1.05] font-semibold tracking-tight text-[#2f2a2b]">
                  Sua saude merece atencao completa.
                </h1>
                <p className="max-w-[420px] text-xl leading-relaxed text-[#5e585a]">
                  Consultas online com seguranca, preparo inteligente e acompanhamento que faz a
                  diferenca.
                </p>

                <div className="grid max-w-[580px] grid-cols-1 gap-4 pt-2 md:grid-cols-3">
                  <FeatureIcon
                    icon={<MessageSquareText className="h-5 w-5" />}
                    title="Preparacao inteligente"
                    text="Chegue pronto para sua consulta"
                  />
                  <FeatureIcon
                    icon={<ShieldCheck className="h-5 w-5" />}
                    title="Atendimento seguro"
                    text="Profissionais verificados e certificados"
                  />
                  <FeatureIcon
                    icon={<ClipboardList className="h-5 w-5" />}
                    title="Acompanhamento completo"
                    text="Orientacoes claras antes e depois"
                  />
                </div>
              </div>

              <div className="relative min-h-[340px] overflow-hidden rounded-[22px] bg-[#efe7e7] lg:min-h-[460px]">
                <Image
                  src="/assets/designer/00.png"
                  alt="Paciente usando smartphone"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#6e132b] via-[#801B33] to-[#8d2440] p-5 text-white">
              <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                <Metric value="+ 25" label="Especialidades medicas" />
                <Metric value="24h" label="Atendimento disponivel" />
                <Metric value="100%" label="Sigiloso e em conformidade com a LGPD" />
                <Metric value="4,9/5" label="Avaliacao dos pacientes" />
              </div>
            </div>

            <div className="mt-7 rounded-2xl bg-[#f8f2f2] p-5">
              <h2 className="text-center text-3xl font-semibold text-[#2f2a2b]">Como funciona</h2>
              <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
                <FlowStep icon={<ClipboardList className="h-5 w-5" />} step={1} text="Conte seus sintomas de forma guiada" />
                <FlowStep icon={<CircleUserRound className="h-5 w-5" />} step={2} text="Aguarde na fila com transparencia" />
                <FlowStep icon={<Camera className="h-5 w-5" />} step={3} text="Realize sua consulta online" />
                <FlowStep icon={<CalendarCheck2 className="h-5 w-5" />} step={4} text="Receba orientacoes claras e acompanhe" />
              </div>
            </div>
          </div>

          <aside className="flex flex-col bg-[#fbf6f6] p-8 lg:p-10">
            <div className="mb-5 flex items-center justify-end text-sm text-[#6f696b]">
              <button className="hover:text-[#801B33]">Precisa de ajuda?</button>
            </div>
            <div className="mx-auto w-full max-w-[420px] rounded-2xl border border-[#efdee3] bg-white p-7 shadow-sm">
              <h3 className="text-center text-4xl font-semibold text-[#302a2c]">Acesse sua conta</h3>
              <p className="mt-2 text-center text-sm text-[#7a7577]">
                Entre para cuidar do que mais importa.
              </p>

              <div className="mt-7 space-y-4">
                <InputField label="E-mail ou CPF" placeholder="Digite seu e-mail ou CPF" />
                <InputField label="Senha" placeholder="Digite sua senha" isPassword />
                <div className="text-right text-sm text-[#801B33] hover:underline">Esqueci minha senha</div>
                <button className="w-full rounded-xl bg-[#801B33] py-3.5 text-lg font-semibold text-white transition hover:bg-[#6c152c]">
                  Entrar
                </button>
                <div className="text-center text-xs uppercase tracking-[0.2em] text-[#a39ea0]">ou</div>
                <button className="w-full rounded-xl border border-[#e6d4da] py-3.5 text-base font-medium text-[#801B33] transition hover:bg-[#fbf0f3]">
                  Entrar com biometria
                </button>
                <p className="text-center text-sm text-[#787275]">
                  Ainda nao tem conta? <span className="font-semibold text-[#801B33]">Criar conta</span>
                </p>
              </div>
            </div>

            <div className="mt-auto grid grid-cols-1 gap-3 pt-7 text-sm text-[#605c5d] sm:grid-cols-3">
              <BottomPill icon={<ShieldCheck className="h-4 w-4" />} text="Seus dados protegidos" />
              <BottomPill icon={<Lock className="h-4 w-4" />} text="Ambiente seguro e criptografado" />
              <BottomPill icon={<Stethoscope className="h-4 w-4" />} text="Profissionais verificados" />
            </div>
          </aside>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 bg-[#6d132b] px-6 py-4 text-xs text-white md:px-10">
          <p>Plataforma 100% segura e em conformidade com a LGPD</p>
          <p>© 2024 CliniFlow. Todos os direitos reservados.</p>
          <p>Termos de uso | Politica de privacidade</p>
        </footer>
      </section>
    </main>
  );
}

function FeatureIcon({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <article className="flex gap-2 text-[#4e494a]">
      <div className="mt-0.5 text-[#801B33]">{icon}</div>
      <div>
        <p className="text-sm font-semibold leading-5">{title}</p>
        <p className="text-xs text-[#746f71]">{text}</p>
      </div>
    </article>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-white/20 md:border-r md:last:border-r-0">
      <p className="text-3xl font-bold">{value}</p>
      <p className="mx-auto mt-1 max-w-[140px] text-xs text-white/90">{label}</p>
    </div>
  );
}

function FlowStep({ icon, step, text }: { icon: React.ReactNode; step: number; text: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-[#801B33]">{icon}</div>
      <div className="mx-auto mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#f0dfe4] text-[10px] font-bold text-[#801B33]">
        {step}
      </div>
      <p className="mt-2 text-xs leading-4 text-[#575254]">{text}</p>
    </div>
  );
}

function InputField({
  label,
  placeholder,
  isPassword = false,
}: {
  label: string;
  placeholder: string;
  isPassword?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[#4f4b4d]">{label}</span>
      <input
        type={isPassword ? "password" : "text"}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#e6d6db] bg-[#fbfbfb] px-4 py-3 text-sm outline-none transition focus:border-[#801B33]"
      />
    </label>
  );
}

function BottomPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-[#ebdce1] bg-white px-3 py-2">
      <span className="text-[#801B33]">{icon}</span>
      <span className="text-xs">{text}</span>
    </div>
  );
}
