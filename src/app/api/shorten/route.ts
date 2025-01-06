import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { generateSlug } from '@/lib/slugGenerator';
import { shortenUrlSchema } from '@/lib/validation';
import { ShortenUrlRequest, ShortenUrlResponse } from '@/types/api';
import { z } from 'zod';

export async function POST(request: NextRequest) {
    try {
        const body: ShortenUrlRequest = await request.json();
        const { url, customSlug, expirationDate } =
            shortenUrlSchema.parse(body);

        if (customSlug) {
            const existingUrl = await prisma.url.findUnique({
                where: { slug: customSlug },
            });
            if (existingUrl) {
                return NextResponse.json(
                    { message: 'Slug already exists.' },
                    { status: 400 },
                );
            }
        }

        const slug = customSlug || generateSlug();

        const newUrl = await prisma.url.create({
            data: {
                slug,
                originUrl: url,
                expiresAt: expirationDate
                    ? new Date(expirationDate)
                    : undefined,
            },
        });

        const response: ShortenUrlResponse = {
            id: newUrl.id,
            slug: newUrl.slug,
            originUrl: newUrl.originUrl,
            shortUrl: `${process.env.BASE_URL}/${newUrl.slug}`,
        };

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: 'Validation Error' },
                { status: 400 },
            );
        }

        console.error('Unexpected error: ', error);
        return NextResponse.json(
            { message: 'An unexpected error occurred.' },
            { status: 500 },
        );
    }
}
