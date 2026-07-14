import re

file_name = input ("the file path : ")

section = input("scetion name : ")

name = input("product name :")
price = input("price : ")
image = input("photo path : ")

with open(file_name, "r", encoding="utf-8") as f:
    data = f.read()

product = f"""
        {{
            name: "{name}",
            price: "{price}",
            image: "{image}"
        }},
"""

pattern = rf"({section}\s*:\s*\[)"

data = re.sub(pattern, r"\1" + product, data)

with open(file_name, "w", encoding="utf-8") as f:
    f.write(data)

print("تمت الإضافة")