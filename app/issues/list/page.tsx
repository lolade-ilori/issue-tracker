import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueStatusBadge from '../../components/IssueStatusBadge';
import Link from '../../components/Link';
import IssueToggle from './IssueToggle';

const IssuePage = async () => {
  const issues = await prisma.issue.findMany()
  return (
    <div>
      <IssueToggle />

      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            issues.map((issue) => 
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`} label={issue.title} />
                  
                <div className='block md:hidden'>
                  <IssueStatusBadge  status={issue.status}/>
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'><IssueStatusBadge  status={issue.status}/></Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.creadtedAt.toDateString()}</Table.Cell>
            </Table.Row>)
          }
        </Table.Body>
      </Table.Root>
    </div>
  )
}

// To disable route caching
export const dynamic = "force-dynamic"
// export const revalidate = 60

export default IssuePage