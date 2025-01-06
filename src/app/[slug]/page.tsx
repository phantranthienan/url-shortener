import React from 'react';
import { Url } from '@prisma/client';
import prisma from '@/lib/db';
import { notFound, redirect } from 'next/navigation';

interface RedirectPageProps {
    params: {
        slug: string;
    };
}

const RedirectPage: React.FC<RedirectPageProps> = async ({ params }) => {
    const { slug } = params;

    const url: Url | null = await prisma.url.findUnique({
        where: {
            slug,
        },
    });

    if (!url) {
        return notFound();
    }

    redirect(url.originUrl);
};

export default RedirectPage;
