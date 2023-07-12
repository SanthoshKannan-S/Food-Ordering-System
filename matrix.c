// Online C compiler to run C program online
#include <stdio.h>
int main() {
    char arr[4][4];
    int arr1[4][4];
    int i,j;
    for(i=0;i<3;i++)
    {
        for(j=0;j<3;j++)
        {
            scanf("%c",&arr[i][j]);
        }
    }
    printf("\n\nInput matrix\n");
    for(i=0;i<3;i++)
    {
        for(j=0;j<3;j++)
        {
            arr1[i][j]=arr[i][j] - '0';
            printf("%d ",arr1[i][j]);
        }
        printf("\n");
    }
    
    int sum=0,temp=0,k=1,l=2;
    for(i=0;i<3;i++)
    {
        temp=arr1[1][k]*arr1[2][l]-arr1[2][k]*arr1[1][l];
        if(i%2==0)
        {
            sum=sum+arr1[0][i]*temp;
            k--;
        }
        else
        {
            sum=sum-arr1[0][i]*temp;
            l--;
        }
    }
    printf("Output: %d",sum);
    return 0;
}