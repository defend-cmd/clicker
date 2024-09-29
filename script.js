let data = localStorage.getItem('gameData') ? JSON.parse(localStorage.getItem('gameData')) : { players: {} };

if (localStorage.getItem('nickname')) {
    showGame();
} else {
    showRegistration();
}

const registerButton = document.getElementById('registerButton');
registerButton.addEventListener('click', registerPlayer);

const coin = document.getElementById('coin');
coin.addEventListener('click', clickCoin);

const toggleTopButton = document.getElementById('toggleTop');
toggleTopButton.addEventListener('click', toggleTopPlayers);

function showRegistration() {
    document.getElementById('registration').style.display = 'block';
}

function showGame() {
    document.getElementById('game').style.display = 'block';
    updateScoreboard();
    updateTopPlayers();
}

function registerPlayer() {
    const nickname = document.getElementById('nickname').value;
    if (nickname) {
        localStorage.setItem('nickname', nickname);
        data.players[nickname] = { score: 0 };
        saveGameData();
        showGame();
    }
}

function clickCoin() {
    const nickname = localStorage.getItem('nickname');
    data.players[nickname].score++;
    updateScoreboard();
    saveGameData();
}

function updateScoreboard() {
    const nickname = localStorage.getItem('nickname');
    const score = data.players[nickname].score;
    document.getElementById('score').textContent = score;
}

function updateTopPlayers() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';

    const sortedPlayers = Object.entries(data.players).sort((a, b) => b[1].score - a[1].score);

    for (let i = 0; i < 10 && i < sortedPlayers.length; i++) {
        const player = sortedPlayers[i];
        const listItem = document.createElement('li');
        listItem.textContent = `${player[0]}: ${player[1].score}`;
        playerList.appendChild(listItem);
    }
}

function toggleTopPlayers() {
    const topPlayers = document.getElementById('topPlayers');
    topPlayers.style.display = topPlayers.style.display === 'block' ? 'none' : 'block';
}

function saveGameData() {
    localStorage.setItem('gameData', JSON.stringify(data));
}
