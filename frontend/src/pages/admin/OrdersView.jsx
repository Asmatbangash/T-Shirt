import { useState } from 'react'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Search, Eye, Download } from 'lucide-react'

const orders = [
  { id: '#ORD-001', customer: 'John Doe', date: '2024-03-15', product: 'Black Tee', amount: '$29.99', status: 'Completed', email: 'john@example.com', address: '123 Main St, New York, NY 10001' },
  { id: '#ORD-002', customer: 'Jane Smith', date: '2024-03-14', product: 'White Essential', amount: '$24.99', status: 'Processing', email: 'jane@example.com', address: '456 Oak Ave, Los Angeles, CA 90001' },
  { id: '#ORD-003', customer: 'Mike Johnson', date: '2024-03-14', product: 'Custom Design', amount: '$34.99', status: 'Pending', email: 'mike@example.com', address: '789 Pine Rd, Chicago, IL 60601' },
  { id: '#ORD-004', customer: 'Sarah Williams', date: '2024-03-13', product: 'Ocean Blue', amount: '$27.99', status: 'Shipped', email: 'sarah@example.com', address: '321 Elm St, Houston, TX 77001' },
  { id: '#ORD-005', customer: 'Tom Brown', date: '2024-03-13', product: 'Forest Green', amount: '$26.99', status: 'Completed', email: 'tom@example.com', address: '654 Maple Dr, Phoenix, AZ 85001' },
]

export default function OrdersView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  const handleExport = () => {
    const exportToast = toast.loading('Preparing export...')
    
    try {
      // Create CSV content
      const headers = ['Order ID', 'Customer', 'Date', 'Product', 'Amount', 'Status']
      const csvContent = [
        headers.join(','),
        ...filteredOrders.map(order => 
          [order.id, order.customer, order.date, order.product, order.amount, order.status].join(',')
        )
      ].join('\n')

      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
      
      toast.success('Orders exported!', {
        id: exportToast,
        description: 'CSV file has been downloaded'
      })
    } catch (error) {
      toast.error('Export failed', {
        id: exportToast,
        description: 'Please try again'
      })
    }
  }

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <Card>
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">All Orders</h3>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search orders..." 
                  className="pl-9 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 font-medium">{order.id}</td>
                    <td className="py-4 px-4">{order.customer}</td>
                    <td className="py-4 px-4 text-muted-foreground">{order.date}</td>
                    <td className="py-4 px-4 text-muted-foreground">{order.product}</td>
                    <td className="py-4 px-4 font-semibold">{order.amount}</td>
                    <td className="py-4 px-4">
                      <Badge 
                        variant={
                          order.status === 'Completed' ? 'default' : 
                          order.status === 'Processing' ? 'secondary' : 
                          order.status === 'Shipped' ? 'default' : 
                          'secondary'
                        }
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Order ID</p>
                  <p className="text-sm font-semibold">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={selectedOrder.status === 'Completed' ? 'default' : 'secondary'}>
                    {selectedOrder.status}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer</p>
                <p className="text-sm font-semibold">{selectedOrder.customer}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Shipping Address</p>
                <p className="text-sm">{selectedOrder.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Product</p>
                  <p className="text-sm">{selectedOrder.product}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Amount</p>
                  <p className="text-sm font-semibold">{selectedOrder.amount}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Order Date</p>
                <p className="text-sm">{selectedOrder.date}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
