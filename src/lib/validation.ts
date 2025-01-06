import { z } from 'zod';

const RESERVED_SLUGS = ['admin', 'api'];

export const shortenUrlSchema = z.object({
    url: z.string().url({
        message: 'Invalid URL format. Must be a valid http or https URL.',
    }),
    customSlug: z
        .string()
        .optional()
        .refine(
            (slug) => {
                if (!slug) return true;
                return slug.length >= 3 && slug.length <= 8;
            },
            {
                message: 'Slug must be 3-8 characters long.',
            },
        )
        .refine(
            (slug) => {
                if (!slug) return true;
                return /^[a-zA-Z0-9-_]+$/.test(slug);
            },
            {
                message:
                    'Slug can only contain alphanumeric characters, dashes, and underscores.',
            },
        )
        .refine(
            (slug) => {
                if (!slug) return true;
                return !RESERVED_SLUGS.includes(slug);
            },
            {
                message: 'This slug is reserved.',
            },
        ),
    expirationDate: z
        .string()
        .datetime({ message: 'Invalid expiration date format.' })
        .optional()
        .refine(
            (expirationDate) => {
                if (!expirationDate) return true;
                const now = new Date();
                const expDate = new Date(expirationDate);
                return expDate > now;
            },
            { message: 'Expiration date must be in the future.' },
        ),
});
