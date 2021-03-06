/**
 * @license
 * Copyright 2016 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("../index");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        var noForInArrayWalker = new NoForInArrayWalker(sourceFile, this.getOptions(), program);
        return this.applyWithWalker(noForInArrayWalker);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-for-in-array",
        description: "Disallows iterating over an array with a for-in loop.",
        descriptionDetails: (_a = ["\n            A for-in loop (`for (var k in o)`) iterates over the properties of an Object.\n\n            While it is legal to use for-in loops with array types, it is not common.\n            for-in will iterate over the indices of the array as strings, omitting any \"holes\" in\n            the array.\n\n            More common is to use for-of, which iterates over the values of an array.\n            If you want to iterate over the indices, alternatives include:\n\n            array.forEach((value, index) => { ... });\n            for (const [index, value] of array.entries()) { ... }\n            for (let i = 0; i < array.length; i++) { ... }\n            "], _a.raw = ["\n            A for-in loop (\\`for (var k in o)\\`) iterates over the properties of an Object.\n\n            While it is legal to use for-in loops with array types, it is not common.\n            for-in will iterate over the indices of the array as strings, omitting any \"holes\" in\n            the array.\n\n            More common is to use for-of, which iterates over the values of an array.\n            If you want to iterate over the indices, alternatives include:\n\n            array.forEach((value, index) => { ... });\n            for (const [index, value] of array.entries()) { ... }\n            for (let i = 0; i < array.length; i++) { ... }\n            "], Lint.Utils.dedent(_a)),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        requiresTypeInfo: true,
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "for-in loops over arrays are forbidden. Use for-of or array.forEach instead.";
    return Rule;
    var _a;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
var NoForInArrayWalker = (function (_super) {
    __extends(NoForInArrayWalker, _super);
    function NoForInArrayWalker() {
        _super.apply(this, arguments);
    }
    NoForInArrayWalker.prototype.visitForInStatement = function (node) {
        var iteratee = node.expression;
        var tc = this.getTypeChecker();
        var type = tc.getTypeAtLocation(iteratee);
        /* tslint:disable:no-bitwise */
        var isArrayType = type.symbol && type.symbol.name === "Array";
        var isStringType = (type.flags & ts.TypeFlags.StringLike) !== 0;
        /* tslint:enable:no-bitwise */
        if (isArrayType || isStringType) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
        _super.prototype.visitForInStatement.call(this, node);
    };
    return NoForInArrayWalker;
}(Lint.ProgramAwareRuleWalker));
