import { NextResponse } from 'next/server';
import { getProjects, saveProjects } from '@/lib/projects';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, image, features, github, website } = body || {};

    const projects = getProjects();
    const index = projects.findIndex(p => p.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    projects[index] = {
      ...projects[index],
      title: title ? title.trim() : projects[index].title,
      image: image !== undefined ? image.trim() : projects[index].image,
      features: Array.isArray(features) ? features : (features ? features.split('\n').filter(Boolean) : projects[index].features),
      github: github !== undefined ? github.trim() : projects[index].github,
      website: website !== undefined ? website.trim() : projects[index].website,
    };

    saveProjects(projects);

    return NextResponse.json({ success: true, project: projects[index], projects });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ success: false, error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    let projects = getProjects();
    const initialLength = projects.length;

    projects = projects.filter(p => p.id !== id);

    if (projects.length === initialLength) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    saveProjects(projects);

    return NextResponse.json({ success: true, message: 'Project deleted', projects });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete project' }, { status: 500 });
  }
}
