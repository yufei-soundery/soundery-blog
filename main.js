document.addEventListener('DOMContentLoaded', function() {
    // 加载声音数据
    fetch('data/sounds.json')
        .then(response => response.json())
        .then(data => {
            displaySounds(data.featured, document.querySelector('#featured .sound-grid'));
            // 加载其他分类的声音
        })
        .catch(error => console.error('Error loading sounds:', error));
});

function displaySounds(sounds, container) {
    sounds.forEach(sound => {
        const soundCard = document.createElement('div');
        soundCard.className = 'sound-card';
        
        soundCard.innerHTML = `
            <div class="sound-image">
                <img src="${sound.image}" alt="${sound.title}">
                <button class="play-btn" data-audio="${sound.audioFile}">播放</button>
            </div>
            <div class="sound-info">
                <h3>${sound.title}</h3>
                <p>${sound.description}</p>
                <span class="category">${sound.category}</span>
            </div>
        `;
        
        container.appendChild(soundCard);
        
        // 添加播放功能
        const playBtn = soundCard.querySelector('.play-btn');
        playBtn.addEventListener('click', function() {
            const audioFile = this.getAttribute('data-audio');
            playAudio(audioFile, this);
        });
    });
}

function playAudio(audioFile, button) {
    // 停止当前正在播放的音频
    const currentlyPlaying = document.querySelector('.play-btn.playing');
    if (currentlyPlaying) {
        currentlyPlaying.classList.remove('playing');
        currentlyPlaying.textContent = '播放';
        window.currentAudio.pause();
    }
    
    // 播放新音频
    if (!window.currentAudio || window.currentAudio.src !== audioFile) {
        window.currentAudio = new Audio(audioFile);
    }
    
    if (button.classList.contains('playing')) {
        window.currentAudio.pause();
        button.classList.remove('playing');
        button.textContent = '播放';
    } else {
        window.currentAudio.play();
        button.classList.add('playing');
        button.textContent = '暂停';
    }
}
