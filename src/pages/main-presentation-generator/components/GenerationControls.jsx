import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const GenerationControls = ({ 
  canGenerate, 
  isProcessing, 
  onGenerate, 
  onCancel,
  processingStep,
  processingProgress 
}) => {
  const getProcessingMessage = () => {
    const messages = {
      'parsing': 'Analyzing your content...',
      'structuring': 'AI is structuring your presentation...',
      'extracting': 'Extracting template styles...',
      'generating': 'Creating PowerPoint slides...',
      'finalizing': 'Finalizing your presentation...'
    };
    return messages?.[processingStep] || 'Processing...';
  };

  const getStepIcon = () => {
    const icons = {
      'parsing': 'FileText',
      'structuring': 'Brain',
      'extracting': 'Palette',
      'generating': 'Presentation',
      'finalizing': 'CheckCircle'
    };
    return icons?.[processingStep] || 'Loader2';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {!isProcessing ? (
        /* Generation Ready State */
        (<div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              canGenerate ? 'bg-primary/10' : 'bg-muted'
            }`}>
              <Icon 
                name="Presentation" 
                size={32} 
                color={canGenerate ? "var(--color-primary)" : "var(--color-muted-foreground)"} 
              />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              {canGenerate ? 'Ready to Generate' : 'Setup Required'}
            </h3>
            <p className="text-muted-foreground">
              {canGenerate 
                ? 'Your content and template are ready. Click generate to create your presentation.' :'Please provide content, upload a template, and configure your API key to continue.'
              }
            </p>
          </div>
          {canGenerate && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 text-success">
                <Icon name="CheckCircle" size={16} />
                <span className="text-sm font-medium">All requirements met</span>
              </div>
            </div>
          )}
          <Button
            variant={canGenerate ? "default" : "outline"}
            size="lg"
            onClick={onGenerate}
            disabled={!canGenerate}
            iconName="Zap"
            iconPosition="left"
            iconSize={20}
            className="w-full max-w-xs"
          >
            Generate Presentation
          </Button>
          {canGenerate && (
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Estimated processing time: 30-60 seconds</p>
              <p>• AI will create 8-15 slides based on your content</p>
              <p>• Template styling will be preserved</p>
            </div>
          )}
        </div>)
      ) : (
        /* Processing State */
        (<div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon 
                name={getStepIcon()} 
                size={32} 
                color="var(--color-primary)"
                className={processingStep === 'parsing' ? 'animate-spin' : ''}
              />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Generating Presentation
            </h3>
            <p className="text-muted-foreground">
              {getProcessingMessage()}
            </p>
          </div>
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${processingProgress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {processingProgress}% complete
            </p>
          </div>
          {/* Processing Steps */}
          <div className="space-y-2">
            <div className="grid grid-cols-5 gap-2">
              {['parsing', 'structuring', 'extracting', 'generating', 'finalizing']?.map((step, index) => (
                <div
                  key={step}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                    step === processingStep 
                      ? 'bg-primary/10 text-primary' 
                      : processingProgress > (index * 20) 
                        ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon 
                    name={
                      step === 'parsing' ? 'FileText' :
                      step === 'structuring' ? 'Brain' :
                      step === 'extracting' ? 'Palette' :
                      step === 'generating'? 'Presentation' : 'CheckCircle'
                    } 
                    size={16} 
                  />
                  <span className="text-xs font-medium capitalize">{step}</span>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            onClick={onCancel}
            iconName="X"
            iconPosition="left"
            iconSize={16}
            className="w-full max-w-xs"
          >
            Cancel Generation
          </Button>
          <div className="text-xs text-muted-foreground">
            <p>Please don't close this window while processing...</p>
          </div>
        </div>)
      )}
    </div>
  );
};

export default GenerationControls;