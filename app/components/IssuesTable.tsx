import { Table } from "@radix-ui/themes";
import React from "react";
import IssueStatusBadge from "./IssueStatusBadge";
import { Issue } from "../generated/prisma";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IssueSkeleton } from "../issues/loading";

interface Props {
  issues: Issue[] | IssueSkeleton[];
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
        {issues.map((issue) => {
          return (
            <Table.Row key={issue.id}>
              <Table.Cell>
                {issue.title || <Skeleton />}
                <div className="block md:hidden mt-3">
                  {issue.status ? (
                    <IssueStatusBadge status={issue.status} />
                  ) : (
                    <Skeleton />
                  )}
                </div>
                <div className="block md:hidden float-right">
                  {issue.createdAt?.toDateString() || <Skeleton />}
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.status ? (
                  <IssueStatusBadge status={issue.status} />
                ) : (
                  <Skeleton />
                )}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt?.toDateString() || <Skeleton />}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

export default IssuesTable;
