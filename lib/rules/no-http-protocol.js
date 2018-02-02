/**
 * @fileoverview Forbid specifying http(s) protocol in URLs.
 * @author Stephen Wille
 */
"use strict"

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = context => {
  return {
    Literal: node => {
      if (typeof node.value !== "string") return

      if (node.value.match(/^http:\/\//i)) {
        return context.report({
          node,
          message: 'HTTP is not allowed. Use "https://" or "//" instead.',
        })
      }
    },
  }
}
