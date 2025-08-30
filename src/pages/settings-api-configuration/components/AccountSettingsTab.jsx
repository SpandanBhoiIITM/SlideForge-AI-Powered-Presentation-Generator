import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AccountSettingsTab = () => {
  const [profile, setProfile] = useState({
    fullName: 'John Anderson',
    email: 'john.anderson@company.com',
    organization: 'TechCorp Solutions',
    role: 'Product Manager',
    timezone: 'America/New_York',
    language: 'en'
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    generationComplete: true,
    weeklyDigest: false,
    securityAlerts: true,
    maintenanceNotices: true
  });

  const [privacy, setPrivacy] = useState({
    shareUsageStats: false,
    allowAnalytics: true,
    dataRetention: '1year'
  });

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
    { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ja', label: 'Japanese' },
    { value: 'zh', label: 'Chinese' }
  ];

  const dataRetentionOptions = [
    { value: '3months', label: '3 Months', description: 'Delete data after 3 months' },
    { value: '6months', label: '6 Months', description: 'Delete data after 6 months' },
    { value: '1year', label: '1 Year', description: 'Delete data after 1 year' },
    { value: '2years', label: '2 Years', description: 'Delete data after 2 years' },
    { value: 'never', label: 'Never', description: 'Keep data indefinitely' }
  ];

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field, value) => {
    setNotifications(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePrivacyChange = (field, value) => {
    setPrivacy(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExportData = () => {
    // Simulate data export
    const exportData = {
      profile,
      preferences: notifications,
      privacy,
      exportDate: new Date()?.toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `slideforge-data-export-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const usageStats = {
    presentationsGenerated: 47,
    totalSlides: 523,
    templatesUsed: 12,
    apiCallsThisMonth: 1247,
    storageUsed: '2.3 GB',
    accountCreated: '2024-01-15'
  };

  return (
    <div className="space-y-8">
      {/* Profile Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="User" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              value={profile?.fullName}
              onChange={(e) => handleProfileChange('fullName', e?.target?.value)}
              placeholder="Enter your full name"
            />

            <Input
              label="Email Address"
              type="email"
              value={profile?.email}
              onChange={(e) => handleProfileChange('email', e?.target?.value)}
              placeholder="Enter your email"
              description="Used for notifications and account recovery"
            />

            <Input
              label="Organization"
              type="text"
              value={profile?.organization}
              onChange={(e) => handleProfileChange('organization', e?.target?.value)}
              placeholder="Enter your organization"
            />
          </div>

          <div className="space-y-4">
            <Input
              label="Role/Title"
              type="text"
              value={profile?.role}
              onChange={(e) => handleProfileChange('role', e?.target?.value)}
              placeholder="Enter your role"
            />

            <Select
              label="Timezone"
              options={timezoneOptions}
              value={profile?.timezone}
              onChange={(value) => handleProfileChange('timezone', value)}
              description="Used for scheduling and timestamps"
              searchable
            />

            <Select
              label="Language"
              options={languageOptions}
              value={profile?.language}
              onChange={(value) => handleProfileChange('language', value)}
              description="Interface and content language"
            />
          </div>
        </div>
      </div>
      {/* Notification Preferences */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Bell" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Email Notifications</h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Product Updates"
                description="New features and improvements"
                checked={notifications?.emailUpdates}
                onChange={(e) => handleNotificationChange('emailUpdates', e?.target?.checked)}
              />

              <Checkbox
                label="Generation Complete"
                description="When presentation generation finishes"
                checked={notifications?.generationComplete}
                onChange={(e) => handleNotificationChange('generationComplete', e?.target?.checked)}
              />

              <Checkbox
                label="Weekly Digest"
                description="Summary of your activity and tips"
                checked={notifications?.weeklyDigest}
                onChange={(e) => handleNotificationChange('weeklyDigest', e?.target?.checked)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">System Notifications</h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Security Alerts"
                description="Important security notifications"
                checked={notifications?.securityAlerts}
                onChange={(e) => handleNotificationChange('securityAlerts', e?.target?.checked)}
              />

              <Checkbox
                label="Maintenance Notices"
                description="Scheduled maintenance and downtime"
                checked={notifications?.maintenanceNotices}
                onChange={(e) => handleNotificationChange('maintenanceNotices', e?.target?.checked)}
              />
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-yellow-600 mt-0.5" />
                <p className="text-sm text-yellow-700">
                  Security alerts cannot be disabled for account safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Privacy & Data */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Shield" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">Privacy & Data</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Data Usage</h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Share Usage Statistics"
                description="Help improve SlideForge with anonymous usage data"
                checked={privacy?.shareUsageStats}
                onChange={(e) => handlePrivacyChange('shareUsageStats', e?.target?.checked)}
              />

              <Checkbox
                label="Allow Analytics"
                description="Enable analytics to improve user experience"
                checked={privacy?.allowAnalytics}
                onChange={(e) => handlePrivacyChange('allowAnalytics', e?.target?.checked)}
              />
            </div>

            <Select
              label="Data Retention Period"
              options={dataRetentionOptions}
              value={privacy?.dataRetention}
              onChange={(value) => handlePrivacyChange('dataRetention', value)}
              description="How long to keep your data"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Account Statistics</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{usageStats?.presentationsGenerated}</div>
                <div className="text-sm text-gray-600">Presentations</div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{usageStats?.totalSlides}</div>
                <div className="text-sm text-gray-600">Total Slides</div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{usageStats?.templatesUsed}</div>
                <div className="text-sm text-gray-600">Templates Used</div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{usageStats?.storageUsed}</div>
                <div className="text-sm text-gray-600">Storage Used</div>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                Member since: {new Date(usageStats.accountCreated)?.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Data Management */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Database" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">Data Management</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Export Data</h4>
            <p className="text-sm text-gray-600">
              Download all your account data, preferences, and generated content in JSON format.
            </p>
            
            <Button
              variant="outline"
              onClick={handleExportData}
              iconName="Download"
              iconPosition="left"
            >
              Export My Data
            </Button>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 text-red-600">Danger Zone</h4>
            <p className="text-sm text-gray-600">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            
            <Button
              variant="destructive"
              iconName="Trash2"
              iconPosition="left"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
      {/* Save Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Icon name="Clock" size={16} />
          <span>Last updated: {new Date()?.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" iconName="RotateCcw" iconPosition="left">
            Discard Changes
          </Button>
          <Button variant="default" iconName="Save" iconPosition="left">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsTab;