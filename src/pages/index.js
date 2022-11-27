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
    <header className="bg-slate-100 flex flex-col md:flex-row">
      <div className="self-center  flex flex-col md:w-1/2  my-12 mx-12">
        <div class="">
          <h1 className="text-5xl my-16 space-y-10 font-bold text-slate-800 text-center ">{siteConfig.title}</h1>
          <div>
            <p class='whitespace-pre-wrap '>     Buying a home can be a daunting task. You shouldn't have to question every article you read or the motives behind their creator. 

             </p>

            <p>I've created this website to provide transparent and accurate information on homebuying for both clients and Real Estate Profesionals. </p>
            <p></p>

          </div>
          <div className=" my-12 text-center">
            <Link
              className="bg-white border-solid border border-slate-800 text-xl rounded-md text-stone-800 px-4 py-2 hover:text-blue-500"
              to="/docs/intro"
            >
              Check Out the Knowledge Base
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
