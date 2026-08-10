document.addEventListener('DOMContentLoaded', () => {
    // End Date for Block Phase
    const END_DATE = new Date('2027-01-01T00:00:00').getTime();

    // DOM Elements
    const globalDaysEl = document.getElementById('global-days');
    const dailyTimeEl = document.getElementById('daily-time');
    const barJun = document.getElementById('bar-jun');
    const barJul = document.getElementById('bar-jul');
    const barAug = document.getElementById('bar-aug');
    const barSep = document.getElementById('bar-sep');
    const barOct = document.getElementById('bar-oct');
    const barNov = document.getElementById('bar-nov');
    const barDec = document.getElementById('bar-dec');
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

        // September logic
        if (month > 8 || year > 2026) {
            barSep.style.width = '100%';
            barSep.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.8)';
            barSep.style.background = '#00ff00';
        } else if (month === 8 && year === 2026) {
            const pct = (date / 30) * 100;
            barSep.style.width = `${pct}%`;
        } else {
            barSep.style.width = '0%';
        }

        // October logic
        if (month > 9 || year > 2026) {
            barOct.style.width = '100%';
            barOct.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.8)';
            barOct.style.background = '#00ff00';
        } else if (month === 9 && year === 2026) {
            const pct = (date / 31) * 100;
            barOct.style.width = `${pct}%`;
        } else {
            barOct.style.width = '0%';
        }

        // November logic
        if (month > 10 || year > 2026) {
            barNov.style.width = '100%';
            barNov.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.8)';
            barNov.style.background = '#00ff00';
        } else if (month === 10 && year === 2026) {
            const pct = (date / 30) * 100;
            barNov.style.width = `${pct}%`;
        } else {
            barNov.style.width = '0%';
        }

        // December logic
        if (month > 11 || year > 2026) {
            barDec.style.width = '100%';
            barDec.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.8)';
            barDec.style.background = '#00ff00';
        } else if (month === 11 && year === 2026) {
            const pct = (date / 31) * 100;
            barDec.style.width = `${pct}%`;
        } else {
            barDec.style.width = '0%';
        }
    }

    // Initialize
    updateTimer();
    setInterval(updateTimer, 1000);
});
