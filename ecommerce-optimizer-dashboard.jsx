import React, { useState, useEffect } from 'react';
import { ShoppingCart, Users, TrendingUp, AlertTriangle, DollarSign, Package, Mail, Target, BarChart3, Clock, Zap } from 'lucide-react';

const EcommerceOptimizer = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [metrics, setMetrics] = useState({
    cartAbandonmentRate: 68.8,
    avgOrderValue: 85.50,
    customerLifetimeValue: 245.80,
    inventoryTurnover: 4.2,
    customerAcquisitionCost: 32.10,
    conversionRate: 2.3
  });

  const [abandonedCarts, setAbandonedCarts] = useState([
    { id: 1, email: 'john.doe@email.com', items: 3, value: 127.50, timeAgo: '2 hours', stage: 'checkout' },
    { id: 2, email: 'sarah.smith@email.com', items: 1, value: 45.00, timeAgo: '4 hours', stage: 'cart' },
    { id: 3, email: 'mike.johnson@email.com', items: 2, value: 89.99, timeAgo: '6 hours', stage: 'payment' },
    { id: 4, email: 'lisa.wilson@email.com', items: 5, value: 203.25, timeAgo: '8 hours', stage: 'shipping' }
  ]);

  const [lowStockItems, setLowStockItems] = useState([
    { id: 1, name: 'Wireless Headphones', current: 5, threshold: 20, demand: 'High', reorderPoint: 15 },
    { id: 2, name: 'Smartphone Case', current: 12, threshold: 25, demand: 'Medium', reorderPoint: 18 },
    { id: 3, name: 'Laptop Stand', current: 3, threshold: 15, demand: 'High', reorderPoint: 10 },
    { id: 4, name: 'USB Cable', current: 8, threshold: 30, demand: 'Low', reorderPoint: 20 }
  ]);

  const [customerSegments, setCustomerSegments] = useState([
    { segment: 'High Value', count: 1250, avgSpend: 450.20, retention: 85, growth: '+12%' },
    { segment: 'Regular', count: 3400, avgSpend: 125.50, retention: 65, growth: '+8%' },
    { segment: 'New', count: 2100, avgSpend: 67.80, retention: 45, growth: '+15%' },
    { segment: 'At Risk', count: 890, avgSpend: 89.20, retention: 25, growth: '-5%' }
  ]);

  const sendRecoveryEmail = (cartId, template) => {
    const updatedCarts = abandonedCarts.map(cart => 
      cart.id === cartId ? { ...cart, status: 'email_sent' } : cart
    );
    setAbandonedCarts(updatedCarts);
    alert(`${template} recovery email sent successfully!`);
  };

  const createReorderAlert = (itemId) => {
    alert(`Reorder alert created for item ${itemId}. Supplier will be notified.`);
  };

  const MetricCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard 
          title="Cart Abandonment Rate"
          value={`${metrics.cartAbandonmentRate}%`}
          change="-2.1%"
          icon={ShoppingCart}
          color="bg-red-500"
        />
        <MetricCard 
          title="Average Order Value"
          value={`$${metrics.avgOrderValue}`}
          change="+5.2%"
          icon={DollarSign}
          color="bg-green-500"
        />
        <MetricCard 
          title="Customer Lifetime Value"
          value={`$${metrics.customerLifetimeValue}`}
          change="+8.7%"
          icon={Users}
          color="bg-blue-500"
        />
        <MetricCard 
          title="Inventory Turnover"
          value={`${metrics.inventoryTurnover}x`}
          change="+0.3"
          icon={Package}
          color="bg-purple-500"
        />
        <MetricCard 
          title="Customer Acquisition Cost"
          value={`$${metrics.customerAcquisitionCost}`}
          change="-3.1%"
          icon={Target}
          color="bg-orange-500"
        />
        <MetricCard 
          title="Conversion Rate"
          value={`${metrics.conversionRate}%`}
          change="+0.4%"
          icon={TrendingUp}
          color="bg-indigo-500"
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <AlertTriangle className="mr-2 text-yellow-500" size={20} />
          Quick Actions Required
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-800 mb-2">High Cart Abandonment</h4>
            <p className="text-red-600 text-sm mb-3">12 high-value carts abandoned in last 2 hours</p>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
              Launch Recovery Campaign
            </button>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">Low Stock Alert</h4>
            <p className="text-yellow-600 text-sm mb-3">4 popular items below reorder threshold</p>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors">
              Review Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CartRecovery = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <ShoppingCart className="mr-2 text-blue-500" size={20} />
          Abandoned Cart Recovery
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Items</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Value</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Stage</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {abandonedCarts.map((cart) => (
                <tr key={cart.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{cart.email}</td>
                  <td className="py-3 px-4 text-sm">{cart.items}</td>
                  <td className="py-3 px-4 text-sm font-medium">${cart.value}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      cart.stage === 'payment' ? 'bg-red-100 text-red-700' :
                      cart.stage === 'checkout' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {cart.stage}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{cart.timeAgo}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => sendRecoveryEmail(cart.id, 'Standard')}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                      >
                        Send Email
                      </button>
                      <button 
                        onClick={() => sendRecoveryEmail(cart.id, 'Discount')}
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                      >
                        Offer Discount
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recovery Email Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium mb-2">Standard Reminder</h4>
            <p className="text-sm text-gray-600 mb-3">Gentle reminder about items left in cart</p>
            <div className="text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Open Rate:</span>
                <span>24.5%</span>
              </div>
              <div className="flex justify-between">
                <span>Click Rate:</span>
                <span>8.2%</span>
              </div>
              <div className="flex justify-between">
                <span>Conversion:</span>
                <span>3.1%</span>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium mb-2">Discount Offer</h4>
            <p className="text-sm text-gray-600 mb-3">10% discount to complete purchase</p>
            <div className="text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Open Rate:</span>
                <span>31.2%</span>
              </div>
              <div className="flex justify-between">
                <span>Click Rate:</span>
                <span>15.7%</span>
              </div>
              <div className="flex justify-between">
                <span>Conversion:</span>
                <span>7.8%</span>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium mb-2">Urgency Message</h4>
            <p className="text-sm text-gray-600 mb-3">Limited stock or time-sensitive offer</p>
            <div className="text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Open Rate:</span>
                <span>28.9%</span>
              </div>
              <div className="flex justify-between">
                <span>Click Rate:</span>
                <span>12.3%</span>
              </div>
              <div className="flex justify-between">
                <span>Conversion:</span>
                <span>5.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const InventoryManager = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Package className="mr-2 text-purple-500" size={20} />
          Smart Inventory Management
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Product</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Current Stock</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Reorder Point</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Demand</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium">{item.name}</td>
                  <td className="py-3 px-4 text-sm">{item.current} units</td>
                  <td className="py-3 px-4 text-sm">{item.reorderPoint} units</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.demand === 'High' ? 'bg-red-100 text-red-700' :
                      item.demand === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {item.demand}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.current < item.reorderPoint ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {item.current < item.reorderPoint ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => createReorderAlert(item.id)}
                      className="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700 transition-colors"
                    >
                      Create Alert
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">AI-Powered Demand Forecasting</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Trending Up</h4>
              <p className="text-blue-600 text-sm mb-2">Wireless accessories showing 25% increase</p>
              <p className="text-xs text-blue-500">Recommended: Increase stock by 40%</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-800 mb-2">Seasonal Alert</h4>
              <p className="text-yellow-600 text-sm mb-2">Back-to-school items peak in 2 weeks</p>
              <p className="text-xs text-yellow-500">Recommended: Stock up 60% by next week</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">Optimal Stock Level</h4>
              <p className="text-green-600 text-sm mb-2">Current inventory matches demand perfectly</p>
              <p className="text-xs text-green-500">Recommended: Maintain current levels</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-medium text-red-800 mb-2">Overstocked Alert</h4>
              <p className="text-red-600 text-sm mb-2">Summer items demand dropping 30%</p>
              <p className="text-xs text-red-500">Recommended: Run clearance sale</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CustomerInsights = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Users className="mr-2 text-green-500" size={20} />
          Customer Segmentation & Lifetime Value
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Segment</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Customers</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Avg Spend</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Retention</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Growth</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {customerSegments.map((segment, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium">{segment.segment}</td>
                  <td className="py-3 px-4 text-sm">{segment.count.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm">${segment.avgSpend}</td>
                  <td className="py-3 px-4 text-sm">{segment.retention}%</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      segment.growth.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {segment.growth}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="bg-indigo-600 text-white px-3 py-1 rounded text-xs hover:bg-indigo-700 transition-colors">
                      Campaign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Churn Risk Analysis</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div>
                <p className="text-sm font-medium text-red-800">High Risk</p>
                <p className="text-xs text-red-600">Last purchase > 90 days</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-red-800">342</p>
                <p className="text-xs text-red-600">customers</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div>
                <p className="text-sm font-medium text-yellow-800">Medium Risk</p>
                <p className="text-xs text-yellow-600">Last purchase 45-90 days</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-yellow-800">567</p>
                <p className="text-xs text-yellow-600">customers</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <p className="text-sm font-medium text-green-800">Low Risk</p>
                <p className="text-xs text-green-600">Active within 45 days</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-800">2,891</p>
                <p className="text-xs text-green-600">customers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Personalization Opportunities</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Product Recommendations</h4>
              <p className="text-xs text-blue-600">AI-powered suggestions based on purchase history</p>
              <p className="text-xs text-blue-500 mt-1">Potential revenue: +$45k/month</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="text-sm font-medium text-purple-800 mb-1">Dynamic Pricing</h4>
              <p className="text-xs text-purple-600">Personalized offers based on customer value</p>
              <p className="text-xs text-purple-500 mt-1">Conversion increase: +18%</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
              <h4 className="text-sm font-medium text-indigo-800 mb-1">Loyalty Programs</h4>
              <p className="text-xs text-indigo-600">Targeted rewards for each customer segment</p>
              <p className="text-xs text-indigo-500 mt-1">Retention increase: +25%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'cart-recovery', label: 'Cart Recovery', icon: ShoppingCart },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Zap className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EcommercePro Optimizer</h1>
                <p className="text-sm text-gray-600">Solve your biggest ecommerce challenges</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Revenue Impact</p>
                <p className="text-lg font-bold text-green-600">+$127k this month</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'cart-recovery' && <CartRecovery />}
        {activeTab === 'inventory' && <InventoryManager />}
        {activeTab === 'customers' && <CustomerInsights />}
      </div>
    </div>
  );
};

export default EcommerceOptimizer;
