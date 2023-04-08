from django.shortcuts import render

def cover_index(request):
    return render(request,'html/cover/cover_index.html')

def cover_finance(request):
    return render(request,'html/cover/cover_finance.html')