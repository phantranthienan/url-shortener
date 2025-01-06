import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const urls = await prisma.url.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(urls);
    } catch (error) {
        console.error('Unexpected error: ', error);
        return NextResponse.json(
            { message: 'An unexpected error occurred.' },
            { status: 500 },
        );
    }
}
