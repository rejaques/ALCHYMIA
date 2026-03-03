'use server'

import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const waitlistSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export async function joinWaitlistAction(formData: FormData) {
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
  };

  const validatedData = waitlistSchema.safeParse(rawData);
  if (!validatedData.success) return { error: "Dados inválidos." };

  try {
    // 1. Salva no Google Sheets (Persistência)
    await fetch(GOOGLE_SCRIPT_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedData.data),
    });

    // 2. Envia E-mail de Boas-vindas (Marketing/UX)
    await resend.emails.send({
      from: 'Alchymia <welcome@alchymiaparfums.com>',
      to: [validatedData.data.email],
      subject: 'Bem-vindo ao Silêncio | Lote 01',
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: serif; text-align: center;">
          <h1 style="color: #D4AF37; letter-spacing: 5px;">ALCHYMIA</h1>
          <p style="text-transform: uppercase; letter-spacing: 2px; font-size: 12px; color: #888;">Bem-vindo, ${validatedData.data.name}</p>
          <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;" />
          <p style="line-height: 1.6; color: #ccc;">Sua presença foi registrada na lista de espera para o <strong>Lote 01 de Silentivm</strong>.</p>
          <p style="line-height: 1.6; color: #ccc;">Você será notificado assim que a alquimia estiver completa e pronta para o despertar.</p>
          <div style="margin-top: 40px; font-style: italic; color: #D4AF37;">Handcrafted in Brazil</div>
        </div>
      `
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao processar sua solicitação." };
  }
}