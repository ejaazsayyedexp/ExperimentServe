
%{
#include<stdlib.h>
#include<string.h>
#define MAX 1000000
#include <malloc.h>


	typedef struct node{
		char *s[MAX];
	struct	node * next;
		int count;
	
	} node ;

	typedef struct head{

		node * start;
	
	}head;
head x;
	
	int coutn = 0,common = 0;
//char string[100][100];
%}



%%
[a-zA-Z][a-zA-Z0-9]* {
printf("Identifier:");
puts(yytext);
printf("\n");
  insert(&x,yytext);
  
//string[coutn] = (char*) yytext;
//printf("Identifier found:%c\n",string[coutn]);
coutn++;common++;
};
[\{\}\+\=;,<>#\.&"\\\(\)%:] {
printf("Special Symbol:\'%s\'\n",yytext);
common++;
}
%%


void insert(head *t,char ** ele){
	node *p=(node *)malloc(sizeof(node));
	p->s=ele;
	
	node *q;
	q=t->start;
	int flag=0;
	while (q!=NULL){
		if(strcmp(q->s,ele)==0){q->count++;flag=1;break;}
		
	}
	
	if(flag==0){
		q->next=p;
		p->next=NULL;
		
	}
	
	
	printf("\nI am insert\n");
	

}

void display(head *t){
	node *p=t->start;
	while(p!=NULL){
		puts(p->s);
		printf("%d\n",p->count);
		
		p=p->next;
		
	}
	

}

void main()
{  
	
	x.start=NULL;
	 	
 	yyin=fopen("op.c","r");
 	yylex();
 	display(&x);
 	
}
 
int yywrap(){
return 1;
}
 
 

