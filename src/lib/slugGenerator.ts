import { nanoid } from 'nanoid';

const SLUG_LENGTH = 6;

export const generateSlug = () => {
    return nanoid(SLUG_LENGTH);
};
