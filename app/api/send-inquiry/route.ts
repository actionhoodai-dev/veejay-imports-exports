import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, company, interest, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'Inquiry <onboarding@resend.dev>',
      to: 'veejayexportsandimports@gmail.com',
      subject: `VEEJAY New Trade Inquiry: ${interest} - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #344155;">
            <h2 style="color: #0c1c61;">New Trade Inquiry from Website</h2>
            <hr style="border: 0.5px solid #eaeaea; margin: 20px 0;">
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Company:</strong> ${company || 'N/A'}</p>
            <p><strong>Interested In:</strong> ${interest}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                ${message || 'No additional message provided.'}
            </div>
            <footer style="margin-top: 30px; border-top: 1px solid #eaeaea; padding-top: 10px; font-size: 0.8em; color: #94a3b8;">
                Sent from the VEEJAY Exports & Imports Trade Portal.
            </footer>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
