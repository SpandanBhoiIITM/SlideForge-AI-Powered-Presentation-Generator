import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationHeader from '../../components/ui/NavigationHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TemplateCard from './components/TemplateCard';
import FilterSidebar from './components/FilterSidebar';
import TemplatePreviewModal from './components/TemplatePreviewModal';
import UploadTemplateModal from './components/UploadTemplateModal';
import BulkActionsToolbar from './components/BulkActionsToolbar';

const TemplateLibraryManagement = () => {
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    sortBy: 'recent',
    categories: [],
    usageFilter: null,
    dateRange: 'all',
    sizeFilter: null
  });

  // Mock template data
  const [templates, setTemplates] = useState([
    {
      id: '1',
      name: 'Modern Business Presentation',
      category: 'business',
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      slideCount: 24,
      colorCount: 6,
      usageCount: 45,
      uploadDate: '2024-08-15T10:30:00Z',
      fileSize: 12500000,
      tags: ['professional', 'corporate', 'clean'],
      slides: [
        {
          preview: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=150&fit=crop'
        },
        {
          preview: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=150&fit=crop'
        }
      ],
      colorPalette: [
        { hex: '#1E40AF', name: 'Primary Blue' },
        { hex: '#FFFFFF', name: 'White' },
        { hex: '#F3F4F6', name: 'Light Gray' },
        { hex: '#374151', name: 'Dark Gray' }
      ],
      fontFamilies: [
        { name: 'Inter', usage: 'Headings' },
        { name: 'Open Sans', usage: 'Body Text' }
      ],
      layoutPatterns: ['Title Slide', 'Content with Image', 'Two Column', 'Full Image']
    },
    {
      id: '2',
      name: 'Creative Marketing Deck',
      category: 'marketing',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=400&h=300&fit=crop',
      slideCount: 18,
      colorCount: 8,
      usageCount: 32,
      uploadDate: '2024-08-20T14:15:00Z',
      fileSize: 18750000,
      tags: ['creative', 'colorful', 'marketing'],
      slides: [
        {
          preview: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=800&h=600&fit=crop',
          thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=200&h=150&fit=crop'
        }
      ],
      colorPalette: [
        { hex: '#F59E0B', name: 'Amber' },
        { hex: '#EF4444', name: 'Red' },
        { hex: '#10B981', name: 'Green' },
        { hex: '#3B82F6', name: 'Blue' }
      ],
      fontFamilies: [
        { name: 'Poppins', usage: 'Headings' },
        { name: 'Roboto', usage: 'Body Text' }
      ],
      layoutPatterns: ['Hero Slide', 'Stats Grid', 'Timeline', 'Call to Action']
    },
    {
      id: '3',
      name: 'Educational Course Template',
      category: 'education',
      thumbnail: 'https://images.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg?w=400&h=300&fit=crop',
      slideCount: 30,
      colorCount: 4,
      usageCount: 28,
      uploadDate: '2024-08-25T09:45:00Z',
      fileSize: 8900000,
      tags: ['education', 'learning', 'academic'],
      slides: [
        {
          preview: 'https://images.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg?w=800&h=600&fit=crop',
          thumbnail: 'https://images.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg?w=200&h=150&fit=crop'
        }
      ],
      colorPalette: [
        { hex: '#6366F1', name: 'Indigo' },
        { hex: '#FFFFFF', name: 'White' },
        { hex: '#F8FAFC', name: 'Slate' },
        { hex: '#1F2937', name: 'Gray' }
      ],
      fontFamilies: [
        { name: 'Source Sans Pro', usage: 'All Text' }
      ],
      layoutPatterns: ['Lesson Title', 'Content Blocks', 'Quiz Slide', 'Summary']
    },
    {
      id: '4',
      name: 'Sales Pitch Deck',
      category: 'sales',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      slideCount: 15,
      colorCount: 5,
      usageCount: 67,
      uploadDate: '2024-08-10T16:20:00Z',
      fileSize: 15200000,
      tags: ['sales', 'pitch', 'revenue'],
      slides: [
        {
          preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=150&fit=crop'
        }
      ],
      colorPalette: [
        { hex: '#059669', name: 'Emerald' },
        { hex: '#DC2626', name: 'Red' },
        { hex: '#FFFFFF', name: 'White' },
        { hex: '#111827', name: 'Gray' }
      ],
      fontFamilies: [
        { name: 'Montserrat', usage: 'Headings' },
        { name: 'Lato', usage: 'Body Text' }
      ],
      layoutPatterns: ['Problem Statement', 'Solution Overview', 'ROI Calculator', 'Next Steps']
    },
    {
      id: '5',
      name: 'Minimal Corporate Template',
      category: 'corporate',
      thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?w=400&h=300&fit=crop',
      slideCount: 20,
      colorCount: 3,
      usageCount: 15,
      uploadDate: '2024-08-28T11:30:00Z',
      fileSize: 6800000,
      tags: ['minimal', 'corporate', 'clean'],
      slides: [
        {
          preview: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?w=800&h=600&fit=crop',
          thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?w=200&h=150&fit=crop'
        }
      ],
      colorPalette: [
        { hex: '#000000', name: 'Black' },
        { hex: '#FFFFFF', name: 'White' },
        { hex: '#6B7280', name: 'Gray' }
      ],
      fontFamilies: [
        { name: 'Helvetica', usage: 'All Text' }
      ],
      layoutPatterns: ['Title Only', 'Text Heavy', 'Image Focus', 'Data Visualization']
    },
    {
      id: '6',
      name: 'Creative Agency Portfolio',
      category: 'creative',
      thumbnail: 'https://images.pixabay.com/photo/2017/01/29/13/21/mobile-phone-2017980_1280.jpg?w=400&h=300&fit=crop',
      slideCount: 25,
      colorCount: 10,
      usageCount: 8,
      uploadDate: '2024-08-29T08:15:00Z',
      fileSize: 22100000,
      tags: ['creative', 'portfolio', 'design'],
      slides: [
        {
          preview: 'https://images.pixabay.com/photo/2017/01/29/13/21/mobile-phone-2017980_1280.jpg?w=800&h=600&fit=crop',
          thumbnail: 'https://images.pixabay.com/photo/2017/01/29/13/21/mobile-phone-2017980_1280.jpg?w=200&h=150&fit=crop'
        }
      ],
      colorPalette: [
        { hex: '#8B5CF6', name: 'Purple' },
        { hex: '#F59E0B', name: 'Amber' },
        { hex: '#EF4444', name: 'Red' },
        { hex: '#10B981', name: 'Green' }
      ],
      fontFamilies: [
        { name: 'Playfair Display', usage: 'Headings' },
        { name: 'Source Sans Pro', usage: 'Body Text' }
      ],
      layoutPatterns: ['Portfolio Grid', 'Case Study', 'Before/After', 'Team Showcase']
    }
  ]);

  const filteredTemplates = templates?.filter(template => {
    // Search filter
    if (filters?.search && !template?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
        !template?.tags?.some(tag => tag?.toLowerCase()?.includes(filters?.search?.toLowerCase()))) {
      return false;
    }

    // Category filter
    if (filters?.categories?.length > 0 && !filters?.categories?.includes(template?.category)) {
      return false;
    }

    // Usage filter
    if (filters?.usageFilter === 'frequent' && template?.usageCount < 10) return false;
    if (filters?.usageFilter === 'unused' && template?.usageCount > 0) return false;

    // Date range filter
    if (filters?.dateRange !== 'all') {
      const uploadDate = new Date(template.uploadDate);
      const now = new Date();
      const daysDiff = Math.floor((now - uploadDate) / (1000 * 60 * 60 * 24));
      
      switch (filters?.dateRange) {
        case 'today':
          if (daysDiff > 0) return false;
          break;
        case 'week':
          if (daysDiff > 7) return false;
          break;
        case 'month':
          if (daysDiff > 30) return false;
          break;
        case 'quarter':
          if (daysDiff > 90) return false;
          break;
        case 'year':
          if (daysDiff > 365) return false;
          break;
      }
    }

    return true;
  });

  // Sort templates
  const sortedTemplates = [...filteredTemplates]?.sort((a, b) => {
    switch (filters?.sortBy) {
      case 'recent':
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      case 'oldest':
        return new Date(a.uploadDate) - new Date(b.uploadDate);
      case 'usage':
        return b?.usageCount - a?.usageCount;
      case 'name':
        return a?.name?.localeCompare(b?.name);
      case 'name-desc':
        return b?.name?.localeCompare(a?.name);
      default:
        return 0;
    }
  });

  const handleTemplateSelect = (templateId, isSelected) => {
    if (isSelected) {
      setSelectedTemplates(prev => [...prev, templateId]);
    } else {
      setSelectedTemplates(prev => prev?.filter(id => id !== templateId));
    }
  };

  const handleSelectAll = () => {
    setSelectedTemplates(sortedTemplates?.map(t => t?.id));
  };

  const handleClearSelection = () => {
    setSelectedTemplates([]);
  };

  const handlePreview = (template) => {
    setPreviewTemplate(template);
  };

  const handleEdit = (template) => {
    console.log('Edit template:', template?.id);
    // Implement edit functionality
  };

  const handleDelete = (template) => {
    if (window.confirm(`Are you sure you want to delete "${template?.name}"?`)) {
      setTemplates(prev => prev?.filter(t => t?.id !== template?.id));
    }
  };

  const handleDuplicate = (template) => {
    const duplicatedTemplate = {
      ...template,
      id: Date.now()?.toString(),
      name: `${template?.name} (Copy)`,
      uploadDate: new Date()?.toISOString(),
      usageCount: 0
    };
    setTemplates(prev => [duplicatedTemplate, ...prev]);
  };

  const handleUploadTemplate = (templateData) => {
    const newTemplate = {
      ...templateData,
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      slideCount: Math.floor(Math.random() * 20) + 10,
      colorCount: Math.floor(Math.random() * 8) + 3,
      fileSize: templateData?.file?.size,
      slides: [
        {
          preview: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=150&fit=crop'
        }
      ],
      colorPalette: [
        { hex: '#1E40AF', name: 'Primary' },
        { hex: '#FFFFFF', name: 'White' },
        { hex: '#F3F4F6', name: 'Light Gray' },
        { hex: '#374151', name: 'Dark Gray' }
      ],
      fontFamilies: [
        { name: 'Inter', usage: 'Headings' },
        { name: 'Open Sans', usage: 'Body Text' }
      ],
      layoutPatterns: ['Title Slide', 'Content', 'Image', 'Text']
    };
    
    setTemplates(prev => [newTemplate, ...prev]);
  };

  const handleUseTemplate = (template) => {
    console.log('Using template:', template?.id);
    // Implement template usage functionality
    setPreviewTemplate(null);
  };

  const handleBulkDelete = (templateIds) => {
    setTemplates(prev => prev?.filter(t => !templateIds?.includes(t?.id)));
  };

  const handleBulkExport = (templateIds) => {
    console.log('Exporting templates:', templateIds);
    // Implement bulk export functionality
  };

  const handleBulkCategorize = (templateIds) => {
    console.log('Categorizing templates:', templateIds);
    // Implement bulk categorization functionality
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      sortBy: 'recent',
      categories: [],
      usageFilter: null,
      dateRange: 'all',
      sizeFilter: null
    });
  };

  return (
    <>
      <Helmet>
        <title>Template Library & Management - SlideForge</title>
        <meta name="description" content="Organize, preview, and manage your PowerPoint templates for consistent presentation generation" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        
        <div className="pt-16 flex h-screen">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearFilters}
            isOpen={isFilterSidebarOpen}
            onClose={() => setIsFilterSidebarOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Toolbar */}
            <div className="bg-card border-b border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-bold text-foreground">Template Library</h1>
                  <div className="text-sm text-muted-foreground">
                    {sortedTemplates?.length} of {templates?.length} templates
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Mobile Filter Button */}
                  <Button
                    variant="outline"
                    onClick={() => setIsFilterSidebarOpen(true)}
                    iconName="Filter"
                    iconPosition="left"
                    iconSize={16}
                    className="md:hidden"
                  >
                    Filters
                  </Button>

                  {/* View Toggle */}
                  <div className="hidden md:flex items-center bg-muted rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      iconName="Grid3X3"
                      iconSize={16}
                    />
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      iconName="List"
                      iconSize={16}
                    />
                  </div>

                  {/* Upload Button */}
                  <Button
                    variant="default"
                    onClick={() => setIsUploadModalOpen(true)}
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Upload Template
                  </Button>
                </div>
              </div>

              {/* Bulk Actions */}
              <BulkActionsToolbar
                selectedTemplates={selectedTemplates}
                onSelectAll={handleSelectAll}
                onClearSelection={handleClearSelection}
                onBulkDelete={handleBulkDelete}
                onBulkExport={handleBulkExport}
                onBulkCategorize={handleBulkCategorize}
                totalTemplates={sortedTemplates?.length}
              />
            </div>

            {/* Templates Grid/List */}
            <div className="flex-1 overflow-y-auto p-6">
              {sortedTemplates?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Icon name="FileX" size={64} className="text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No templates found</h3>
                  <p className="text-muted-foreground mb-4">
                    {filters?.search || filters?.categories?.length > 0 || filters?.usageFilter || filters?.dateRange !== 'all' ?'Try adjusting your filters to see more templates.' :'Upload your first PowerPoint template to get started.'
                    }
                  </p>
                  {filters?.search || filters?.categories?.length > 0 || filters?.usageFilter || filters?.dateRange !== 'all' ? (
                    <Button variant="outline" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  ) : (
                    <Button onClick={() => setIsUploadModalOpen(true)}>
                      Upload Template
                    </Button>
                  )}
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' ?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :'grid-cols-1'
                }`}>
                  {sortedTemplates?.map((template) => (
                    <div key={template?.id} className="relative">
                      {/* Selection Checkbox */}
                      <div className="absolute top-3 left-3 z-10">
                        <input
                          type="checkbox"
                          checked={selectedTemplates?.includes(template?.id)}
                          onChange={(e) => handleTemplateSelect(template?.id, e?.target?.checked)}
                          className="w-4 h-4 text-primary bg-card border-border rounded focus:ring-primary focus:ring-2"
                        />
                      </div>
                      
                      <TemplateCard
                        template={template}
                        onPreview={handlePreview}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onDuplicate={handleDuplicate}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        <TemplatePreviewModal
          template={previewTemplate}
          isOpen={!!previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onUseTemplate={handleUseTemplate}
        />

        <UploadTemplateModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={handleUploadTemplate}
        />
      </div>
    </>
  );
};

export default TemplateLibraryManagement;