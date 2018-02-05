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

      let match = node.value.match(/^http:\/\/(.*)$/i)

      if (match) {
        if (
          match[1] &&
          (match[1].match(/^www\.w3\.org/i) ||
            match[1].match(/^www\.schema\.org/i) ||
            match[1].match(/^schema\.org/i))
        ) {
          // ignore specifications as they have to be http by specification https://stackoverflow.com/questions/39573020/requested-https-www-w3-org-2000-svg-found-http-www-w3-org-2000-svg?noredirect=1&lq=1
          return
        }
        return context.report({
          node,
          message: 'HTTP is not allowed. Use "https://" or "//" instead.',
        })
      }
    },
  }
}
