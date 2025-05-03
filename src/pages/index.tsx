export async function getServerSideProps() {
  return { props: { teste: { a: 1 } } };
}

export default function Page({ teste }: { teste: { a: number } }) {
  return <div>{teste.a}</div>;
}
