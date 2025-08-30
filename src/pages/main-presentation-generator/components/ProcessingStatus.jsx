import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingStatus = ({ 
  isVisible, 
  currentStep, 
  progress, 
  onCancel,
  generatedFile 
}) => {
  if (!isVisible && !generatedFile) return null;

  const steps = [
    { id: 'parsing', label: 'Parsing Content', icon: 'FileText' },
    { id: 'structuring', label: 'AI Structuring', icon: 'Brain' },
    { id: 'extracting', label: 'Template Extraction', icon: 'Palette' },
    { id: 'generating', label: 'Slide Generation', icon: 'Presentation' },
    { id: 'finalizing', label: 'Finalizing', icon: 'CheckCircle' }
  ];

  const getCurrentStepIndex = () => {
    return steps?.findIndex(step => step?.id === currentStep);
  };

  const handleDownload = () => {
    // Create a mock download
    const link = document.createElement('a');
    link.href = '#';
    link.download = generatedFile?.name;
    link?.click();
    
    // Show success message
    alert('Presentation downloaded successfully!');
  };

  const handleGenerateAnother = () => {
    window.location?.reload();
  };

  if (generatedFile) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-lg border border-border p-6 w-full max-w-md animate-scale-in">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle" size={32} color="var(--color-success)" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Presentation Ready!
              </h3>
              <p className="text-muted-foreground">
                Your PowerPoint presentation has been generated successfully.
              </p>
            </div>

            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Icon name="FileText" size={24} color="var(--color-success)" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-foreground">{generatedFile?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {generatedFile?.slides} slides • {generatedFile?.size}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                variant="default"
                onClick={handleDownload}
                iconName="Download"
                iconPosition="left"
                iconSize={16}
                fullWidth
              >
                Download Presentation
              </Button>
              
              <Button
                variant="outline"
                onClick={handleGenerateAnother}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
                fullWidth
              >
                Generate Another
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border p-6 w-full max-w-lg animate-scale-in">
        <div className="text-center space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Generating Your Presentation
            </h3>
            <p className="text-muted-foreground">
              Please wait while we process your content and create your slides...
            </p>
          </div>

          {/* Current Step Indicator */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon 
                  name={steps?.[getCurrentStepIndex()]?.icon || 'Loader2'} 
                  size={32} 
                  color="var(--color-primary)"
                  className="animate-pulse"
                />
              </div>
            </div>
            
            <p className="text-foreground font-medium">
              {steps?.[getCurrentStepIndex()]?.label || 'Processing...'}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {progress}% complete
            </p>
          </div>

          {/* Step Progress */}
          <div className="space-y-3">
            {steps?.map((step, index) => {
              const isCompleted = getCurrentStepIndex() > index;
              const isCurrent = getCurrentStepIndex() === index;
              const isPending = getCurrentStepIndex() < index;

              return (
                <div
                  key={step?.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    isCurrent 
                      ? 'bg-primary/10 border border-primary/20' 
                      : isCompleted 
                        ? 'bg-success/10 border border-success/20' :'bg-muted/50 border border-transparent'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCurrent 
                      ? 'bg-primary/20' 
                      : isCompleted 
                        ? 'bg-success/20' :'bg-muted'
                  }`}>
                    <Icon 
                      name={isCompleted ? 'Check' : step?.icon} 
                      size={16} 
                      color={
                        isCurrent 
                          ? 'var(--color-primary)' 
                          : isCompleted 
                            ? 'var(--color-success)' 
                            : 'var(--color-muted-foreground)'
                      }
                    />
                  </div>
                  <span className={`text-sm font-medium ${
                    isCurrent 
                      ? 'text-primary' 
                      : isCompleted 
                        ? 'text-success' :'text-muted-foreground'
                  }`}>
                    {step?.label}
                  </span>
                  {isCurrent && (
                    <div className="flex-1 flex justify-end">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cancel Button */}
          <Button
            variant="outline"
            onClick={onCancel}
            iconName="X"
            iconPosition="left"
            iconSize={16}
            fullWidth
          >
            Cancel Generation
          </Button>

          {/* Estimated Time */}
          <p className="text-xs text-muted-foreground">
            Estimated time remaining: {Math.max(1, Math.ceil((100 - progress) / 20))} minute(s)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatus;