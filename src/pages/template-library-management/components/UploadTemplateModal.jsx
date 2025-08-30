import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const UploadTemplateModal = ({ isOpen, onClose, onUpload }) => {
  const [uploadState, setUploadState] = useState('idle'); // idle, uploading, processing, success, error
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [templateName, setTemplateName] = useState('');
  const [templateCategory, setTemplateCategory] = useState('');
  const [templateTags, setTemplateTags] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

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

  if (!isOpen) return null;

  const resetForm = () => {
    setUploadState('idle');
    setUploadProgress(0);
    setSelectedFile(null);
    setTemplateName('');
    setTemplateCategory('');
    setTemplateTags('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validateFile = (file) => {
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.openxmlformats-officedocument.presentationml.template'
    ];
    
    if (!validTypes?.includes(file?.type) && !file?.name?.match(/\.(pptx|potx)$/i)) {
      return 'Please select a valid PowerPoint file (.pptx or .potx)';
    }
    
    if (file?.size > 50 * 1024 * 1024) { // 50MB limit
      return 'File size must be less than 50MB';
    }
    
    return null;
  };

  const handleFileSelect = (file) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSelectedFile(file);
    setError('');
    
    // Auto-generate template name from filename
    if (!templateName) {
      const nameWithoutExtension = file?.name?.replace(/\.(pptx|potx)$/i, '');
      setTemplateName(nameWithoutExtension);
    }
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);

    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFileSelect(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFileSelect(e?.target?.files?.[0]);
    }
  };

  const simulateUpload = async () => {
    setUploadState('uploading');
    setUploadProgress(0);

    // Simulate file upload progress
    for (let i = 0; i <= 50; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    setUploadState('processing');
    
    // Simulate processing
    for (let i = 50; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setUploadState('success');
    
    // Call the upload callback with template data
    const templateData = {
      id: Date.now()?.toString(),
      name: templateName,
      category: templateCategory,
      tags: templateTags?.split(',')?.map(tag => tag?.trim())?.filter(tag => tag),
      file: selectedFile,
      uploadDate: new Date()?.toISOString(),
      usageCount: 0
    };

    setTimeout(() => {
      onUpload(templateData);
      handleClose();
    }, 1500);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }
    
    if (!templateName?.trim()) {
      setError('Please enter a template name');
      return;
    }
    
    if (!templateCategory) {
      setError('Please select a category');
      return;
    }

    simulateUpload();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getUploadStatusText = () => {
    switch (uploadState) {
      case 'uploading':
        return 'Uploading file...';
      case 'processing':
        return 'Analyzing template structure...';
      case 'success':
        return 'Template uploaded successfully!';
      case 'error':
        return 'Upload failed. Please try again.';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={handleClose} />
      <div className="relative bg-card rounded-lg shadow-modal max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Upload New Template</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            iconName="X"
            iconSize={20}
            disabled={uploadState === 'uploading' || uploadState === 'processing'}
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {uploadState === 'idle' || uploadState === 'error' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload Area */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  PowerPoint File *
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive 
                      ? 'border-primary bg-primary/5' 
                      : selectedFile 
                        ? 'border-success bg-success/5' :'border-border hover:border-muted-foreground'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pptx,.potx"
                    onChange={handleFileInputChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  {selectedFile ? (
                    <div className="space-y-2">
                      <Icon name="FileCheck" size={48} className="mx-auto text-success" />
                      <div>
                        <p className="font-medium text-foreground">{selectedFile?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(selectedFile?.size)}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedFile(null)}
                        iconName="X"
                        iconPosition="left"
                        iconSize={14}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Icon name="Upload" size={48} className="mx-auto text-muted-foreground" />
                      <div>
                        <p className="text-foreground font-medium">
                          Drop your PowerPoint file here, or click to browse
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Supports .pptx and .potx files up to 50MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Template Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Template Name *"
                  type="text"
                  placeholder="Enter template name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e?.target?.value)}
                  required
                />
                
                <Select
                  label="Category *"
                  options={categoryOptions}
                  value={templateCategory}
                  onChange={setTemplateCategory}
                  placeholder="Select category"
                  required
                />
              </div>

              <Input
                label="Tags (Optional)"
                type="text"
                placeholder="business, professional, modern (comma-separated)"
                value={templateTags}
                onChange={(e) => setTemplateTags(e?.target?.value)}
                description="Add tags to help organize and find your template"
              />

              {error && (
                <div className="flex items-center space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <Icon name="AlertCircle" size={16} className="text-destructive" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  iconName="Upload"
                  iconPosition="left"
                  iconSize={16}
                  disabled={!selectedFile || !templateName?.trim() || !templateCategory}
                >
                  Upload Template
                </Button>
              </div>
            </form>
          ) : (
            /* Upload Progress */
            (<div className="space-y-6 text-center py-8">
              <div className="space-y-4">
                {uploadState === 'success' ? (
                  <Icon name="CheckCircle" size={64} className="mx-auto text-success" />
                ) : (
                  <Icon name="Upload" size={64} className="mx-auto text-primary animate-pulse" />
                )}
                
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {getUploadStatusText()}
                  </h3>
                  
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground">
                      {selectedFile?.name} ({formatFileSize(selectedFile?.size)})
                    </p>
                  )}
                </div>
              </div>
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {uploadProgress}% complete
                </p>
              </div>
              {uploadState === 'processing' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Palette" size={16} />
                    <span>Extracting color palette...</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Type" size={16} />
                    <span>Analyzing typography...</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Layout" size={16} />
                    <span>Detecting layout patterns...</span>
                  </div>
                </div>
              )}
            </div>)
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadTemplateModal;