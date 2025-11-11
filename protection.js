// Source Code Protection Script
// Note: This provides deterrence, not absolute protection

(function() {
    'use strict';
    
    // Disable right-click
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
        if (e.keyCode === 123 || 
            (e.ctrlKey && e.shiftKey && e.keyCode === 73) || 
            (e.ctrlKey && e.shiftKey && e.keyCode === 74) || 
            (e.ctrlKey && e.shiftKey && e.keyCode === 67) || 
            (e.ctrlKey && e.keyCode === 85) ||
            (e.metaKey && e.altKey && e.keyCode === 73) || // Mac
            (e.metaKey && e.altKey && e.keyCode === 74) || // Mac
            (e.metaKey && e.keyCode === 85)) { // Mac
            e.preventDefault();
            return false;
        }
    });
    
    // Detect DevTools
    const devtoolsDetector = {
        isOpen: false,
        orientation: null
    };
    
    const threshold = 160;
    
    const detectDevTools = function() {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            if (!devtoolsDetector.isOpen) {
                devtoolsDetector.isOpen = true;
                document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#0a0a0a;color:#ffd700;font-family:Arial;font-size:24px;text-align:center;">⚠️ Developer Tools Detected<br><br>Please close developer tools to continue.</div>';
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } else {
            devtoolsDetector.isOpen = false;
        }
    };
    
    // Check for devtools every 500ms
    setInterval(detectDevTools, 500);
    
    // Disable text selection
    document.onselectstart = function() {
        return false;
    };
    
    // Disable copy
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable cut
    document.addEventListener('cut', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable drag
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Clear console periodically
    setInterval(function() {
        console.clear();
        console.log('%c⚠️ WARNING', 'color: #ffd700; font-size: 40px; font-weight: bold;');
        console.log('%cAccessing the console is disabled on this website.', 'color: #ff4444; font-size: 16px;');
        console.log('%cIf you see this, developer tools are being monitored.', 'color: #ff4444; font-size: 14px;');
    }, 1000);
    
    // Disable printing (Ctrl+P)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.keyCode === 80) {
            e.preventDefault();
            return false;
        }
    });
    
    // Debug detection - alternative method
    let devtools = {open: false};
    let checkStatus;
    
    const element = new Image();
    Object.defineProperty(element, 'id', {
        get: function() {
            devtools.open = true;
            throw new Error('DevTools detected');
        }
    });
    
    checkStatus = setInterval(function() {
        console.dir(element);
        if (devtools.open) {
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#0a0a0a;color:#ffd700;font-family:Arial;font-size:24px;text-align:center;">⚠️ Developer Tools Detected<br><br>Please close developer tools to continue.</div>';
            clearInterval(checkStatus);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
        devtools.open = false;
    }, 1000);
    
})();
