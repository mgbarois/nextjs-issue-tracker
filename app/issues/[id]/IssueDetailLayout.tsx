import { Skeleton } from "@/app/components";
import { Issue } from "@/app/generated/prisma";
import { Box, Grid } from "@radix-ui/themes";
import IssueDetails from "./IssueDetails";
import IssueEditButton from "./IssueEditButton";

interface Props {
  issue?: Issue;
}

const IssueDetailLayout = ({ issue }: Props) => {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box className="max-w-xl">
        <IssueDetails issue={issue} />
      </Box>
      <Box className="max-w-xl">
        {issue ? (
          <IssueEditButton issueId={issue.id} />
        ) : (
          <Skeleton size="s" height="2rem" />
        )}
      </Box>
    </Grid>
  );
};

export default IssueDetailLayout;
