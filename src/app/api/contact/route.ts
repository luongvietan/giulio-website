import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend lazily to avoid build-time errors
const getResend = () => new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, country, areaOfInterest, message } = await request.json();

    if (!name || !email || !country || !areaOfInterest || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const areaLabels: Record<string, string> = {
      'discord-memberships': 'Discord Memberships',
      'consulting-portfolio-review': 'Consulting & Portfolio Review',
      'strategy-design': 'Strategy Design',
      'options-derivatives': 'Options & Derivatives',
      'structured-products': 'Structured Products',
      'real-estate-other-assets': 'Real Estate & Other Assets',
      'crypto': 'Crypto',
      'partnerships-other': 'Partnerships / Other',
    };

    const areaLabel = areaLabels[areaOfInterest] || 'Other';
    const subjectLine = `[Gamma Capital] ${areaLabel} - Contact Request from ${name}`;

    const { data, error } = await getResend().emails.send({
      from: 'Gamma Capital <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'contact@gammacap.ch'],
      replyTo: email,
      subject: subjectLine,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="border-bottom: 2px solid #0d9488; padding-bottom: 20px; margin-bottom: 20px;">
            <h1 style="color: #0a0a0b; font-size: 24px; margin: 0;">New Contact Request</h1>
          </div>
          
          <div style="background: #f4f4f5; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <p style="margin: 0 0 12px 0;"><strong>Full Name:</strong> ${name}</p>
            <p style="margin: 0 0 12px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0d9488;">${email}</a></p>
            <p style="margin: 0 0 12px 0;"><strong>Country of Residence:</strong> ${country}</p>
            <p style="margin: 0;"><strong>Area of Interest:</strong> ${areaLabel}</p>
          </div>
          
          <div style="background: #fff; border: 1px solid #e4e4e7; border-radius: 8px; padding: 20px;">
            <h2 style="color: #0a0a0b; font-size: 16px; margin: 0 0 12px 0;">Message:</h2>
            <p style="color: #52525b; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e4e4e7; text-align: center;">
            <p style="color: #a1a1aa; font-size: 12px; margin: 0;">
              This email was sent from the Gamma Capital website contact form.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
