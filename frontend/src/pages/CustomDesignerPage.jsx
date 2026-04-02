import { useState } from 'react'
import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Type, Image as ImageIcon, Palette, Download, ShoppingCart } from 'lucide-react'

const tshirtColors = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Gray', value: '#9CA3AF' },
  { name: 'Navy', value: '#1E3A8A' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Blue', value: '#3B82F6' },
]

const fonts = ['Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana']

export default function CustomDesignerPage() {
  const [selectedColor, setSelectedColor] = useState(0)
  const [text, setText] = useState('Your Text Here')
  const [textColor, setTextColor] = useState('#FFFFFF')
  const [fontSize, setFontSize] = useState(32)
  const [selectedFont, setSelectedFont] = useState('Arial')

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Design Your T-Shirt</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preview Panel */}
            <div className="space-y-4">
              <Card className="sticky top-24">
                <CardContent className="p-8">
                  <div className="aspect-square rounded-xl flex items-center justify-center relative"
                       style={{ backgroundColor: tshirtColors[selectedColor].value }}>
                    <div 
                      className="absolute"
                      style={{ 
                        color: textColor,
                        fontSize: `${fontSize}px`,
                        fontFamily: selectedFont,
                        fontWeight: 'bold'
                      }}
                    >
                      {text}
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Button className="flex-1">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart - $34.99
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customization Panel */}
            <div className="space-y-6">
              {/* T-Shirt Color */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    T-Shirt Color
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-6 gap-3">
                    {tshirtColors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(idx)}
                        className={`h-12 w-12 rounded-full border-2 transition-all ${
                          selectedColor === idx ? 'border-primary ring-2 ring-primary/20 scale-110' : 'border-muted'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Add Text */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="h-5 w-5" />
                    Add Text
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Text</label>
                    <Input 
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Enter your text"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Font</label>
                    <select 
                      value={selectedFont}
                      onChange={(e) => setSelectedFont(e.target.value)}
                      className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm"
                    >
                      {fonts.map((font) => (
                        <option key={font} value={font}>{font}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Font Size: {fontSize}px
                    </label>
                    <input 
                      type="range"
                      min="16"
                      max="72"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Text Color</label>
                    <div className="flex gap-2">
                      <input 
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="h-10 w-20 rounded-lg border cursor-pointer"
                      />
                      <Input 
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upload Image */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Upload Logo/Image
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <ImageIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
