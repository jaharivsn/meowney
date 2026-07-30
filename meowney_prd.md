# Meowney - Product Requirement Document (PRD)

## Project Overview
**Meowney** is a smart, cat-themed personal expense management webapp. It combines high utility with a "Kawaii & Cats" aesthetic. Initially using LocalStorage for rapid testing, it is architected for a future seamless migration to Supabase.

## Target Audience
- Finance-conscious individuals who enjoy a playful, cute aesthetic (Kawaii/Cat lovers).
- Beta test group for initial feedback.

## Key Features (V1 - LocalStorage)
### 1. Core Financial Management
- **Expense Logging**: Daily entry of transactions with amount, category, and date.
- **Category Management**: Customizable categories with Kawaii icons and pastel colors.
- **Budget Goals ("Cat-Stash")**: Set and track savings goals with progress visualizations.
- **Flexible Views**: Toggle between Grid and List layouts for all main views.

### 2. User Experience (UX)
- **Theme**: Soft pastel palette (Sakura Pink, Cream, Lavender, Mint).
- **Interactions**: Fluid animations (Framer Motion) and cat-themed feedback (paw prints, purring states).
- **Mobile-First**: Fully responsive design optimized for mobile devices.

### 3. Architecture
- **Framework**: Next.js (App Router).
- **Styling**: TailwindCSS + Shadcn/ui (customized).
- **State/Persistence**: Repository Pattern abstracting LocalStorage to allow future Supabase integration.
- **Types**: Strong TypeScript typing for Transactions, Categories, and Goals.

## Design Principles
- **Clarity**: High-fidelity numbers and tables using Plus Jakarta Sans for readability.
- **Personality**: Soft corners (1rem+ radius), playful typography (Nunito/Fredoka) for headers.
- **Micro-interactions**: 60fps-style transitions and hover effects.

## Roadmap (V2 - Supabase)
- Authentication (Email/Social).
- Real-time cloud sync.
- Collaborative "Shared Cat-Stashes" for couples/groups.
- AI Cat-Assistant for financial advice based on spending patterns.
