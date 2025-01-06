'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { CopyIcon, EyeIcon, CheckIcon } from 'lucide-react';
import { useGetUrlsQuery } from '@/lib/hooks/useUrls';

const UrlList = () => {
    const { data: urls, isLoading, isError } = useGetUrlsQuery();
    const [copied, setCopied] = useState<boolean>(false);
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

    if (isLoading) {
        return <p>Loading URLs...</p>;
    }

    if (isError) {
        return <p>Error loading URLs</p>;
    }

    const shortenUrl = (slug: string) => {
        return `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`;
    };

    const handleCopyUrl = (slug: string) => {
        navigator.clipboard.writeText(shortenUrl(slug)).then(() => {
            setCopied(true);
            setCopiedUrl(slug);
            setTimeout(() => {
                setCopied(false);
                setCopiedUrl(null);
            }, 1000);
        });
    };

    return (
        <div>
            <h2 className="mb-2 text-2xl font-bold">Recent URLs</h2>
            <ul className="space-y-2">
                {urls?.map((url) => (
                    <li
                        key={url.id}
                        className="flex items-center justify-between rounded-md border bg-card px-3 py-2 text-card-foreground"
                    >
                        <Link
                            href={`/${url.slug}`}
                            target="_blank"
                            className="text-blue-500 underline"
                        >
                            {shortenUrl(url.slug)}
                        </Link>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:bg-muted"
                                onClick={() => handleCopyUrl(url.slug)}
                            >
                                {copied && copiedUrl === url.slug ? (
                                    <CheckIcon size={16} />
                                ) : (
                                    <CopyIcon size={16} />
                                )}
                                <span className="sr-only">Copy URL</span>
                            </Button>
                            <span className="flex items-center gap-2">
                                <EyeIcon size={16} />
                                <p>{url.visits} views</p>
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UrlList;
