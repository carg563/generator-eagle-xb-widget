'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const dasherize = require('underscore.string/dasherize');
const utils = require('./utils');

const fs = require("fs")

module.exports = class extends Generator {

    prompting() {
        var done = this.async();

        console.log(chalk.green('Welcome to the ArcGIS Experience Builder widget generator!'));

        var prompts = [{
            name: "widgetPath",
            message: "Specify the root directory of Experience Builder: ",
            when: function (response) {
                return !fs.existsSync("./.yo-rc.json")
            },
            validate(answer) {
                if (!fs.existsSync(answer + "client\\your-extensions\\widgets")) {
                    return 'Invalid path. Please ensure this is a valid path to your Experience Builder folder.';
                } else {
                    return true;
                }
            }
        }, {
            type: 'list',
            choices: [
                {
                    value: 'LAYOUT',
                    name: 'Layout'
                },
                {
                    value: 'CONTROLLER',
                    name: 'Controller'
                },
                {
                    value: 'WIDGET',
                    name: 'Widget'
                }
            ],
            name: 'widgetType',
            message: 'Type of widget to be generated:',
            when: function (response) {
                // only show if we dont have a config to work from'
                return !fs.existsSync("./.yo-rc.json")
            }
        },
        {
            name: 'widgetName',
            message: 'Widget Name:',
            'default': 'my-xb-widget',
            // test for valid folder name
            validate: function (answer) {
                var validFolderNameRegExp = /^[^\\/?%*"":|<>\.\s]+$/;
                return validFolderNameRegExp.test(answer);
            }
        }, {
            name: 'widgetTitle',
            message: 'Widget Title:',
            // default to widget name split on caplital letters
            // Ex: MyWidget => My Widget
            'default': function (answers) {
                var title;
                if (answers && answers.widgetName && answers.widgetName.match) {
                    title = answers.widgetName.match(/([A-Z]?[^A-Z]*)/g).slice(0, -1).join(' ');
                } else {
                    title = 'XB Widget';
                }
                return title;
            }
        }, {
            name: 'description',
            message: 'Description:',
            'default': 'A custom Experience Builder widget.'
        },
        {
            when: function (response) {
                // only show this step if user answered TRUE to 'hasConfig'
                return response.widgetType === "LAYOUT";
            },
            type: 'checkbox',
            message: 'Which features would you like to include?',
            name: 'features',
            choices: [
                {
                    value: 'hasLocale',
                    name: 'Locale (i18n) file'
                },
                {
                    value: 'hasSettingPage',
                    name: 'Has a settings page'
                },
                {
                    value: 'hasConfig',
                    name: 'Has a configuration file'
                },
                {
                    value: 'hasBuilderSupportModule',
                    name: 'Include builder support modules'
                },
                {
                    value: 'hasLayoutItemSettingPage',
                    name: 'Has layout settings page'
                },
                {
                    value: 'includeExtensions',
                    name: 'Include extensions'
                },
                {
                    value: 'defaultSize',
                    name: 'Default Size'
                }
            ],
            'default': ['hasLocale', 'hasSettingsPage', 'hasConfig', 'hasBuilderSupportModule', 'hasLayoutItemSettingPage', 'includeExtensions', 'defaultSize']
        },
        {
            when: function (response) {
                // only show this step if user answered TRUE to 'hasConfig'
                return response.widgetType === "CONTROLLER";
            },
            type: 'checkbox',
            message: 'Which features would you like to include?',
            name: 'features',
            choices: [
                {
                    value: 'hasLocale',
                    name: 'Locale (i18n) file'
                },
                {
                    value: 'hasEmdeddedLayout',
                    name: 'Has an embedded layout'
                },
                {
                    value: 'hasMultipleLayouts',
                    name: 'Include Layout Defintions'
                },
                {
                    value: 'hasSettingPage',
                    name: 'Has a settings page'
                },
                {
                    value: 'hasConfig',
                    name: 'Has a configuration file'
                },
                {
                    value: 'hasBuilderSupportModule',
                    name: 'Include builder support modules'
                },
                {
                    value: 'includeMessageActions',
                    name: 'Include message actions'
                },
                {
                    value: 'includePublishMessages',
                    name: 'Include publish messages'
                },
                {
                    value: 'includeExtensions',
                    name: 'Include extensions'
                },

                {
                    value: 'dataActions',
                    name: 'Include data actions'
                },
                {
                    value: 'defaultSize',
                    name: 'Default Size'
                }

            ],
            'default': ['hasLocale', 'hasEmdeddedLayout', 'hasMultipleLayouts', 'hasSettingPage', 'hasConfig', 'hasBuilderSupportModule', 'includeMessageActions', 'includePublishMessages', 'includeExtensions', 'dataActions', 'defaultSize']
        },
        {
            when: function (response) {
                // only show this step if user answered TRUE to 'hasConfig'
                return response.widgetType === "WIDGET";
            },
            type: 'checkbox',
            message: 'Which features would you like to include?',
            name: 'features',
            choices: [
                {
                    value: 'autoBindDataSource',
                    name: 'Auto bind to a data source'
                },
                {
                    value: 'hasLocale',
                    name: 'Locale (i18n) file'
                },
                {
                    value: 'hasEmdeddedLayout',
                    name: 'Has an embedded layout'
                },
                {
                    value: 'hasMainClass',
                    name: 'Has a main class'
                },
                {
                    value: 'canCreateMapView',
                    name: 'Can create a map view'
                },
                {
                    value: 'hasSettingPage',
                    name: 'Has a settings page'
                },
                {
                    value: 'hasConfig',
                    name: 'Has a configuration file'
                },
                {
                    value: 'hasBuilderSupportModule',
                    name: 'Include builder support modules'
                },
                {
                    value: 'hasLayoutItemSettingPage',
                    name: 'Has layout settings page'
                },
                {
                    value: 'supportInlineEditing',
                    name: 'Include inline editing'
                },
                {
                    value: 'supportRepeat',
                    name: 'Item will be repeated'
                },
                {
                    value: 'includeMessageActions',
                    name: 'Include message actions'
                },
                {
                    value: 'includePublishMessages',
                    name: 'Include publish messages'
                },
                {
                    value: 'includeFeatureActions',
                    name: 'Include Feature Actions'
                },
                {
                    value: 'includeExtensions',
                    name: 'Include extensions'
                },

                {
                    value: 'dataActions',
                    name: 'Include data actions'
                },
                {
                    value: 'defaultSize',
                    name: 'Include a default size'
                }
            ],
            'default': ['autoBindDataSource', 'hasLocale', 'hasEmdeddedLayout', 'canCreateMapView', 'hasSettingPage', 'hasConfig', 'hasBuilderSupportModule', 'hasLayoutItemSettingPage', 'defaultSize']
        },
        {
            when: function (response) {
                // only show this step if user answered TRUE to 'hasConfig'
                return response.features.indexOf('defaultSize') > -1;;
            },
            name: 'defaultWidth',
            message: 'Default Width:',
            'default': 400
        },
        {
            when: function (response) {
                // only show this step if user answered TRUE to 'hasConfig'
                return response.features.indexOf('defaultSize') > -1;
            },
            name: 'defaultHeight',
            message: 'Default Height:',
            'default': 400
        },
        {
            type: 'confirm',
            message: 'Would you like to include tests?',
            name: 'hasTests'
        },

        ];

        this.prompt(prompts).then(function (props) {
            this.log('Scaffolding Widget...');
            this.widgetName = props.widgetName;
            this.widgetTitle = props.widgetTitle;
            this.description = props.description;
            this.widgetPath = props.widgetPath;
            
            // properties that we need to get from the package json, if it exists:
            this.author = utils.authorToString(utils.getPackageInfo('author'));
            this.license = (utils.getPackageInfo('license') !== false ? utils.getPackageInfo('license') : '');

            // if new path is used pull details from user input, else use config.
            this.widgetType = props.widgetType;
            this.exbVersion = '1.0.0-beta.2';
            this.autoBindDataSource = props.features.indexOf('autoBindDataSource') > -1;
            this.hasLocale = props.features.indexOf('hasLocale') > -1;
            this.hasEmdeddedLayout = props.features.indexOf('hasEmdeddedLayout') > -1;
            this.hasMainClass = props.features.indexOf('hasMainClass') > -1;
            this.canCreateMapView = props.features.indexOf('canCreateMapView') > -1;
            this.hasSettingPage = props.features.indexOf('hasSettingPage') > -1;
            this.hasConfig = props.features.indexOf('hasConfig') > -1;
            this.hasBuilderSupportModule = props.features.indexOf('hasBuilderSupportModule') > -1;
            this.hasLayoutItemSettingPage = props.features.indexOf('hasLayoutItemSettingPage') > -1;
            this.supportInlineEditing = props.features.indexOf('supportInlineEditing') > -1;
            this.supportRepeat = props.features.indexOf('supportRepeat') > -1;
            this.includeMessageActions = props.features.indexOf('includeMessageActions') > -1;
            this.includePublishMessages = props.features.indexOf('includePublishMessages') > -1;
            this.includeExtensions = props.features.indexOf('includeExtensions') > -1;
            this.dataActions = props.features.indexOf('dataActions') > -1;
            this.defaultSize = props.features.indexOf('defaultSize') > -1;
            this.hasMultipleLayouts = props.features.indexOf('hasMultipleLayouts') > -1;
            this.includeFeatureActions = props.features.indexOf('includeFeatureActions') > -1;
            this.hasTests = props.hasTests;

            done();
        }.bind(this));
    }

    writing() {
        this.log('Writing...');
        // if a new path has been chosen by user, reset the basePath
        let basePath = path.join(this.widgetPath, 'client\\your-extensions\\widgets\\', this.widgetName);

        this.fs.copyTpl(
            this.templatePath('src/runtime/widget.tsx'),
            this.destinationPath(path.join(basePath, 'src/runtime/widget.tsx')),
            this
        );
        this.fs.copyTpl(
            this.templatePath('src/runtime/translations/default.ts'),
            this.destinationPath(path.join(basePath, 'src/runtime/translations/default.ts')),
            this
        );

        this.log("Has tests " +this.hasTests);
        if (this.hasTests === true) {
            this.fs.copyTpl(
                this.templatePath('tests/widget.test.tsx'),
                this.destinationPath(path.join(basePath, 'tests/widget.test.tsx')),
                this
            );

            this.fs.copyTpl(
                this.templatePath('tests/properties.json'),
                this.destinationPath(path.join(basePath, 'tests/properties.json')),
                this
            );
        }
        this.fs.copyTpl(
            this.templatePath('icon.svg'),
            this.destinationPath(path.join(basePath, 'icon.svg')),
            this
        );

        this.fs.copyTpl(
            this.templatePath('manifest.json'),
            this.destinationPath(path.join(basePath, 'manifest.json')),
            this
        );

        let manifest = JSON.parse(this.fs.read(path.join(basePath, 'manifest.json')));
        if (this.widgetType) {
            if (this.widgetType === "CONTROLLER") {
                manifest.properties['type'] = "CONTROLLER";
                manifest.properties['layoutType'] = "CONTROLLER";
            }
            if (this.widgetType === "LAYOUT") {
                manifest.properties['type'] = "LAYOUT";
            }

        }

        if (this.autoBindDataSource) {
           
            manifest.properties['autoBindDataSource'] = true;
        }
        if (this.hasLocale) {
            manifest.properties['hasLocale'] = true;
        }
        if (this.hasMultipleLayouts) {
            manifest.properties['layout'] = [{
                "name": "DEFAULT",
                "label": "Default",
                "type": ""
            }];
        }
        if (this.hasEmdeddedLayout) {
            manifest.properties['hasEmdeddedLayout'] = true;
            manifest.properties['layout'] = [{
                "name": "DEFAULT",
                "label": "Default",
                "type": ""
            }];
        }
        if (this.hasMainClass) {
            manifest.properties['hasMainClass'] = true;
        }
        if (this.canCreateMapView) {
           
            manifest.properties['canCreateMapView'] = true;
        }
        if (this.hasSettingPage) {
            manifest.properties['hasSettingPage'] = true;
        }
        if (this.hasConfig) {
            manifest.properties['hasConfig'] = true;
        }
        if (this.hasBuilderSupportModule) {
            manifest.properties['hasBuilderSupportModule'] = true;
        }
        if (this.hasLayoutItemSettingPage) {
            manifest.properties['hasLayoutItemSettingPage'] = true;
        }
        if (this.supportInlineEditing) {
            manifest.properties['supportInlineEditing'] = true;
        }
        if (this.supportRepeat) {
            manifest.properties['supportRepeat'] = true;
        }
        if (this.includeMessageActions) {
            manifest['messageActions'] = [];
        }
        if (this.includePublishMessages) {
            manifest['publishMessages'] = [];
        }
        if (this.includeExtensions) {
            manifest['extensions'] = [];
        }
        if (this.includeFeatureActions) {
            manifest['featureActions'] = [];

        }
        if (this.dataActions) {
            manifest['dataActions'] = [];
        }
        if (this.defaultSize) {
            manifest["defaultSize"] = {
                "width": this.defaultWidth,
                "height": this.defaultHeight
            };
        }

        this.fs.write(path.join(basePath, 'manifest.json'), JSON.stringify(manifest, null, 2));

        if (this.hasSettingPage) {
            this.fs.copyTpl(
                this.templatePath('src/setting/setting.tsx'),
                this.destinationPath(path.join(basePath, 'src/setting/setting.tsx')),
                this
            );
            this.fs.copyTpl(
                this.templatePath('src/setting/translations/default.ts'),
                this.destinationPath(path.join(basePath, 'src/setting/translations/default.ts')),
                this
            );
        }

        if (this.hasConfig) {
            this.fs.copyTpl(
                this.templatePath('src/config.ts'),
                this.destinationPath(path.join(basePath, 'src/config.ts')),
                this
            );
            this.fs.copyTpl(
                this.templatePath('config.json'),
                this.destinationPath(path.join(basePath, 'config.json')),
                this
            );
        }

        this.log("Scaffolded Widget");
    }
};