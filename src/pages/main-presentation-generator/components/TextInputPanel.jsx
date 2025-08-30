import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TextInputPanel = ({ 
  content, 
  onContentChange, 
  guidance, 
  onGuidanceChange, 
  isProcessing 
}) => {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const handleContentChange = (e) => {
    const value = e?.target?.value;
    onContentChange(value);
    
    // Update counters
    const words = value?.trim() ? value?.trim()?.split(/\s+/)?.length : 0;
    setWordCount(words);
    setCharCount(value?.length);
  };

  const handleClearContent = () => {
    onContentChange('');
    setWordCount(0);
    setCharCount(0);
  };

  const handlePasteExample = () => {
    const exampleContent = `# Product Launch Strategy

## Executive Summary
Our new AI-powered analytics platform represents a significant advancement in data processing capabilities. The platform combines machine learning algorithms with real-time data visualization to provide actionable insights for enterprise customers.

## Market Analysis
The global analytics market is projected to reach $274 billion by 2025, with AI-driven solutions capturing 35% market share. Our target segment includes Fortune 500 companies seeking advanced data processing capabilities.

## Product Features
- Real-time data processing with 99.9% uptime
- Advanced machine learning algorithms for predictive analytics
- Customizable dashboards with drag-and-drop functionality
- Enterprise-grade security with SOC 2 compliance
- API integrations with 200+ popular business tools

## Go-to-Market Strategy
Phase 1: Beta launch with 10 strategic enterprise partners
Phase 2: Limited availability to select Fortune 500 companies
Phase 3: Full market launch with comprehensive marketing campaign

## Financial Projections
Year 1: $2.5M ARR with 50 enterprise customers
Year 2: $8.2M ARR with 150 enterprise customers
Year 3: $18.5M ARR with 300+ enterprise customers

## Implementation Timeline
Q1 2024: Product development completion and beta testing
Q2 2024: Strategic partnerships and pilot programs
Q3 2024: Limited market release and customer onboarding
Q4 2024: Full market launch and scaling operations`;

    onContentChange(exampleContent);
    const words = exampleContent?.trim()?.split(/\s+/)?.length;
    setWordCount(words);
    setCharCount(exampleContent?.length);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={20} color="var(--color-primary)" />
          <h2 className="text-lg font-semibold text-foreground">Content Input</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePasteExample}
            iconName="Clipboard"
            iconPosition="left"
            iconSize={16}
            disabled={isProcessing}
          >
            Example
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearContent}
            iconName="X"
            iconPosition="left"
            iconSize={16}
            disabled={isProcessing || !content}
          >
            Clear
          </Button>
        </div>
      </div>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col space-y-4">
        {/* Text Input */}
        <div className="flex-1">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Paste your content here... Supports markdown, plain text, and structured documents. Include headings, bullet points, and detailed information that you want to convert into presentation slides."
            className="w-full h-full min-h-[300px] p-4 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
            disabled={isProcessing}
          />
        </div>

        {/* Content Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted rounded-lg p-3">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Icon name="Type" size={14} />
              <span>{wordCount} words</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Hash" size={14} />
              <span>{charCount} characters</span>
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Info" size={14} />
            <span>Recommended: 500-2000 words</span>
          </div>
        </div>

        {/* Guidance Input */}
        <div className="space-y-2">
          <Input
            label="Presentation Guidance (Optional)"
            type="text"
            value={guidance}
            onChange={(e) => onGuidanceChange(e?.target?.value)}
            placeholder="e.g., Professional tone, include speaker notes, focus on key metrics..."
            description="Provide specific instructions for tone, structure, or style preferences"
            disabled={isProcessing}
            className="mb-0"
          />
        </div>

        {/* Tips Section */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={16} color="var(--color-accent)" className="mt-0.5" />
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Content Tips:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Use headings (#, ##, ###) to structure your content</li>
                <li>• Include bullet points and numbered lists for better slide organization</li>
                <li>• Add detailed explanations - AI will summarize for slides</li>
                <li>• Include data, statistics, and key metrics when relevant</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextInputPanel;