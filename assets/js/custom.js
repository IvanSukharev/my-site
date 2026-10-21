document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Copy Email to Clipboard
       ========================================================================== */
    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.textContent = 'Email copied!'; // Changed to English for consistency
    document.body.appendChild(toast);

    const copyEmailElements = document.querySelectorAll('.copy-email');
    
    const showToast = () => {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 1800);
    };

    const fallbackCopy = (text) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showToast();
        } catch (err) {
            console.error('Copy failed: ', err);
        }
        document.body.removeChild(textArea);
    };

    copyEmailElements.forEach(el => {
        el.addEventListener('click', function() {
            const email = this.getAttribute('data-email');
            
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(email)
                    .then(showToast)
                    .catch(err => {
                        console.error('Clipboard API error: ', err);
                        fallbackCopy(email);
                    });
            } else {
                fallbackCopy(email);
            }
        });
    });

    /* ==========================================================================
       2. Lazy Load YouTube Videos
       ========================================================================== */
    const videoPreviews = document.querySelectorAll('.video-preview');
    
    videoPreviews.forEach(preview => {
        preview.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            const iframe = document.createElement('iframe');
            
            iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
            iframe.setAttribute('title', 'YouTube video player');
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
            iframe.setAttribute('allowfullscreen', '');
            
            // Apply required styles to iframe
            Object.assign(iframe.style, {
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                border: '0'
            });

            this.innerHTML = ''; 
            this.appendChild(iframe);
        });
    });

});