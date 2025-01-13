// Connecting React Frontend to Sanity Backend
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: 'luia4pn9',
    dataset: 'production',
    apiVersion: '2024-12-27',
    useCdn: false, // If `true`, it uses Sanity's CDN for faster, cached responses. `false` fetches fresh data.
    token: process.env.SANITY_STUDIO_TOKEN,
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source).url();