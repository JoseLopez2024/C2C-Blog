import Layout from '../../../components/layout';
// import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from "../../../components/date";
import utilStyles from '../../styles/utils.module.css';
import { MongoClient, ObjectId } from 'mongodb';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <p>{postData.body}</p>
      </article>
    </Layout>
  );
}


export async function getServerSideProps() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("Blog_Data"); // Ensure this matches your database name
  const collection = db.collection("Blogs"); // Ensure this matches your collection name

  // Fetch only title, date, and body
  const post = await collection.findOne({ _id: new ObjectId(params.mdbId) });

  client.close();

  if (!post) {
    return { notFound: true }; // Return 404 if post doesn't exist
  }

  return {
    props: { postData: JSON.parse(JSON.stringify(post)) },
  };
}
