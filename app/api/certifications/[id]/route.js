import { NextResponse } from 'next/server';
import { getCertifications, saveCertifications } from '@/lib/certifications';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, image, issueDate, skills, pdfUrl } = body || {};

    const certifications = getCertifications();
    const index = certifications.findIndex(c => c.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Certification not found' }, { status: 404 });
    }

    certifications[index] = {
      ...certifications[index],
      title: title ? title.trim() : certifications[index].title,
      image: image !== undefined ? image.trim() : certifications[index].image,
      issueDate: issueDate !== undefined ? issueDate.trim() : certifications[index].issueDate,
      skills: skills !== undefined ? skills.trim() : certifications[index].skills,
      pdfUrl: pdfUrl !== undefined ? pdfUrl.trim() : certifications[index].pdfUrl,
    };

    saveCertifications(certifications);

    return NextResponse.json({ success: true, certification: certifications[index], certifications });
  } catch (error) {
    console.error('Error updating certification:', error);
    return NextResponse.json({ success: false, error: 'Failed to update certification' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    let certifications = getCertifications();
    const initialLength = certifications.length;

    certifications = certifications.filter(c => c.id !== id);

    if (certifications.length === initialLength) {
      return NextResponse.json({ success: false, error: 'Certification not found' }, { status: 404 });
    }

    saveCertifications(certifications);

    return NextResponse.json({ success: true, message: 'Certification deleted', certifications });
  } catch (error) {
    console.error('Error deleting certification:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete certification' }, { status: 500 });
  }
}
