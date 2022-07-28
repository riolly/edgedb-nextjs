import type {InferGetServerSidePropsType} from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { getPosts } from './api/post';

export async function getServerSideProps() {
  const posts = await getPosts()
  
  return {
    props: {
      posts
    }
  }
} 

export type GetPost = InferGetServerSidePropsType<typeof getServerSideProps>

const HomePage: React.FC<GetPost> = ({posts}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Blog</title>
        <meta name="description" content="An awesome blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Blog</h1>
        <div style={{height: '50px'}}></div>
        {posts.map((post) => {
          return (
            <a href={`/post/${post.id}`} key={post.id}>
              <div className={styles.card}>
                <p>{post.title}</p>
              </div>
            </a>
          );
        })}
      </main>
    </div>
  );
};

export default HomePage;