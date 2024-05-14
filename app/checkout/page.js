import React from "react";
import Head from "next/head";
import Script from "next/script";

const page = () => {
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script type="application/javascript" src={`${proccess.env.PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${proccess.env.PAYTM_MID}.js`} onload="onScriptLoad();" crossorigin="anonymous"></Script>

    </div>
  );
};

export default page;
