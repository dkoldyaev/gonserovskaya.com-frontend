import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// GET handler for easy manual testing / manual integration:
// GET /api/revalidate?secret=YOUR_TOKEN&path=/en/projects
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');

  const token = process.env.REVALIDATION_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: 'REVALIDATION_TOKEN is not configured on the server' },
      { status: 500 }
    );
  }

  if (secret !== token) {
    return NextResponse.json(
      { error: 'Invalid secret token' },
      { status: 401 }
    );
  }

  if (!path) {
    return NextResponse.json(
      { error: 'Missing "path" query parameter. Example: ?secret=...&path=/en/projects' },
      { status: 400 }
    );
  }

  try {
    // Revalidate the specific path
    revalidatePath(path);
    
    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: Date.now()
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to revalidate path', details: error.message },
      { status: 500 }
    );
  }
}

// POST handler for webhooks (e.g. Strapi or general automated triggers)
export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret') || request.headers.get('x-revalidate-token');
  const token = process.env.REVALIDATION_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: 'REVALIDATION_TOKEN is not configured on the server' },
      { status: 500 }
    );
  }

  if (secret !== token) {
    return NextResponse.json(
      { error: 'Invalid secret token' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    console.log('[Revalidation Webhook] Received payload:', JSON.stringify(body, null, 2));

    let revalidatedPaths: string[] = [];

    // Support Strapi Webhooks
    // Strapi payload usually has:
    // event: "entry.update" | "entry.publish" | "entry.unpublish" | etc.
    // model: "page"
    // entry: { url: "/about", locale: "en", ... }
    if (body.model && body.entry) {
      const { model, entry, event } = body;
      const locale = entry.locale || 'en'; // default fallback
      const url = entry.url; // e.g. "/projects" or "/"
      
      console.log(`[Revalidation Webhook] Processing Strapi event "${event}" for model "${model}"`);

      if (url) {
        // Construct standard localized paths
        // e.g. url = "/" -> "/en"
        // e.g. url = "/projects" -> "/en/projects"
        const targetPath = url === '/' ? `/${locale}` : `/${locale}${url}`;
        revalidatePath(targetPath);
        revalidatedPaths.push(targetPath);
        
        // Also revalidate the main layout to clear navigation/header caches if applicable
        revalidatePath('/[locale]/[...slug]', 'layout');
        revalidatedPaths.push('/[locale]/[...slug] (layout)');
      }
    } else if (body.path) {
      // General webhook with a simple { "path": "/en/about" } JSON body
      revalidatePath(body.path);
      revalidatedPaths.push(body.path);
    } else {
      // Fallback: if no specific path was found, revalidate everything (clears all pages)
      revalidatePath('/[locale]/[...slug]', 'layout');
      revalidatedPaths.push('/[locale]/[...slug] (fallback layout)');
    }

    return NextResponse.json({
      revalidated: true,
      paths: revalidatedPaths,
      timestamp: Date.now()
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to parse request or revalidate path', details: error.message },
      { status: 500 }
    );
  }
}
