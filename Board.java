public class Board {
    public static void main(String[] args) {
        // Define the size of the board (4x4, so 16 spaces)
        int boardSize = 4;
        
        // Create a 2D array to represent the board
        int[][] board = new int[boardSize][boardSize];
        
        // Initialize the board with numbers from 1 to 16
        int number = 1;
        for (int i = 0; i < boardSize; i++) {
            for (int j = 0; j < boardSize; j++) {
                board[i][j] = number++;
            }
        }
        
        // Display the board
        printBoard(board);
    }
    
    // Method to print the board
    public static void printBoard(int[][] board) {
        int size = board.length;
        
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                System.out.print("|" + board[i][j] + "|");
            }
            System.out.println();
            System.out.println("-".repeat(size * 4));  // Adds a separator line
        }
    }
}
