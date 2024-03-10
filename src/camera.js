import React, { useEffect, useRef } from 'react';

const CameraComponent = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const requestCameraAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    requestCameraAccess();
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      <video ref={videoRef} autoPlay playsInline muted controls={false} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default CameraComponent;
