# litestream-npm

[Litestream](https://litestream.io/) is a standalone streaming replication tool for SQLite. This npm module provides a means to install the correct litestream binary for your system.

## Installation

Install the module using your favorite package manager:

```sh
bun add @flydotio/litestream
npm install @flydotio/litestream
pnpm install @flydotio/litestream
yarn add @flydotio/litestream
```

This gem wraps the standalone executable version of the [Litestream](https://litestream.io/install/source/) utility. These executables are platform specific, so there are actually separate underlying packages per platform, but the correct package will automatically be picked for your platform. Litestream itself doesn't support Windows, so this gem doesn't either.

Supported platforms are:

- arm64-darwin (macos-arm64)
- x86_64-darwin (macos-x64)
- arm64-linux (linux-arm64)
- x86_64-linux (linux-x64)

### Usage

Simply use:

```
bunx litestream <command> <options>...
npx litestream <command> <options>...
```

See the [litestream reference](https://litestream.io/reference/#commands) for a list of available commands.

## Development

Install the [GitHub CLI](https://cli.github.com/).  Run `npm install`.

Prepare packages for release:

```
npm run package
```

Current version is 1.0.1.  It includes binaries for litestream v0.3.13.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
