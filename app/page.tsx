 "use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";
import {
  AtSign,
  Bell,
  CalendarCheck2,
  Camera,
  ChevronRight,
  CircleHelp,
  CircleUserRound,
  ClipboardList,
  Ellipsis,
  Eye,
  Fingerprint,
  HeartPulse,
  Lock,
  MessageSquareText,
  Mic,
  PhoneOff,
  Search,
  Share2,
  ShieldCheck,
  Siren,
  Stethoscope,
  Thermometer,
  Video,
} from "lucide-react";

type Screen =
  | "login"
  | "motivo"
  | "sintomas"
  | "resumo"
  | "fila"
  | "consulta"
  | "posConsulta";

const MENU_STEPS = [
  "Motivo da consulta",
  "Sintomas",
  "Resumo das informacoes",
  "Fila de atendimento",
  "Consulta com o medico",
  "Pos-consulta",
];

const MOTIVOS = [
  { icon: <Siren className="h-5 w-5" />, title: "Dores", subtitle: "Dor de cabeca, muscular, nas costas, etc." },
  { icon: <Thermometer className="h-5 w-5" />, title: "Febre", subtitle: "Febre alta, calafrios e suores." },
  { icon: <Stethoscope className="h-5 w-5" />, title: "Problemas digestivos", subtitle: "Nausea, azia, dor abdominal." },
  { icon: <Siren className="h-5 w-5" />, title: "Gripe ou resfriado", subtitle: "Tosse, coriza, dor de garganta." },
  { icon: <HeartPulse className="h-5 w-5" />, title: "Saude mental", subtitle: "Ansiedade, estresse, insonia." },
  { icon: <Ellipsis className="h-5 w-5" />, title: "Outros", subtitle: "Outros sintomas ou condicoes." },
];

