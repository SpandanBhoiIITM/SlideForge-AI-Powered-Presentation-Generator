import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ApiConfigurationTab = () => {
  const [selectedProvider, setSelectedProvider] = useState('openai');
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    anthropic: '',
    gemini: ''
  });
  const [connectionStatus, setConnectionStatus] = useState({
    openai: 'disconnected',
    anthropic: 'disconnected',
    gemini: 'disconnected'
  });
  const [testingConnection, setTestingConnection] = useState(null);

  const providers = [
    {
      id: 'openai',
      name: 'OpenAI',
      description: 'GPT-4 and GPT-3.5 models for content generation',
      icon: 'Brain',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'anthropic',
      name: 'Anthropic',
      description: 'Claude models for advanced reasoning and analysis',
      icon: 'Zap',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      description: 'Gemini Pro for multimodal content processing',
      icon: 'Sparkles',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ];

  const modelOptions = {
    openai: [
      { value: 'gpt-4', label: 'GPT-4' },
      { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
      { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
    ],
    anthropic: [
      { value: 'claude-3-opus', label: 'Claude 3 Opus' },
      { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
      { value: 'claude-3-haiku', label: 'Claude 3 Haiku' }
    ],
    gemini: [
      { value: 'gemini-pro', label: 'Gemini Pro' },
      { value: 'gemini-pro-vision', label: 'Gemini Pro Vision' }
    ]
  };

  const [selectedModels, setSelectedModels] = useState({
    openai: 'gpt-4',
    anthropic: 'claude-3-sonnet',
    gemini: 'gemini-pro'
  });

  const handleApiKeyChange = (provider, value) => {
    setApiKeys(prev => ({
      ...prev,
      [provider]: value
    }));
    
    // Reset connection status when key changes
    setConnectionStatus(prev => ({
      ...prev,
      [provider]: 'disconnected'
    }));
  };

  const handleTestConnection = async (provider) => {
    if (!apiKeys?.[provider]) return;
    
    setTestingConnection(provider);
    
    // Simulate API test
    setTimeout(() => {
      const isValid = apiKeys?.[provider]?.length > 20; // Simple validation
      setConnectionStatus(prev => ({
        ...prev,
        [provider]: isValid ? 'connected' : 'error'
      }));
      setTestingConnection(null);
    }, 2000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return { name: 'CheckCircle', color: 'text-green-500' };
      case 'error':
        return { name: 'XCircle', color: 'text-red-500' };
      default:
        return { name: 'Circle', color: 'text-gray-400' };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'error':
        return 'Connection Failed';
      default:
        return 'Not Connected';
    }
  };

  const maskApiKey = (key) => {
    if (!key) return '';
    if (key?.length <= 8) return '•'?.repeat(key?.length);
    return key?.substring(0, 4) + '•'?.repeat(key?.length - 8) + key?.substring(key?.length - 4);
  };

  return (
    <div className="space-y-8">
      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Security Notice</h4>
            <p className="text-sm text-blue-700 mt-1">
              API keys are stored locally in your browser only. They are never sent to our servers or logged anywhere. 
              Your credentials remain completely private and secure.
            </p>
          </div>
        </div>
      </div>
      {/* Provider Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {providers?.map((provider) => {
          const status = connectionStatus?.[provider?.id];
          const statusIcon = getStatusIcon(status);
          const isSelected = selectedProvider === provider?.id;
          
          return (
            <div
              key={provider?.id}
              className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? `${provider?.borderColor} ${provider?.bgColor}` 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => setSelectedProvider(provider?.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg ${provider?.bgColor} flex items-center justify-center`}>
                    <Icon name={provider?.icon} size={20} className={provider?.color} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{provider?.name}</h3>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name={statusIcon?.name} size={16} className={statusIcon?.color} />
                  <span className={`text-xs font-medium ${statusIcon?.color}`}>
                    {getStatusText(status)}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{provider?.description}</p>
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Selected Provider Configuration */}
      {selectedProvider && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Icon name={providers?.find(p => p?.id === selectedProvider)?.icon} size={24} className="text-primary" />
            <h3 className="text-lg font-semibold text-gray-900">
              Configure {providers?.find(p => p?.id === selectedProvider)?.name}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* API Key Input */}
            <div className="space-y-4">
              <Input
                label="API Key"
                type="password"
                placeholder="Enter your API key"
                value={apiKeys?.[selectedProvider]}
                onChange={(e) => handleApiKeyChange(selectedProvider, e?.target?.value)}
                description="Your API key will be stored securely in your browser"
                className="font-mono"
              />
              
              {apiKeys?.[selectedProvider] && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600 font-mono">
                    {maskApiKey(apiKeys?.[selectedProvider])}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTestConnection(selectedProvider)}
                    loading={testingConnection === selectedProvider}
                    iconName="Zap"
                    iconPosition="left"
                  >
                    Test Connection
                  </Button>
                </div>
              )}
            </div>

            {/* Model Selection */}
            <div className="space-y-4">
              <Select
                label="Default Model"
                options={modelOptions?.[selectedProvider] || []}
                value={selectedModels?.[selectedProvider]}
                onChange={(value) => setSelectedModels(prev => ({
                  ...prev,
                  [selectedProvider]: value
                }))}
                description="Choose the default model for content generation"
              />

              {/* Connection Status */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Connection Status</span>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getStatusIcon(connectionStatus?.[selectedProvider])?.name} 
                      size={16} 
                      className={getStatusIcon(connectionStatus?.[selectedProvider])?.color} 
                    />
                    <span className={`text-sm font-medium ${getStatusIcon(connectionStatus?.[selectedProvider])?.color}`}>
                      {getStatusText(connectionStatus?.[selectedProvider])}
                    </span>
                  </div>
                </div>
                
                {connectionStatus?.[selectedProvider] === 'connected' && (
                  <p className="text-xs text-green-600 mt-2">
                    Last tested: {new Date()?.toLocaleString()}
                  </p>
                )}
                
                {connectionStatus?.[selectedProvider] === 'error' && (
                  <p className="text-xs text-red-600 mt-2">
                    Please check your API key and try again
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-4">Advanced Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Request Timeout (seconds)"
                type="number"
                placeholder="30"
                min="10"
                max="300"
                description="Maximum time to wait for API response"
              />
              <Input
                label="Max Retries"
                type="number"
                placeholder="3"
                min="1"
                max="10"
                description="Number of retry attempts on failure"
              />
              <Input
                label="Rate Limit (requests/minute)"
                type="number"
                placeholder="60"
                min="1"
                max="1000"
                description="Maximum requests per minute"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiConfigurationTab;