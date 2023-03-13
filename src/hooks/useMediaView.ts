import { useMediaQuery } from "@chakra-ui/react";

const useMediaView = (viewPort?: number) => {
  const [pcView] = useMediaQuery("(min-width: 1440px)");
  const [tableView] = useMediaQuery("(min-width: 361px)");
  const [mobileView] = useMediaQuery("(max-width: 360px)");
  const [bp700px] = useMediaQuery("(max-width: 700px)");
  const [bp500px] = useMediaQuery("(max-width: 500px)");
  const [bp1024px] = useMediaQuery("(max-width: 1024px)");

  const [customMaxView] = useMediaQuery(`"(max-width: ${viewPort}px)"`);

  return {
    pcView,
    tableView,
    mobileView,
    bp700px,
    bp500px,
    bp1024px,
    customMaxView,
  };
};

export default useMediaView;
