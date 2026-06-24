Add-Type -AssemblyName System.Drawing
$image = [System.Drawing.Image]::FromFile("C:\Users\Jay Ashapura Maa\OneDrive\Desktop\VL\public\assets\logo.png")
$newWidth = 80
$newHeight = 80
$bitmap = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.DrawImage($image, 0, 0, $newWidth, $newHeight)
$bitmap.Save("C:\Users\Jay Ashapura Maa\OneDrive\Desktop\VL\public\assets\logo-small.png", [System.Drawing.Imaging.ImageFormat]::Png)
$image.Dispose()
$bitmap.Dispose()
$graphics.Dispose()
