import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity.client';
import { featuredProjectsQuery, projectListQuery } from '@/lib/sanity.queries';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured') === '1';

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
    return NextResponse.json([]);
  }

  try {
    const query = featured ? featuredProjectsQuery : projectListQuery;
    const projects = await client.fetch(query);
    return NextResponse.json(projects ?? []);
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
