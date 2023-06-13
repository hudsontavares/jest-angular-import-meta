import { dirname } from 'path';
import { MetaProperty, Node, SourceFile, SyntaxKind, TransformationContext, Visitor } from 'typescript';

import type { TsCompilerInstance } from 'ts-jest/dist/types';

export const version = 1;

export const name = '@hudsontavares/jest-angular-import-meta';

/**
 * Transforms all the `import.meta.url` references into the `__dirname` for each source file. 
 * @param {*} compiler - the {@link TsCompilerInstance}
 * @returns a transformation function
 */
export const factory = (compiler: TsCompilerInstance) => {
  const ts = compiler.configSet.compilerModule;
  const importCodes = [SyntaxKind.FunctionKeyword as number, SyntaxKind.ImportKeyword as number];
  
  const isImportMeta = (node: Node) => {
    const output = node.getSourceFile().fileName.endsWith('.ts') &&
      ts.isMetaProperty(node) && importCodes.includes(node.keywordToken) && node.name.text === 'meta';
  
    return output;
  };

  const createVisitor = (context: TransformationContext, sourceFile: SourceFile): Visitor => {
    const visitor: Visitor = (node: MetaProperty) => {
      if (isImportMeta(node)) {
        const literal = dirname(sourceFile.fileName);
        return ts.factory.createStringLiteral(literal);
      }
      return ts.visitEachChild(node, visitor, context);
    };

    return visitor;
  };


  return (context: TransformationContext) => {
    return (sourceFile: SourceFile) => ts.visitNode(sourceFile, createVisitor(context, sourceFile));
  }
}