const SINTOMAS = [
  { icon: <Siren className="h-5 w-5" />, title: "Dor", subtitle: "Em qualquer regiao do corpo" },
  { icon: <Thermometer className="h-5 w-5" />, title: "Febre", subtitle: "Febre alta, calafrios e suores" },
  { icon: <Siren className="h-5 w-5" />, title: "Tosse", subtitle: "Seca ou com catarro" },
  { icon: <Stethoscope className="h-5 w-5" />, title: "Falta de ar", subtitle: "Dificuldade para respirar" },
  { icon: <HeartPulse className="h-5 w-5" />, title: "Nauseas ou vomitos", subtitle: "Enjoo e mal-estar" },
  { icon: <ClipboardList className="h-5 w-5" />, title: "Diarreia", subtitle: "Evacuacoes frequentes" },
  { icon: <Thermometer className="h-5 w-5" />, title: "Cansaco extremo", subtitle: "Fadiga ou fraqueza" },
  { icon: <Ellipsis className="h-5 w-5" />, title: "Outros sintomas", subtitle: "Sintomas nao listados" },
];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("login");
  const [selectedMotivo, setSelectedMotivo] = useState("Dores");
  const [selectedSintomas, setSelectedSintomas] = useState<string[]>(["Dor"]);
  const [descricaoSintomas, setDescricaoSintomas] = useState("");

  const canContinueFromSymptoms =
    selectedSintomas.length > 0 || descricaoSintomas.trim().length > 0;

  return (
    <main
      className={`min-h-screen bg-[#f5f2f3] ${screen === "login" ? "p-1 md:p-2" : "p-3 md:p-5"}`}
    >
      <AnimatePresence mode="wait">
        {screen === "login" ? (
          <motion.section
            key="login"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1360px] flex-col overflow-hidden rounded-[28px] border border-[#eadbe0] bg-[#fdf8f8] shadow-sm"
          >
            <div className="grid flex-1 grid-cols-1 lg:grid-cols-[1.25fr_0.85fr]">
              <div className="flex flex-col border-b border-[#efdee3] p-6 lg:border-b-0 lg:border-r lg:p-8">
                <div className="flex items-center gap-2">
                  <HeartPulse className="h-8 w-8 text-[#801B33]" />
                  <div>
                    <p className="text-3xl leading-7 font-semibold text-[#801B33]">CliniFlow</p>
                    <p className="mt-1 text-xs text-[#6e6a6b]">Cuidado que te acompanha</p>
                  </div>
                </div>
                <div className="mt-8 space-y-6">
                  <h1 className="max-w-[620px] text-4xl leading-[1.08] font-semibold tracking-tight text-[#2f2a2b] md:text-5xl xl:text-6xl">
                    Sua saude merece atencao completa.
                  </h1>
                  <p className="max-w-[620px] text-lg leading-relaxed text-[#5e585a] md:text-xl">
                    Consultas online com seguranca, preparo inteligente e acompanhamento que faz a
                    diferenca.
                  </p>

                  <div className="relative h-[280px] w-full max-w-[540px] overflow-hidden rounded-[22px] bg-[#efe7e7] md:h-[320px] lg:h-[340px]">
                    <Image
                      src="/assets/designer/00.png"
                      alt="Paciente usando smartphone"
                      fill
                      className="object-cover object-[62%_34%]"
                      priority
                    />
                  </div>

                  <div className="grid max-w-[620px] grid-cols-1 gap-4 pt-1 md:grid-cols-2 xl:grid-cols-3">
                    <FeatureIcon icon={<MessageSquareText className="h-5 w-5" />} title="Preparacao inteligente" text="Chegue pronto para sua consulta" />
                    <FeatureIcon icon={<ShieldCheck className="h-5 w-5" />} title="Atendimento seguro" text="Profissionais verificados e certificados" />
                    <FeatureIcon icon={<ClipboardList className="h-5 w-5" />} title="Acompanhamento completo" text="Orientacoes claras antes e depois" />
                  </div>
                </div>
                <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#6e132b] via-[#801B33] to-[#8d2440] p-5 text-white">
                  <div className="grid grid-cols-2 gap-4 text-center lg:grid-cols-4">
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
                  <button className="inline-flex items-center gap-1 hover:text-[#801B33]">
                    Precisa de ajuda? <CircleHelp className="h-4 w-4" />
                  </button>
                </div>
                <div className="mx-auto w-full max-w-[420px] rounded-2xl border border-[#efdee3] bg-white p-7 shadow-sm">
                  <h3 className="text-center text-4xl font-semibold text-[#302a2c]">Acesse sua conta</h3>
                  <p className="mt-2 text-center text-sm text-[#7a7577]">Entre para cuidar do que mais importa.</p>
                  <div className="mt-7 space-y-4">
                    <InputField
                      label="E-mail ou CPF"
                      placeholder="Digite seu e-mail ou CPF"
                      leftIcon={<AtSign className="h-4 w-4" />}
                    />
                    <InputField
                      label="Senha"
                      placeholder="Digite sua senha"
                      isPassword
                      leftIcon={<Lock className="h-4 w-4" />}
                      rightIcon={<Eye className="h-4 w-4" />}
                    />
                    <div className="text-right text-sm text-[#801B33] hover:underline">Esqueci minha senha</div>
                    <button
                      onClick={() => setScreen("motivo")}
                      className="w-full rounded-xl bg-[#801B33] py-3.5 text-lg font-semibold text-white transition hover:bg-[#6c152c]"
                    >
                      Entrar
                    </button>
                    <div className="text-center text-xs uppercase tracking-[0.2em] text-[#a39ea0]">ou</div>
                    <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#e6d4da] py-3.5 text-base font-medium text-[#801B33] transition hover:bg-[#fbf0f3]">
                      <Fingerprint className="h-4 w-4" />
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
            <FooterBar />
          </motion.section>
        ) : screen === "motivo" ? (
          <motion.section
            key="motivo"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1440px] flex-col overflow-hidden rounded-[28px] border border-[#eadce1] bg-[#f7f2f3] shadow-sm"
          >
            <header className="flex items-center justify-between border-b border-[#ecdfe3] bg-white px-6 py-4 md:px-10">
              <div className="flex items-center gap-3">
                <HeartPulse className="h-8 w-8 text-[#801B33]" />
                <p className="text-3xl font-semibold text-[#801B33]">CliniFlow</p>
              </div>
              <nav className="hidden items-center gap-5 text-sm text-[#7b7778] xl:flex">
                {MENU_STEPS.map((item, index) => (
                  <span key={item} className={`flex items-center gap-2 ${index === 0 ? "text-[#801B33]" : ""}`}>
                    <span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${index === 0 ? "bg-[#801B33] text-white" : "bg-[#eee7e9]"}`}>{index + 1}</span>
                    {item}
                  </span>
                ))}
              </nav>
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-[#801B33]" />
                <div className="h-8 w-8 rounded-full bg-[#e5d3d9]" />
                <span className="hidden text-sm font-medium md:block">Mariana S.</span>
              </div>
            </header>

            <div className="grid flex-1 grid-cols-1 gap-5 p-4 lg:grid-cols-[250px_minmax(0,1fr)_300px] lg:p-6">
              <aside className="rounded-2xl bg-[#f4eced] p-4">
                <p className="text-xl font-semibold text-[#3a3436]">Pre-consulta</p>
                <p className="mt-1 text-sm text-[#757071]">Sua jornada comeca com perguntas.</p>
                <ol className="mt-5 space-y-2">
                  {MENU_STEPS.map((item, index) => (
                    <li key={item} className={`flex items-center gap-2 rounded-xl px-2 py-2 text-sm ${index === 0 ? "bg-[#ede1e5] text-[#801B33]" : "text-[#6f6a6b]"}`}>
                      <span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${index === 0 ? "bg-[#801B33] text-white" : "bg-white"}`}>{index + 1}</span>
                      {item}
                    </li>
                  ))}
                </ol>
                <div className="mt-8 rounded-2xl bg-white p-4 shadow-sm">
                  <p className="font-semibold text-[#3b3435]">Seus dados protegidos</p>
                  <p className="mt-1 text-xs text-[#7d7678]">Informacoes seguras e em conformidade com a LGPD.</p>
                </div>
              </aside>

              <section className="rounded-2xl bg-white p-5 shadow-sm md:p-7">
                <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <p className="text-5xl font-semibold text-[#801B33]">Ola, Mariana! 👋</p>
                    <h1 className="mt-2 text-5xl leading-tight font-semibold text-[#2f2a2b]">
                      Qual o principal motivo da sua consulta hoje?
                    </h1>
                    <p className="mt-2 text-sm text-[#6d696a]">
                      Selecione uma opcao abaixo ou descreva com suas proprias palavras.
                    </p>
                  </div>
                  <div className="relative min-h-[180px] overflow-hidden rounded-2xl bg-[#f0e7e8]">
                    <Image src="/assets/designer/01.png" alt="Paciente na pre-consulta" fill className="object-cover object-right-top" />
                  </div>
                </div>

                <p className="mt-6 text-sm font-semibold text-[#4b4547]">Escolha uma opcao</p>
                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                  {MOTIVOS.map((item) => (
                    <button
                      key={item.title}
                      onClick={() => setSelectedMotivo(item.title)}
                      className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${
                        selectedMotivo === item.title ? "border-[#801B33] bg-[#fbf1f3]" : "border-[#ece1e4] bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 text-[#801B33]">
                        {item.icon}
                        <p className="font-semibold text-[#3b3436]">{item.title}</p>
                      </div>
                      <p className="mt-1 text-xs text-[#7b7476]">{item.subtitle}</p>
                    </button>
                  ))}
                </div>

                <div className="my-5 flex items-center gap-3 text-xs text-[#898385]">
                  <div className="h-px flex-1 bg-[#eee2e6]" />
                  OU
                  <div className="h-px flex-1 bg-[#eee2e6]" />
                </div>

                <textarea
                  placeholder="Conte aqui o que voce esta sentindo, quando comecou, intensidade, etc."
                  className="min-h-[108px] w-full rounded-2xl border border-[#ece0e4] p-4 text-sm outline-none transition focus:border-[#801B33]"
                />

                <div className="mt-5 flex justify-end">
                  <button
                    onClick={() => setScreen("sintomas")}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#801B33] px-8 py-3 font-semibold text-white transition hover:bg-[#6c152c]"
                  >
                    Continuar
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </section>

              <aside className="space-y-4">
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="font-semibold text-[#3b3537]">Resumo da sua pre-consulta</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="grid h-16 w-16 place-items-center rounded-full border-4 border-[#801B33]/20 text-xl font-semibold text-[#801B33]">
                      25%
                    </div>
                    <p className="text-sm text-[#726d6f]">Responda algumas perguntas para um atendimento melhor.</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="font-semibold text-[#801B33]">Por que tantas perguntas?</p>
                  <p className="mt-2 text-sm text-[#726d6f]">Essas informacoes ajudam o medico a entender seu caso antes da consulta.</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="font-semibold text-[#3c3537]">Precisa de ajuda?</p>
                  <button className="mt-3 flex w-full items-center justify-between rounded-xl border border-[#ebe0e3] px-4 py-2 text-sm">
                    Falar com atendente <ChevronRight className="h-4 w-4" />
                  </button>
                  <button className="mt-2 flex w-full items-center justify-between rounded-xl border border-[#ebe0e3] px-4 py-2 text-sm">
                    Perguntas frequentes <Search className="h-4 w-4" />
                  </button>
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-[#6e132b] to-[#801B33] p-5 text-white shadow-sm">
                  <p className="font-semibold">Atendimento humanizado e de qualidade</p>
                  <p className="mt-2 text-sm text-white/90">Nossos medicos sao avaliados continuamente por pacientes como voce.</p>
                </div>
              </aside>
            </div>

            <FooterBar />
          </motion.section>
        ) : screen === "sintomas" ? (
          <motion.section
            key="sintomas"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1440px] flex-col overflow-hidden rounded-[28px] border border-[#eadce1] bg-[#f7f2f3] shadow-sm"
          >
            <header className="flex items-center justify-between border-b border-[#ecdfe3] bg-white px-6 py-4 md:px-10">
              <div className="flex items-center gap-3">
                <HeartPulse className="h-8 w-8 text-[#801B33]" />
                <p className="text-3xl font-semibold text-[#801B33]">CliniFlow</p>
              </div>
              <nav className="hidden items-center gap-5 text-sm text-[#7b7778] xl:flex">
                {MENU_STEPS.map((item, index) => (
                  <span key={item} className={`flex items-center gap-2 ${index === 1 ? "text-[#801B33]" : ""}`}>
                    <span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${index === 1 ? "bg-[#801B33] text-white" : "bg-[#eee7e9]"}`}>
                      {index + 1}
                    </span>
                    {item}
                  </span>
                ))}
              </nav>
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-[#801B33]" />
                <div className="h-8 w-8 rounded-full bg-[#e5d3d9]" />
                <span className="hidden text-sm font-medium md:block">Mariana S.</span>
              </div>
            </header>

            <div className="grid flex-1 grid-cols-1 gap-5 p-4 lg:grid-cols-[250px_minmax(0,1fr)_300px] lg:p-6">
              <aside className="rounded-2xl bg-[#f4eced] p-4">
                <p className="text-xl font-semibold text-[#3a3436]">Pre-consulta</p>
                <p className="mt-1 text-sm text-[#757071]">Sua jornada comeca com cuidado.</p>
                <ol className="mt-5 space-y-2">
                  {MENU_STEPS.map((item, index) => (
                    <li
                      key={item}
                      className={`flex items-center gap-2 rounded-xl px-2 py-2 text-sm ${
                        index === 1 ? "bg-[#ede1e5] text-[#801B33]" : "text-[#6f6a6b]"
                      }`}
                    >
                      <span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${index === 1 ? "bg-[#801B33] text-white" : "bg-white"}`}>
                        {index + 1}
                      </span>
                      <div>
                        <p>{item}</p>
                        <p className="text-[10px]">
                          {index === 0 ? "Concluido" : index === 1 ? "Em andamento" : "Pendente"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 rounded-2xl bg-white p-4 shadow-sm">
                  <p className="font-semibold text-[#3b3435]">Seus dados protegidos</p>
                  <p className="mt-1 text-xs text-[#7d7678]">Utilizamos criptografia e seguimos rigorosamente a LGPD.</p>
                </div>
              </aside>

              <section className="rounded-2xl bg-white p-5 shadow-sm md:p-7">
                <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <h1 className="text-5xl leading-tight font-semibold text-[#2f2a2b]">Quais sintomas voce esta sentindo?</h1>
                    <p className="mt-2 text-sm text-[#6d696a]">Responda algumas perguntas para entendermos melhor o seu quadro.</p>
                  </div>
                  <div className="relative min-h-[180px] overflow-hidden rounded-2xl bg-[#f0e7e8]">
                    <Image src="/assets/designer/02.png" alt="Etapa de sintomas" fill className="object-cover object-right-top" />
                  </div>
                </div>

                <p className="mt-6 text-sm font-semibold text-[#4b4547]">Vamos comecar com alguns sintomas comuns</p>
                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-4">
                  {SINTOMAS.map((item) => {
                    const active = selectedSintomas.includes(item.title);
                    return (
                      <button
                        key={item.title}
                        onClick={() =>
                          setSelectedSintomas((prev) =>
                            prev.includes(item.title)
                              ? prev.filter((symptom) => symptom !== item.title)
                              : [...prev, item.title],
                          )
                        }
                        className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${
                          active ? "border-[#801B33] bg-[#fbf1f3]" : "border-[#ece1e4] bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[#801B33]">
                            {item.icon}
                            <p className="font-semibold text-[#3b3436]">{item.title}</p>
                          </div>
                          {active ? (
                            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#801B33] text-[10px] text-white">✓</span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-xs text-[#7b7476]">{item.subtitle}</p>
                      </button>
                    );
                  })}
                </div>

                <div className="my-5 flex items-center gap-3 text-xs text-[#898385]">
                  <div className="h-px flex-1 bg-[#eee2e6]" />
                  OU
                  <div className="h-px flex-1 bg-[#eee2e6]" />
                </div>

                <textarea
                  value={descricaoSintomas}
                  onChange={(event) => setDescricaoSintomas(event.target.value)}
                  placeholder="Descreva aqui o que voce esta sentindo..."
                  maxLength={500}
                  className="min-h-[96px] w-full rounded-2xl border border-[#ece0e4] p-4 text-sm outline-none transition focus:border-[#801B33]"
                />
                <p className="mt-1 text-right text-xs text-[#9a9395]">{descricaoSintomas.length}/500</p>

                <div className="mt-4 rounded-xl bg-[#f9f2f4] p-3 text-xs text-[#726c6e]">
                  Dica: se possivel, inclua quando os sintomas comecaram, intensidade e o que melhora ou piora.
                </div>

                <div className="mt-5 flex justify-end gap-3">
                  <button
                    onClick={() => setScreen("motivo")}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#dfc9d0] px-6 py-3 font-semibold text-[#6f4a56] transition hover:bg-[#f7ecef]"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={() => setScreen("resumo")}
                    disabled={!canContinueFromSymptoms}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#801B33] px-8 py-3 font-semibold text-white transition hover:bg-[#6c152c] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Continuar
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </section>

              <aside className="space-y-4">
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="font-semibold text-[#3b3537]">Resumo da sua pre-consulta</p>
                  <p className="mt-3 text-sm text-[#726d6f]">Motivo informado</p>
                  <p className="text-sm font-medium text-[#3b3537]">{selectedMotivo}</p>
                  <button className="mt-2 text-xs font-semibold text-[#801B33]">Alterar</button>
                  <div className="mt-3 h-2 rounded-full bg-[#eddfe4]">
                    <div className="h-2 w-1/3 rounded-full bg-[#801B33]" />
                  </div>
                  <p className="mt-1 text-xs text-[#726d6f]">2 de 6 etapas concluidas</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="font-semibold text-[#801B33]">Falta pouco!</p>
                  <p className="mt-2 text-sm text-[#726d6f]">Responda as proximas perguntas para um atendimento ainda melhor.</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="font-semibold text-[#3c3537]">Precisa de ajuda?</p>
                  <button className="mt-3 flex w-full items-center justify-between rounded-xl border border-[#ebe0e3] px-4 py-2 text-sm">
                    Falar com atendente <ChevronRight className="h-4 w-4" />
                  </button>
                  <button className="mt-2 flex w-full items-center justify-between rounded-xl border border-[#ebe0e3] px-4 py-2 text-sm">
                    Perguntas frequentes <Search className="h-4 w-4" />
                  </button>
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-[#6e132b] to-[#801B33] p-5 text-white shadow-sm">
                  <p className="font-semibold">Atendimento humanizado e de qualidade</p>
                  <p className="mt-2 text-sm text-white/90">Nossos medicos sao avaliados continuamente por pacientes como voce.</p>
                </div>
              </aside>
            </div>

            <FooterBar />
          </motion.section>
        ) : screen === "resumo" ? (
          <motion.section
            key="resumo"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1440px] flex-col overflow-hidden rounded-[28px] border border-[#eadce1] bg-[#f7f2f3] shadow-sm"
          >
            <header className="flex items-center justify-between border-b border-[#ecdfe3] bg-white px-6 py-4 md:px-10">
              <div className="flex items-center gap-3">
                <HeartPulse className="h-8 w-8 text-[#801B33]" />
                <p className="text-3xl font-semibold text-[#801B33]">CliniFlow</p>
              </div>
              <nav className="hidden items-center gap-5 text-sm text-[#7b7778] xl:flex">
                {MENU_STEPS.map((item, index) => (
                  <span key={item} className={`flex items-center gap-2 ${index === 2 ? "text-[#801B33]" : ""}`}>
                    <span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${index === 2 ? "bg-[#801B33] text-white" : "bg-[#eee7e9]"}`}>
                      {index + 1}
                    </span>
                    {item}
                  </span>
                ))}
              </nav>
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-[#801B33]" />
                <div className="h-8 w-8 rounded-full bg-[#e5d3d9]" />
                <span className="hidden text-sm font-medium md:block">Mariana S.</span>
              </div>
            </header>

            <div className="grid flex-1 grid-cols-1 gap-5 p-4 lg:grid-cols-[250px_minmax(0,1fr)_300px] lg:p-6">
              <aside className="rounded-2xl bg-[#f4eced] p-4">
                <p className="text-xl font-semibold text-[#3a3436]">Pre-consulta</p>
                <p className="mt-1 text-sm text-[#757071]">Sua jornada, nosso cuidado.</p>
                <ol className="mt-5 space-y-2">
                  {MENU_STEPS.map((item, index) => (
                    <li
                      key={item}
                      className={`flex items-center gap-2 rounded-xl px-2 py-2 text-sm ${
                        index === 2 ? "bg-[#ede1e5] text-[#801B33]" : "text-[#6f6a6b]"
                      }`}
                    >
                      <span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${index === 2 ? "bg-[#801B33] text-white" : "bg-white"}`}>
                        {index + 1}
                      </span>
                      <div>
                        <p>{item}</p>
                        <p className="text-[10px]">
                          {index < 2 ? "Concluido" : index === 2 ? "Em andamento" : "Pendente"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 rounded-2xl bg-white p-4 shadow-sm">
                  <p className="font-semibold text-[#3b3435]">Seus dados protegidos</p>
                  <p className="mt-1 text-xs text-[#7d7678]">As informacoes sao criptografadas e usadas apenas na consulta.</p>
                </div>
              </aside>

              <section className="rounded-2xl bg-white p-5 shadow-sm md:p-7">
                <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <h1 className="text-5xl leading-tight font-semibold text-[#2f2a2b]">Vamos revisar suas informacoes</h1>
                    <p className="mt-2 text-sm text-[#6d696a]">
                      Confira se esta tudo correto. Isso ajuda o medico a preparar a consulta.
                    </p>
                    <div className="mt-4 rounded-xl bg-[#f9f2f4] p-4">
                      <p className="text-sm font-semibold text-[#5a3d46]">Quase la!</p>
                      <p className="mt-1 text-xs text-[#7a7376]">
                        Seu caso ja esta 75% preenchido. Faltam poucos detalhes para conectar voce ao medico ideal.
                      </p>
                      <div className="mt-3 h-2 rounded-full bg-[#ead7de]">
                        <div className="h-2 w-3/4 rounded-full bg-[#801B33]" />
                      </div>
                    </div>
                  </div>
                  <div className="relative min-h-[180px] overflow-hidden rounded-2xl bg-[#f0e7e8]">
                    <Image src="/assets/designer/03.png" alt="Etapa de resumo" fill className="object-cover object-right-top" />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-base font-semibold text-[#3d3638]">Resumo das suas informacoes</p>
                  <button className="rounded-xl border border-[#ead6dc] px-3 py-1.5 text-xs font-semibold text-[#801B33]">
                    Editar informacoes
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                  <article className="rounded-xl border border-[#ece0e4] p-4">
                    <p className="text-xs text-[#7d7578]">Motivo da consulta</p>
                    <p className="mt-1 font-semibold text-[#3c3638]">{selectedMotivo}</p>
                    <p className="mt-1 text-xs text-[#8d8689]">Informado agora</p>
                  </article>
                  <article className="rounded-xl border border-[#ece0e4] p-4">
                    <p className="text-xs text-[#7d7578]">Principais sintomas</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {selectedSintomas.slice(0, 4).map((symptom) => (
                        <span key={symptom} className="rounded-full bg-[#f4e8ec] px-2.5 py-1 text-[11px] text-[#6f3f4d]">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </article>
                  <article className="rounded-xl border border-[#ece0e4] p-4">
                    <p className="text-xs text-[#7d7578]">Sintomas adicionais</p>
                    <p className="mt-1 text-sm text-[#3e3739]">{descricaoSintomas || "Sem observacoes adicionais no momento."}</p>
                  </article>
                  <article className="rounded-xl border border-[#ece0e4] p-4">
                    <p className="text-xs text-[#7d7578]">Outras informacoes</p>
                    <p className="mt-1 text-sm text-[#3e3739]">Nao ha medicamentos em uso informados atualmente.</p>
                  </article>
                </div>

                <div className="mt-3 rounded-xl border border-[#ece0e4] bg-[#fbf6f7] p-4 text-xs text-[#7b7476]">
                  Importante: estas informacoes nao substituem atendimento medico. Em caso de emergencia, procure o pronto atendimento mais proximo.
                </div>

                <div className="mt-5 flex justify-end gap-3">
                  <button
                    onClick={() => setScreen("sintomas")}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#dfc9d0] px-6 py-3 font-semibold text-[#6f4a56] transition hover:bg-[#f7ecef]"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={() => setScreen("fila")}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#801B33] px-8 py-3 font-semibold text-white transition hover:bg-[#6c152c]"
                  >
                    Confirmar e continuar
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </section>

              <aside className="space-y-4">
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="font-semibold text-[#3b3537]">Resumo da sua pre-consulta</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li className="text-[#3e3739]">✓ Motivo informado</li>
                    <li className="text-[#3e3739]">✓ Sintomas selecionados</li>
                    <li className="text-[#3e3739]">✓ Informacoes complementares</li>
                    <li className="text-[#7f787b]">○ Revisao final</li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="font-semibold text-[#801B33]">Por que revisamos com voce?</p>
                  <p className="mt-2 text-sm text-[#726d6f]">A revisao garante que nenhuma informacao importante fique de fora.</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="font-semibold text-[#3c3537]">Precisa de ajuda?</p>
                  <button className="mt-3 flex w-full items-center justify-between rounded-xl border border-[#ebe0e3] px-4 py-2 text-sm">
                    Falar com atendente <ChevronRight className="h-4 w-4" />
                  </button>
                  <button className="mt-2 flex w-full items-center justify-between rounded-xl border border-[#ebe0e3] px-4 py-2 text-sm">
                    Perguntas frequentes <Search className="h-4 w-4" />
                  </button>
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-[#6e132b] to-[#801B33] p-5 text-white shadow-sm">
                  <p className="font-semibold">Medicos preparados para te ouvir</p>
                  <p className="mt-2 text-sm text-white/90">Nossa equipe analisa seu caso com antecedencia para oferecer melhor atendimento.</p>
                </div>
              </aside>
            </div>

            <FooterBar />
          </motion.section>
        ) : screen === "fila" ? (
          <motion.section
            key="fila"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1440px] flex-col overflow-hidden rounded-[28px] border border-[#eadce1] bg-[#f7f2f3] shadow-sm"
          >
            <header className="flex items-center justify-between border-b border-[#ecdfe3] bg-white px-6 py-4 md:px-10">
              <div className="flex items-center gap-3">
                <HeartPulse className="h-8 w-8 text-[#801B33]" />
                <p className="text-3xl font-semibold text-[#801B33]">CliniFlow</p>
              </div>
              <nav className="hidden items-center gap-5 text-sm text-[#7b7778] xl:flex">
                {MENU_STEPS.map((item, index) => (
                  <span key={item} className={`flex items-center gap-2 ${index === 3 ? "text-[#801B33]" : ""}`}>
                    <span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${index === 3 ? "bg-[#801B33] text-white" : "bg-[#eee7e9]"}`}>
                      {index + 1}
                    </span>
                    {item}
                  </span>
                ))}
              </nav>
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-[#801B33]" />
                <div className="h-8 w-8 rounded-full bg-[#e5d3d9]" />
                <span className="hidden text-sm font-medium md:block">Mariana S.</span>
              </div>
            </header>

            <div className="grid flex-1 grid-cols-1 gap-5 p-4 lg:grid-cols-[250px_minmax(0,1fr)_300px] lg:p-6">
              <aside className="rounded-2xl bg-[#f4eced] p-4">
                <p className="text-xl font-semibold text-[#3a3436]">Sua jornada</p>
                <p className="mt-1 text-sm text-[#757071]">Acompanhe cada etapa.</p>
                <ol className="mt-5 space-y-2">
                  {MENU_STEPS.map((item, index) => (
                    <li
                      key={item}
                      className={`flex items-center gap-2 rounded-xl px-2 py-2 text-sm ${
                        index === 3 ? "bg-[#ede1e5] text-[#801B33]" : "text-[#6f6a6b]"
                      }`}
                    >
                      <span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${index === 3 ? "bg-[#801B33] text-white" : "bg-white"}`}>
                        {index + 1}
                      </span>
                      <div>
                        <p>{item}</p>
                        <p className="text-[10px]">
                          {index < 3 ? "Concluido" : index === 3 ? "Em andamento" : "Pendente"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 rounded-2xl bg-white p-4 shadow-sm">
                  <p className="font-semibold text-[#3b3435]">Seus dados protegidos</p>
                  <p className="mt-1 text-xs text-[#7d7678]">Utilizamos criptografia e seguimos rigorosamente a LGPD.</p>
                </div>
              </aside>

              <section className="rounded-2xl bg-white p-5 shadow-sm md:p-7">
                <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <h1 className="text-5xl leading-tight font-semibold text-[#2f2a2b]">Voce esta na fila!</h1>
                    <p className="mt-2 text-sm text-[#6d696a]">
                      Em breve voce sera atendida por um de nossos medicos. Obrigado pela paciencia.
                    </p>
                  </div>
                  <div className="relative min-h-[180px] overflow-hidden rounded-2xl bg-[#f0e7e8]">
                    <Image src="/assets/designer/04.png" alt="Etapa fila de atendimento" fill className="object-cover object-right-top" />
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-[#ece0e4] p-4">
                  <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                    <div className="border-b border-[#f0e6e9] pb-3 md:border-b-0 md:border-r md:pb-0 md:pr-4">
                      <p className="text-sm text-[#7a7376]">Sua posicao na fila</p>
                      <p className="mt-1 text-6xl font-bold text-[#801B33]">7º</p>
                      <p className="text-sm text-[#7a7376]">de 23 pacientes</p>
                      <p className="mt-3 text-xs text-[#6d6669]">Previsao de atendimento: em ate 18 min</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#7a7376]">Andamento da fila</p>
                      <div className="mt-4 flex items-center justify-between text-center text-xs text-[#7b7477]">
                        <QueueNode label="Triagem" active />
                        <QueueNode label="Na fila" active />
                        <QueueNode label="Em atendimento" />
                        <QueueNode label="Finalizado" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 rounded-xl bg-[#fbf4f6] px-4 py-2 text-xs text-[#7b7577]">
                  A ordem da fila pode variar de acordo com a complexidade de cada caso e urgencias.
                </div>
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => setScreen("consulta")}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#801B33] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6c152c]"
                  >
                    Entrar na consulta
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-5 text-base font-semibold text-[#3d3638]">Enquanto isso, que tal...</p>
                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-4">
                  <WaitCard title="Entenda seus sintomas" text="Conteudos confiaveis sobre saude." cta="Ver conteudo" />
                  <WaitCard title="Confira suas informacoes" text="Revise os dados que voce enviou." cta="Revisar" />
                  <WaitCard title="Exercicios de respiracao" text="Tecnicas rapidas para relaxar." cta="Praticar" />
                  <WaitCard title="Fale com nossa equipe" text="Tire duvidas com nossos atendentes." cta="Abrir chat" />
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#f9f2f4] p-4">
                  <div>
                    <p className="font-semibold text-[#6f3f4d]">Precisa de algo agora?</p>
                    <p className="text-xs text-[#7b7477]">Nossa equipe de atendimento esta disponivel 24h.</p>
                  </div>
                  <button className="rounded-xl border border-[#d8bec7] bg-white px-5 py-2 text-sm font-semibold text-[#801B33] transition hover:bg-[#fdf7f9]">
                    Falar com atendente
                  </button>
                </div>
              </section>

              <aside className="space-y-4">
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-semibold text-[#3b3537]">Acompanhe em tempo real</p>
                    <span className="rounded-full bg-[#e6f6ea] px-2 py-0.5 text-[10px] font-semibold text-[#2d8f4f]">AO VIVO</span>
                  </div>
                  <div className="h-28 rounded-xl bg-gradient-to-t from-[#801B33]/30 via-[#eec8d3]/60 to-transparent" />
                  <p className="mt-2 text-xs text-[#6f696b]">Maior fluxo entre 10h e 12h. Obrigado por escolher a CliniFlow.</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="font-semibold text-[#3c3537]">Duvidas frequentes</p>
                  <button className="mt-3 flex w-full items-center justify-between border-b border-[#f0e5e9] py-2 text-left text-sm">
                    Como funciona a fila de atendimento? <ChevronRight className="h-4 w-4" />
                  </button>
                  <button className="flex w-full items-center justify-between border-b border-[#f0e5e9] py-2 text-left text-sm">
                    O tempo de espera e sempre preciso? <ChevronRight className="h-4 w-4" />
                  </button>
                  <button className="flex w-full items-center justify-between py-2 text-left text-sm">
                    Posso sair do app e ser chamado? <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="font-semibold text-[#3c3537]">Estamos aqui por voce</p>
                  <p className="mt-2 text-sm text-[#726d6f]">Mais que consulta, entregamos acolhimento e cuidado de verdade.</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-[#6e132b] to-[#801B33] p-5 text-white shadow-sm">
                  <p className="font-semibold">Atendimento humanizado e de qualidade</p>
                  <p className="mt-2 text-sm text-white/90">Nossos medicos sao avaliados continuamente por pacientes como voce.</p>
                </div>
              </aside>
            </div>

            <FooterBar />
          </motion.section>
        ) : screen === "consulta" ? (
          <motion.section
            key="consulta"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1440px] flex-col overflow-hidden rounded-[28px] border border-[#eadce1] bg-[#f7f2f3] shadow-sm"
          >
            <header className="flex items-center justify-between border-b border-[#ecdfe3] bg-white px-6 py-4 md:px-10">
              <div className="flex items-center gap-3">
                <HeartPulse className="h-8 w-8 text-[#801B33]" />
                <p className="text-3xl font-semibold text-[#801B33]">CliniFlow</p>
              </div>
              <nav className="hidden items-center gap-5 text-sm text-[#7b7778] xl:flex">
                {MENU_STEPS.map((item, index) => (
                  <span key={item} className={`flex items-center gap-2 ${index === 4 ? "text-[#801B33]" : ""}`}>
                    <span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${index === 4 ? "bg-[#801B33] text-white" : "bg-[#eee7e9]"}`}>
                      {index + 1}
                    </span>
                    {item}
                  </span>
                ))}
              </nav>
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-[#801B33]" />
                <div className="h-8 w-8 rounded-full bg-[#e5d3d9]" />
                <span className="hidden text-sm font-medium md:block">Mariana S.</span>
              </div>
            </header>

            <div className="grid flex-1 grid-cols-1 gap-5 p-4 lg:grid-cols-[250px_minmax(0,1fr)_300px] lg:p-6">
              <aside className="rounded-2xl bg-[#f4eced] p-4">
                <p className="text-xl font-semibold text-[#3a3436]">Sua jornada</p>
                <p className="mt-1 text-sm text-[#757071]">Acompanhe cada etapa.</p>
                <ol className="mt-5 space-y-2">
                  {MENU_STEPS.map((item, index) => (
                    <li
                      key={item}
                      className={`flex items-center gap-2 rounded-xl px-2 py-2 text-sm ${
                        index === 4 ? "bg-[#ede1e5] text-[#801B33]" : "text-[#6f6a6b]"
                      }`}
                    >
                      <span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${index === 4 ? "bg-[#801B33] text-white" : "bg-white"}`}>
                        {index + 1}
                      </span>
                      <div>
                        <p>{item}</p>
                        <p className="text-[10px]">
                          {index < 4 ? "Concluido" : index === 4 ? "Em andamento" : "Pendente"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 rounded-2xl bg-white p-4 shadow-sm">
                  <p className="font-semibold text-[#3b3435]">Seus dados protegidos</p>
                  <p className="mt-1 text-xs text-[#7d7678]">A consulta e criptografada de ponta a ponta para proteger sua privacidade.</p>
                </div>
              </aside>

              <section className="rounded-2xl bg-white p-5 shadow-sm md:p-7">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h1 className="text-5xl leading-tight font-semibold text-[#2f2a2b]">Voce esta em consulta</h1>
                    <p className="mt-1 text-sm text-[#6d696a]">Voce esta sendo atendida por Dr. Gustavo Almeida</p>
                  </div>
                    <button
                      onClick={() => setScreen("posConsulta")}
                      className="rounded-xl border border-[#ddc5cd] px-4 py-2 text-sm font-semibold text-[#801B33]"
                    >
                    Encerrar consulta
                  </button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-[#e9dde1]">
                  <div className="relative aspect-video bg-[#222]">
                    <Image
                      src="/assets/designer/05.png"
                      alt="Tela de consulta por video"
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute left-4 top-4 rounded-xl bg-black/55 px-3 py-2 text-xs text-white">
                      Dr. Gustavo Almeida
                    </div>
                    <div className="absolute bottom-4 right-4 h-28 w-44 overflow-hidden rounded-xl border border-white/30 bg-black/30">
                      <Image src="/assets/designer/01.png" alt="Paciente em miniatura" fill className="object-cover" />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 border-t border-[#e8dce0] bg-white px-4 py-3">
                    <ConsultButton icon={<Mic className="h-4 w-4" />} label="Microfone" />
                    <ConsultButton icon={<Video className="h-4 w-4" />} label="Camera" />
                    <ConsultButton icon={<Share2 className="h-4 w-4" />} label="Compartilhar" />
                    <ConsultButton icon={<MessageSquareText className="h-4 w-4" />} label="Chat" />
                    <ConsultButton
                      icon={<PhoneOff className="h-4 w-4" />}
                      label="Encerrar"
                      danger
                      onClick={() => setScreen("posConsulta")}
                    />
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-[#eadfe3] bg-[#fcf7f8] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[#553943]">O medico esta visualizando suas informacoes</p>
                      <p className="text-xs text-[#7b7477]">Ele tem acesso ao resumo da sua pre-consulta para oferecer o melhor atendimento.</p>
                    </div>
                    <button className="rounded-xl border border-[#d8c0c8] bg-white px-4 py-2 text-sm font-semibold text-[#801B33]">
                      Ver resumo
                    </button>
                  </div>
                </div>

                <div className="mt-3 rounded-2xl border border-[#e4ece7] bg-[#f2faf5] p-4">
                  <p className="font-semibold text-[#3d5f49]">A consulta e segura e confidencial</p>
                  <p className="text-xs text-[#5f7467]">Seguimos todos os protocolos da LGPD para proteger suas informacoes.</p>
                </div>
              </section>

              <aside className="space-y-4">
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="font-semibold text-[#3b3537]">Resumo do paciente</p>
                  <ul className="mt-3 space-y-2 text-sm text-[#4c4547]">
                    <li>Motivo da consulta: {selectedMotivo}</li>
                    <li>Principais sintomas: {selectedSintomas.length} sintomas</li>
                    <li>Tempo de aparecimento: ha 3 dias</li>
                    <li>Intensidade da dor: moderada (6/10)</li>
                  </ul>
                  <button className="mt-3 text-sm font-semibold text-[#801B33]">Ver resumo completo →</button>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="font-semibold text-[#3c3537]">Anotacoes da consulta</p>
                  <textarea
                    placeholder="O medico pode escrever observacoes durante a consulta..."
                    className="mt-3 min-h-[110px] w-full rounded-xl border border-[#ebe0e3] p-3 text-sm outline-none focus:border-[#801B33]"
                  />
                  <p className="mt-2 text-xs text-[#8a8386]">Visivel apenas para voce e o medico</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="font-semibold text-[#3c3537]">Precisa de algo?</p>
                  <button className="mt-3 w-full rounded-xl border border-[#d9c1c9] px-4 py-2 text-sm font-semibold text-[#801B33]">
                    Falar com atendente
                  </button>
                </div>
              </aside>
            </div>

            <FooterBar />
          </motion.section>
        ) : screen === "posConsulta" ? (
          <motion.section
            key="pos-consulta"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1440px] flex-col overflow-hidden rounded-[28px] border border-[#eadce1] bg-[#f7f2f3] shadow-sm"
          >
            <header className="flex items-center justify-between border-b border-[#ecdfe3] bg-white px-6 py-4 md:px-10">
              <div className="flex items-center gap-3">
                <HeartPulse className="h-8 w-8 text-[#801B33]" />
                <p className="text-3xl font-semibold text-[#801B33]">CliniFlow</p>
              </div>
              <nav className="hidden items-center gap-5 text-sm text-[#7b7778] xl:flex">
                {MENU_STEPS.map((item, index) => (
                  <span key={item} className={`flex items-center gap-2 ${index === 5 ? "text-[#801B33]" : ""}`}>
                    <span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${index === 5 ? "bg-[#801B33] text-white" : "bg-[#eee7e9]"}`}>
                      {index + 1}
                    </span>
                    {item}
                  </span>
                ))}
              </nav>
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-[#801B33]" />
                <div className="h-8 w-8 rounded-full bg-[#e5d3d9]" />
                <span className="hidden text-sm font-medium md:block">Mariana S.</span>
              </div>
            </header>

            <div className="grid flex-1 grid-cols-1 gap-5 p-4 lg:grid-cols-[250px_minmax(0,1fr)] lg:p-6">
              <aside className="rounded-2xl bg-[#f4eced] p-4">
                <p className="text-xl font-semibold text-[#3a3436]">Sua jornada</p>
                <p className="mt-1 text-sm text-[#757071]">Acompanhe cada etapa.</p>
                <ol className="mt-5 space-y-2">
                  {MENU_STEPS.map((item, index) => (
                    <li
                      key={item}
                      className={`flex items-center gap-2 rounded-xl px-2 py-2 text-sm ${
                        index === 5 ? "bg-[#ede1e5] text-[#801B33]" : "text-[#6f6a6b]"
                      }`}
                    >
                      <span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${index === 5 ? "bg-[#801B33] text-white" : "bg-white"}`}>
                        {index + 1}
                      </span>
                      <div>
                        <p>{item}</p>
                        <p className="text-[10px]">
                          {index < 5 ? "Concluido" : "Em andamento"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 rounded-2xl bg-white p-4 shadow-sm">
                  <p className="font-semibold text-[#3b3435]">Seus dados protegidos</p>
                  <p className="mt-1 text-xs text-[#7d7678]">A consulta foi criptografada e seus dados seguem protegidos.</p>
                </div>
              </aside>

              <section className="rounded-2xl bg-white p-5 shadow-sm md:p-7">
                <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <h1 className="text-5xl leading-tight font-semibold text-[#2f2a2b]">
                      Sua jornada continua com clareza.
                    </h1>
                    <p className="mt-2 text-xl text-[#615b5d]">
                      Aqui esta o resumo da sua consulta com o Dr. Gustavo e as orientacoes para os proximos dias.
                    </p>
                  </div>
                  <div className="relative min-h-[180px] overflow-hidden rounded-2xl bg-[#f0e7e8]">
                    <Image src="/assets/designer/06.png" alt="Tela de pos-consulta" fill className="object-cover object-right-top" />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <article className="rounded-2xl border border-[#e8dce0] bg-white">
                    <div className="rounded-t-2xl bg-[#f1eaf7] px-4 py-3">
                      <p className="text-3xl font-semibold text-[#332f30]">O que entendemos juntos</p>
                    </div>
                    <div className="space-y-3 p-4 text-[#3f393b]">
                      <p>✓ Confirmamos a dor de cabeca e o mal-estar geral.</p>
                      <p>✓ Causa provavel: fadiga e inicio de virose leves.</p>
                      <p>✓ Nao ha sinais de alarme.</p>
                    </div>
                  </article>

                  <article className="rounded-2xl border border-[#e8dce0] bg-white">
                    <div className="rounded-t-2xl bg-[#f1eaf7] px-4 py-3">
                      <p className="text-3xl font-semibold text-[#332f30]">Seus Proximos Passos</p>
                    </div>
                    <div className="grid grid-cols-1 gap-2 p-4 text-sm font-semibold text-[#3f393b] md:grid-cols-2">
                      <button className="rounded-xl border border-[#eadfe3] bg-[#faf5f6] px-3 py-2 text-left">Receita Medica (Baixar PDF)</button>
                      <button className="rounded-xl border border-[#eadfe3] bg-[#faf5f6] px-3 py-2 text-left">Atestado Medico (Baixar PDF, 2 dias)</button>
                      <button className="rounded-xl border border-[#eadfe3] bg-[#faf5f6] px-3 py-2 text-left md:col-span-2">Guia de Exames (Baixar PDF)</button>
                    </div>
                  </article>
                </div>

                <div className="mt-5">
                  <p className="text-4xl font-semibold text-[#2f2a2b]">Confirmacao de Entendimento</p>
                  <p className="mt-1 text-[#666062]">Voce se sente confiante com as orientacoes?</p>
                  <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                    <div className="rounded-2xl border border-[#e8dce0] bg-[#fffaf3] px-4 py-3">
                      <div className="text-4xl">🙂 ⭐ ⭐ ⭐ ⭐ 😕</div>
                      <div className="mt-1 flex justify-between text-sm text-[#776f72]">
                        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                      </div>
                    </div>
                    <textarea
                      placeholder="Sua resposta ajuda a garantir a qualidade do atendimento."
                      maxLength={500}
                      className="min-h-[88px] rounded-2xl border border-[#eadfe3] p-3 text-sm outline-none focus:border-[#801B33]"
                    />
                    <button className="rounded-xl bg-[#801B33] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6c152c]">
                      Agendar retorno (Opcional)
                    </button>
                  </div>
                </div>
              </section>
            </div>

            <FooterBar />
          </motion.section>
        ) : null}
      </AnimatePresence>
    </main>
  );
}

function FeatureIcon({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <article className="flex min-w-0 gap-2 text-[#4e494a]">
      <div className="mt-0.5 text-[#801B33]">{icon}</div>
      <div>
        <p className="text-sm font-semibold leading-5 break-words">{title}</p>
        <p className="text-xs text-[#746f71] break-words">{text}</p>
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

function FlowStep({ icon, step, text }: { icon: ReactNode; step: number; text: string }) {
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
  leftIcon,
  rightIcon,
}: {
  label: string;
  placeholder: string;
  isPassword?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[#4f4b4d]">{label}</span>
      <div className="relative">
        {leftIcon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9496]">
            {leftIcon}
          </span>
        ) : null}
        {rightIcon ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9a9496]">
            {rightIcon}
          </span>
        ) : null}
        <input
          type={isPassword ? "password" : "text"}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-[#e6d6db] bg-[#fbfbfb] py-3 text-sm outline-none transition focus:border-[#801B33] ${
            leftIcon ? "pl-10" : "pl-4"
          } ${rightIcon ? "pr-10" : "pr-4"}`}
        />
      </div>
    </label>
  );
}

function BottomPill({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl px-2 py-1.5">
      <span className="text-[#801B33]">{icon}</span>
      <span className="text-xs">{text}</span>
    </div>
  );
}

function FooterBar() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 bg-[#6d132b] px-6 py-4 text-xs text-white md:px-10">
      <p>Plataforma 100% segura e em conformidade com a LGPD</p>
      <p>© 2024 CliniFlow. Todos os direitos reservados.</p>
      <p>Termos de uso | Politica de privacidade</p>
    </footer>
  );
}

function QueueNode({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2">
      <div className={`h-9 w-9 rounded-full border-2 ${active ? "border-[#801B33] bg-[#801B33] text-white" : "border-[#ddd2d6] text-[#aaa2a5]"} grid place-items-center text-[10px] font-semibold`}>
        {active ? "✓" : "○"}
      </div>
      <p className={`text-[11px] ${active ? "font-semibold text-[#5b313f]" : ""}`}>{label}</p>
    </div>
  );
}

function WaitCard({ title, text, cta }: { title: string; text: string; cta: string }) {
  return (
    <article className="rounded-xl border border-[#ece0e4] p-3">
      <p className="text-sm font-semibold text-[#3b3537]">{title}</p>
      <p className="mt-1 text-xs text-[#7b7477]">{text}</p>
      <button className="mt-3 text-xs font-semibold text-[#801B33]">{cta} →</button>
    </article>
  );
}

function ConsultButton({
  icon,
  label,
  danger = false,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition ${
        danger
          ? "border-[#801B33] bg-[#801B33] text-white hover:bg-[#6c152c]"
          : "border-[#e4d8dc] bg-white text-[#5e5658] hover:bg-[#f8f2f4]"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
