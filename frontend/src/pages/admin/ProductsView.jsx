import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Search, Plus, Edit, Trash2, Loader2, Upload, X } from 'lucide-react'
import { productAPI, uploadAPI } from '@/services/api'
import { LazyImage } from '@/components/ui/lazy-image'

export default function ProductsView() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'classic',
    stock: '',
    tag: '',
    featured: false
  })
  const [submitting, setSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await productAPI.getAllProducts()
      setProducts(response.products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products', {
        description: 'Please refresh the page to try again'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setImageFile(null)
    setImagePreview(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: 'classic',
      stock: '',
      tag: '',
      featured: false
    })
    setIsDialogOpen(true)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setImageFile(null)
    setImagePreview(product.image)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
      tag: product.tag || '',
      featured: product.featured || false
    })
    setIsDialogOpen(true)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file size (5MB limit)
      const maxSize = 5 * 1024 * 1024 // 5MB in bytes
      if (file.size > maxSize) {
        toast.error('Image too large', {
          description: `File size is ${(file.size / 1024 / 1024).toFixed(2)}MB. Maximum allowed is 5MB. Please compress or resize your image.`
        })
        e.target.value = '' // Clear the input
        return
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Invalid file type', {
          description: 'Please select an image file (JPG, PNG, WEBP, or GIF)'
        })
        e.target.value = ''
        return
      }

      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
      
      toast.success('Image selected', {
        description: `${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`
      })
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
    setFormData({ ...formData, image: '' })
  }

  const handleDeleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    const deleteToast = toast.loading('Deleting product...')
    
    try {
      await productAPI.deleteProduct(productId)
      toast.success('Product deleted successfully', {
        id: deleteToast,
        description: 'The product has been removed from your store'
      })
      await fetchProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Failed to delete product', {
        id: deleteToast,
        description: error.message || 'Please try again'
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const saveToast = toast.loading(editingProduct ? 'Updating product...' : 'Creating product...')

    try {
      let imageUrl = formData.image

      // Upload image to Cloudinary if a new file is selected
      if (imageFile) {
        try {
          setUploadingImage(true)
          toast.loading('Uploading image to cloud...', { id: saveToast })
          const uploadResponse = await uploadAPI.uploadSingleImage(imageFile)
          imageUrl = uploadResponse.data.url
          setUploadingImage(false)
          toast.loading(editingProduct ? 'Updating product...' : 'Creating product...', { id: saveToast })
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError)
          setUploadingImage(false)
          
          // Check if it's a timeout error
          if (uploadError.message?.includes('timeout') || uploadError.message?.includes('Timeout')) {
            toast.error('Upload timeout', {
              id: saveToast,
              description: 'The upload took too long. Please check your internet connection or try a smaller image.'
            })
          } else {
            toast.error('Image upload failed', {
              id: saveToast,
              description: uploadError.message || 'Would you like to save with the URL instead?'
            })
          }
          
          // Ask user if they want to continue without image
          if (!confirm('Image upload failed. Do you want to save the product with the URL instead?')) {
            setSubmitting(false)
            return
          }
          toast.loading(editingProduct ? 'Updating product...' : 'Creating product...', { id: saveToast })
        }
      }

      // Validate that we have an image URL
      if (!imageUrl) {
        toast.error('Image required', {
          id: saveToast,
          description: 'Please provide an image URL or upload an image file'
        })
        setSubmitting(false)
        return
      }

      const productData = {
        ...formData,
        image: imageUrl,
        price: Number(formData.price),
        stock: Number(formData.stock)
      }

      if (editingProduct) {
        await productAPI.updateProduct(editingProduct._id, productData)
        toast.success('Product updated!', {
          id: saveToast,
          description: `${formData.name} has been updated successfully`
        })
      } else {
        await productAPI.createProduct(productData)
        toast.success('Product created!', {
          id: saveToast,
          description: `${formData.name} has been added to your store`
        })
      }

      setIsDialogOpen(false)
      await fetchProducts()
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error('Failed to save product', {
        id: saveToast,
        description: error.message || 'Please try again'
      })
    } finally {
      setSubmitting(false)
      setUploadingImage(false)
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <>
      <Card>
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">All Products</h3>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-9 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={handleAddProduct}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold">Product Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Price</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Stock</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 font-medium">{product.name}</td>
                    <td className="py-4 px-4 text-muted-foreground capitalize">{product.category}</td>
                    <td className="py-4 px-4 font-semibold">${product.price}</td>
                    <td className="py-4 px-4">{product.stock}</td>
                    <td className="py-4 px-4">
                      <Badge variant={product.stock > 0 ? 'default' : 'secondary'}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
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

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Product Image</Label>
                <div className="space-y-3">
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="relative w-full h-48 border rounded-lg overflow-hidden">
                      <LazyImage
                        src={imagePreview}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      {imageFile && (
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {(imageFile.size / 1024 / 1024).toFixed(2)}MB
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Upload Button */}
                  {!imagePreview && (
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">
                        PNG, JPG, WEBP up to 5MB
                      </p>
                      <p className="text-xs text-amber-600 mb-2">
                        ⚠️ Files larger than 5MB will be rejected
                      </p>
                      <p className="text-xs text-blue-600 mb-4">
                        💡 Tip: Smaller images upload faster (recommended: under 2MB)
                      </p>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('image').click()}
                      >
                        Choose File
                      </Button>
                    </div>
                  )}
                  
                  {/* Or use URL */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or use URL</span>
                    </div>
                  </div>
                  
                  <Input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={(e) => {
                      setFormData({ ...formData, image: e.target.value })
                      setImagePreview(e.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="oversized">Oversized</option>
                    <option value="minimal">Minimal</option>
                    <option value="custom">Custom</option>
                    <option value="classic">Classic</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tag">Tag (Optional)</Label>
                  <select
                    id="tag"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  >
                    <option value="">None</option>
                    <option value="Bestseller">Bestseller</option>
                    <option value="New">New</option>
                    <option value="Limited">Limited</option>
                    <option value="Hot">Hot</option>
                    <option value="Sale">Sale</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="featured" className="cursor-pointer">Featured Product</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting || uploadingImage}>
                {uploadingImage ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading Image...
                  </>
                ) : submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  editingProduct ? 'Update Product' : 'Add Product'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
