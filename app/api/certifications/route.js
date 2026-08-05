import { NextResponse } from 'next/server';
import { getCertifications, saveCertifications } from '@/lib/certifications';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const certifications = getCertifications();
    return NextResponse.json({ success: true, certifications });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch certifications' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, image, issueDate, skills, pdfUrl } = body || {};

    if (!title) {
      return NextResponse.json({ success: false, error: 'Certification title is required' }, { status: 400 });
    }

    const certifications = getCertifications();
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `cert-${Date.now()}`;
    
    // Ensure unique ID
    let uniqueId = id;
    let counter = 1;
    while (certifications.some(c => c.id === uniqueId)) {
      uniqueId = `${id}-${counter}`;
      counter++;
    }

    const newCert = {
      id: uniqueId,
      title: title.trim(),
      image: image?.trim() || '/aws.png',
      issueDate: issueDate?.trim() || '2025',
      skills: skills?.trim() || '',
      pdfUrl: pdfUrl?.trim() || '',
      createdAt: Date.now()
    };

    // Prepend to top of array so newly added certificates appear first
    certifications.unshift(newCert);
    saveCertifications(certifications);

    return NextResponse.json({ success: true, certification: newCert, certifications });
  } catch (error) {
    console.error('Error creating certification:', error);
    return NextResponse.json({ success: false, error: 'Failed to create certification' }, { status: 500 });
  }
}
