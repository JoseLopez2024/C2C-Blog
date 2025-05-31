import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { getServerSideProps } from '../mongodb';

export default function Home({ allPostsData, allserverData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Freshman Computer Science Major in UT Dallas</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Server Data</h2>
        <ul className={utilStyles.list}>
          {allserverData.map(({ title, date, body }, index) => (
            <li className={utilStyles.listItem} key={index}>
              <h3>{title}</h3>
              <small>{date}</small>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Cluster Blog</h2>
        <ul className={utilStyles.list}>
          {allserverData.map(({ title, date, _id }, index) => (
            <li className={utilStyles.listItem} key={index}>
            <Link href={`/posts/mdb/${_id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                {date}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const {props} = await getServerSideProps();
  return {
    props: {
      allPostsData,
      allserverData: props.allserverData || []
    },
  };
}

