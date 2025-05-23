# Hinode Module - yagallery

<!-- Tagline -->
<p align="center">
    <b>Yet, another damn gallery module for Hinode.</b>
    <br />
</p>

<!-- Badges -->
<p align="center">
    <a href="https://gohugo.io" alt="Hugo website">
        <img src="https://img.shields.io/badge/generator-hugo-brightgreen">
    </a>
    <a href="https://gethinode.com" alt="Hinode theme">
        <img src="https://img.shields.io/badge/theme-hinode-blue">
    </a>
    <a href="https://github.com/anoduck/mod-yagallery/commits/main" alt="Last commit">
        <img src="https://img.shields.io/github/last-commit/anoduck/mod-yagallery.svg">
    </a>
    <a href="https://github.com/anoduck/mod-yagallery/issues" alt="Issues">
        <img src="https://img.shields.io/github/issues/anoduck/mod-yagallery.svg">
    </a>
    <a href="https://github.com/anoduck/mod-yagallery/pulls" alt="Pulls">
        <img src="https://img.shields.io/github/issues-pr-raw/anoduck/mod-yagallery.svg">
    </a>
    <a href="https://github.com/anoduck/mod-yagallery/blob/main/LICENSE" alt="License">
        <img src="https://img.shields.io/github/license/anoduck/mod-yagallery">
    </a>
</p>

## About Hinode

![Logo](https://raw.githubusercontent.com/gethinode/hinode/main/static/img/logo.png)

Hinode is a clean blog theme for [Hugo][hugo], an open-source static site generator. Hinode is available as a [template][repository_template], and a [main theme][repository]. <!-- This repository maintains a Hugo module to add [module][module] to a Hinode site. --> Visit the Hinode documentation site for [installation instructions][hinode_docs].

### _Contributing to Hinode_

This module uses [semantic-release][semantic-release] to automate the release of new versions. The package uses `husky`
and `commitlint` to ensure commit messages adhere to the [Conventional Commits][conventionalcommits] specification. You
can run `npx git-cz` from the terminal to help prepare the commit message.

---

## About Mod-Yagallery

A module for Hinode that uses bootstrap's own modal component to create a photo gallery for sharing images.

## Demo

You can demo all of my hugo modules on [Hinode TestSite](https://testhinode.netlify.com)

## Installation

Since this module was intended for Hinode it uses Hinode's own [bootstrap module](https://github.com/gethinode/mod-bootstrap) to render the styling, and uses Hinode's own
implementation of bootstrap, via the bootstrap module.

## Configuration

Configuration of the module primarily occurs in the yaml file that will be used to store data about your photo gallery.
This method ensures one can have as many galleries as one desires while avoiding the use of global configuration options.

This module supports the following parameters (see the section `params.modules` in `config.toml`):

| Setting | Default | Description                                       |
|---------|---------|---------------------------------------------------|
| debug   | false   | enable generation of exhaustive debugging output. |

### Yaml Data File

Each gallery is defined using a yaml file located in the folder `/data`, and is identified by the name of that
file less the ".yaml" file extension. For example, if the name of the file is `bananas.yaml`, then the id of your
gallery will be "bananas". Vice versa, if the id of your gallery is "coconut", then the name of the corresponding yaml
file will be `coconut.yaml`.

### Paramters

Below is a table describing the accepted parameters for the yaml data file.

| Label   | Type   | Values                     | Description                                                  |
|---------|--------|----------------------------|--------------------------------------------------------------|
| title   | string | single line string         | provides the gallery with a title                            |
| content | list   | yaml object list           | used as section header to identify where image entries begin |
| src     | string | path                       | defines path to the image                                    |
| alt     | string | single line string         | provides the "alt" tag and label                             |
| thumb   | choice | path, "cloudinary", "hugo" | thumbnail method                                             |

#### Example

A typical gallery yaml file will look something like this:

```yaml
title: Gallery of Coconuts
content:
    - src: /path/to/coconut1.jpg
    alt: "Something about coconuts"
    thumb: hugo
    - src: /path/to/coconut2.jpg
    alt: "Something else about coconuts"
    thumb: /path/to/thumb
    - src: /path/to/coconut3.jpg
    alt: "Even more stuff about coconuts"
    thumb: cloudinary
```

You should now get the picture.

## Usage

When it comes time to add your gallery to a page, simply add the shortcode to the markdownfile, including the name of
your datafile less the extension as your gallery id.

```html
{{< yagallery "my-gallery" >}} 

<-- or with named parameters --> 

{{< yagallery galId="my-gallery" >}}
```

<!-- MARKDOWN LINKS -->

[hugo]: https://gohugo.io
[hinode_docs]: https://gethinode.com

<!-- [module]: https://example.com -->

[repository]: https://github.com/gethinode/hinode.git
[repository_template]: https://github.com/gethinode/template.git
[conventionalcommits]: https://www.conventionalcommits.org
[husky]: https://typicode.github.io/husky/
[semantic-release]: https://semantic-release.gitbook.io/
