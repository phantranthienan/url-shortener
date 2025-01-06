import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    ShortenUrlRequest,
    ShortenUrlResponse,
    Url,
    DeleteUrlResponse,
} from '@/types/api';

// ===================== API CALLS ===================== //

const shortenUrl = async (
    data: ShortenUrlRequest,
): Promise<ShortenUrlResponse> => {
    const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to shorten URL');
    }

    return response.json();
};

const fetchUrls = async (): Promise<Url[]> => {
    const response = await fetch('/api/urls');

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to fetch URLs');
    }

    return response.json();
};

const deleteUrl = async (id: string): Promise<DeleteUrlResponse> => {
    const response = await fetch(`/api/urls/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to delete URL');
    }

    return response.json();
};

// ===================== REACT QUERY HOOKS ===================== //

export const useGetUrlsQuery = () => {
    return useQuery<Url[], Error>({
        queryKey: ['urls'],
        queryFn: fetchUrls,
    });
};

export const useShortenUrlMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<ShortenUrlResponse, Error, ShortenUrlRequest>({
        mutationFn: shortenUrl,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['urls'] });
        },
    });
};

export const useDeleteUrlMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<DeleteUrlResponse, Error, string>({
        mutationFn: deleteUrl,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['urls'] });
        },
    });
};
