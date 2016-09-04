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
    const actionableItems = [
      'a', 'button', 'btn', 'input', 'select', 'textarea',
    ];
    const sourceCode = context.getSourceCode();
    const tokensAndComments = sourceCode.tokensAndComments;

        //--------------------------------------------------------------------------
        // Utility
        //--------------------------------------------------------------------------

    function report(token) {
      context.report({
        node: token,
        message: 'Missing ID Attribute: ',
        data: {
          identifier: token.name,
        },
      });
    }

        //--------------------------------------------------------------------------
        // Helpers
        //--------------------------------------------------------------------------

    function isActionable(token) {
      return (
                !!token &&
                token.type === 'JSXIdentifier' &&
                actionableItems.indexOf(token.value.toLowerCase()) > -1
              );
    }

    function isActionableElment(first, second) {
      return (first.value === '<' && isActionable(second));
    }

    function isID(tokens, i) {
      return (
                    tokens[i].value === 'id' &&
                    tokens[i].type === 'JSXIdentifier' &&
                    tokens[i + 1].value === '=' &&
                    tokens[i + 1].type === 'Punctuator' &&
                    tokens[i + 2].type === 'JSXText'
                  );
    }

    function isEndOfTag(tokens, i) {
      return (
                tokens.length < i + 2 ||
                tokens[i].value === '>' ||
                tokens[i].value === '/>'
              );
    }

    function tagContainsActionableElement(tokens, i, actionable_item) {
      if (!isEndOfTag(tokens, i)) {
        if (isID(tokens, i)) return;
        tagContainsActionableElement(tokens, i + 1, actionable_item);
      }
      else {
        report(actionable_item);
      }
    }

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

    return {
      'Program:exit': function () {
        tokensAndComments.forEach(function (token, i) {
          if (isActionableElment(token, tokensAndComments[i + 1])) {
            const element = tokensAndComments[i + 1];
            tagContainsActionableElement(tokensAndComments, i + 2, element);
          }
          else {
            return;
          }
        });
      },
    };
  },
};
