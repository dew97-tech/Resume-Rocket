import babel from '@babel/core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Ensure ES module directory resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcFolder = path.join(__dirname, 'src');

function cleanCommentsFromDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            cleanCommentsFromDir(fullPath);
        } else if (entry.isFile() && (fullPath.endsWith('.jsx') || fullPath.endsWith('.js'))) {
            const originalCode = fs.readFileSync(fullPath, 'utf8');

            try {
                // First parse the code
                const ast = babel.parseSync(originalCode, {
                    filename: fullPath,
                    sourceType: 'module',
                    parserOpts: {
                        plugins: ['jsx']
                    }
                });

                // Traverse to remove JSXEmptyExpression (which represent inside of {/* */})
                babel.traverse(ast, {
                    JSXExpressionContainer(nodePath) {
                        if (nodePath.node.expression.type === 'JSXEmptyExpression') {
                            nodePath.remove();
                        }
                    }
                });

                // Regenerate the code with comments stripped
                const result = babel.transformFromAstSync(ast, originalCode, {
                    filename: fullPath,
                    generatorOpts: {
                        comments: false,
                        retainLines: false // Do not retain lines to intelligently condense empty lines
                    }
                });

                // Write the cleaned code back if successful
                if (result && result.code) {
                    fs.writeFileSync(fullPath, result.code, 'utf8');
                    console.log(`✅ Cleaned: ${entry.name}`);
                }
            } catch (err) {
                console.error(`❌ Failed to process ${entry.name}: ${err.message}`);
            }
        }
    }
}

console.log('🧹 Starting comment removal process...');
cleanCommentsFromDir(srcFolder);
console.log('🎉 Finished removing comments from all JSX/JS files in the src directory!');
