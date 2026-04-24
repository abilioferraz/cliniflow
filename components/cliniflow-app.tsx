"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Camera,
  ChevronRight,
  FileDown,
  HeartPulse,
  MessageCircle,
  Mic,
  Send,
  Stethoscope,
  Video,
} from "lucide-react";
import { useMemo, useState } from "react";
import { StepSidebar } from "./step-sidebar";

type StepKey =
  | "login"
  | "motivo"
  | "sintomas"
  | "resumo"
  | "fila"
  | "consulta"
  | "posConsulta";

type PatientData = {
  nome: string;
  motivo: string;
  motivoDescricao: string;
  sintomas: string[];
};

const STEP_ORDER: StepKey[] = [
  "motivo",
  "sintomas",
  "resumo",
  "fila",
  "consulta",
  "posConsulta",
];

const STEP_LABELS = [
  { id: 1, title: "Motivo da consulta" },
  { id: 2, title: "Sintomas" },
  { id: 3, title: "Resumo" },
  { id: 4, title: "Fila de atendimento" },
  { id: 5, title: "Consulta" },
  { id: 6, title: "Pos-consulta" },
];

const MOTIVOS = ["Dores", "Febre", "Problemas digestivos", "Saude mental", "Outros"];
const SINTOMAS = ["Dor", "Febre", "Tosse", "Nausea", "Diarreia", "Cansaco extremo"];

const REFERENCE_IMAGES: Record<StepKey, string> = {
  login: "/assets/designer/00.png",
  motivo: "/assets/designer/01.png",
  sintomas: "/assets/designer/02.png",
  resumo: "/assets/designer/03.png",
  fila: "/assets/designer/04.png",
  consulta: "/assets/designer/05.png",
  posConsulta: "/assets/designer/06.png",
};

