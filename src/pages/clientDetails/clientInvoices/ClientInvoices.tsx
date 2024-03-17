interface Invoice {
  amount: number
  status: string
  issued_date: string
  due_date: string
}

interface InvoicesTableProps {
  invoices: Invoice[] | undefined
  isLoadingInvoices: boolean
  isErrorInvoices: boolean
  errorInvoices: Error | null
}
export function ClientInvoices(props: InvoicesTableProps) {
  const { invoices, isLoadingInvoices, errorInvoices, isErrorInvoices } = props

  if (isLoadingInvoices) return <div>Loading...</div>
  if (isErrorInvoices)
    return (
      <div>
        Error:
        {errorInvoices instanceof Error
          ? errorInvoices.message
          : 'An error occurred'}
      </div>
    )

  if (!invoices) return <div>No invoices found</div>

  const translateStatus = (status: string): string => {
    switch (status) {
      case 'Paid':
        return 'Payée'
      case 'Unpaid':
        return 'Envoyée'
      default:
        return status
    }
  }

  return (
    <div className='mx-auto pb-8 w-full max-w-4xl overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-100 text-left text-gray-700'>
          <tr>
            <th
              className='py-3 px-4 text-sm font-medium uppercase tracking-wide'
              scope='col'>
              Amount
            </th>
            <th
              className='py-3 px-4 text-sm font-medium uppercase tracking-wide'
              scope='col'>
              Status
            </th>
            <th
              className='py-3 px-4 text-sm font-medium uppercase tracking-wide'
              scope='col'>
              Issued Date
            </th>
            <th
              className='py-3 px-4 text-sm font-medium uppercase tracking-wide'
              scope='col'>
              Due Date
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
              } whitespace-nowrap`}>
              <td className='py-3 px-4 text-base text-gray-700 font-semibold'>
                {invoice.amount} €
              </td>
              <td className='py-3 px-4 text-base text-gray-500 font-medium'>
                {translateStatus(invoice.status)}
              </td>
              <td className='py-3 px-4 text-base text-gray-500 font-medium'>
                {invoice.issued_date}
              </td>
              <td className='py-3 px-4 text-base text-gray-500 font-medium'>
                {invoice.due_date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
