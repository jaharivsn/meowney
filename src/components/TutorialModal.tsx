"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMeowneyStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { PersonalityPicker } from "@/components/PersonalityPicker";
import type { PersonalityId } from "@/lib/schemas";

export interface TutorialModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface TutorialStep {
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  badge: string;
  bgGradient: string;
  iconColor: string;
  isPersonality?: boolean;
}

const STEPS: TutorialStep[] = [
  {
    title: "Escolha seu gato",
    subtitle: "Quem cuida do seu orçamento?",
    icon: "pets",
    description: "Cada personalidade fala de um jeito. Dá pra trocar depois no perfil.",
    badge: "Passo 0",
    bgGradient: "from-sakura-pink/30 to-cream-milk",
    iconColor: "text-primary",
    isPersonality: true,
  },
  {
    title: "Bem-vindo ao Meowney!",
    subtitle: "Seu controle financeiro kawaii",
    icon: "pets",
    description:
      "Controle gastos com uma experiência fofa e local — dados só neste aparelho.",
    badge: "Passo 1 de 4",
    bgGradient: "from-sakura-pink/30 to-cream-milk",
    iconColor: "text-primary",
  },
  {
    title: "Registre suas Rações",
    subtitle: "Lançamento rápido",
    icon: "shopping_basket",
    description:
      "Use o botão de patinha 🐾 para lançar gastos e rendas. O saldo atualiza na hora.",
    badge: "Passo 2 de 4",
    bgGradient: "from-cream-milk to-lavender/30",
    iconColor: "text-on-secondary-container",
  },
  {
    title: "Cat-Stash Goals",
    subtitle: "Cofrinhos que descontam do saldo",
    icon: "savings",
    description:
      "Guardar no cofrinho tira do saldo livre. Excluir a meta devolve o valor.",
    badge: "Passo 3 de 4",
    bgGradient: "from-mint-fresh/30 to-cream-milk",
    iconColor: "text-tertiary",
  },
  {
    title: "Pronto para começar!",
    subtitle: "Finanças purr-feitas",
    icon: "auto_awesome",
    description:
      "O gato vai comentar sua semana no dashboard. Sem cadastro, sem nuvem obrigatória.",
    badge: "Passo 4 de 4",
    bgGradient: "from-lavender/30 to-sakura-pink/30",
    iconColor: "text-primary",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.96,
  }),
};

export function TutorialModal({ isOpen: propsIsOpen, onClose }: TutorialModalProps) {
  const isHydrated = useMeowneyStore((s) => s.isHydrated);
  const storeHasSeenTutorial = useMeowneyStore((s) => s.hasSeenTutorial);
  const setHasSeenTutorial = useMeowneyStore((s) => s.setHasSeenTutorial);
  const personality = useMeowneyStore((s) => s.personality);
  const setPersonality = useMeowneyStore((s) => s.setPersonality);

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const mounted = useMounted();
  const [pickedCustom, setPickedCustom] = useState<PersonalityId | null>(null);
  const picked = pickedCustom ?? personality;
  const setPicked = (p: PersonalityId | null) => setPickedCustom(p);

  const isVisible =
    mounted &&
    (typeof propsIsOpen === "boolean"
      ? propsIsOpen
      : isHydrated && !storeHasSeenTutorial);

  const handleFinish = () => {
    if (picked) setPersonality(picked);
    else if (!personality) setPersonality("cheerleader");
    setHasSeenTutorial(true);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("hasSeenTutorial");
    }
    onClose?.();
  };

  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleFinish();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (!isVisible) return null;

  const step = STEPS[currentStep];
  const canAdvancePersonality = !step.isPersonality || !!picked;

  const handleNext = () => {
    if (step.isPersonality) {
      if (!picked) return;
      setPersonality(picked);
    }
    if (currentStep < STEPS.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-soft-charcoal/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleFinish}
      >
        <motion.div
          className="relative w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden border border-sakura-pink/30 flex flex-col max-h-[90dvh]"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 pt-5 pb-2">
            <span className="font-label-sm text-label-sm px-3 py-1 bg-sakura-pink/30 text-on-primary-container rounded-full font-bold uppercase tracking-wider">
              {step.badge}
            </span>
            <button
              onClick={handleFinish}
              className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors"
              aria-label="Fechar tutorial"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="relative min-h-[280px] px-6 py-4 flex flex-col items-center justify-center overflow-y-auto">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="w-full flex flex-col items-center text-center gap-4"
              >
                {step.isPersonality ? (
                  <>
                    <div className="flex flex-col gap-1.5 max-w-sm">
                      <h2 data-testid="onboarding-title" className="font-headline-md text-headline-md text-on-surface">
                        {step.title}
                      </h2>
                      <p className="font-label-md text-label-md text-primary font-semibold">
                        {step.subtitle}
                      </p>
                    </div>
                    <PersonalityPicker
                      value={picked}
                      onChange={setPicked}
                      compact
                    />
                  </>
                ) : (
                  <>
                    <div
                      className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.bgGradient} flex items-center justify-center shadow-inner relative group`}
                    >
                      <span
                        className={`material-symbols-outlined text-[48px] ${step.iconColor}`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {step.icon}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5 max-w-xs">
                      <h2 data-testid="onboarding-title" className="font-headline-md text-headline-md text-on-surface">
                        {step.title}
                      </h2>
                      <p className="font-label-md text-label-md text-primary font-semibold">
                        {step.subtitle}
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant opacity-85 mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="px-6 py-5 bg-surface-container-low/60 flex items-center justify-between border-t border-surface-variant/40">
            <div className="flex items-center gap-1.5">
              {STEPS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentStep ? 1 : -1);
                    setCurrentStep(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep ? "w-7 bg-primary" : "w-2 bg-outline/30"
                  }`}
                  aria-label={`Ir para passo ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  data-testid="onboarding-prev-btn"
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-xl text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors"
                >
                  Anterior
                </button>
              )}
              <button
                data-testid="onboarding-next-btn"
                onClick={handleNext}
                disabled={!canAdvancePersonality}
                className="px-5 py-2.5 rounded-xl bg-sakura-pink hover:bg-sakura-pink/90 text-on-primary-container font-label-md text-label-md font-bold shadow-sm transition-all active:scale-95 flex items-center gap-1 disabled:opacity-40"
              >
                <span>{currentStep === STEPS.length - 1 ? "Começar!" : "Próximo"}</span>
                {currentStep < STEPS.length - 1 && (
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