export function CliniFlowApp() {
  const [currentStep, setCurrentStep] = useState<StepKey>("login");
  const [patient, setPatient] = useState<PatientData>({
    nome: "Mariana",
    motivo: "",
    motivoDescricao: "",
    sintomas: [],
  });

  const progressIndex = Math.max(0, STEP_ORDER.indexOf(currentStep));
  const progressPercent = Math.round(((progressIndex + 1) / STEP_ORDER.length) * 100);

  const canAdvance = useMemo(() => {
    if (currentStep === "login") return true;
    if (currentStep === "motivo") return Boolean(patient.motivo);
    if (currentStep === "sintomas") return patient.sintomas.length > 0;
    return true;
  }, [currentStep, patient.motivo, patient.sintomas.length]);

  const goNext = () => {
    if (currentStep === "login") {
      setCurrentStep("motivo");
      return;
    }
    const idx = STEP_ORDER.indexOf(currentStep);
    if (idx < STEP_ORDER.length - 1) setCurrentStep(STEP_ORDER[idx + 1]);
  };

  const goBack = () => {
    const idx = STEP_ORDER.indexOf(currentStep);
    if (idx > 0) setCurrentStep(STEP_ORDER[idx - 1]);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FDF8F8]">
      <header className="border-b border-[#f0dfe4] bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <HeartPulse className="h-8 w-8 text-[#801B33]" />
            <div>
              <p className="text-xl font-semibold text-[#801B33]">CliniFlow</p>
              <p className="text-xs text-[#666666]">Cuidado que te acompanha</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="rounded-full border border-[#eadbe0] p-2 text-[#801B33]">
              <Bell className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 rounded-full bg-[#f7eff1] px-3 py-1.5">
              <div className="h-7 w-7 rounded-full bg-[#801B33]/20" />
              <span className="text-sm font-medium">Mariana S.</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 gap-6 px-5 py-6 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
        <StepSidebar steps={STEP_LABELS} currentStep={progressIndex} />

        <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <StepContent
                currentStep={currentStep}
                patient={patient}
                setPatient={setPatient}
              />
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between border-t border-[#f1e6e9] pt-5">
            <button
              onClick={goBack}
              disabled={currentStep === "login" || currentStep === "motivo"}
              className="rounded-2xl border border-[#e7d5db] px-5 py-2 text-sm font-medium text-[#801B33] disabled:cursor-not-allowed disabled:opacity-30"
            >
              Voltar
            </button>
            <button
              onClick={goNext}
              disabled={!canAdvance}
              className="flex items-center gap-2 rounded-2xl bg-[#801B33] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#6a172b] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {currentStep === "login" ? "Entrar" : "Continuar"}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <aside className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-[#333333]">Resumo da pre-consulta</h3>
          <div className="mt-4 rounded-2xl bg-[#FDF8F8] p-4">
            <p className="text-xs text-[#777777]">Progresso da coleta</p>
            <div className="mt-2 h-2 rounded-full bg-[#f0dfe4]">
              <div
                style={{ width: `${progressPercent}%` }}
                className="h-2 rounded-full bg-[#801B33]"
              />
            </div>
            <p className="mt-2 text-xs font-medium text-[#801B33]">{progressPercent}%</p>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <p>
              <span className="font-semibold">Motivo:</span> {patient.motivo || "Nao informado"}
            </p>
            <p>
              <span className="font-semibold">Sintomas:</span>{" "}
              {patient.sintomas.length ? patient.sintomas.join(", ") : "Nenhum"}
            </p>
          </div>
          <button className="mt-6 w-full rounded-2xl border border-[#e6d4da] px-4 py-2 text-sm font-medium text-[#801B33]">
            Falar com atendente
          </button>
        </aside>
      </main>

      <footer className="bg-[#801B33] py-4 text-sm text-white">
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-3 px-5">
          <p>Ambiente seguro e em conformidade com a LGPD</p>
          <p>© 2024 CliniFlow. Termos de uso e Politica de privacidade.</p>
        </div>
      </footer>
    </div>
  );
}

function StepContent({
  currentStep,
  patient,
  setPatient,
}: {
  currentStep: StepKey;
  patient: PatientData;
  setPatient: React.Dispatch<React.SetStateAction<PatientData>>;
}) {
  if (currentStep === "motivo") {
    return (
      <div>
        <TitleBlock title={`Ola, ${patient.nome}! Qual o principal motivo da sua consulta?`} />
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {MOTIVOS.map((item) => (
            <button
              key={item}
              onClick={() => setPatient((old) => ({ ...old, motivo: item }))}
              className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${
                patient.motivo === item
                  ? "border-[#801B33] bg-[#f9eef1]"
                  : "border-[#efdee3] bg-white"
              }`}
            >
              <p className="font-semibold">{item}</p>
            </button>
          ))}
        </div>
        <textarea
          placeholder="Descreva com suas palavras..."
          value={patient.motivoDescricao}
          onChange={(e) =>
            setPatient((old) => ({ ...old, motivoDescricao: e.target.value }))
          }
          className="mt-4 min-h-28 w-full rounded-2xl border border-[#efdee3] p-3 text-sm outline-none focus:border-[#801B33]"
        />
        <ReferenceImage currentStep={currentStep} />
      </div>
    );
  }

  if (currentStep === "sintomas") {
    return (
      <div>
        <TitleBlock title="Quais sintomas voce esta sentindo?" />
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
          {SINTOMAS.map((item) => {
            const selected = patient.sintomas.includes(item);
            return (
              <button
                key={item}
                onClick={() =>
                  setPatient((old) => ({
                    ...old,
                    sintomas: selected
                      ? old.sintomas.filter((symptom) => symptom !== item)
                      : [...old.sintomas, item],
                  }))
                }
                className={`rounded-2xl border p-4 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-sm ${
                  selected ? "border-[#801B33] bg-[#f9eef1]" : "border-[#efdee3]"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {patient.sintomas.map((item) => (
            <span
              key={item}
              className="rounded-full bg-[#801B33] px-3 py-1 text-xs text-white"
            >
              {item}
            </span>
          ))}
        </div>
        <ReferenceImage currentStep={currentStep} />
      </div>
    );
  }

  if (currentStep === "resumo") {
    return (
      <div>
        <TitleBlock title="Vamos revisar suas informacoes" />
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <InfoCard title="Motivo da consulta" value={patient.motivo || "Nao informado"} />
          <InfoCard
            title="Principais sintomas"
            value={patient.sintomas.join(", ") || "Nao informado"}
          />
          <InfoCard
            title="Descricao complementar"
            value={patient.motivoDescricao || "Sem observacoes."}
          />
          <InfoCard title="Intensidade geral" value="Moderada (6/10)" />
        </div>
        <ReferenceImage currentStep={currentStep} />
      </div>
    );
  }

  if (currentStep === "fila") {
    return (
      <div>
        <TitleBlock title="Voce esta na fila!" />
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#efdee3] p-4">
            <p className="text-sm text-[#666666]">Sua posicao na fila</p>
            <p className="mt-2 text-4xl font-bold text-[#801B33]">7°</p>
            <p className="text-sm text-[#777777]">de 23 pacientes</p>
          </div>
          <div className="rounded-2xl border border-[#efdee3] p-4">
            <p className="text-sm text-[#666666]">Acompanhe em tempo real</p>
            <div className="mt-3 h-28 rounded-xl bg-gradient-to-t from-[#801B33]/30 to-transparent" />
          </div>
        </div>
        <ReferenceImage currentStep={currentStep} />
      </div>
    );
  }

  if (currentStep === "consulta") {
    return (
      <div>
        <TitleBlock title="Voce esta em consulta" />
        <div className="mt-5 rounded-2xl border border-[#efdee3] p-4">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#2b2b2b]">
            <div className="absolute left-4 top-4 rounded-full bg-[#1f8f44] px-3 py-1 text-xs text-white">
              Ao vivo
            </div>
            <Image
              src={REFERENCE_IMAGES.consulta}
              alt="Referencia de tela consulta"
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute bottom-4 right-4 h-24 w-40 rounded-xl border border-white/30 bg-black/40" />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {[Mic, Camera, Send, MessageCircle, Video].map((Icon, index) => (
              <button
                key={index}
                className="rounded-full border border-[#efdee3] p-3 text-[#801B33]"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "posConsulta") {
    return (
      <div>
        <TitleBlock title="Sua jornada continua com clareza" />
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <InfoCard title="O que entendemos juntos" value="Sem sinais de alarme no momento." />
          <div className="rounded-2xl border border-[#efdee3] p-4">
            <p className="font-semibold">Seus proximos passos</p>
            <div className="mt-3 space-y-2">
              <button className="flex w-full items-center justify-between rounded-xl bg-[#f9eef1] px-3 py-2 text-sm">
                Receita medica <FileDown className="h-4 w-4" />
              </button>
              <button className="flex w-full items-center justify-between rounded-xl bg-[#f9eef1] px-3 py-2 text-sm">
                Atestado medico <FileDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-[#efdee3] p-4">
          <p className="font-medium">Como foi sua experiencia?</p>
          <div className="mt-3 text-2xl">🙂 ⭐ ⭐ ⭐ ⭐ 😕</div>
        </div>
        <ReferenceImage currentStep={currentStep} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div>
        <TitleBlock title="Sua saude merece atencao completa" />
        <p className="mt-2 text-[#666666]">
          Consulta online com seguranca, preparo inteligente e acompanhamento continuo.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-3">
          <InfoCard title="+25 especialidades medicas" value="Atendimento disponivel 24h" />
          <InfoCard title="100% sigilo LGPD" value="Profissionais verificados" />
        </div>
      </div>
      <div className="rounded-3xl border border-[#efdde3] p-5 shadow-sm">
        <p className="text-2xl font-semibold text-[#333333]">Acesse sua conta</p>
        <div className="mt-4 space-y-3">
          <input
            defaultValue="mariana@email.com"
            className="w-full rounded-xl border border-[#e9d8de] p-3 text-sm outline-none focus:border-[#801B33]"
          />
          <input
            type="password"
            defaultValue="123456"
            className="w-full rounded-xl border border-[#e9d8de] p-3 text-sm outline-none focus:border-[#801B33]"
          />
          <button className="w-full rounded-xl bg-[#801B33] py-3 text-sm font-semibold text-white">
            Entrar
          </button>
        </div>
      </div>
      <div className="md:col-span-2">
        <ReferenceImage currentStep={currentStep} />
      </div>
    </div>
  );
}

function TitleBlock({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <h1 className="text-3xl font-semibold text-[#333333]">{title}</h1>
        <p className="mt-1 text-sm text-[#666666]">
          Siga o fluxo guiado para um atendimento mais rapido.
        </p>
      </div>
      <Stethoscope className="h-9 w-9 text-[#801B33]" />
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <article className="rounded-2xl border border-[#efdee3] p-4 shadow-sm">
      <p className="text-sm text-[#666666]">{title}</p>
      <p className="mt-1 font-semibold text-[#333333]">{value}</p>
    </article>
  );
}

function ReferenceImage({ currentStep }: { currentStep: StepKey }) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-[#efdee3]">
      <Image
        src={REFERENCE_IMAGES[currentStep]}
        alt={`Referencia visual da etapa ${currentStep}`}
        width={1280}
        height={720}
        className="h-auto w-full object-cover"
      />
    </div>
  );
}
