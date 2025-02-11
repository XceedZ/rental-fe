import local from '@/utils/local-storage';

export function switchTheme(isDarkMode, theme) {
    isDarkMode.value = !isDarkMode.value;

    const themeLink = document.getElementById('theme-link');
    // const primeflexLink = document.getElementById('primeflex-link');

    if (isDarkMode.value) {
        themeLink.href = 'https://cdn.jsdelivr.net/npm/primevue/resources/themes/aura-dark-blue/theme.css';
        // primeflexLink.href = 'https://cdn.jsdelivr.net/npm/primeflex/themes/primeone-dark.css';
        local.set('theme', 'dark'); 
        theme.value = 'dark';
    } else {
        themeLink.href = 'https://cdn.jsdelivr.net/npm/primevue/resources/themes/aura-light-blue/theme.css';
        // primeflexLink.href = 'https://cdn.jsdelivr.net/npm/primeflex/themes/primeone-light.css';
        local.set('theme', 'light');
        theme.value = 'light';
    }
}

export function initializeTheme(isDarkMode, theme) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        isDarkMode.value = true;
        theme.value = 'dark';
        document.getElementById('theme-link').href =
            'https://cdn.jsdelivr.net/npm/primevue/resources/themes/aura-dark-blue/theme.css';
        // document.getElementById('primeflex-link').href =
        //     'https://cdn.jsdelivr.net/npm/primeflex/themes/primeone-dark.css';
    } else {
        isDarkMode.value = false;
        theme.value = 'light';
        document.getElementById('theme-link').href =
            'https://cdn.jsdelivr.net/npm/primevue/resources/themes/aura-light-blue/theme.css';
        // document.getElementById('primeflex-link').href =
        //     'https://cdn.jsdelivr.net/npm/primeflex/themes/primeone-light.css';
    }
}
