import { IssueStatusBadge, Link, Skeleton } from "@/app/components";
import { Table } from "@radix-ui/themes";
import { Issue } from "../generated/prisma";
interface Props {
  issues: Issue[] | undefined[];
}

const IssuesTable = ({ issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Status
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Created at
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>
                {issue ? (
                  <Link href={`/issues/${issue.id.toString()}`}>
                    {issue.title}
                  </Link>
                ) : (
                  <Skeleton />
                )}
                <div className="block md:hidden mt-3">
                  {issue ? (
                    <IssueStatusBadge status={issue.status} />
                  ) : (
                    <Skeleton width="3rem" />
                  )}
                </div>
                <div className="block md:hidden float-right">
                  {issue ? (
                    issue.createdAt?.toDateString()
                  ) : (
                    <Skeleton width="7rem" />
                  )}
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue ? (
                  <IssueStatusBadge status={issue.status} />
                ) : (
                  <Skeleton width="3rem" />
                )}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue ? (
                  issue.createdAt?.toDateString()
                ) : (
                  <Skeleton width="7rem" />
                )}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

export default IssuesTable;
