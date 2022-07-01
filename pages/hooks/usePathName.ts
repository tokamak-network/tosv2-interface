import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const usePathName = () => {
  const [pathName, setPathName] = useState<string>("");
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    const pName = pathname.replaceAll("/", "");
    const captalPName = pName.charAt(0).toUpperCase() + pName.slice(1);
    return setPathName(captalPName);
  }, [pathname]);

  return { pathName };
};

export default usePathName;
