// ============================================
// LOTERIA CALLER WITH PLAYER BOARDS
// JavaScript Implementation
// ============================================

const LOTERIA_DECK = [
    { id: 1, name: 'El Gallo' },
    { id: 2, name: 'El Diablito' },
    { id: 3, name: 'La Dama' },
    { id: 4, name: 'El Catrin' },
    { id: 5, name: 'El Paraguas' },
    { id: 6, name: 'La Sirena' },
    { id: 7, name: 'La Escalera' },
    { id: 8, name: 'La Botella' },
    { id: 9, name: 'El Barril' },
    { id: 10, name: 'El Arbol' },
    { id: 11, name: 'El Melon' },
    { id: 12, name: 'El Valiente' },
    { id: 13, name: 'El Gorrito' },
    { id: 14, name: 'La Muerte' },
    { id: 15, name: 'La Pera' },
    { id: 16, name: 'La Bandera' },
    { id: 17, name: 'El Bandolon' },
    { id: 18, name: 'El Violoncello' },
    { id: 19, name: 'La Garza' },
    { id: 20, name: 'El Pajaro' },
    { id: 21, name: 'La Mano' },
    { id: 22, name: 'La Bota' },
    { id: 23, name: 'La Luna' },
    { id: 24, name: 'El Cotorro' },
    { id: 25, name: 'El Borracho' },
    { id: 26, name: 'El Negrito' },
    { id: 27, name: 'El Corazon' },
    { id: 28, name: 'La Sandia' },
    { id: 29, name: 'El Tambor' },
    { id: 30, name: 'El Camaron' },
    { id: 31, name: 'Las Jaras' },
    { id: 32, name: 'El Musico' },
    { id: 33, name: 'La Arana' },
    { id: 34, name: 'El Soldado' },
    { id: 35, name: 'La Estrella' },
    { id: 36, name: 'El Cazo' },
    { id: 37, name: 'El Mundo' },
    { id: 38, name: 'El Apache' },
    { id: 39, name: 'El Nopal' },
    { id: 40, name: 'El Alacran' },
    { id: 41, name: 'La Rosa' },
    { id: 42, name: 'La Calavera' },
    { id: 43, name: 'La Campana' },
    { id: 44, name: 'El Cantarito' },
    { id: 45, name: 'El Venado' },
    { id: 46, name: 'El Sol' },
    { id: 47, name: 'La Corona' },
    { id: 48, name: 'La Chalupa' },
    { id: 49, name: 'El Pino' },
    { id: 50, name: 'El Pescado' },
    { id: 51, name: 'La Palma' },
    { id: 52, name: 'La Maceta' },
    { id: 53, name: 'El Arpa' },
    { id: 54, name: 'La Rana' }
];

class PlayerBoard {
    constructor(playerId, deck) {
        this.playerId = playerId;
        this.deck = deck;
        this.cards = this.generateBoard();
        this.marked = new Set();
        this.hasWon = false;
    }
    
    generateBoard() {
        // Generate a 4x4 grid with random Loteria cards.
        const board = [];
        const usedCardIds = new Set();
        
        while (board.length < 16) {
            const randomIndex = Math.floor(Math.random() * this.deck.length);
            const card = this.deck[randomIndex];
            if (!usedCardIds.has(card.id)) {
                board.push(card.id);
                usedCardIds.add(card.id);
            }
        }
        return board;
    }
    
    markCard(cardId) {
        if (this.cards.includes(cardId)) {
            this.marked.add(cardId);
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
        // Initialize the deck with 54 Loteria cards.
        this.playingCards = [...LOTERIA_DECK];
        this.used = new Array(this.playingCards.length).fill(false);
        this.calledCards = [];
        this.currentCard = null;
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
        // Play button calls a new Loteria card each press.
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
     * Get a random card from the available deck.
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
     * Play one round - call the next card each time PLAY is pressed.
     */
    playRound() {
        if (this.cardsCalledCount >= this.playingCards.length) {
            this.gameMessage.textContent = 'All cards have been called! Thank you for playing!';
            this.playBtn.disabled = true;
            return;
        }
        
        this.gameMessage.textContent = 'Game in progress...';
        
        // Get next random card.
        const newCard = this.getRandomCard();
        
        if (newCard !== null) {
            this.currentCard = newCard;
            this.cardsCalledCount++;
            this.calledCards.push(newCard);
            
            // Update displays
            this.updateCurrentNumberDisplay();
            this.updateCardCountDisplay();
            this.updateCalledNumbersList();
            
            // Mark this card on all player boards.
            this.markCardOnAllBoards(newCard.id);
            
            // Check for winners
            this.checkForWinners();
        }
    }
    
    /**
     * Mark a card on all player boards and update UI.
     */
    markCardOnAllBoards(cardId) {
        this.players.forEach((player, playerId) => {
            const marked = player.markCard(cardId);
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
        this.playingCards = [...LOTERIA_DECK];
        this.used = new Array(this.playingCards.length).fill(false);
        this.calledCards = [];
        this.currentCard = null;
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
        const playerBoard = new PlayerBoard(playerId, this.playingCards);
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
        
        playerBoard.cards.forEach((cardId, index) => {
            const card = this.getCardById(cardId);
            const cell = document.createElement('div');
            cell.className = 'player-cell';
            cell.id = `cell-${playerId}-${index}`;
            cell.innerHTML = `<span class="player-card-name">${card.name}</span>`;
            cell.dataset.cardId = String(cardId);
            
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
        
        player.cards.forEach((cardId, index) => {
            const cell = document.getElementById(`cell-${playerId}-${index}`);
            if (cell && player.marked.has(cardId)) {
                cell.classList.add('player-marked');
            }
        });
    }
    
    /**
     * Update the current number display
     */
    updateCurrentNumberDisplay() {
        this.currentNumberDisplay.textContent = this.currentCard ? this.currentCard.name : '-';
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
        this.calledNumbersList.innerHTML = this.calledCards
            .map(card => `<span class="called-number">${card.name}</span>`)
            .join('');
        
        // Scroll to show the latest number
        this.calledNumbersList.scrollLeft = this.calledNumbersList.scrollWidth;
    }

    getCardById(cardId) {
        return this.playingCards.find((card) => card.id === cardId);
    }
}

// Initialize the bingo caller when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new BingoCaller();
});