import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { pages } from "types";

const usePathName = () => {
  const [pathName, setPathName] = useState<pages | undefined>(undefined);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    const pName = pathname.replaceAll("/", "");
    const captalPName = pName.charAt(0).toUpperCase() + pName.slice(1);
    return setPathName(captalPName as pages);
  }, [pathname]);

  return { pathName };
};

export default usePathName;
