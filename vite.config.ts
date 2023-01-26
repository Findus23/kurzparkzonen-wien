import {defineConfig, Plugin, TransformResult} from 'vite'
import {compile} from "ejs"
import legacy from '@vitejs/plugin-legacy'

const fileRegex = /\.(ejs)$/

export function ejsPlugin(): Plugin {
    return {
        name: "ejs-plugin",
        enforce: "pre",

        transform(code: string, id: string): TransformResult | undefined {
            if (fileRegex.test(id)) {
                const template = compile(code, {
                    filename: id,
                    client: true,
                    strict: true,
                    _with: false,
                    compileDebug: false,
                    destructuredLocals: [
                        "prop", "dateRange", "inRange", "type", "booleanToCheckmark", "showDate", "date",
                        //
                        "rawHTML",
                        //
                        "icon", "address", "display_name", "bezirk"
                    ],
                    outputFunctionName: "output",
                    rmWhitespace: true
                });
                return {
                    code: "export default " + template.toString(),
                    map: null,
                }
            }
        }
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [ejsPlugin(), legacy({
        targets: ['defaults', 'not IE 11']
    })],
    base: "./",
    build: {
        target: "es2018",
    },

})
