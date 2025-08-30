import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import NavigationHeader from '../../components/ui/NavigationHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ApiConfigurationTab from './components/ApiConfigurationTab';
import GenerationPreferencesTab from './components/GenerationPreferencesTab';
import AccountSettingsTab from './components/AccountSettingsTab';

const SettingsApiConfiguration = () => {
  const [activeTab, setActiveTab] = useState('api');

  const tabs = [
    {
      id: 'api',
      label: 'API Configuration',
      icon: 'Key',
      description: 'Manage LLM provider credentials and connections'
    },
    {
      id: 'preferences',
      label: 'Generation Preferences',
      icon: 'Settings',
      description: 'Configure content generation settings and defaults'
    },
    {
      id: 'account',
      label: 'Account Settings',
      icon: 'User',
      description: 'Manage profile, notifications, and privacy settings'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'api':
        return <ApiConfigurationTab />;
      case 'preferences':
        return <GenerationPreferencesTab />;
      case 'account':
        return <AccountSettingsTab />;
      default:
        return <ApiConfigurationTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Settings & API Configuration - SlideForge</title>
        <meta name="description" content="Configure API settings, generation preferences, and account settings for SlideForge presentation generator" />
      </Helmet>
      <NavigationHeader />
      <div className="pt-16">
        {/* Header Section */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Settings & Configuration</h1>
                <p className="text-muted-foreground mt-2">
                  Manage your API credentials, generation preferences, and account settings
                </p>
              </div>
              
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} className="text-green-500" />
                <span>Secure SSL Connection</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation - Desktop */}
            <div className="hidden lg:block">
              <div className="bg-white border border-border rounded-lg p-6 sticky top-24">
                <h3 className="font-semibold text-foreground mb-4">Settings</h3>
                <nav className="space-y-2">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                        activeTab === tab?.id
                          ? 'bg-primary text-white' :'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <Icon 
                        name={tab?.icon} 
                        size={18} 
                        className={activeTab === tab?.id ? 'text-white' : 'text-muted-foreground'} 
                      />
                      <div>
                        <div className="font-medium">{tab?.label}</div>
                        <div className={`text-xs mt-0.5 ${
                          activeTab === tab?.id ? 'text-white/80' : 'text-muted-foreground'
                        }`}>
                          {tab?.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Security Notice */}
                <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Icon name="Lock" size={16} className="text-green-600 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-green-900">Secure Storage</p>
                      <p className="text-xs text-green-700 mt-1">
                        All credentials are encrypted and stored locally
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Tab Navigation */}
            <div className="lg:hidden col-span-1">
              <div className="bg-white border border-border rounded-lg p-4 mb-6">
                <div className="flex space-x-1 overflow-x-auto">
                  {tabs?.map((tab) => (
                    <Button
                      key={tab?.id}
                      variant={activeTab === tab?.id ? 'default' : 'ghost'}
                      onClick={() => setActiveTab(tab?.id)}
                      className="flex-shrink-0 px-4 py-2"
                      iconName={tab?.icon}
                      iconPosition="left"
                      iconSize={16}
                    >
                      <span className="hidden sm:inline">{tab?.label}</span>
                      <span className="sm:hidden">{tab?.label?.split(' ')?.[0]}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-border rounded-lg">
                {/* Tab Header */}
                <div className="border-b border-border p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon 
                        name={tabs?.find(tab => tab?.id === activeTab)?.icon} 
                        size={20} 
                        className="text-primary" 
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">
                        {tabs?.find(tab => tab?.id === activeTab)?.label}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {tabs?.find(tab => tab?.id === activeTab)?.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                  <Icon name="Presentation" size={16} color="white" />
                </div>
                <span className="font-semibold text-foreground">SlideForge</span>
                <span className="text-muted-foreground">v1.0</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-foreground transition-colors">Support</a>
                <span>&copy; {new Date()?.getFullYear()} SlideForge. All rights reserved.</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SettingsApiConfiguration;