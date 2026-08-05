import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const targetFolder = formData.get('folder') || (file?.name?.endsWith('.pdf') ? 'certification' : 'project-image');

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to requested folder in /public (e.g. project-image or certification)
    const folderName = targetFolder === 'certification' ? 'certification' : 'project-image';
    const uploadDir = path.join(process.cwd(), 'public', folderName);
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate clean unique filename
    const originalName = file.name || 'file';
    const cleanName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}_${cleanName}`;
    const filePath = path.join(uploadDir, filename);

    fs.writeFileSync(filePath, buffer);

    const publicPath = `/${folderName}/${filename}`;

    return NextResponse.json({
      success: true,
      filePath: publicPath,
      imagePath: publicPath,
      filename,
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
