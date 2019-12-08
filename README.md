# generator-eagle-xb-widget

> [Yeoman](http://yeoman.io) generator for creating custom widgets for [Experience Builder](https://www.esri.com/en-us/arcgis/products/arcgis-experience-builder/overview).

## About

This generator scaffolds out the boilerplate files that are needed when you are creating custom Experience Builder widgets. This includes [generators](#running-the-generators) to scaffold out the files needed to create custom, layout, theme or stand alone widgets.

**Please note, this is a work in progress as Experience Builder is still in development.**

![Screenshot](https://github.com/carg563/generator-eagle-xb-widget/blob/master/Capture.PNG)

## Getting Started

### Installation

The first prerequisite is to have [Yeoman](http://yeoman.io/) installed:

```bash
$ npm install -g yo
```

Then install generator-eagle-xb-widget from npm:

```bash
$ npm install -g generator-eagle-xb-widget
```

### Running the Generators

Scaffolds out the files needed to create a new custom widget.

1. Run the generator with `yo eagle-xb-widget`
3. Answer the man's questions!

|Prompt|Description|Default|
|------|-----------|-------|
|Widget Type|The type of widget to create|No default|
|Widget Name|Folder name for output files and widget identifier|my-xb-widget|
|Widget Title|The label for the widget|my-xb-widget|
|Description|What does this widget do? (optional)|A custom experience builder widget|
|Author|The name of the person or company developing the widget| |
|Features|Various options based on the widget type| |

Taking the default values for the prompts will generate the following output under the `your-extensions\widgets` folder in the <root install>\client\folder.

```
my-xb-widget
│   config.json
│   manifest.json
|   icon.svg
│---src
|     |  config.tsx
|     |--runtime
|           |  widget.tsx
|           |--translations
|               |   default.ts
|     |--setting
|           |  setting.tsx
|           |--translations
|               |   default.ts
|     |--tests
|           |  widget.test.tsx

```

When you start Experience Builder you should see the widget in the widget panel:

![Widget in the Builder](https://github.com/carg563/generator-eagle-xb-widget/blob/master/xb.PNG)

### Issues
Find a bug or want to request a new feature? Please let us know by submitting an issue.

### Contributing
I welcome contributions from anyone and everyone. 

### Credit
This generator was inspired by the https://github.com/Esri/generator-esri-appbuilder-js by @tomwayson and others

### Licensing
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

A copy of the license is available in the repository's license.txt file.
