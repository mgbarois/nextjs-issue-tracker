import { Skeleton } from "@/app/components";
import { Issue } from "@/generated/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";
import IssueDetails from "./IssueDetails";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";

interface Props {
  issue?: Issue;
}

const IssueDetailLayout = ({ issue }: Props) => {
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          {issue ? (
            <>
              <EditIssueButton issueId={issue.id} />
              <DeleteIssueButton issueId={issue.id} />
            </>
          ) : (
            <>
              <Skeleton height="2rem" />
              <Skeleton height="2rem" />
            </>
          )}
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailLayout;
