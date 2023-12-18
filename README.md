## Difference generator
This CLI utility is designed to compare JSON or YAML documents. It provides a comprehensive analysis of the differences between the files, taking into account their hierarchical structure.

Using this utility, users can get comparison results in a variety of formats, including TXT, JSON, and my own stylized format called "stylish". All options output the difference to the console, so if you want to save the result you can use the utility in pipeline with touch. The stylish format, inspired by JSON.stringify, presents differences with a minimum number of characters and consistent indentation, resulting in visually pleasing output in the console. This format was my default.

Using this utility, users can easily identify and understand changes made to JSON or YAML documents and gain insight into the complex tree structure of the data. It facilitates efficient change management and tracking, improving the overall handling of JSON or YAML files.

## How to install:
Please do clone this repository and install Dependencies. You could as well use the command below:
```bash
make install
```
## Guideline:
```bash
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           output usage information
```

## Hexlet tests and linter status:
[![Actions Status](https://github.com/Dastorin/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Dastorin/backend-project-lvl2/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/003d5367bf92c17aa54e/maintainability)](https://codeclimate.com/github/Dastorin/backend-project-lvl2/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/003d5367bf92c17aa54e/test_coverage)](https://codeclimate.com/github/Dastorin/backend-project-lvl2/test_coverage) [![Project-lvl2](https://github.com/Dastorin/backend-project-lvl2/actions/workflows/project2.yml/badge.svg)](https://github.com/Dastorin/backend-project-lvl2/actions/workflows/project2.yml)

## Example:
[![asciicast](https://asciinema.org/a/CrIUqKraLAw7PFf6ADYjoLlHL.svg)](https://asciinema.org/a/CrIUqKraLAw7PFf6ADYjoLlHL)

[![asciicast](https://asciinema.org/a/vRuGkL7G8LnrVnV8bJLVQXFju.svg)](https://asciinema.org/a/vRuGkL7G8LnrVnV8bJLVQXFju)

[![asciicast](https://asciinema.org/a/Py1q5mqtxMqTPRfs76O5o9ViF.svg)](https://asciinema.org/a/Py1q5mqtxMqTPRfs76O5o9ViF)

[![asciicast](https://asciinema.org/a/Wnd1yXffIhXKB6H6xRMgeQsg3.svg)](https://asciinema.org/a/Wnd1yXffIhXKB6H6xRMgeQsg3)

[![asciicast](https://asciinema.org/a/GvGpETl0gMMwaDPNDTZeVXuqh.svg)](https://asciinema.org/a/GvGpETl0gMMwaDPNDTZeVXuqh)
