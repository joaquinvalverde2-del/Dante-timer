document.addEventListener('DOMContentLoaded', () => {
    // End Date for Summer Block Phase 3
    const END_DATE = new Date('2026-09-01T00:00:00').getTime();

    // DOM Elements
    const globalDaysEl = document.getElementById('global-days');
    const dailyTimeEl = document.getElementById('daily-time');
    const barJun = document.getElementById('bar-jun');
    const barJul = document.getElementById('bar-jul');
    const barAug = document.getElementById('bar-aug');
    const flashOverlay = document.getElementById('flash-overlay');

    let lastDay = new Date().getDate();

    function updateTimer() {
        const now = new Date();
        const nowTime = now.getTime();
        
        // --- 1. Global Countdown (Days Left) ---
        const diffGlobal = END_DATE - nowTime;
        if (diffGlobal <= 0) {
            globalDaysEl.textContent = "0";
            dailyTimeEl.textContent = "00:00:00";
            globalDaysEl.style.color = "#00ff00"; // Green when done
            updateBars(now);
            return;
        }

        // Calculate days left, Math.ceil to treat any remaining hours as a full "day" to discount
        const daysLeft = Math.ceil(diffGlobal / (1000 * 60 * 60 * 24));
        globalDaysEl.textContent = daysLeft.toString();

        // --- 2. Daily Survival Countdown (To Midnight) ---
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0).getTime();
        const diffDaily = midnight - nowTime;

        const hours = Math.floor((diffDaily % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffDaily % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffDaily % (1000 * 60)) / 1000);

        // Format to HH:MM:SS
        const hh = hours.toString().padStart(2, '0');
        const mm = minutes.toString().padStart(2, '0');
        const ss = seconds.toString().padStart(2, '0');
        
        dailyTimeEl.textContent = `${hh}:${mm}:${ss}`;

        // --- 3. Midnight Flash Effect ---
        if (now.getDate() !== lastDay) {
            triggerFlash();
            lastDay = now.getDate();
        }

        // --- 4. Update Bars ---
        updateBars(now);
    }

    function triggerFlash() {
        flashOverlay.classList.add('flash-active');
        setTimeout(() => {
            flashOverlay.classList.remove('flash-active');
        }, 100);
    }

    function updateBars(now) {
        const year = now.getFullYear();
        const month = now.getMonth(); // 0-indexed: 5=Jun, 6=Jul, 7=Aug
        const date = now.getDate();

        // June logic
        if (month > 5 || year > 2026) {
            barJun.style.width = '100%';
            barJun.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.8)';
            barJun.style.background = '#00ff00';
        } else if (month === 5 && year === 2026) {
            const pct = (date / 30) * 100;
            barJun.style.width = `${pct}%`;
        } else {
            barJun.style.width = '0%';
        }

        // July logic
        if (month > 6 || year > 2026) {
            barJul.style.width = '100%';
            barJul.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.8)';
            barJul.style.background = '#00ff00';
        } else if (month === 6 && year === 2026) {
            const pct = (date / 31) * 100;
            barJul.style.width = `${pct}%`;
        } else {
            barJul.style.width = '0%';
        }

        // August logic
        if (month > 7 || year > 2026) {
            barAug.style.width = '100%';
            barAug.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.8)';
            barAug.style.background = '#00ff00';
        } else if (month === 7 && year === 2026) {
            const pct = (date / 31) * 100;
            barAug.style.width = `${pct}%`;
        } else {
            barAug.style.width = '0%';
        }
    }

    // Initialize
    updateTimer();
    setInterval(updateTimer, 1000);
});
