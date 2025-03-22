import React, { useEffect, useState } from 'react';
import SimpleLoadingSpinner from './SimpleLoadingSpinner';
import ParticleLoadingAnimation from './ParticleLoadingAnimation';

const LoadingAnimation: React.FC = () => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Improved iOS detection
    const isIOSDevice = 
      /iPad|iPhone|iPod/.test(navigator.userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
      (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome') && 'ontouchend' in document);
    
    setIsIOS(isIOSDevice);
  }, []);

  // return isIOS ? <SimpleLoadingSpinner /> : <ParticleLoadingAnimation />;
  return <ParticleLoadingAnimation />;
};

export default LoadingAnimation;
