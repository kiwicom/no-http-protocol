/**
 * @fileoverview Forbid specifying http(s) protocol in URLs.
 * @author Stephen Wille
 * @contact p.stephenwille@gmail.com
 */
"use strict"

var rule = require("../../../lib/rules/no-http-protocol"),
  RuleTester = require("eslint").RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
var errorMessage = [
  {
    message: 'HTTP is not allowed. Use "https://" or "//" instead.',
    type: "Literal",
  },
]

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } })
ruleTester.run("no-http-protocol", rule, {
  valid: [
    { code: `var validVar = '//my.server.com'` },
    { code: `$.get('//my.site.com')` },
    { code: `let http = '//my.site.com'` },
    { code: `let https = '//my.site.com'` },
    { code: `var valid = 'https://my.server.com'` },
    { code: `let https = 'https://my.site.com'` },
    { code: `let https = 'http://www.w3.org/2000'` }, // allow http on specifications
    { code: `let https = 'http://www.schema.org/x'` }, // allow http on specifications
    { code: `let https = 'http://schema.org/x'` }, // allow http on specifications
  ],

  invalid: [
    {
      code: `var invalidVar = 'http://my.server.com'`,
      errors: errorMessage,
    },
    {
      code: `$.get('http://my.site.com')`,
      errors: errorMessage,
    },
    {
      code: `let http = 'http://my.site.com'`,
      errors: errorMessage,
    },
  ],
})
