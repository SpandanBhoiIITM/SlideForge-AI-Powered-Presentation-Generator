import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TemplateCard = ({ template, onPreview, onEdit, onDelete, onDuplicate }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatUsageCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000)?.toFixed(1)}k`;
    }
    return count?.toString();
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Template Thumbnail */}
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        <Image
          src={template?.thumbnail}
          alt={`${template?.name} template preview`}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        
        {/* Desktop Hover Overlay */}
        <div className={`absolute inset-0 bg-black/60 flex items-center justify-center space-x-2 transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        } hidden md:flex`}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPreview(template)}
            iconName="Eye"
            iconPosition="left"
            iconSize={16}
          >
            Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(template)}
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
          >
            Edit
          </Button>
        </div>

        {/* Usage Badge */}
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium">
          {formatUsageCount(template?.usageCount)} uses
        </div>

        {/* Category Tag */}
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
          {template?.category}
        </div>
      </div>
      {/* Template Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">
            {template?.name}
          </h3>
        </div>

        <div className="flex items-center text-xs text-muted-foreground mb-3">
          <Icon name="Calendar" size={12} className="mr-1" />
          <span>Uploaded {formatDate(template?.uploadDate)}</span>
        </div>

        {/* Template Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center">
            <Icon name="FileText" size={12} className="mr-1" />
            <span>{template?.slideCount} slides</span>
          </div>
          <div className="flex items-center">
            <Icon name="Palette" size={12} className="mr-1" />
            <span>{template?.colorCount} colors</span>
          </div>
        </div>

        {/* Tags */}
        {template?.tags && template?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {template?.tags?.slice(0, 2)?.map((tag, index) => (
              <span
                key={index}
                className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {template?.tags?.length > 2 && (
              <span className="text-xs text-muted-foreground">
                +{template?.tags?.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Mobile Actions */}
        <div className="flex items-center space-x-2 md:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPreview(template)}
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
            className="flex-1"
          >
            Preview
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(template)}
            iconName="Edit"
            iconSize={14}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDuplicate(template)}
            iconName="Copy"
            iconSize={14}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(template)}
            iconName="Trash2"
            iconSize={14}
            className="text-destructive hover:text-destructive"
          />
        </div>

        {/* Desktop Actions (Hidden, shown on hover) */}
        <div className="hidden md:flex items-center justify-between pt-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDuplicate(template)}
            iconName="Copy"
            iconPosition="left"
            iconSize={14}
          >
            Duplicate
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(template)}
            iconName="Trash2"
            iconSize={14}
            className="text-destructive hover:text-destructive"
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;