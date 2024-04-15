/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

// cookies.js
document.addEventListener('DOMContentLoaded', function() {
    const acceptButton = document.getElementById('accept-cookies');
    const rejectButton = document.getElementById('reject-cookies');
    
    acceptButton.addEventListener('click', function() {
        updateCookiePreferences(true);
    });

    rejectButton.addEventListener('click', function() {
        updateCookiePreferences(false);
    });

    function updateCookiePreferences(accepted) {
        const csrftoken = getCookie('csrftoken');

        fetch(window.location.href, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({ accepted: accepted }),
            credentials: 'same-origin',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Rediriger ou masquer la bannière de cookies
                window.location.reload(); // Recharger la page
            } else {
                console.error('Erreur lors de la mise à jour des préférences de cookies');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la mise à jour des préférences de cookies:', error);
        });
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
