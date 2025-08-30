import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TemplatePreviewModal = ({ template, isOpen, onClose, onUseTemplate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen || !template) return null;

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prev => prev > 0 ? prev - 1 : template?.slides?.length - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => prev < template?.slides?.length - 1 ? prev + 1 : 0);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={handleBackdropClick}
      />
      <div className="relative bg-card rounded-lg shadow-modal max-w-6xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">{template?.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {template?.slideCount} slides • {template?.category} • {formatFileSize(template?.fileSize)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="default"
              onClick={() => onUseTemplate(template)}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
            >
              Use Template
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-120px)]">
          {/* Main Preview Area */}
          <div className="flex-1 flex flex-col">
            {/* Slide Preview */}
            <div className="flex-1 bg-muted p-8 flex items-center justify-center relative">
              <div className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full aspect-[16/9]">
                <Image
                  src={template?.slides?.[currentSlide]?.preview}
                  alt={`Slide ${currentSlide + 1} preview`}
                  className="w-full h-full object-contain rounded-lg"
                />
                
                {/* Navigation Arrows */}
                {template?.slides?.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={handlePrevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 shadow-lg"
                      iconName="ChevronLeft"
                      iconSize={20}
                    />
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={handleNextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 shadow-lg"
                      iconName="ChevronRight"
                      iconSize={20}
                    />
                  </>
                )}
              </div>
              
              {/* Slide Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {currentSlide + 1} / {template?.slides?.length}
              </div>
            </div>

            {/* Slide Thumbnails */}
            {template?.slides?.length > 1 && (
              <div className="p-4 border-t border-border">
                <div className="flex space-x-2 overflow-x-auto">
                  {template?.slides?.map((slide, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`flex-shrink-0 w-20 h-12 rounded border-2 overflow-hidden transition-all ${
                        currentSlide === index 
                          ? 'border-primary shadow-md' 
                          : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      <Image
                        src={slide?.thumbnail}
                        alt={`Slide ${index + 1} thumbnail`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Details Sidebar */}
          <div className="w-80 border-l border-border bg-muted/30 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Template Info */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Template Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="text-foreground">{template?.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Slides:</span>
                    <span className="text-foreground">{template?.slideCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">File Size:</span>
                    <span className="text-foreground">{formatFileSize(template?.fileSize)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Usage:</span>
                    <span className="text-foreground">{template?.usageCount} times</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uploaded:</span>
                    <span className="text-foreground">
                      {new Date(template.uploadDate)?.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Color Palette */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Color Palette</h3>
                <div className="grid grid-cols-4 gap-2">
                  {template?.colorPalette?.map((color, index) => (
                    <div key={index} className="space-y-1">
                      <div 
                        className="w-full h-8 rounded border border-border"
                        style={{ backgroundColor: color?.hex }}
                      />
                      <p className="text-xs text-muted-foreground text-center">
                        {color?.hex}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Font Families */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Typography</h3>
                <div className="space-y-2">
                  {template?.fontFamilies?.map((font, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-foreground" style={{ fontFamily: font?.name }}>
                        {font?.name}
                      </span>
                      <span className="text-muted-foreground">{font?.usage}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {template?.tags && template?.tags?.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-1">
                    {template?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Layout Patterns */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Layout Patterns</h3>
                <div className="space-y-2 text-sm">
                  {template?.layoutPatterns?.map((pattern, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Layout" size={14} className="text-muted-foreground" />
                      <span className="text-foreground">{pattern}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;