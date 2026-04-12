import { useState } from 'react'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Search, Mail, MoreVertical, Eye, Ban } from 'lucide-react'

const customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', orders: 12, spent: '$358.88', joined: '2024-01-15', status: 'Active', phone: '+1 234-567-8900', address: '123 Main St, New York, NY 10001' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 8, spent: '$199.92', joined: '2024-02-03', status: 'Active', phone: '+1 234-567-8901', address: '456 Oak Ave, Los Angeles, CA 90001' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', orders: 5, spent: '$174.95', joined: '2024-02-20', status: 'Active', phone: '+1 234-567-8902', address: '789 Pine Rd, Chicago, IL 60601' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', orders: 15, spent: '$419.85', joined: '2023-12-10', status: 'VIP', phone: '+1 234-567-8903', address: '321 Elm St, Houston, TX 77001' },
  { id: 5, name: 'Tom Brown', email: 'tom@example.com', orders: 3, spent: '$80.97', joined: '2024-03-01', status: 'Active', phone: '+1 234-567-8904', address: '654 Maple Dr, Phoenix, AZ 85001' },
]

export default function CustomersView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isEmailOpen, setIsEmailOpen] = useState(false)
  const [emailSubject, setEmailSubject] = useState('')
  const [emailMessage, setEmailMessage] = useState('')

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer)
    setIsDetailsOpen(true)
  }

  const handleEmailCustomer = (customer) => {
    setSelectedCustomer(customer)
    setEmailSubject('')
    setEmailMessage('')
    setIsEmailOpen(true)
  }

  const handleSendEmail = () => {
    const emailToast = toast.loading('Sending email...')
    
    // In a real app, this would send an email via API
    setTimeout(() => {
      toast.success('Email sent!', {
        id: emailToast,
        description: `Message sent to ${selectedCustomer.email}`
      })
      setIsEmailOpen(false)
    }, 1000)
  }

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <Card>
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">All Customers</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search customers..." 
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
                  <th className="text-left py-3 px-4 text-sm font-semibold">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Orders</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Total Spent</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Joined</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 font-medium">{customer.name}</td>
                    <td className="py-4 px-4 text-muted-foreground">{customer.email}</td>
                    <td className="py-4 px-4">{customer.orders}</td>
                    <td className="py-4 px-4 font-semibold">{customer.spent}</td>
                    <td className="py-4 px-4 text-muted-foreground">{customer.joined}</td>
                    <td className="py-4 px-4">
                      <Badge variant={customer.status === 'VIP' ? 'default' : 'secondary'}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleViewCustomer(customer)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEmailCustomer(customer)}
                          title="Send Email"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="text-sm font-semibold">{selectedCustomer.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-sm">{selectedCustomer.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="text-sm">{selectedCustomer.phone}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Address</p>
                <p className="text-sm">{selectedCustomer.address}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Orders</p>
                  <p className="text-sm font-semibold">{selectedCustomer.orders}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                  <p className="text-sm font-semibold">{selectedCustomer.spent}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={selectedCustomer.status === 'VIP' ? 'default' : 'secondary'}>
                    {selectedCustomer.status}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                <p className="text-sm">{selectedCustomer.joined}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Customer Dialog */}
      <Dialog open={isEmailOpen} onOpenChange={setIsEmailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Send Email to {selectedCustomer?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">To</label>
              <Input value={selectedCustomer?.email || ''} disabled />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Subject</label>
              <Input 
                placeholder="Email subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Message</label>
              <textarea
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Type your message here..."
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEmailOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendEmail} disabled={!emailSubject || !emailMessage}>
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
