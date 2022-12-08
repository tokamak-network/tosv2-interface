import { Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import { ITopContentProps } from "types/common/modal";
import Tile from "./Tile";

function ITopContent(props: { contentList: ITopContentProps[] }) {
  const { contentList } = props;
  const [smallerThan1024] = useMediaQuery("(max-width: 1024px)");

  return (
    <Grid
      templateColumns={smallerThan1024 ? "repeat(2, 1fr)" : "repeat(3, 1fr)"}
      // templateRows={
      //   smallerThan1024 ? "repeat(3, 1fr)" : "repeat(2, 1fr)"
      // }
    >
      {contentList.map((content) => (
        <GridItem key={content.title}>
          <Tile
            title={content.title}
            content={content.content}
            tooltip={content.tooltip}
          />
        </GridItem>
      ))}
    </Grid>
  );
}

export default ITopContent;
