import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { 
  TrendingUp, DollarSign, ShoppingBag, Package, Users,
  Search, MoreVertical, Eye, Edit, Trash2
} from 'lucide-react'

const stats = [
  { label: 'Total Sales', value: '$12,426', change: '+12.5%', icon: DollarSign },
  { label: 'Orders', value: '342', change: '+8.2%', icon: ShoppingBag },
  { label: 'Products', value: '48', change: '+3', icon: Package },
  { label: 'Customers', value: '1,249', change: '+24', icon: Users },
]

const recentOrders = [
  { id: '#ORD-001', customer: 'John Doe', product: 'Black Tee', amount: '$29.99', status: 'Completed', date: '2024-03-15', email: 'john@example.com', address: '123 Main St, New York, NY 10001' },
  { id: '#ORD-002', customer: 'Jane Smith', product: 'White Essential', amount: '$24.99', status: 'Processing', date: '2024-03-14', email: 'jane@example.com', address: '456 Oak Ave, Los Angeles, CA 90001' },
  { id: '#ORD-003', customer: 'Mike Johnson', product: 'Custom Design', amount: '$34.99', status: 'Pending', date: '2024-03-14', email: 'mike@example.com', address: '789 Pine Rd, Chicago, IL 60601' },
]

export default function DashboardView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [actionMenuOpen, setActionMenuOpen] = useState(null)

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
    setActionMenuOpen(null)
  }

  const handleUpdateStatus = (orderId) => {
    alert(`Update status for order ${orderId}`)
    setActionMenuOpen(null)
  }

  const handleDeleteOrder = (orderId) => {
    if (confirm('Are you sure you want to delete this order?')) {
      alert(`Order ${orderId} deleted`)
      setActionMenuOpen(null)
    }
  }

  const filteredOrders = recentOrders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.product.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Orders</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search orders..." 
                className="pl-9 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                    <td className="py-4 px-4 text-muted-foreground">{order.product}</td>
                    <td className="py-4 px-4 font-semibold">{order.amount}</td>
                    <td className="py-4 px-4">
                      <Badge variant={order.status === 'Completed' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="relative">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setActionMenuOpen(actionMenuOpen === order.id ? null : order.id)}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                        
                        {/* Dropdown Menu */}
                        {actionMenuOpen === order.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg z-10">
                            <button
                              className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                              onClick={() => handleViewOrder(order)}
                            >
                              <Eye className="h-4 w-4" />
                              View Details
                            </button>
                            <button
                              className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                              onClick={() => handleUpdateStatus(order.id)}
                            >
                              <Edit className="h-4 w-4" />
                              Update Status
                            </button>
                            <button
                              className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2 text-destructive"
                              onClick={() => handleDeleteOrder(order.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete Order
                            </button>
                          </div>
                        )}
                      </div>
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
