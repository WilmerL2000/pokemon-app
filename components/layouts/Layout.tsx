import Head from "next/head";
import Navbar from "../ui/Navbar";

type Props = {
  children: React.ReactNode;
  title?: String;
};

export const Layout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Wilmer Lopez" />
        <meta
          name="description"
          content="Information about the Pokemon XXXXXXX"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main style={{ padding: "0px 20px" }}>{children}</main>
    </>
  );
};
