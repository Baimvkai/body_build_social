const path = require('path');
module.exports = ({ file }) => {
    const designWidth = file.includes(path.join('node_modules', 'vant')) ? 375:375;
    return {
        plugins: {
            "postcss-px-to-viewport": {
                viewportWidth: designWidth,
            }
        }
    }
}
