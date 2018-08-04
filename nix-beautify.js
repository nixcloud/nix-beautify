/*
 *    nix-beautify formats/indents nix source code.
 *    Copyright (C) <info@nixcloud.io> nixcloud GmbH
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU Affero General Public License as
 *    published by the Free Software Foundation, either version 3 of the
 *    License, or (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU Affero General Public License for more details.
 *
 *    You should have received a copy of the GNU Affero General Public License
 *    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

var fs = require('fs');
var stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
console.log(format(stdinBuffer.toString()));

function format(input) {
  var indent = 0;
  var indentStr = "";
  var doc = "";
  var changed = false;
  var splitDoc = input.split("\n");

  for (var i = 0; i < splitDoc.length; i++){
    //failesafe that is needed because multiline comments as well as multiline strings are currently not detected
    if (indent < 0) {
        indent = 0;
    }

    var line = splitDoc[i];

    // cut comments
    var trimmedLine = line.trim();
    var commentStart = trimmedLine.indexOf('#');
    if (commentStart >= 0){
      trimmedLine = trimmedLine.substring(0, commentStart);
    }
    // cut nix-strings
    trimmedLine = trimmedLine.replace(/\".*\"/g, " ");


    //matches ( [ { and 'let'
    var open = (trimmedLine.match(/[\[{\(]/g) || []).length;
    //match let
    open += (trimmedLine.match(/([\s=;\(]|^)let([\({\s]|$)/g) || []).length;
    //matches ) ] } and 'in'
    var close = ((" " +trimmedLine + " ").match(/[\]}\)]/g) || []).length;
    close += (trimmedLine.match(/([\s=;\(]|^)in([\({\s]|$)/g) || []).length;

    if (close > open && trimmedLine.length <= 3){
      indent = indent + open - close;
      indentStr = "";
      for (var j = 0; j < indent; j++){
        indentStr = indentStr + "  ";
      }
    }

    var currentIndent = line.search(/\S|$/) //current space count

    //check if the indentation needs to change
    if (indent*2 !== currentIndent){
      //replace current indentation with the new one
      var from = {
        line: i,
        ch: 0,
      }
      var to = {
        line: i,
        ch: currentIndent, //current space count
      }
      line = indentStr + line.substring(currentIndent, line.length);
      changed = true;
    }

    if (open > close){
      indent = indent + open - close;
      indentStr = "";
      for (var j = 0; j < indent; j++){
        indentStr = indentStr + "  ";
      }
    }else if (close > open && trimmedLine.length > 3){
      indent = indent + open - close;
      indentStr = "";
      for (var j = 0; j < indent; j++){
        indentStr = indentStr + "  ";
      }
    }

    doc = doc + line + "\n"
  }
  return doc;
}
