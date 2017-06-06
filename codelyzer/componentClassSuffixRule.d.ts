import * as Lint from 'tslint';
import * as ts from 'typescript';
import { Ng2Walker } from './angular/ng2Walker';
import { ComponentMetadata } from './angular/metadata';
export declare class Rule extends Lint.Rules.AbstractRule {
    static FAILURE: string;
    static validate(className: string): boolean;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
export declare class ClassMetadataWalker extends Ng2Walker {
    visitNg2Component(meta: ComponentMetadata): void;
}
