import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import MobileNavigationDrawer from './MobileNavigationDrawer';

const NavigationHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Generate',
      path: '/main-presentation-generator',
      icon: 'Presentation',
      tooltip: 'Create presentations from text'
    },
    {
      label: 'Templates',
      path: '/template-library-management',
      icon: 'Library',
      tooltip: 'Manage presentation templates'
    },
    {
      label: 'Settings',
      path: '/settings-api-configuration',
      icon: 'Settings',
      tooltip: 'Configure API and preferences'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Presentation" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">SlideForge</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                onClick={() => handleNavigation(item?.path)}
                className="px-4 py-2 transition-all duration-200"
                iconName={item?.icon}
                iconPosition="left"
                iconSize={18}
              >
                {item?.label}
              </Button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              iconName="Menu"
              iconSize={20}
            >
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </header>
      {/* Mobile Navigation Drawer */}
      <MobileNavigationDrawer
        isOpen={isMobileMenuOpen}
        onToggle={toggleMobileMenu}
        navigationItems={navigationItems}
        currentPath={location?.pathname}
        onNavigate={handleNavigation}
      />
    </>
  );
};

export default NavigationHeader;