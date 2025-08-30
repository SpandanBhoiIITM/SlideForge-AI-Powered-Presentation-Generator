import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TemplateUploadPanel = ({ 
  templateFile, 
  onTemplateUpload, 
  onTemplateRemove, 
  isProcessing 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const acceptedFormats = ['.pptx', '.potx'];
  const maxFileSize = 50 * 1024 * 1024; // 50MB

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    if (files?.length > 0) {
      handleFileUpload(files?.[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file) => {
    // Validate file type
    const fileExtension = '.' + file?.name?.split('.')?.pop()?.toLowerCase();
    if (!acceptedFormats?.includes(fileExtension)) {
      alert(`Invalid file format. Please upload ${acceptedFormats?.join(' or ')} files only.`);
      return;
    }

    // Validate file size
    if (file?.size > maxFileSize) {
      alert('File size too large. Please upload files smaller than 50MB.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    // Simulate processing time
    setTimeout(() => {
      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        onTemplateUpload(file);
      }, 500);
    }, 1500);
  };

  const handleBrowseClick = () => {
    fileInputRef?.current?.click();
  };

  const handleRemoveTemplate = () => {
    onTemplateRemove();
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const useDefaultTemplate = () => {
    // Create a mock file object for default template
    const defaultTemplate = {
      name: 'Default Professional Template.pptx',
      size: 2048576, // 2MB
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      lastModified: Date.now(),
      isDefault: true
    };
    onTemplateUpload(defaultTemplate);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Upload" size={20} color="var(--color-primary)" />
          <h2 className="text-lg font-semibold text-foreground">PowerPoint Template</h2>
        </div>
        {templateFile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveTemplate}
            iconName="X"
            iconPosition="left"
            iconSize={16}
            disabled={isProcessing || isUploading}
          >
            Remove
          </Button>
        )}
      </div>
      {/* Upload Area */}
      <div className="flex-1 flex flex-col space-y-4">
        {!templateFile ? (
          <>
            {/* Drag and Drop Zone */}
            <div
              className={`flex-1 border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                isDragOver
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-primary/5'
              } ${isUploading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleBrowseClick}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon 
                      name={isUploading ? "Loader2" : "Upload"} 
                      size={32} 
                      color="var(--color-primary)"
                      className={isUploading ? "animate-spin" : ""}
                    />
                  </div>
                </div>
                
                {isUploading ? (
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">Uploading template...</p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">
                      Drop your PowerPoint template here
                    </p>
                    <p className="text-muted-foreground">
                      or click to browse files
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports .pptx and .potx files up to 50MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2">
              <Button
                variant="outline"
                onClick={handleBrowseClick}
                iconName="FolderOpen"
                iconPosition="left"
                disabled={isUploading || isProcessing}
                fullWidth
              >
                Browse Files
              </Button>
              
              <Button
                variant="ghost"
                onClick={useDefaultTemplate}
                iconName="Palette"
                iconPosition="left"
                disabled={isUploading || isProcessing}
                fullWidth
              >
                Use Default Template
              </Button>
            </div>
          </>
        ) : (
          /* Template Preview */
          (<div className="flex-1 space-y-4">
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={24} color="var(--color-success)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">
                    {templateFile?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(templateFile?.size)} • {templateFile?.isDefault ? 'Default Template' : 'Custom Template'}
                  </p>
                </div>
                <Icon name="CheckCircle" size={20} color="var(--color-success)" />
              </div>
            </div>
            {/* Template Info */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Template Features:</h4>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Palette" size={16} />
                  <span>Color scheme and branding will be extracted</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Layout" size={16} />
                  <span>Slide layouts and master templates preserved</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Type" size={16} />
                  <span>Font styles and formatting maintained</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Image" size={16} />
                  <span>Background images and graphics included</span>
                </div>
              </div>
            </div>
          </div>)
        )}

        {/* File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats?.join(',')}
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading || isProcessing}
        />

        {/* Format Info */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} color="var(--color-muted-foreground)" className="mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Supported Formats:</p>
              <p className="text-xs text-muted-foreground">
                PowerPoint files (.pptx) and PowerPoint templates (.potx) up to 50MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateUploadPanel;