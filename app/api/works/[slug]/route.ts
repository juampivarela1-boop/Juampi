import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity.client';
import { projectBySlugQuery } from '@/lib/sanity.queries';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
    return NextResponse.json(null, { status: 404 });
  }

  try {
    const { slug } = await params;
    const project = await client.fetch(projectBySlugQuery, { slug });

    if (!project) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}
