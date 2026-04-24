import { NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import path from 'path';

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');

async function ensureDataDir() {
  const dir = path.join(process.cwd(), 'data');
  try {
    await mkdir(dir, { recursive: true });
  } catch {
    // Already exists
  }
}

async function readLeads() {
  try {
    const content = await readFile(LEADS_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, message } = body;

    // Validation
    if (!name || !company || !email) {
      return NextResponse.json(
        { success: false, message: 'Name, company, and email are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Build lead object
    const lead = {
      id: `lead_${Date.now()}`,
      name: name.trim(),
      company: company.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      message: message?.trim() || '',
      submittedAt: new Date().toISOString(),
      source: 'enterprise_landing_page',
    };

    // Persist to JSON file
    await ensureDataDir();
    const leads = await readLeads();
    leads.push(lead);
    await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');

    console.log(`[Enquiry] New lead from ${lead.name} at ${lead.company} <${lead.email}>`);

    return NextResponse.json(
      {
        success: true,
        message: `Thank you, ${lead.name}! We'll be in touch with you shortly at ${lead.email}.`,
        leadId: lead.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Enquiry API Error]', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await ensureDataDir();
    const leads = await readLeads();
    return NextResponse.json({ success: true, count: leads.length, leads });
  } catch {
    return NextResponse.json({ success: false, leads: [] });
  }
}
