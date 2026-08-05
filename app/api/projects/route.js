import { NextResponse } from 'next/server';
import { getProjects, saveProjects } from '@/lib/projects';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const projects = getProjects();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, image, features, github, website } = body || {};

    if (!title) {
      return NextResponse.json({ success: false, error: 'Project title is required' }, { status: 400 });
    }

    const projects = getProjects();
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `project-${Date.now()}`;
    
    // Ensure unique ID
    let uniqueId = id;
    let counter = 1;
    while (projects.some(p => p.id === uniqueId)) {
      uniqueId = `${id}-${counter}`;
      counter++;
    }

    const newProject = {
      id: uniqueId,
      title: title.trim(),
      image: image?.trim() || '/project.png',
      features: Array.isArray(features) ? features : (features ? features.split('\n').filter(Boolean) : []),
      github: github?.trim() || '',
      website: website?.trim() || '',
      createdAt: Date.now()
    };

    // Prepend to top of list so newest projects appear first
    projects.unshift(newProject);
    saveProjects(projects);

    return NextResponse.json({ success: true, project: newProject, projects });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ success: false, error: 'Failed to create project' }, { status: 500 });
  }
}
