import React, { useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const MobileNavigationDrawer = ({ 
  isOpen, 
  onToggle, 
  navigationItems, 
  currentPath, 
  onNavigate 
}) => {
  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e?.key === 'Escape' && isOpen) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onToggle]);

  const isActivePath = (path) => {
    return currentPath === path;
  };

  const handleNavigation = (path) => {
    onNavigate(path);
  };

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onToggle();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={handleBackdropClick}
      />
      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-card border-l border-border shadow-modal animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Presentation" size={16} color="white" />
            </div>
            <span className="text-lg font-semibold text-foreground">SlideForge</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            iconName="X"
            iconSize={20}
          >
            <span className="sr-only">Close menu</span>
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="p-6">
          <div className="space-y-2">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                onClick={() => handleNavigation(item?.path)}
                className="w-full justify-start px-4 py-3 text-left transition-all duration-200"
                iconName={item?.icon}
                iconPosition="left"
                iconSize={20}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{item?.label}</span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {item?.tooltip}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-muted/30">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              SlideForge v1.0
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              AI-Powered Presentation Generator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigationDrawer;