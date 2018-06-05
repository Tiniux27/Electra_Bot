@echo off
title Electra-Bot
color f0
:start
cls
echo Electra-Bot-Menu
echo type cmds for help!
echo made by Tiniux.
echo.
goto Electramenu

:Electramenu
set /p cmd="Electra-Bot>"

if %cmd%==start goto rl
if %cmd%==cmds goto cmds
if %cmd%==stop exit
goto start

:cmds
echo.
echo start:loads the bot!
echo cmds:this list!
echo stop:stops the bot!
echo Press anythink to continue!
pause >nul
cls

:rl
cls
nodemon bot.js
pause
