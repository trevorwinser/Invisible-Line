# Introduction

This project is a simple p5js program that starts with a canvas where every pixel is randomly generated to be black or white.

There is a `Line` class that places two points, `[x1,y1] [x2,y2]`, randomly on the canvas. There are two velocity vectors `v1, and v2` that have values between `[-3,3]` not including 0 that move the two points respectively.

A `Line` Object is only visible while moving because it only updates the pixels it overlaps. It is not like a regular line with a static color.

# Controls

Left Click - Adds a new line to the canvas.

Right Click - Removes the latest line from the canvas.

Space - Toggles the lines movement, making them invisible.

R - Toggles rainbow mode which just uses random RGB values instead of random black and white pixels.

# Example

Video of canvas

![](https://github.com/trevorwinser/Invisible-Line/blob/main/Demo.gif)

Static image of canvas


![](https://github.com/trevorwinser/Invisible-Line/blob/main/Demo.png)