@echo off

CALL git submodule update --init --recursive
CALL npm --prefix .\control ci