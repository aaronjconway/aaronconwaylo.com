import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Reviews from '../components/Reviews';


function HomepageHeader() {

  return (
    <header class="flex flex-col md:flex-row bg-zinc-100 dark:bg-zinc-800">
      <div class=" my-16 self-center flex flex-col md:flex-row space-x-4 mx-12">
        <div>
          <div class=" my-4 text-4xl">
            <span>The <b className='whitespace-nowrap'><u>no nonsense</u></b> home buying tools, education, and experience you <b>deserve.</b></span>
          </div>
{/* add image below if doing so*/}
          <div className='w-96'>
          <img src={require('@site/static/img/main.jpg').default} />
          </div>
          <div class="flex flex-col md:flex-row md:space-x-4 justify-start">
            <div className=' my-4'>
              <Link
                class="bg-white border-solid
              rounded-md border border-stone-800 inline-block text-xl rounded-sm px-4 py-2 text-black hover:text-blue-500 dark:hover:text-blue-500 dark:border-zinc-100 dark:text-white dark:bg-zinc-700"
                to="/docs/intro"
              >
                Check Out the Knowledge Base
              </Link>
            </div>
            <div className='my-4'>
              <Link
                class="bg-white inline-block border-solid rounded-md border border-stone-800 text-xl rounded-sm px-4 py-2 text-black hover:text-blue-500 dark:hover:text-blue-500 dark:border-zinc-100 dark:text-white dark:bg-zinc-700"
                to="https://aaronconway.floify.com/apply"
              >
                Start an Application
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={''}
      description="">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <div className='bg-zinc-100 dark:bg-zinc-800 py-12'>
          <div className='text-4xl mx-12 font-semibold'>Reviews</div>
          <div className='md:w-1/3 container justify-center'>
            <Reviews />
          </div>
        </div>
      </main>
    </Layout>
  );
}
