import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Transparent',
      description: (
      <>
    No partial truths or mis-leading information. 
      </>
    ),
  },
  {
    title: 'Reputable', 
        description: (
      <>
       Over 90 happy families served. 
      </>
    ),
  },
  {
    title: 'Free',
      description: (
      <>
      As all information should be. 
       
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
          </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
