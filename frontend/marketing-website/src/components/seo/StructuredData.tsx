import React from 'react';
import Head from 'next/head';

interface StructuredDataProps {
  data: Record<string, any> | Record<string, any>[];
}

const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd),
        }}
      />
    </Head>
  );
};

export default StructuredData;