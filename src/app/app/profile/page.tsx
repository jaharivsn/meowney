"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { TutorialModal } from "@/components/TutorialModal";
import { useMeowneyStore, useHydratedStore, DEFAULT_STATE } from "@/lib/store";

interface FAQItem {
  question: string;
  answer: string;
  icon: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Como o Meowney guarda meus dados?",
    answer:
      "Seus dados são armazenados localmente no seu próprio navegador de forma 100% privada e segura. Nenhuma informação financeira é enviada para servidores externos ou terceiros.",
    icon: "shield_lock",
  },
  {
    question: "Como funcionam as Cat-Stashes?",
    answer:
      "As Cat-Stashes são seus potes de economia felina! Você cria um objetivo com um valor alvo (ex: R$ 500 para brinquedos ou veterinário) e acompanha o progresso conforme acumula economias.",
    icon: "savings",
  },
  {
    question: "O que acontece ao adicionar um gasto?",
    answer:
      "Ao registrar um novo gasto no botão de patinha 🐾, o valor é automaticamente deduzido do seu saldo principal e registrado na sua lista de rações e transações recentes.",
    icon: "receipt_long",
  },
];

export default function Profile() {
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const categories = useHydratedStore((s) => s.categories, DEFAULT_STATE.categories);
  const addCategory = useMeowneyStore((s) => s.addCategory);
  const deleteCategory = useMeowneyStore((s) => s.deleteCategory);

  const [newCatName, setNewCatName] = useState("");
  const [newCatType, setNewCatType] = useState<'expense' | 'income'>("expense");

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <Header title="Perfil" />

      <main className="relative pt-16 bg-background min-h-screen pb-32">
        <div className="flex flex-col w-full px-margin-mobile gap-6">
          {/* User Avatar & Header */}
          <div className="relative overflow-hidden bg-cream-milk rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm mt-6 border border-sakura-pink/20">
            {/* Background Paw Watermark */}
            <div className="absolute -top-10 -right-10 opacity-10 text-primary rotate-12 pointer-events-none">
              <span className="material-symbols-outlined text-[140px]">pets</span>
            </div>

            <div className="relative">
              <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-sakura-pink shadow-md relative">
                <Image
                  alt="Cat Parent Avatar"
                  className="w-full h-full object-cover"
                  fill
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMG7yRoAXdNaeC57pEKjPZCGnbRrS--CVnH4KyB6eXdYOFLlRxQbDw7M12Fv6Fq2bveh-vB25qDqI7-kQEjBKF0y60WmoDtjJ0RG-gVde6mh7296kWBmXltu5fI3PYwCRTOUhl-rjlbUXfi69r-NkVcp50P38e_PSc3v8ARv8gTdoqaUjRwgnEsHGQpmMsAADD5C4tu0gEGXSXqzO-k084pFMbqSOSc4pHPkrHegFaIXwoJG_sUXso"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-mint-fresh text-on-tertiary-container px-3 py-1 rounded-full text-label-sm font-bold shadow-sm flex items-center gap-1">
                <span>🐾</span>
                <span>Membro Meowney</span>
              </div>
            </div>

            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-5 font-bold">
              Cat Parent
            </h1>
            <p className="font-body-md text-on-surface-variant opacity-75">
              Tutor Felino & Mestre do Orçamento
            </p>
          </div>

          {/* Core Actions: Replay Tutorial & Support */}
          <div className="grid grid-cols-1 gap-3">
            {/* Replay Tutorial Button */}
            <button
              onClick={() => setIsTutorialOpen(true)}
              className="flex items-center justify-between w-full p-4 bg-surface-container-lowest hover:bg-cream-milk/60 border border-sakura-pink/20 rounded-2xl shadow-sm transition-all duration-200 group text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-sakura-pink/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">
                    replay
                  </span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-bold">
                    Rever Tutorial
                  </p>
                  <p className="font-label-sm text-label-sm text-outline">
                    Rever guia de primeiros passos do Meowney
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">
                chevron_right
              </span>
            </button>

            {/* Support Button (Mailto link) */}
            <a
              href="mailto:jahari.wav@gmail.com"
              className="flex items-center justify-between w-full p-4 bg-surface-container-lowest hover:bg-cream-milk/60 border border-sakura-pink/20 rounded-2xl shadow-sm transition-all duration-200 group text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-mint-fresh/30 flex items-center justify-center text-tertiary group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">
                    mail
                  </span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-bold">
                    Falar com Suporte
                  </p>
                  <p className="font-label-sm text-label-sm text-outline">
                    jahari.wav@gmail.com
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">
                open_in_new
              </span>
            </a>
          </div>

          {/* Manage Categories Section */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 border border-sakura-pink/20 shadow-sm flex flex-col gap-4 mt-2">
            <div className="flex items-center gap-2 border-b border-surface-variant/50 pb-3">
              <span className="material-symbols-outlined text-primary text-[24px]">
                category
              </span>
              <div>
                <h2 className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-bold">
                  Gerenciar Categorias
                </h2>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              {categories.map((cat) => (
                <div key={cat.id} className="flex justify-between items-center bg-cream-milk p-3 rounded-lg border border-surface-variant/20">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary bg-sakura-pink/20 p-2 rounded-full">{cat.icon}</span>
                    <div>
                      <p className="font-body-md text-on-surface">{cat.label}</p>
                      <p className="text-xs text-outline">{cat.type === 'expense' ? 'Gasto' : 'Renda'}</p>
                    </div>
                  </div>
                  {cat.isCustom && (
                    <button onClick={() => deleteCategory(cat.id)} className="text-error p-2 hover:bg-error/10 rounded-full transition-colors">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-2 pt-4 border-t border-surface-variant/30">
              <h3 className="font-label-sm mb-2 text-on-surface">Nova Categoria</h3>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Nome (ex: Salão)"
                  className="bg-surface-container-low p-3 rounded-lg text-sm w-full outline-none"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                />
                <div className="flex gap-2">
                  <select
                    className="bg-surface-container-low p-3 rounded-lg text-sm flex-1 outline-none"
                    value={newCatType}
                    onChange={(e) => setNewCatType(e.target.value as 'expense' | 'income')}
                  >
                    <option value="expense">Gasto</option>
                    <option value="income">Renda</option>
                  </select>
                  <button
                    onClick={() => {
                      if (newCatName.trim()) {
                        addCategory({ label: newCatName.trim(), type: newCatType, icon: 'pets', isCustom: true });
                        setNewCatName("");
                      }
                    }}
                    className="bg-primary text-white p-3 rounded-lg shadow-sm"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Static FAQ Accordion Section */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 border border-sakura-pink/20 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-surface-variant/50 pb-3">
              <span className="material-symbols-outlined text-primary text-[24px]">
                help
              </span>
              <div>
                <h2 className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-bold">
                  Perguntas Frequentes (FAQ)
                </h2>
                <p className="font-label-sm text-label-sm text-outline">
                  Dúvidas comuns sobre o Meowney
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-surface-variant rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-cream-milk/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          {item.icon}
                        </span>
                        <span className="font-body-md text-body-md text-on-surface font-semibold">
                          {item.question}
                        </span>
                      </div>
                      <span
                        className={`material-symbols-outlined text-outline transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        expand_more
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 bg-surface-container-low/40 border-t border-surface-variant/30">
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Back to Home CTA */}
          <div className="pt-2 flex justify-center w-full">
            <Link href="/" className="px-6 py-4 flex items-center justify-center gap-2 text-on-surface bg-surface-container-low font-bold hover:bg-sakura-pink/20 transition-colors rounded-xl shadow-sm w-full border border-surface-variant/20">
              <span className="material-symbols-outlined">home</span>
              Voltar para o Site Inicial
            </Link>
          </div>

          {/* Footer Info */}
          <div className="py-6 flex flex-col items-center opacity-40 gap-1 text-center">
            <span className="material-symbols-outlined text-[20px]">pets</span>
            <span className="font-label-sm text-label-sm">
              Meowney v2.4.1 • Edição Sakura 🐾
            </span>
          </div>
        </div>
      </main>

      {/* Tutorial Modal for Manual Replay */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />
    </>
  );
}
