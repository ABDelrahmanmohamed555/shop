import qrcode 
url = input ("Enter the URL : ").strip()
save = "/home/kali/Desktop/QR/qr.png"
qr = qrcode.QRCode()
qr.add_data(url)
img = qr.make_image()
img.save(save)
print ("\nQR code was made ✔️ \n")

img.show(save)