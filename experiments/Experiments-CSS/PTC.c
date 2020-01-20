#include<stdio.h>
#include<conio.h>
#include<ctype.h>
void findCipher (int l, char txt[l], int k)
{
  
char vala = 'a', i;
  
char newtxt[l];
  
for (i = 0; i < l; i++)
{
if(islower(txt[i])){
if(txt[i]=='z'){
    newtxt[i]='a'+txt[i]+k-'z'-1;
}
else{
      
newtxt[i] = txt[i] + k ;
}
}
else{
 if(txt[i]=='Z'){
    newtxt[i]='a'+txt[i]+k-'Z'-1;
}
else{
      
newtxt[i] = txt[i] + k ;
}   
}
    
}

printf ("Cipher text: ");
for(i=0;i<l;i++){
    printf("%c",newtxt[i]);
}

}


void main ()
{
  
int j, len, key;
  
printf ("Enter length:");
  
scanf ("%d", &len);
  
printf ("Enter text and key:");
  
char text[len];
  
scanf ("%s %d", text, &key);
  
findCipher (len, text, key);

}