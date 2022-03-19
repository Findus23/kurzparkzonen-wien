#!/bin/bash

cp icon.svg iconApple.svg
inkscape iconApple.svg \
  --select=path7031   --verb=EditDelete \
  --verb=FileSave --verb=FileQuit # Delete Shadow
for size in 57 60 72 76 114 120 144 152 180 1024
do
    inkscape -f iconApple.svg -w $size -h $size -e "apple-touch-icon-${size}x${size}.png"  > /dev/null
    echo "<link rel='apple-touch-icon' sizes='${size}x${size}' href='/icon/apple-touch-icon-${size}x${size}.png'>"
done
cp apple-touch-icon-180x180.png apple-touch-icon.png
cp apple-touch-icon-180x180.png apple-touch-icon-precomposed.png

# FAVICON (PNG)
for size in 16 32 96
do
    inkscape -f icon.svg -w $size -h $size -e "favicon-${size}x${size}.png" > /dev/null
    echo "<link rel='icon' type='image/png' sizes='${size}x${size}' href='/icon/favicon-${size}x${size}.png' >"
done
#rm iconApple.svg

# CHROME
for size in 36 48 72 96 144 192 256 384 512
do
    inkscape -f icon.svg -w $size -h $size -e "android-chrome-${size}x${size}.png"  > /dev/null
done
echo "<link rel='icon' type='image/png' href='/icon/android-chrome-${size}x${size}.png' sizes='${size}x${size}'>"

convert favicon-96x96.png -define icon:auto-resize=64,48,32,16 favicon.ico
