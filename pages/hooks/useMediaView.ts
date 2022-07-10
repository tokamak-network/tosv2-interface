import { useMediaQuery } from "@chakra-ui/react";

const useMediaView = () => {
  const [pcView] = useMediaQuery("(min-width: 1025px)");
  const [tableView] = useMediaQuery("(max-width: 1024px)");
  const [mobileView] = useMediaQuery("(max-width: 360px)");

  return { pcView, tableView, mobileView };
};

export default useMediaView;
