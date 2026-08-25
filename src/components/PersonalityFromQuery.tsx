"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useMeowneyStore } from "@/lib/store";
import { PersonalityIdSchema } from "@/lib/schemas";

export function PersonalityFromQuery() {
  const params = useSearchParams();
  const setPersonality = useMeowneyStore((s) => s.setPersonality);

  useEffect(() => {
    const raw = params.get("personality");
    const parsed = PersonalityIdSchema.safeParse(raw);
    if (parsed.success) setPersonality(parsed.data);
  }, [params, setPersonality]);

  return null;
}
