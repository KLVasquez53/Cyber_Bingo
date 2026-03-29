// ============================================
// BINGO CALLER WITH PLAYER BOARDS
// JavaScript Implementation
// ============================================

class PlayerBoard {
    constructor(playerId) {
        this.playerId = playerId;
        this.cards = this.generateBoard();
        this.marked = new Set();
        this.hasWon = false;
    }
    
    generateBoard() {
        // Generate a 4x4 grid with random numbers 1-54
        const board = [];
        const used = new Set();
        
        while (board.length < 16) {
            const num = Math.floor(Math.random() * 54) + 1;
            if (!used.has(num)) {
                board.push(num);
                used.add(num);
            }
        }
        return board;
    }
    
    markNumber(num) {
        if (this.cards.includes(num)) {
            this.marked.add(num);
            return true;
        }
        return false;
    }
    
    checkBingo() {
        // Check rows
        for (let row = 0; row < 4; row++) {
            let isComplete = true;
            for (let col = 0; col < 4; col++) {
                const index = row * 4 + col;
                if (!this.marked.has(this.cards[index])) {
                    isComplete = false;
                    break;
                }
            }
            if (isComplete) return true;
        }
        
        // Check columns
        for (let col = 0; col < 4; col++) {
            let isComplete = true;
            for (let row = 0; row < 4; row++) {
                const index = row * 4 + col;
                if (!this.marked.has(this.cards[index])) {
                    isComplete = false;
                    break;
                }
            }
            if (isComplete) return true;
        }
        
        // Check diagonals
        let diag1 = true;
        for (let i = 0; i < 4; i++) {
            const index = i * 4 + i;
            if (!this.marked.has(this.cards[index])) {
                diag1 = false;
                break;
            }
        }
        if (diag1) return true;
        
        let diag2 = true;
        for (let i = 0; i < 4; i++) {
            const index = i * 4 + (3 - i);
            if (!this.marked.has(this.cards[index])) {
                diag2 = false;
                break;
            }
        }
        if (diag2) return true;
        
        return false;
    }
}

