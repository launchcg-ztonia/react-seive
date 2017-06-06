module.exports = {
    "env": {
        "es6": true,
        "mocha": true,
        "browser": true,
        "node": true,
        "shared-node-browser": true
    },
    "extends": "airbnb",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "comma-dangle": ["error", "never"],
        "consistent-return":
            ["error", {
                "treatUndefinedAsUnspecified": true
            }],
        "default-case": "off",
        "eol-last": "off",
        "indent":
            ["error", 4, {
                "SwitchCase": 1
            }],
        "import/no-dynamic-require": "off",
        "import/no-named-as-default": "off",

        "key-spacing": "error",
        "max-len":
            ["warn", 150, 2, {
                "ignoreComments": true
            }],
        "no-cond-assign": ["error", "except-parens"],
        "no-console": "warn",
        "no-continue": "off",
        "no-else-return": "off",
        "no-mixed-operators": "off",
        "no-param-reassign":
            ["warn", {
                "props": false
            }],
        "no-plusplus":
            ["error", {
                "allowForLoopAfterthoughts": true
            }],
        "no-underscore-dangle": "off",
        "no-restricted-syntax": "warn",
        "no-unused-expressions":
            ["error", {
                "allowShortCircuit": true,
                "allowTernary": true
            }],
        "no-unused-vars": ["warn", {
            "vars": "local",
            "args": "none",
            "varsIgnorePattern": "React"
        }],
        "no-use-before-define": "warn",
        "arrow-parens": ["error", "as-needed"],
        "object-curly-spacing":
            ["error", "always", {
                "arraysInObjects": false
            }],
        "quotes":
            ["error", "single", {
                "avoidEscape": true,
                "allowTemplateLiterals": true
            }],
        "radix": "off",
        "semi": ["error", "never"],
        "semi-spacing": "error",

        "react/prop-types":
            ["error", {
                // Ignore React-Router Injected Props
                // https://github.com/ReactTraining/react-router/blob/master/docs/API.md#injected-props
                ignore: ["params", "route", "router", "routes", "history", "location"]
            }],
        //"react/jsx-uses-vars": ["off"],

        "jsx-a11y/no-static-element-interactions": "off",

        "react/forbid-prop-types": "off",
        "react/jsx-curly-spacing":
            ["error", "never", {
                "spacing": {
                    "objectLiterals": "never"
                }}],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-filename-extension":
            ["warn", {
                "extensions": [".js", ".jsx"]
            }],
        "react/jsx-uses-react": "off",

        // This rule is set to warn as the refactoring is too big to do in one go,
        // More Information https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
        // TODO: make sure all warnigns are fixed then turn to error as this severely degrades performance
        "react/jsx-no-bind": "warn",

        // TODO: figure out the best way to setState in componentDidMount
        "react/no-did-mount-set-state": "warn",

        // TODO: turn this back to error
        "react/require-default-props": "off",
        "react/no-array-index-key": "off",

        "react/no-string-refs": "warn",
        "react/no-unescaped-entities": "off",
        "react/prefer-stateless-function": "warn",
        "react/react-in-jsx-scope": "off"
    }
};
