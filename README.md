nix-beautify is a tool to indent/format nix based source code and data structures as attrsets and lists.

# usage

## code.nix

    [
    {
     fetch = {
     rev = "9831f2c3ac1068a78f50999a30db84270f647af6";
    sha256 = "0qxdq599sjwb03znlxy634mdnmfl90770wf1kk37dhzll6i84vkr";
    type = "git";
    url = "https://github.com/ugorji/go";
    };
     goPackagePath = "github.com/ugorji/go";
    }
    {
     fetch = {
     rev = "d670f9405373e636a5a2765eea47fac0c9bc91a4";
    sha256 = "1w1xid51n8v1mydn2m3vgggw8qgpd5a5sr62snsc77d99fpjsrs0";
    type = "git";
    url = "https://gopkg.in/yaml.v2";
    };
     goPackagePath = "gopkg.in/yaml.v2";
    }
    ]

## using nix-beautify

    cat code.nix | node beautify.js 
    [  
      {
        fetch = {
          rev = "9831f2c3ac1068a78f50999a30db84270f647af6";
          sha256 = "0qxdq599sjwb03znlxy634mdnmfl90770wf1kk37dhzll6i84vkr";
          type = "git";
          url = "https://github.com/ugorji/go";
        };
        goPackagePath = "github.com/ugorji/go";
      }
      {
        fetch = {
          rev = "d670f9405373e636a5a2765eea47fac0c9bc91a4";
          sha256 = "1w1xid51n8v1mydn2m3vgggw8qgpd5a5sr62snsc77d99fpjsrs0";
          type = "git";
          url = "https://gopkg.in/yaml.v2";
        };
        goPackagePath = "gopkg.in/yaml.v2";
      }
    ]
