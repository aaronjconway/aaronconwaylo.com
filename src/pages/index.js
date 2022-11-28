import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';
function HomepageHeader() {

  const { siteConfig } = useDocusaurusContext();
  return (
    <header class="flex flex-col md:flex-row bg-zinc-100 dark:bg-zinc-800">
      <div class="self-center  flex flex-col md:w-1/2  my-12 mx-12">
        <div class="">
          <div class="text-4xl my-16 space-y-10  text-left ">
            <span>Get the<b> tools </b> and <b>accurate</b> information on homebuying you <b>deserve.</b></span>
          </div>
          <div>
                    </div>
          <div class=" flex flex-row my-12 space-x-4 text-center">
            <Link
              class="bg-white border-solid border border-stone-700 text-xl rounded-sm px-4 py-2 text-black hover:text-blue-500 dark:hover:text-blue-500 dark:border-zinc-100 dark:text-white dark:bg-zinc-700"
              to="/docs/intro"
            >
              Check Out the Knowledge Base
            </Link>
            <Link
              class="bg-white border-solid border border-stone-800 text-xl rounded-sm px-4 py-2 text-black hover:text-blue-500 dark:hover:text-blue-500 dark:border-zinc-100 dark:text-white dark:bg-zinc-700"
              to="/docs/intro"
            >
              Start an Application
            </Link>
          </div>
        </div>
      </div>
      <div class="md:w-1/2 m-16">

        <img class="border-solid border-4" src="https://scontent-den4-1.xx.fbcdn.net/v/t39.30808-6/315220244_129032723288903_2426227734716753941_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Y1dR8dgrhdQAX8cY9Bc&_nc_ht=scontent-den4-1.xx&oh=00_AfCII7xVXITB6Fm7XGVQ9nNhdzGAtbj1zNn7Ua3iKpAnEw&oe=6387ABE0" />
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Aaron Conway's loan officer website for all things mortgage. ">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
