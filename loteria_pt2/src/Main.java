import jdk.nashorn.internal.ir.WhileNode;

import java.util.Scanner;


public class Main {
    public static void main (String[] args)
    {
        Scanner input = new Scanner(System.in);

int[] playingCards =
        {
        "El Gallo", "El Diablito", "La Dama", "El Catrín", "El Paraguas", 
            "La Sirena", "La Escalera", "La Botella", "El Barril", "El Árbol",
            "El Melón", "El Valiente", "El Gorrito", "La Muerte", "La Pera",
            "La Bandera", "El Bandolón", "El Violoncello", "La Garza", "El Pájaro",
            "La Mano", "La Bota", "La Luna", "El Cotorro", "El Borracho", 
            "El Negrito", "El Corazón", "La Sandía", "El Tambor", "El Camarón",
            "Las Jaras", "El Músico", "La Araña", "La Canoa", "El Pino", 
            "El Pescado", "La Palma", "La Maceta", "El Arpa", "La Rana",
            "La Serepiente", "El Venado", "La Campana", "El Cantarito", "El Sol",
            "La Corona", "La Chalupa", "El Pino", "El Pescado", "La Palma", 
            "La Maceta", "El Arpa", "La Rana"
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