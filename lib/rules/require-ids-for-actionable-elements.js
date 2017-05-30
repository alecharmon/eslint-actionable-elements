/**
 * @fileoverview requires ids for actionable elmeents
 * @author Alec Harmon
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce that some id is given for actionable elements',
      category: 'Stylistic Issues',
      recommended: false,
    },
    schema: [],
  },

  create(context) {
    const sourceCode = context.getSourceCode();
    const tokensAndComments = sourceCode.tokensAndComments;

    const actionableItems = {
      'a': true,
      'button': true,
      'btn': true,
      'input': true,
      'select': true,
      'textarea': true
    }

  //--------------------------------------------------------------------------
  // Utility
  //--------------------------------------------------------------------------

    function report(token) {
      context.report({
        node: token,
        message: 'Missing ID Attribute: ',
        data: {
          name: token.name,
        },
      });
    }

  //--------------------------------------------------------------------------
  // Helpers
  //--------------------------------------------------------------------------

    function isJsxElement(element) {
      return element.type === 'JSXIdentifier';

    }

    function isActionable(token) {
      return (
                !!token &&
                token.type === 'JSXIdentifier' &&
                token.value.toLowerCase() in actionableItems
              );
    }

    function isActionableElement(first, second) {
      return (first.value === '<' && isActionable(second));
    }

    function isID(i) {
      return (
                tokensAndComments[i].value === 'id' &&
                tokensAndComments[i].type === 'JSXIdentifier' &&
                tokensAndComments[i + 1].value === '=' &&
                tokensAndComments[i + 1].type === 'Punctuator' &&
                tokensAndComments[i + 2].type === 'JSXText'
              );
    }

    function isEndOfTag(i) {
      return (
                tokensAndComments.length < i + 2 ||
                tokensAndComments[i].value === '>' ||
                tokensAndComments[i].value === '/>'
              );
    }

    // Recursive function that works through all of the nodes in the
    // token list and returns true if it has an Id
    function tagContainsId(i) {
      if (!isEndOfTag(i)) {
        if (isID(i)) return true;
        else return tagContainsId(i + 1);
      }
      else {
        return false;
      }
    }

  //--------------------------------------------------------------------------
  // Public
  //--------------------------------------------------------------------------

    return {
      'Program:exit': function () {
        const token = tokensAndComments[0]
        const next_token = tokensAndComments[1];
        if (isActionableElement(token, next_token)) {
         if (!tagContainsId(1)){
              report(next_token)
          }
        }
      },
    }
  },
};
