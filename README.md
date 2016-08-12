# Tessel GPIO Controller
[![Build Status](https://travis-ci.org/bp323/tessel-gpio-controller.svg?branch=master)](https://travis-ci.org/bp323/tessel-gpio-controller) [![Coverage Status](https://coveralls.io/repos/github/bp323/tessel-gpio-controller/badge.svg?branch=master)](https://coveralls.io/github/bp323/tessel-gpio-controller?branch=master)
## What
A small Tessel test project with at its core GPIO input.

For now, it's just spitting out some logs. Eventually the input should be used for something, not quite there yet.

## Why
Why not?

## Setting it up
You'll need a few basic buttons and a Tessel 2. Not avocating going around town stealing neighbour's door bells, but those would work fine.

You'll need to map the port and pin you are connecting your buttons to by adjusting the `config.json` file. The amount of buttons you can hook up is limited by the Tessel's GPIO pins.


```
t2 run app.js --lan
```

or when you want to persist to the Tessel:
```
t2 push app.js --lan
```