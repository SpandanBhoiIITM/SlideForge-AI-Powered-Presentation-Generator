import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsToolbar = ({ 
  selectedTemplates, 
  onSelectAll, 
  onClearSelection, 
  onBulkDelete, 
  onBulkExport,
  onBulkCategorize,
  totalTemplates 
}) => {
  const [bulkAction, setBulkAction] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const bulkActionOptions = [
    { value: '', label: 'Select bulk action...' },
    { value: 'delete', label: 'Delete Selected' },
    { value: 'export', label: 'Export Selected' },
    { value: 'categorize', label: 'Change Category' },
    { value: 'duplicate', label: 'Duplicate Selected' }
  ];

  const handleBulkAction = () => {
    switch (bulkAction) {
      case 'delete':
        setShowConfirmDialog(true);
        break;
      case 'export':
        onBulkExport(selectedTemplates);
        break;
      case 'categorize':
        onBulkCategorize(selectedTemplates);
        break;
      case 'duplicate':
        // Handle duplicate action
        break;
      default:
        break;
    }
    setBulkAction('');
  };

  const handleConfirmDelete = () => {
    onBulkDelete(selectedTemplates);
    setShowConfirmDialog(false);
    onClearSelection();
  };

  if (selectedTemplates?.length === 0) return null;

  return (
    <>
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="CheckSquare" size={20} className="text-primary" />
              <span className="font-medium text-foreground">
                {selectedTemplates?.length} template{selectedTemplates?.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onSelectAll}
                iconName="CheckSquare"
                iconPosition="left"
                iconSize={14}
              >
                Select All ({totalTemplates})
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearSelection}
                iconName="X"
                iconPosition="left"
                iconSize={14}
              >
                Clear Selection
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Select
              options={bulkActionOptions}
              value={bulkAction}
              onChange={setBulkAction}
              placeholder="Select action..."
              className="w-48"
            />
            
            <Button
              variant="default"
              onClick={handleBulkAction}
              disabled={!bulkAction}
              iconName="Play"
              iconPosition="left"
              iconSize={14}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowConfirmDialog(false)} />
          
          <div className="relative bg-card rounded-lg shadow-modal max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Confirm Deletion</h3>
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            
            <p className="text-foreground mb-6">
              Are you sure you want to delete {selectedTemplates?.length} template{selectedTemplates?.length !== 1 ? 's' : ''}? 
              This will permanently remove them from your library.
            </p>
            
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmDelete}
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
              >
                Delete Templates
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActionsToolbar;