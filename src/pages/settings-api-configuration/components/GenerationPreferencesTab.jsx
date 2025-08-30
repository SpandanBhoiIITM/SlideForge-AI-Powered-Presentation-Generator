import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const GenerationPreferencesTab = () => {
  const [preferences, setPreferences] = useState({
    defaultTone: 'professional',
    slideCountMode: 'auto',
    customSlideCount: 10,
    includeSpeakerNotes: true,
    includeTransitions: false,
    autoSaveProgress: true,
    contentParsing: 'intelligent',
    imageGeneration: true,
    chartGeneration: true
  });

  const toneOptions = [
    { value: 'professional', label: 'Professional', description: 'Formal business tone' },
    { value: 'casual', label: 'Casual', description: 'Relaxed and friendly tone' },
    { value: 'academic', label: 'Academic', description: 'Scholarly and detailed tone' },
    { value: 'creative', label: 'Creative', description: 'Engaging and innovative tone' },
    { value: 'persuasive', label: 'Persuasive', description: 'Compelling and convincing tone' }
  ];

  const slideCountOptions = [
    { value: 'auto', label: 'Auto-detect', description: 'Let AI determine optimal slide count' },
    { value: 'custom', label: 'Custom Count', description: 'Specify exact number of slides' },
    { value: 'range', label: 'Range', description: 'Set minimum and maximum slides' }
  ];

  const parsingOptions = [
    { value: 'intelligent', label: 'Intelligent Parsing', description: 'AI-powered content analysis' },
    { value: 'section', label: 'Section-based', description: 'Split by headings and sections' },
    { value: 'paragraph', label: 'Paragraph-based', description: 'One slide per paragraph' },
    { value: 'manual', label: 'Manual Markers', description: 'Use custom slide break markers' }
  ];

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const previewExamples = {
    professional: {
      title: "Market Analysis Overview",
      content: "Our comprehensive market research indicates significant growth opportunities in the emerging technology sector, with projected revenue increases of 25% year-over-year."
    },
    casual: {
      title: "Let\'s Talk Market Trends",
      content: "So here\'s what we found - the tech market is absolutely booming! We\'re looking at some pretty exciting growth numbers that\'ll blow your mind."
    },
    academic: {
      title: "Empirical Analysis of Market Dynamics",
      content: "The longitudinal study reveals statistically significant correlations between technological innovation adoption rates and market capitalization growth patterns (p &lt; 0.05)."
    }
  };

  return (
    <div className="space-y-8">
      {/* Content Generation Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Settings" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">Content Generation</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tone Settings */}
          <div className="space-y-4">
            <Select
              label="Default Tone"
              options={toneOptions}
              value={preferences?.defaultTone}
              onChange={(value) => handlePreferenceChange('defaultTone', value)}
              description="Sets the writing style for generated content"
            />

            {/* Tone Preview */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
              <div className="space-y-2">
                <h5 className="font-medium text-gray-900">
                  {previewExamples?.[preferences?.defaultTone]?.title}
                </h5>
                <p className="text-sm text-gray-600">
                  {previewExamples?.[preferences?.defaultTone]?.content}
                </p>
              </div>
            </div>
          </div>

          {/* Slide Count Settings */}
          <div className="space-y-4">
            <Select
              label="Slide Count Mode"
              options={slideCountOptions}
              value={preferences?.slideCountMode}
              onChange={(value) => handlePreferenceChange('slideCountMode', value)}
              description="How to determine the number of slides"
            />

            {preferences?.slideCountMode === 'custom' && (
              <Input
                label="Number of Slides"
                type="number"
                min="1"
                max="100"
                value={preferences?.customSlideCount}
                onChange={(e) => handlePreferenceChange('customSlideCount', parseInt(e?.target?.value))}
                description="Exact number of slides to generate"
              />
            )}

            {preferences?.slideCountMode === 'range' && (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Minimum Slides"
                  type="number"
                  min="1"
                  max="50"
                  placeholder="5"
                  description="Minimum slides"
                />
                <Input
                  label="Maximum Slides"
                  type="number"
                  min="1"
                  max="100"
                  placeholder="20"
                  description="Maximum slides"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Content Processing Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="FileText" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">Content Processing</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Select
              label="Content Parsing Method"
              options={parsingOptions}
              value={preferences?.contentParsing}
              onChange={(value) => handlePreferenceChange('contentParsing', value)}
              description="How to analyze and split your content"
            />

            <div className="space-y-3">
              <Checkbox
                label="Include Speaker Notes"
                description="Generate detailed speaker notes for each slide"
                checked={preferences?.includeSpeakerNotes}
                onChange={(e) => handlePreferenceChange('includeSpeakerNotes', e?.target?.checked)}
              />

              <Checkbox
                label="Add Slide Transitions"
                description="Include smooth transitions between slides"
                checked={preferences?.includeTransitions}
                onChange={(e) => handlePreferenceChange('includeTransitions', e?.target?.checked)}
              />

              <Checkbox
                label="Auto-save Progress"
                description="Automatically save work during generation"
                checked={preferences?.autoSaveProgress}
                onChange={(e) => handlePreferenceChange('autoSaveProgress', e?.target?.checked)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Visual Content Generation</h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Generate Images"
                description="Create relevant images for slides when needed"
                checked={preferences?.imageGeneration}
                onChange={(e) => handlePreferenceChange('imageGeneration', e?.target?.checked)}
              />

              <Checkbox
                label="Generate Charts"
                description="Create charts and graphs from data in content"
                checked={preferences?.chartGeneration}
                onChange={(e) => handlePreferenceChange('chartGeneration', e?.target?.checked)}
              />
            </div>

            {/* Processing Preview */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
                <div>
                  <h5 className="text-sm font-medium text-blue-900">Processing Preview</h5>
                  <p className="text-xs text-blue-700 mt-1">
                    With current settings, a 1000-word document will generate approximately{' '}
                    {preferences?.slideCountMode === 'auto' ? '8-12' : preferences?.customSlideCount} slides
                    {preferences?.includeSpeakerNotes ? ' with speaker notes' : ''}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Quality & Performance Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Gauge" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">Quality & Performance</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Generation Quality</h4>
            <Select
              label="Quality Level"
              options={[
                { value: 'fast', label: 'Fast', description: 'Quick generation, basic quality' },
                { value: 'balanced', label: 'Balanced', description: 'Good balance of speed and quality' },
                { value: 'high', label: 'High Quality', description: 'Best quality, slower generation' }
              ]}
              value="balanced"
              onChange={() => {}}
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">File Limits</h4>
            <Input
              label="Max File Size (MB)"
              type="number"
              value="50"
              min="1"
              max="500"
              description="Maximum template file size"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Processing Timeout</h4>
            <Input
              label="Timeout (minutes)"
              type="number"
              value="10"
              min="1"
              max="60"
              description="Maximum processing time"
            />
          </div>
        </div>
      </div>
      {/* Save Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Icon name="Save" size={16} />
          <span>Settings are automatically saved</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" iconName="RotateCcw" iconPosition="left">
            Reset to Defaults
          </Button>
          <Button variant="default" iconName="Check" iconPosition="left">
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerationPreferencesTab;