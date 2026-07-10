import arabic_reshaper 
from bidi.algorithm import get_display 
from colorama import init , Fore

init ()

def ar(text) :
    return get_display(arabic_reshaper.reshape(text))






name = input ("Enterr the name of the product : ")
price = input (Fore.RED + ar("ادخل السعر الخاص بالمنتج \n : \n")+Fore.RESET) 
image = input (Fore.RED + ar("\n : ادخل مسار الصورة الخاص بالمنتج  \n") + Fore.RESET)




card = f"""
<div class = "card" >
   <img src = "{image}">
   <h2>{name}<h2>
   <p> the price : {price}<p>

</div>
<!--add_here-->
"""
with open("index.html","r",encoding= "utf-8") as file :
    html = file.read()
html = html.replace("<!--add_here-->", card)

with open("index.html","w",encoding= "utf-8") as file :
    file.write(html)
  
print ("done ✔️")
