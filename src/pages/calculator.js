import React from 'react';
import Layout from '@theme/Layout';
import MortgageCalculator from "../components/MortgageCalculator";
export default function Hello() {
  return (
    <Layout title="Mortgage Calculator" description="A Calculator for all types of mortgages loans">
      <div class = "flex flex-col md:flex-row justify-center">
      <div class="my-4 mx-4">
          <MortgageCalculator/>
        </div>
          </div>
    </Layout>
  );
}
