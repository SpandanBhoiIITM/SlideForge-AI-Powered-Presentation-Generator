import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { testOpenAIConnection } from '../../../utils/openaiService';

const ApiConfigurationSection = ({ 
  provider, 
  onProviderChange, 
  apiKey, 
  onApiKeyChange, 
  isProcessing 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const providerOptions = [
    { 
      value: 'openai', 
      label: 'OpenAI GPT-4',
      description: 'Most reliable for presentation generation'
    },
    { 
      value: 'anthropic', 
      label: 'Anthropic Claude',
      description: 'Excellent for structured content'
    },
    { 
      value: 'gemini', 
      label: 'Google Gemini',
      description: 'Good for creative presentations'
    }
  ];

  const getProviderInfo = (providerValue) => {
    const info = {
      openai: {
        name: 'OpenAI',
        website: 'https://platform.openai.com/api-keys',
        keyFormat: 'sk-...',
        pricing: '$0.03 per 1K tokens',
        features: ['GPT-4 Turbo', 'Function calling', 'JSON mode']
      },
      anthropic: {
        name: 'Anthropic',
        website: 'https://console.anthropic.com',
        keyFormat: 'sk-ant-...',
        pricing: '$0.015 per 1K tokens',
        features: ['Claude 3', 'Long context', 'Safety focused']
      },
      gemini: {
        name: 'Google',
        website: 'https://makersuite.google.com',
        keyFormat: 'AIza...',
        pricing: 'Free tier available',
        features: ['Gemini Pro', 'Multimodal', 'Fast responses']
      }
    };
    return info?.[providerValue] || info?.openai;
  };

  const currentProviderInfo = getProviderInfo(provider);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  const handleTestConnection = async () => {
    if (!apiKey?.trim()) {
      alert('Please enter an API key first.');
      return;
    }

    // Only test OpenAI connection for now
    if (provider !== 'openai') {
      alert('Connection testing is currently only available for OpenAI. Other providers use simulated testing.');
      return;
    }

    setIsTestingConnection(true);

    try {
      const isValid = await testOpenAIConnection(apiKey);
      if (isValid) {
        alert('✅ Connection test successful! API key is valid and working.');
      } else {
        alert('❌ Connection test failed. Please check your API key and try again.');
      }
    } catch (error) {
      alert('❌ Connection test failed. Please check your API key and network connection.');
      console.error('Connection test error:', error);
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors duration-200"
        onClick={toggleExpanded}
      >
        <div className="flex items-center space-x-2">
          <Icon name="Key" size={20} color="var(--color-primary)" />
          <h3 className="font-medium text-foreground">AI Provider Configuration</h3>
          {apiKey && (
            <div className="w-2 h-2 bg-success rounded-full" title="API key configured" />
          )}
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          color="var(--color-muted-foreground)" 
        />
      </div>
      {/* Expandable Content */}
      {isExpanded && (
        <div className="border-t border-border p-4 space-y-4">
          {/* Provider Selection */}
          <Select
            label="AI Provider"
            description="Choose your preferred AI service for content processing"
            options={providerOptions}
            value={provider}
            onChange={onProviderChange}
            disabled={isProcessing}
          />

          {/* Provider Info */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">{currentProviderInfo?.name} Details</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(currentProviderInfo?.website, '_blank')}
                iconName="ExternalLink"
                iconPosition="right"
                iconSize={14}
              >
                Get API Key
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Key Format:</p>
                <p className="font-mono text-foreground">{currentProviderInfo?.keyFormat}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Pricing:</p>
                <p className="text-foreground">{currentProviderInfo?.pricing}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Features:</p>
                <p className="text-foreground">{currentProviderInfo?.features?.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* API Key Input */}
          <div className="space-y-2">
            <div className="relative">
              <Input
                label="API Key"
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => onApiKeyChange(e?.target?.value)}
                placeholder={`Enter your ${currentProviderInfo?.name} API key...`}
                description="Your API key is stored securely and never logged or persisted"
                disabled={isProcessing}
                className="pr-20"
              />
              <div className="absolute right-3 top-8 flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleApiKeyVisibility}
                  iconName={showApiKey ? "EyeOff" : "Eye"}
                  iconSize={16}
                  className="h-8 w-8"
                >
                  <span className="sr-only">
                    {showApiKey ? 'Hide' : 'Show'} API key
                  </span>
                </Button>
              </div>
            </div>

            {/* Test Connection */}
            {apiKey && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTestConnection}
                  iconName={isTestingConnection ? "Loader2" : "Zap"}
                  iconPosition="left"
                  iconSize={16}
                  disabled={isProcessing || isTestingConnection}
                  className={isTestingConnection ? "animate-spin" : ""}
                >
                  {isTestingConnection ? 'Testing...' : 'Test Connection'}
                </Button>
                <span className="text-xs text-muted-foreground">
                  {provider === 'openai' ? 'Verify your API key is working' : 'Simulated test (OpenAI only)'}
                </span>
              </div>
            )}
          </div>

          {/* Security Notice */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon name="Shield" size={16} color="var(--color-warning)" className="mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Security Notice</p>
                <p className="text-xs text-muted-foreground">
                  API keys are processed client-side only and are never stored or transmitted to our servers. 
                  Your credentials remain completely private and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiConfigurationSection;