import ts from 'typescript';
import { resolve } from 'node:path';

// Check the generated declaration itself without the inherited skipLibCheck.
// Astro's normal checker handles the application; this catches the upstream
// template regression that its default library checking otherwise misses.
const files = ['.astro/content.d.ts', 'tests/live-content-types.ts'].map(file => resolve(file));
const program = ts.createProgram(files, {
  strict: true, noEmit: true, skipLibCheck: false, types: [],
  target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
});
const diagnostics = files.flatMap(file => {
  const source = program.getSourceFile(file);
  if (!source) throw new Error('Missing ' + file + '. Run npm run sync first.');
  return [...program.getSyntacticDiagnostics(source), ...program.getSemanticDiagnostics(source)];
});
if (diagnostics.length) {
  console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCanonicalFileName: path => path,
    getCurrentDirectory: () => process.cwd(), getNewLine: () => '\n',
  }));
  process.exitCode = 1;
} else {
  console.log('Generated content declarations and live-loader inference probes: 0 diagnostics (skipLibCheck: false).');
}
