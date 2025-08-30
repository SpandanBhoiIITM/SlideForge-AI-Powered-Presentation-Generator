import React from 'react';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const FilterSidebar = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  isOpen, 
  onClose 
}) => {
  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'usage', label: 'Most Used' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' }
  ];

  const categoryOptions = [
    { value: 'business', label: 'Business' },
    { value: 'education', label: 'Education' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'creative', label: 'Creative' },
    { value: 'minimal', label: 'Minimal' },
    { value: 'corporate', label: 'Corporate' }
  ];

  const handleSearchChange = (e) => {
    onFiltersChange({
      ...filters,
      search: e?.target?.value
    });
  };

  const handleSortChange = (value) => {
    onFiltersChange({
      ...filters,
      sortBy: value
    });
  };

  const handleCategoryChange = (checked, category) => {
    const updatedCategories = checked
      ? [...filters?.categories, category]
      : filters?.categories?.filter(c => c !== category);
    
    onFiltersChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handleUsageFilterChange = (checked, usageType) => {
    onFiltersChange({
      ...filters,
      usageFilter: checked ? usageType : null
    });
  };

  const handleDateRangeChange = (value) => {
    onFiltersChange({
      ...filters,
      dateRange: value
    });
  };

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          iconName="X"
          iconSize={20}
        />
      </div>

      {/* Filter Content */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Search */}
        <div>
          <Input
            type="search"
            placeholder="Search templates..."
            value={filters?.search}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>

        {/* Sort By */}
        <div>
          <Select
            label="Sort By"
            options={sortOptions}
            value={filters?.sortBy}
            onChange={handleSortChange}
            placeholder="Select sorting"
          />
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Categories</h3>
          <div className="space-y-2">
            {categoryOptions?.map((category) => (
              <Checkbox
                key={category?.value}
                label={category?.label}
                checked={filters?.categories?.includes(category?.value)}
                onChange={(e) => handleCategoryChange(e?.target?.checked, category?.value)}
              />
            ))}
          </div>
        </div>

        {/* Usage Filter */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Usage</h3>
          <div className="space-y-2">
            <Checkbox
              label="Frequently Used (10+ uses)"
              checked={filters?.usageFilter === 'frequent'}
              onChange={(e) => handleUsageFilterChange(e?.target?.checked, 'frequent')}
            />
            <Checkbox
              label="Recently Used"
              checked={filters?.usageFilter === 'recent'}
              onChange={(e) => handleUsageFilterChange(e?.target?.checked, 'recent')}
            />
            <Checkbox
              label="Unused Templates"
              checked={filters?.usageFilter === 'unused'}
              onChange={(e) => handleUsageFilterChange(e?.target?.checked, 'unused')}
            />
          </div>
        </div>

        {/* Date Range */}
        <div>
          <Select
            label="Upload Date"
            options={[
              { value: 'all', label: 'All Time' },
              { value: 'today', label: 'Today' },
              { value: 'week', label: 'This Week' },
              { value: 'month', label: 'This Month' },
              { value: 'quarter', label: 'This Quarter' },
              { value: 'year', label: 'This Year' }
            ]}
            value={filters?.dateRange}
            onChange={handleDateRangeChange}
            placeholder="Select date range"
          />
        </div>

        {/* File Size */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">File Size</h3>
          <div className="space-y-2">
            <Checkbox
              label="Small (&lt; 5MB)"
              checked={filters?.sizeFilter === 'small'}
              onChange={(e) => handleUsageFilterChange(e?.target?.checked, 'small')}
            />
            <Checkbox
              label="Medium (5-20MB)"
              checked={filters?.sizeFilter === 'medium'}
              onChange={(e) => handleUsageFilterChange(e?.target?.checked, 'medium')}
            />
            <Checkbox
              label="Large (&gt; 20MB)"
              checked={filters?.sizeFilter === 'large'}
              onChange={(e) => handleUsageFilterChange(e?.target?.checked, 'large')}
            />
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          onClick={onClearFilters}
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={16}
          className="w-full"
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  // Mobile Drawer
  if (isOpen) {
    return (
      <div className="fixed inset-0 z-50 md:hidden">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-card border-l border-border shadow-modal animate-slide-in-right">
          {sidebarContent}
        </div>
      </div>
    );
  }

  // Desktop Sidebar
  return (
    <div className="hidden md:block w-80 bg-card border-r border-border">
      {sidebarContent}
    </div>
  );
};

export default FilterSidebar;