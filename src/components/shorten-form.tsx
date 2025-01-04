'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const ShortenForm = () => {
    const [url, setUrl] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(url);
    };
    return (
        <form className="mb-2 flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input
                type="url"
                placeholder="Enter URL to shorten"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <Button className="w-full" type="submit">
                Shorten URL
            </Button>
        </form>
    );
};

export default ShortenForm;
