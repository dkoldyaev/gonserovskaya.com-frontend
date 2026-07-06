import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// GET handler for easy manual testing / manual integration:
// GET /api/revalidate?path=/en/projects
// Requires header: Authorization: Bearer YOUR_TOKEN
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  
  const authHeader = request.headers.get('authorization');
  const secret = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

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
// Requires header: Authorization: Bearer YOUR_TOKEN
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const secret = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
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
    console.log('[Revalidation Webhook] Received payload:', {event: body.event, model: body.model, entry: { url: body.entry.url, locale: body.entry.locale, title: body.entry.title }});

    let revalidatedPaths: string[] = [];

    if (body.model && body.entry) {
      const { model, entry, event } = body;
      const locale = entry.locale || 'en'; // default fallback
      
      console.log(`[Revalidation Webhook] Processing Strapi event "${event}" for model "${model}"`);

      if (model === 'page') {
        const url = entry.url; // e.g. "/projects" or "/"
        if (url) {
          const targetPath = url === '/' ? `/${locale}` : `/${locale}${url}`;
          revalidatePath(targetPath);
          revalidatedPaths.push(targetPath);

          // Additional logic for parent pages
          if (url.startsWith('/projects/') || url.startsWith('/portfolio/')) {
            const homePath = `/${locale}`;
            revalidatePath(homePath);
            revalidatedPaths.push(`${homePath} (projects parent)`);
          } else if (url.startsWith('/drawings/')) {
            const drawingsPath = `/${locale}/drawings`;
            revalidatePath(drawingsPath);
            revalidatedPaths.push(`${drawingsPath} (drawings parent)`);
          }
        }
      } else if (model === 'menu') {
        // Menu affects all pages in the locale, revalidate layout
        revalidatePath(`/${locale}`, 'layout');
        revalidatedPaths.push(`/${locale} (layout)`);
      } else {
        // Fallback for other models: revalidate layout
        revalidatePath(`/${locale}`, 'layout');
        revalidatedPaths.push(`/${locale} (fallback layout)`);
      }
    } else if (body.path) {
      // General webhook with a simple { "path": "/en/about" } JSON body
      revalidatePath(body.path);
      revalidatedPaths.push(body.path);
    } else {
      // Fallback: if no specific path was found, revalidate everything (clears all pages)
      revalidatePath('/', 'layout');
      revalidatedPaths.push('/ (fallback layout)');
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
