"use client";

import { ShieldCheck } from "lucide-react";

type JourneyStep = {
  id: number;
  title: string;
};

type StepSidebarProps = {
  steps: JourneyStep[];
  currentStep: number;
};

export function StepSidebar({ steps, currentStep }: StepSidebarProps) {
  return (
    <aside className="w-full rounded-3xl bg-[#f7eff1] p-6 shadow-sm lg:w-72">
      <h2 className="text-lg font-semibold text-[#333333]">Sua jornada</h2>
      <p className="mt-1 text-sm text-[#666666]">Acompanhe cada etapa.</p>

      <ol className="mt-6 space-y-3">
        {steps.map((step, index) => {
          const isDone = currentStep > index;
          const isCurrent = currentStep === index;

          return (
            <li
              key={step.id}
              className="flex items-center gap-3 rounded-2xl px-3 py-2 transition-colors"
            >
              <span
                className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold ${
                  isDone || isCurrent
                    ? "bg-[#801B33] text-white"
                    : "bg-white text-[#801B33]"
                }`}
              >
                {step.id}
              </span>
              <div>
                <p className="text-sm font-medium text-[#333333]">{step.title}</p>
                <p className="text-xs text-[#777777]">
                  {isDone ? "Concluido" : isCurrent ? "Em andamento" : "Pendente"}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 rounded-2xl border border-[#eadbe0] bg-white p-4">
        <div className="flex items-center gap-2 text-[#801B33]">
          <ShieldCheck className="h-4 w-4" />
          <p className="text-sm font-semibold">Dados protegidos</p>
        </div>
        <p className="mt-2 text-xs text-[#666666]">
          Criptografia e boas praticas para sua privacidade.
        </p>
      </div>
    </aside>
  );
}
