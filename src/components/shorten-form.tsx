'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { shortenUrlSchema } from '@/lib/validation';
import { useShortenUrlMutation } from '@/lib/hooks/useUrls';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { DatePicker } from './ui/datepicker';

type FormData = {
    url: string;
    customSlug: string;
    expirationDate: Date | undefined;
};

const ShortenForm = () => {
    const [formData, setFormData] = useState<FormData>({
        url: '',
        customSlug: '',
        expirationDate: undefined,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const shortenUrlMutation = useShortenUrlMutation();

    const validateForm = (): boolean => {
        try {
            shortenUrlSchema.parse({
                ...formData,
                expirationDate: formData.expirationDate?.toISOString(),
            });
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    if (err.path.length > 0) {
                        fieldErrors[err.path[0]] = err.message;
                    }
                });
                setErrors(fieldErrors);
            }
            return false;
        }
    };

    const handleFormChange = <K extends keyof FormData>(
        field: K,
        value: FormData[K],
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // try {
        //     shortenUrlSchema.shape[field].parse(value);
        //     setErrors((prev) => ({
        //         ...prev,
        //         [field]: '',
        //     }));
        // } catch (error) {
        //     if (error instanceof z.ZodError) {
        //         setErrors((prev) => ({
        //             ...prev,
        //             [field]: error.errors[0].message,
        //         }));
        //     }
        // }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const data = {
            url: formData.url,
            customSlug: formData.customSlug || undefined,
            expirationDate: formData.expirationDate?.toISOString() || undefined,
        };

        console.log(data);

        shortenUrlMutation.mutate(data, {
            onSuccess: () => {
                setFormData({
                    url: '',
                    customSlug: '',
                    expirationDate: undefined,
                });
            },
            onError: (error) => {
                console.error('Error shortening URL:', error);
            },
        });
    };

    return (
        <form className="mb-2 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div>
                <Input
                    placeholder="Enter URL to shorten"
                    value={formData.url}
                    onChange={(e) => handleFormChange('url', e.target.value)}
                    className="w-full"
                />
                {errors.url && (
                    <p className="text-sm text-red-500">{errors.url}</p>
                )}
            </div>

            <div className="flex gap-2">
                <div className="flex-1">
                    <Input
                        type="text"
                        placeholder="Custom alias (optional)"
                        value={formData.customSlug}
                        onChange={(e) =>
                            handleFormChange('customSlug', e.target.value)
                        }
                        className="w-full"
                    />
                    {errors.customSlug && (
                        <p className="text-sm text-red-500">
                            {errors.customSlug}
                        </p>
                    )}
                </div>
                <div className="flex-1">
                    <DatePicker
                        date={formData.expirationDate}
                        onChange={(date) =>
                            handleFormChange('expirationDate', date)
                        }
                        placeholder="Expiration date (optional)"
                    />
                    {errors.expirationDate && (
                        <p className="text-sm text-red-500">
                            {errors.expirationDate}
                        </p>
                    )}
                </div>
            </div>

            <Button className="w-full" type="submit">
                {shortenUrlMutation.status === 'pending'
                    ? 'Shortening...'
                    : 'Shorten URL'}
            </Button>
        </form>
    );
};

export default ShortenForm;
