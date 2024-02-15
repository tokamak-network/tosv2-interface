import Head from "next/head";
import type { NextPage } from "next";

const HeadMeta: NextPage = () => {
  return (
    <div>
      <Head>
        <title>TOSv2 </title>
        <meta property="og:type" content="website" />
        <meta property="title" content="TOSv2" />
        <meta property="og:title" content="TOSv2" />
        <meta
          property="description"
          content="Functional upgrade to TONStarter ecosystem"
        />
        <meta
          property="og:description"
          content="Functional upgrade to TONStarter ecosystem"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="HandheldFriendly" content="true" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
    </div>
  );
};

export default HeadMeta;
