export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/countries',
    },
  };
}

export default function Home() {}
