import jdk.nashorn.internal.ir.WhileNode;

import java.util.Scanner;


public class Main {
    public static void main (String[] args)
    {
        Scanner input = new Scanner(System.in);

int[] playingCards =
        {
        1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54
};

boolean [] used =new boolean[playingCards.length];
int index =0;
int stopOrGo =1;
int rando;
        System.out.println("Thank you For joining us in Loteria");
        System.out.println("Please press 1 to play or press 2 to quit");
       stopOrGo = input.nextInt();

       while (stopOrGo == 1 && index < playingCards.length) {

           System.out.println("Please press 1 to play or press 2 to quit");
           stopOrGo = input.nextInt();


           if (stopOrGo == 1) {

               index++;
               //rando= (int)(Math.random() * 54) + 1;
               //System.out.println("The card is " + rando);
               System.out.println("The number is " + playingCards);

           }


               else if (stopOrGo == 2) {
               System.out.println("Thank you for playing");

           } else {
               System.out.println("Please press 1 or 2");
           }
       }
       if (index ==playingCards.length){
           System.out.println("All cards have been called. Thank you for playing");
       }


        //need random 54









    }
}