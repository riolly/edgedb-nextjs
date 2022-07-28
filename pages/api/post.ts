import type {NextApiRequest, NextApiResponse} from 'next';
import {createClient} from 'edgedb';
import e, {$infer} from 'dbschema/edgeql-js';

export const client = createClient();

const selectPosts = e.select(e.BlogPost, () => ({
    id: true,
    title: true,
    content: true,
}))

export async function getPosts() {
    return await selectPosts.run(client)
}

export type Posts = $infer<typeof selectPosts>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await getPosts()
  res.status(200).json(posts);
}