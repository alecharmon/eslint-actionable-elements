/**
 * @fileoverview Ensures id&#39;s are provided for actiona
 * @author Alec Harmon
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/actionable-ids-lib"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------


var errorMessage = { message: "Missing ID Attribute: ", type: "JSXIdentifier" }
var parserOptions = { ecmaVersion: 6, ecmaFeatures: { jsx: true } }

var ruleTester = new RuleTester();

ruleTester.run("ids-for-actionable-elements", rule, {
    valid: [
        { code: "<a size='20px' color='Blue' id='someLink' > </a>", parserOptions: parserOptions },
        { code: "<h1 size='20px' > </h1>", parserOptions: parserOptions },
        { code: "<h1 size='20px' size='20px' size='20px' size='20px' size='20px' size='20px' > </h1>", parserOptions: parserOptions },
    ],
    invalid: [
      {
        code: "<a>Hello, world</a>",
        parserOptions: parserOptions,
        errors: [errorMessage]
      },

      {
        code: "<button size='someButton'>   </button>",
        parserOptions: parserOptions,
        errors: [errorMessage]
      },

      {
        code: "< button id >Hello, world</button>",
        parserOptions: parserOptions,
        errors: [errorMessage]
      },

      {
        code: "< button id >Hello, world</button>",
        parserOptions: parserOptions,
        errors: [errorMessage]
      },

    ]
});