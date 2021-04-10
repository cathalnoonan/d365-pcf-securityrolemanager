@echo off

CALL git submodule update --init --recursive
CALL yarn --cwd .\control