import { GetServerSideProps } from "next";

const CountryPage = () => null;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params.country;

  return {
    props: {},
    redirect: {
      permanent: true,
      destination: `/country/${slug}`,
    },
  };
};

export default CountryPage;
