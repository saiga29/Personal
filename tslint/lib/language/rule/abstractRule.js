/**
 * @license
 * Copyright 2013 Palantir Technologies, Inc.
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
var AbstractRule = (function () {
    function AbstractRule(ruleName, value, disabledIntervals) {
        this.value = value;
        var ruleArguments = [];
        if (Array.isArray(value) && value.length > 1) {
            ruleArguments = value.slice(1);
        }
        this.options = {
            disabledIntervals: disabledIntervals,
            ruleArguments: ruleArguments,
            ruleName: ruleName,
        };
    }
    AbstractRule.prototype.getOptions = function () {
        return this.options;
    };
    AbstractRule.prototype.applyWithWalker = function (walker) {
        walker.walk(walker.getSourceFile());
        return walker.getFailures();
    };
    AbstractRule.prototype.isEnabled = function () {
        var value = this.value;
        if (typeof value === "boolean") {
            return value;
        }
        if (Array.isArray(value) && value.length > 0) {
            return value[0];
        }
        return false;
    };
    return AbstractRule;
}());
exports.AbstractRule = AbstractRule;
