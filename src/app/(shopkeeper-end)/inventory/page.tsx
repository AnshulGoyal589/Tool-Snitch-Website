'use client'

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/api/api";
import { useRouter } from 'next/navigation';
import { getUserSession } from '@/utils/auth';

interface InventoryItem {
  itemId: number;
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
  price: number;
  supplier: string;
  lastRestocked: Date;
}

interface InventoryStats {
  totalItems: number;
  lowStock: number;
  totalValue: number;
  categoryDistribution: Array<{
    category: string;
    count: number;
  }>;
}

const InventoryManagement = () => {
  const router = useRouter();
  const [cognitoId, setCognitoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [inventoryStats, setInventoryStats] = useState<InventoryStats>({
    totalItems: 0,
    lowStock: 0,
    totalValue: 0,
    categoryDistribution: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: '',
    category: '',
    quantity: 0,
    minQuantity: 0,
    price: 0,
    supplier: '',
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const id = await getUserSession();
        setCognitoId(id);
        await fetchInventory(id);
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [router]);

  const fetchInventory = async (userId: string) => {
    try {
      const response = await api.get(`/shop/${userId}/inventory`);
      setInventory(response.data.items);
      setInventoryStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setErrorMessage('Failed to load inventory data');
    }
  };

  const handleAddItem = async () => {
    if (!cognitoId) return;

    try {
      const response = await api.post(`/shop/${cognitoId}/inventory`, newItem);
      setInventory([...inventory, response.data]);
      setShowAddDialog(false);
      setNewItem({
        name: '',
        category: '',
        quantity: 0,
        minQuantity: 0,
        price: 0,
        supplier: '',
      });
      await fetchInventory(cognitoId);
    } catch (error) {
      console.error('Error adding item:', error);
      setErrorMessage('Failed to add item');
    }
  };

  const handleUpdateItem = async (item: InventoryItem) => {
    if (!cognitoId) return;

    try {
      await api.put(`/shop/${cognitoId}/inventory/${item.itemId}`, item);
      setInventory(inventory.map(i => i.itemId === item.itemId ? item : i));
      setEditingItem(null);
      await fetchInventory(cognitoId);
    } catch (error) {
      console.error('Error updating item:', error);
      setErrorMessage('Failed to update item');
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    if (!cognitoId) return;

    try {
      await api.delete(`/shop/${cognitoId}/inventory/${itemId}`);
      setInventory(inventory.filter(item => item.itemId !== itemId));
      await fetchInventory(cognitoId);
    } catch (error) {
      console.error('Error deleting item:', error);
      setErrorMessage('Failed to delete item');
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories from inventory items
  const categories = Array.from(new Set(inventory.map(item => item.category)));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert>
          <AlertTitle>Loading...</AlertTitle>
          <AlertDescription>Please wait while we load your inventory.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Inventory Management</h1>

      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-12 gap-8">
        <Card className="col-span-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Inventory Items</CardTitle>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>Add New Item</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Inventory Item</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="minQuantity">Minimum Quantity</Label>
                    <Input
                      id="minQuantity"
                      type="number"
                      value={newItem.minQuantity}
                      onChange={(e) => setNewItem({ ...newItem, minQuantity: Number(e.target.value) })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="supplier">Supplier</Label>
                    <Input
                      id="supplier"
                      value={newItem.supplier}
                      onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleAddItem}>Add Item</Button>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Min Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.itemId}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.minQuantity}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => setEditingItem(item)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteItem(item.itemId)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-4 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Total Items</p>
                  <p className="text-2xl font-bold">{inventoryStats.totalItems}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Low Stock Items</p>
                  <p className="text-2xl font-bold text-red-600">{inventoryStats.lowStock}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Inventory Value</p>
                  <p className="text-2xl font-bold">${inventoryStats.totalValue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={inventoryStats.categoryDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Item</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-quantity">Quantity</Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  value={editingItem.quantity}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    quantity: Number(e.target.value)
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    price: Number(e.target.value)
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-minQuantity">Minimum Quantity</Label>
                <Input
                  id="edit-minQuantity"
                  type="number"
                  value={editingItem.minQuantity}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    minQuantity: Number(e.target.value)
                  })}
                />
              </div>
            </div>
            <Button onClick={() => handleUpdateItem(editingItem)}>Save Changes</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default InventoryManagement;