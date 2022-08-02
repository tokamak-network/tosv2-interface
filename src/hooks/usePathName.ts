import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Pages } from "types";

const usePathName = () => {
  const [pathName, setPathName] = useState<Pages | undefined>(undefined);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    const pName = pathname.replaceAll("/", "");
    const captalPName = pName.charAt(0).toUpperCase() + pName.slice(1);
    return setPathName(captalPName as Pages);
  }, [pathname]);

  return { pathName };
};

export default usePathName;
