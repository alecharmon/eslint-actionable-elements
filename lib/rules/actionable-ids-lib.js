/**
 * @fileoverview Ensures id's are provided for actionable JSX tags
 * @author Alec Harmon
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "enforce consistent spacing before and after commas",
            category: "Stylistic Issues",
            recommended: false
        },
        schema: []
    },

    create: function(context) {

        var actionable_items = ['a', 'button', 'btn']
        var sourceCode = context.getSourceCode();
        var tokensAndComments = sourceCode.tokensAndComments;

        //--------------------------------------------------------------------------
        // Helpers
        //--------------------------------------------------------------------------

        function isActionableTag(first,second){
          return ( first.value === "<" && isActionable(second) )
        }

        function isActionable(token){
          return !!token &&
          (token.type === "JSXIdentifier") &&
          (actionable_items.indexOf(token.value) > -1);
        }

        function isID(tokens,i) {
          return (tokens[i].value === "id" && tokens[i].type === "JSXIdentifier" &&
              tokens[i+1].value === "=" && tokens[i+1].type === "Punctuator" &&
              tokens[i+2].type === "JSXText")
        }

        function isEndOfTag(tokens,i) {
          return( tokens.length < i+2 || tokens[i].value === ">" || tokens[i].value === "/>")
        }

        function returnHandler(){
          return
        }

        //TODO doc //tolower
        function testForID(tokens,i,actionable_item){
          if (!isEndOfTag(tokens,i) ) {
            if (isID(tokens,i)) return
            else testForID(tokens,i+1,actionable_item)
          }
          else {
            report(actionable_item)
          }
        }

        function report(token){
          context.report({
              node: token,
              message: "Missing ID Attribute: ",
              data: {
                  identifier: token.name
              }
          });
        }

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            "Program:exit": function() {
                var elements;

                tokensAndComments.forEach(function(token, i) {
                    if (isActionableTag(token, tokensAndComments[i+1])) {
                      var actionalableElement = tokensAndComments[i+1]
                      testForID(tokensAndComments, i+2, actionalableElement);
                    }
                    else {
                      return;
                    }
                });
            },
        };

    }
};
