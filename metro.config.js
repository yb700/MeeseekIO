const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

const TSLIB_CJS = require.resolve('tslib/tslib.js');

config.resolver.resolveRequest = (ctx, moduleName, platform) => {
    if (moduleName === 'tslib' || moduleName === 'tslib/modules/index.js') {
        return { type: 'sourceFile', filePath: TSLIB_CJS };
    }
    return ctx.resolveRequest(ctx, moduleName, platform);
};

module.exports = withNativeWind(config, { input: './global.css' })