class BingoCaller {
    constructor() {
        // Initialize the deck with 54 cards (1-54)
        this.playingCards = Array.from({ length: 54 }, (_, i) => i + 1);
        this.used = new Array(this.playingCards.length).fill(false);
        this.calledNumbers = [];
        this.currentNumber = null;
        this.cardsCalledCount = 0;
        this.players = new Map();
        this.nextPlayerId = 1;
        
        // DOM Elements
        this.playBtn = document.getElementById('playBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.currentNumberDisplay = document.getElementById('currentNumber');
        this.cardCountDisplay = document.getElementById('cardsCalled');
        this.gameMessage = document.getElementById('gameMessage');
        this.calledNumbersList = document.getElementById('calledNumbersList');
        this.addPlayerBtn = document.getElementById('addPlayerBtn');
        this.playerCount = document.getElementById('playerCount');
        this.playersGrid = document.getElementById('playersGrid');
        
        // Settings elements
        this.settingsButton = document.getElementById('settingsButton');
        this.settingsMenu = document.getElementById('settingsMenu');
        this.resumeButton = document.getElementById('resumeButton');
        this.restartButton = document.getElementById('restartButton');
        this.quitButton = document.getElementById('quitButton');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Play button now calls a new number each time (continuous calling)
        this.playBtn.addEventListener('click', () => this.playRound());
        this.stopBtn.addEventListener('click', () => this.stopGame());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.addPlayerBtn.addEventListener('click', () => this.addPlayer());
        
        // Settings menu
        this.settingsButton.addEventListener('click', () => {
            this.settingsMenu.classList.toggle('active');
        });
        
        this.resumeButton.addEventListener('click', () => {
            this.settingsMenu.classList.remove('active');
        });
        
        this.restartButton.addEventListener('click', () => {
            location.reload();
        });
        
        this.quitButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    
    /**
     * Get a random number from the available cards
     */
    getRandomCard() {
        if (this.cardsCalledCount >= this.playingCards.length) {
            return null;
        }
        
        let rando;
        do {
            rando = Math.floor(Math.random() * this.playingCards.length);
        } while (this.used[rando]);
        
        this.used[rando] = true;
        return this.playingCards[rando];
    }
    
    /**
     * Play one round - call the next number (called each time PLAY is pressed)
     */
    playRound() {
        if (this.cardsCalledCount >= this.playingCards.length) {
            this.gameMessage.textContent = 'All cards have been called! Thank you for playing!';
            this.playBtn.disabled = true;
            return;
        }
        
        this.gameMessage.textContent = 'Game in progress...';
        
        // Get next random number
        const newNumber = this.getRandomCard();
        
        if (newNumber !== null) {
            this.currentNumber = newNumber;
            this.cardsCalledCount++;
            this.calledNumbers.push(newNumber);
            
            // Update displays
            this.updateCurrentNumberDisplay();
            this.updateCardCountDisplay();
            this.updateCalledNumbersList();
            
            // Mark this number on all player boards
            this.markNumberOnAllBoards(newNumber);
            
            // Check for winners
            this.checkForWinners();
        }
    }
    
    /**
     * Mark a number on all player boards and update UI
     */
    markNumberOnAllBoards(num) {
        this.players.forEach((player, playerId) => {
            const marked = player.markNumber(num);
            if (marked) {
                this.updatePlayerBoardUI(playerId);
            }
        });
    }
    
    /**
     * Check if any player has won
     */
    checkForWinners() {
        this.players.forEach((player, playerId) => {
            if (!player.hasWon && player.checkBingo()) {
                player.hasWon = true;
                this.announceWinner(playerId);
            }
        });
    }
    
    /**
     * Announce a winner
     */
    announceWinner(playerId) {
        this.gameMessage.textContent = `🎉 PLAYER ${playerId} WINS! BINGO! 🎉`;
        this.gameMessage.style.color = '#ffff00';
        const boardElement = document.getElementById(`player-board-${playerId}`);
        if (boardElement) {
            boardElement.classList.add('winner');
        }
    }
    
    /**
     * Stop the game
     */
    stopGame() {
        this.gameMessage.textContent = 'Game paused. Press PLAY to continue.';
    }
    
    /**
     * Reset the game to initial state
     */
    resetGame() {
        this.playingCards = Array.from({ length: 54 }, (_, i) => i + 1);
        this.used = new Array(this.playingCards.length).fill(false);
        this.calledNumbers = [];
        this.currentNumber = null;
        this.cardsCalledCount = 0;
        this.players.clear();
        this.nextPlayerId = 1;
        
        this.playBtn.disabled = false;
        this.currentNumberDisplay.textContent = '-';
        this.cardCountDisplay.textContent = '0';
        this.gameMessage.textContent = 'Game reset! Add players to start.';
        this.gameMessage.style.color = '#ffff00';
        this.calledNumbersList.innerHTML = '';
        this.playersGrid.innerHTML = '';
        this.playerCount.textContent = 'Players: 0';
    }
    
    /**
     * Add a new player
     */
    addPlayer() {
        const playerId = this.nextPlayerId++;
        const playerBoard = new PlayerBoard(playerId);
        this.players.set(playerId, playerBoard);
        
        this.createPlayerBoardUI(playerId, playerBoard);
        this.playerCount.textContent = `Players: ${this.players.size}`;
    }
    
    /**
     * Create the UI for a player board
     */
    createPlayerBoardUI(playerId, playerBoard) {
        const boardDiv = document.createElement('div');
        boardDiv.id = `player-board-${playerId}`;
        boardDiv.className = 'player-board';
        
        const titleDiv = document.createElement('div');
        titleDiv.className = 'player-title';
        titleDiv.textContent = `Player ${playerId}`;
        boardDiv.appendChild(titleDiv);
        
        const gridDiv = document.createElement('div');
        gridDiv.className = 'player-grid';
        gridDiv.id = `grid-${playerId}`;
        
        playerBoard.cards.forEach((num, index) => {
            const cell = document.createElement('div');
            cell.className = 'player-cell';
            cell.id = `cell-${playerId}-${index}`;
            cell.textContent = num;
            cell.dataset.number = num;
            
            // Allow manual marking (optional)
            cell.addEventListener('click', () => {
                cell.classList.toggle('player-marked');
            });
            
            gridDiv.appendChild(cell);
        });
        
        boardDiv.appendChild(gridDiv);
        this.playersGrid.appendChild(boardDiv);
    }
    
    /**
     * Update a specific player board UI when a number is called
     */
    updatePlayerBoardUI(playerId) {
        const player = this.players.get(playerId);
        
        player.cards.forEach((num, index) => {
            const cell = document.getElementById(`cell-${playerId}-${index}`);
            if (cell && player.marked.has(num)) {
                cell.classList.add('player-marked');
            }
        });
    }
    
    /**
     * Update the current number display
     */
    updateCurrentNumberDisplay() {
        this.currentNumberDisplay.textContent = this.currentNumber;
        this.currentNumberDisplay.classList.add('pulse');
        setTimeout(() => {
            this.currentNumberDisplay.classList.remove('pulse');
        }, 300);
    }
    
    /**
     * Update the card count display
     */
    updateCardCountDisplay() {
        this.cardCountDisplay.textContent = this.cardsCalledCount;
    }
    
    /**
     * Update the list of called numbers
     */
    updateCalledNumbersList() {
        this.calledNumbersList.innerHTML = this.calledNumbers
            .map(num => `<span class="called-number">${num}</span>`)
            .join('');
        
        // Scroll to show the latest number
        this.calledNumbersList.scrollLeft = this.calledNumbersList.scrollWidth;
    }
}

// Initialize the bingo caller when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new BingoCaller();
});