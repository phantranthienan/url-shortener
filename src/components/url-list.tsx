import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { CopyIcon, EyeIcon } from 'lucide-react';

const UrlList = () => {
    return (
        <div>
            <h2 className="mb-2 text-2xl font-bold">Recent URLs</h2>
            <ul className="space-y-2">
                <li className="flex items-center justify-between">
                    <Link
                        href="https://www.google.com"
                        className="text-blue-500 underline"
                    >
                        https://www.google.com
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
                            100 views
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default UrlList;
