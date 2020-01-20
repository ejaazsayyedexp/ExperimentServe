%{
int digit=0,words=0,lines=0,charac=0,sentence=0,spc_character=0,tabs=0;
%}
%%
[0-9] {digit++;}
[a-z+A-Z] {charac++;}
"\n" {lines++;words++;}
" " {words++;}
"." {spc_character++;}
"\t" {tabs++;}
%%
void main(){
	yyin = fopen("file.txt","r");
	yylex();
	printf("Digits:%d\nCharacters:%d\nLines:%d\nWords:%d\nSpecial character:%d\nTab spaces:%d\n",digit,charac,lines,words,spc_character,tabs);
}


int yywrap(){return 1;}




/*
INPUT:

OUTPUT:
student@student-HP-Compaq-4000-Pro-SFF-PC:~/Desktop/hashHash49$ lex lex.l
student@student-HP-Compaq-4000-Pro-SFF-PC:~/Desktop/hashHash49$ gcc lex.yy.c -ll
student@student-HP-Compaq-4000-Pro-SFF-PC:~/Desktop/hashHash49$ ./a.out
Digits:7
Characters:20
Lines:2
Words:4
Special character:2
Tab spaces:0
*/
