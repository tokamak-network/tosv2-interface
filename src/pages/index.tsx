import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

/*
************
TEST DEPLOY
AUG 8, 2022
************
*/

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/intro");
  }, []);

  return <div></div>;
};

export default Home;
