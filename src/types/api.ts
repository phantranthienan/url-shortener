// Request payload for shortening a URL
export type ShortenUrlRequest = {
    url: string;
    customSlug?: string;
    expirationDate?: string;
};

// Response from the shorten URL API
export type ShortenUrlResponse = {
    id: string;
    slug: string;
    originUrl: string;
    shortUrl: string;
};

// Response for fetching all URLs
export type Url = {
    id: string;
    slug: string;
    originUrl: string;
    createdAt: string;
    expiresAt: string;
    visits: number;
};

// Response for deleting a URL
export type DeleteUrlResponse = {
    success: boolean;
};
