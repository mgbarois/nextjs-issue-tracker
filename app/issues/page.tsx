import React from "react";
import Link from "next/link";
import { Button, Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <>
      <div className="mb-5">
        <Link href="/issues/new">
          <Button>Create new issue</Button>
        </Link>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Status
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Created at
          </Table.ColumnHeaderCell>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  {issue.title}
                  <div className="block md:hidden">{issue.status}</div>
                  <div className="block md:hidden float-right">
                    {issue.createdAt.toDateString()}
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.status}
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default IssuesPage;
