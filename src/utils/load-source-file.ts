import { Document } from '@langchain/core/documents'
import { LoadersMapping } from 'langchain/document_loaders/fs/directory'
import { TextLoader } from './text-loader'
import { EmptyLoader } from './empty-loader'
import { LocalDirectoryLoader } from './local-directory-loader'

export const emptyExtensions = {
  // Image
  '.avif': (input) => new EmptyLoader(input),
  '.gif': (input) => new EmptyLoader(input),
  '.ico': (input) => new EmptyLoader(input),
  '.png': (input) => new EmptyLoader(input),
  '.jpeg': (input) => new EmptyLoader(input),
  '.jpg': (input) => new EmptyLoader(input),
  '.ttf': (input) => new EmptyLoader(input),
  '.woff': (input) => new EmptyLoader(input),
  '.webp': (input) => new EmptyLoader(input),
  '.bmp': (input) => new EmptyLoader(input),
  // Video
  '.webm': (input) => new EmptyLoader(input),
  '.mkv': (input) => new EmptyLoader(input),
  '.ogg': (input) => new EmptyLoader(input),
  '.mp4': (input) => new EmptyLoader(input),
  '.avi': (input) => new EmptyLoader(input),
  '.flv': (input) => new EmptyLoader(input),
  // jar
  '.jar': (input) => new EmptyLoader(input),
  '.keystore': (input) => new EmptyLoader(input),
} as LoadersMapping
export const extensions = [
  '.cmd',
  '.txt',
  '.jbuilder',
  '.json',
  '.yml',
  '.xml',
  '.run',
  '.enc',
  '.key',
  '.md',
  '.yaml',
  '.init',
  '.gitignore',
  '.env',
  '.development',
  '.production',
  '.example',
  '.encrypted',
  '.sh',
  '.ru',
  '.MD',
  '.sql',
  '.graphql',
  '.cnf',
  '.toml',
  '.sum',
  '.mod',
  // extention of programming languages
  '.c',
  '.cpp',
  '.cgi',
  '.pl',
  '.pm',
  '.psgi',
  '.fcgi',
  '.gql',
  '.graphql',
  '.graphqls',
  '.gqls',
  '.java',
  '.jsp',
  '.kt',
  '.scala',
  '.swift',
  '.ts',
  '.js',
  '.jsx',
  '.tsx',
  '.php',
  '.py',
  '.rb',
  '.cs',
  '.dart',
  '.rs',
  '.go',
  '.html',
  '.css',
  // template engine
  '.slim',
  '.erb',
  '.hbs',
  '.ejs',
  '.pug',
  '.twig',
  '.handlebars',
  '.mustache',
  '.liquid',
  // Frontend framework
  '.vue',
  '.svelte',
  '.scss',
  '.less',
  '.babelrc',
  '.storybook',
  // Common
  '.svg',
  '.html',
  '.local',
  '.production',
  '.example',
  '.env',
  '.prettierrc',
  // Android react-native
  '.watchmanconfig',
  '.gradle',
  '.properties',
  '.bat',
  '.pro',
  '.xml',
  '.kt',
  '.keystore',
  // Ios react-native
  '.h',
  '.plist',
  '.m',
  '.storyboard',
  '.mm',
  '.xcscheme',
  '.xcworkspacedata',
  '.xcuserstate',
  '.pbxproj',
  // cobol
  '.cbl',
  '.cpy',
  '.cob',
  '.jcl',
  '.CBL',
  // VB6
  '.bas',
  '.cls',
  '.ctl',
  '.ctx',
  '.dca',
  '.ddf',
  '.dep',
  '.dob',
  '.dox',
  '.dsr',
  '.dsx',
  '.dws',
  '.frm',
  '.frx',
  '.log',
  '.oca',
  '.pag',
  '.pgx',
  '.res',
  '.tlb',
  '.vb',
  '.vbg',
  '.vbl',
  '.vbp',
  '.vbr',
  '.vbw',
  '.vbz',
  '.wct',
  // Fortran
  '.f90',
  '.f95',
  '.f03',
  '.for',
  '.f',
  '.fpp',
  '.fypp',
  // IBM-RPG
  '.RPG',
  '.RPGLE',
  '.SQLRPGLE',
  '.RPGMOD',
  '.CLLE',
  '.CMD',
  '.rpg',
  '.rpgle',
  '.sqlrpgle',
  '.rpgmod',
  '.clle',
  '.ini',
  '.PRC',
  '.prc',
  '.vbs',
  '.wsf',
  '.abap',
  '.sap',
  '.resx',
  // other
  '.pco',
  '.pli',
  '.pl1',
  '.pll',
  '.crs',
  '.asp',
  '.aspx',
  // Configuration Files, Markup and Documentation
  '.txt', // Plain Text
  '.md', // Markdown
  '.MD', // Markdown (uppercase)
  '.json', // JSON
  '.yml', // YAML
  '.yaml', // YAML
  '.xml', // XML
  '.toml', // TOML
  '.ini', // INI Configuration
  '.cnf', // Configuration
  '.conf', // Configuration
  '.config', // Configuration
  '.editorconfig', // Editor Configuration
  '.eslintrc', // ESLint Configuration
  '.npmrc', // NPM Configuration
  '.nvmrc', // Node Version Manager
  '.dockerignore', // Docker Ignore Configuration
  '.gitignore', // Git Ignore Configuration
  '.env', // Environment Variables
  '.env.development', // Development Environment Variables
  '.env.production', // Production Environment Variables
  '.env.local', // Local Environment Variables
  '.env.example', // Example Environment Variables
  '.env.encrypted', // Encrypted Environment Variables
  '.prettierrc', // Prettier Configuration
  '.babelrc', // Babel Configuration

  // Shell, Scripts and Batch
  '.sh', // Shell Script
  '.bash', // Bash Script
  '.zsh', // Zsh Script
  '.cmd', // Windows Command Script
  '.bat', // Windows Batch File
  '.ps1', // PowerShell Script
  '.run', // Run Script
  '.wsf', // Windows Script File
  '.vbs', // Visual Basic Script

  // Database and Query
  '.sql', // SQL
  '.graphql', // GraphQL
  '.gql', // GraphQL
  '.graphqls', // GraphQL Schema
  '.gqls', // GraphQL Schema
  '.prisma', // Prisma Schema

  // Security
  // '.key', // Key File
  '.enc', // Encrypted File
  '.encrypted', // Encrypted File
  '.keystore', // Keystore File
  '.pem', // Privacy Enhanced Mail Certificate
  '.crt', // Certificate
  '.cer', // Certificate

  // Dependency Management
  '.sum', // Checksum File
  '.mod', // Module Definition
  '.lock', // Dependency Lock File
  '.gemspec', // Ruby Gem Specification
  '.podspec', // CocoaPods Specification

  // C-based Languages
  '.c', // C
  '.h', // C Header
  '.cpp', // C++
  '.cc', // C++
  '.cxx', // C++
  '.hpp', // C++ Header
  '.hxx', // C++ Header
  '.cs', // C#
  '.m', // Objective-C
  '.mm', // Objective-C++

  // Java-based Languages
  '.java', // Java
  '.jsp', // Java Server Pages
  '.kt', // Kotlin
  '.kts', // Kotlin Script
  '.scala', // Scala
  '.groovy', // Groovy
  '.gradle', // Gradle

  // .NET Related
  '.aspx', // ASP.NET
  '.ascx', // ASP.NET User Control
  '.cshtml', // Razor C#
  '.vbhtml', // Razor VB
  '.resx', // Resource File

  // Scripting Languages
  '.js', // JavaScript
  '.jsx', // React JSX
  '.ts', // TypeScript
  '.tsx', // React TSX
  '.py', // Python
  '.pyc', // Python Compiled
  '.pyd', // Python DLL
  '.pyo', // Python Optimized
  '.rb', // Ruby
  '.erb', // Embedded Ruby
  '.php', // PHP
  '.phpt', // PHP Test
  '.pl', // Perl
  '.pm', // Perl Module
  '.t', // Perl Test
  '.cgi', // CGI Script
  '.psgi', // PSGI Application
  '.fcgi', // FastCGI
  '.swift', // Swift
  '.go', // Go
  '.rs', // Rust
  '.dart', // Dart
  '.lua', // Lua
  '.tcl', // Tcl
  '.r', // R
  '.jl', // Julia

  // Web Related
  '.html', // HTML
  '.htm', // HTML
  '.xhtml', // XHTML
  '.css', // CSS
  '.scss', // SCSS
  '.sass', // Sass
  '.less', // Less
  '.svg', // SVG
  '.wasm', // WebAssembly

  // Template Engines
  '.slim', // Slim
  '.erb', // Embedded Ruby
  '.hbs', // Handlebars
  '.ejs', // Embedded JavaScript
  '.pug', // Pug
  '.jade', // Jade
  '.twig', // Twig
  '.handlebars', // Handlebars
  '.mustache', // Mustache
  '.liquid', // Liquid
  '.jbuilder', // Jbuilder
  '.haml', // Haml
  '.njk', // Nunjucks

  // Frontend Frameworks
  '.vue', // Vue
  '.svelte', // Svelte
  '.astro', // Astro
  '.storybook', // Storybook

  // Mobile Development (Android/iOS/React Native)
  '.properties', // Properties
  '.pro', // Pro
  '.plist', // Property List
  '.storyboard', // Storyboard
  '.xib', // XIB Interface Builder
  '.xcscheme', // Xcode Scheme
  '.xcworkspacedata', // Xcode Workspace Data
  '.xcuserstate', // Xcode User State
  '.pbxproj', // Xcode Project
  '.watchmanconfig', // Watchman Config

  // Modern Languages
  '.ex', // Elixir
  '.exs', // Elixir Script
  '.elm', // Elm
  '.clj', // Clojure
  '.cljs', // ClojureScript
  '.cljc', // Clojure Common
  '.fs', // F#
  '.fsx', // F# Script
  '.fsi', // F# Signature
  '.ml', // OCaml
  '.mli', // OCaml Interface
  '.re', // Reason
  '.rei', // Reason Interface
  '.hs', // Haskell
  '.lhs', // Literate Haskell
  '.nim', // Nim
  '.cr', // Crystal
  '.zig', // Zig
  '.wat', // WebAssembly Text Format
  '.wast', // WebAssembly S-Expression
  '.sol', // Solidity
  '.cairo', // Cairo
  '.move', // Move
]
export async function loadSourceCodeFolderDocuments(
  sourcePath: string,
  options?: {
    simplifyCodeContentSize?: number
    ignoreRecursive?: boolean
    unknown?: 'ignore' | 'warn' | 'error'
  },
): Promise<[string, Document[]]> {
  let documents: Document[] = []

  const loaders: LoadersMapping = emptyExtensions
  if (extensions) {
    extensions.forEach((ext) => {
      loaders[ext] = (path) => new TextLoader(path)
      if (ext.toUpperCase() !== ext) {
        loaders[ext.toUpperCase()] = (path) => new TextLoader(path)
      } else if (ext.toLowerCase() !== ext) {
        loaders[ext.toLowerCase()] = (path) => new TextLoader(path)
      }
    })
  }
  const loader = new LocalDirectoryLoader(
    sourcePath,
    loaders,
    options?.ignoreRecursive ? false : true,
    options?.unknown ?? 'ignore',
  )
  documents = await loader.load()

  return [sourcePath, documents]
}
