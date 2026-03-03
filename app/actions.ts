'use server'

import { z } from 'zod';

const waitlistSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export async function joinWaitlistAction(formData: FormData) {
  // Pegando a URL das variáveis de ambiente
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

  if (!GOOGLE_SCRIPT_URL) {
    console.error("Configuração ausente: GOOGLE_SCRIPT_URL não definida.");
    return { error: "Erro interno no servidor." };
  }

  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
  };

  const validatedData = waitlistSchema.safeParse(rawData);

  if (!validatedData.success) {
    return { error: "Dados inválidos." };
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedData.data),
    });

    const result = await response.json();

    if (result.result === 'success') {
      return { success: true };
    }
    throw new Error("Erro na persistência");
    
  } catch (error) {
    return { error: "Falha na comunicação com o servidor de dados." };
  }
}