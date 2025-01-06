import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { CopyIcon, EyeIcon } from 'lucide-react';
import { useGetUrlsQuery } from '@/lib/hooks/useUrls';

const UrlList = () => {
    const { data: urls, isLoading, isError } = useGetUrlsQuery();

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (isError) {
        return <p>Error loading URLs</p>;
    }

    const shortenUrl = (slug: string) => {
        return `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`;
    };

    return (
        <div>
            <h2 className="text-center text-2xl font-bold">Recent URLs</h2>
            <ul className="space-y-2">
                {urls?.map((url) => (
                    <li
                        key={url.id}
                        className="flex items-center justify-between"
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
                            >
                                <CopyIcon size={16} />
                                <span className="sr-only">Copy URL</span>
                            </Button>
                            <span className="flex items-center">
                                <EyeIcon size={16} />
                                {url.visits} views
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UrlList;
