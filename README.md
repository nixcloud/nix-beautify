nix-beautify is a tool to indent/format nix based source code and data structures as attrsets and lists.

# usage

# installation

    git clone https://github.com/nixcloud/nix-beautify
    cd nix-beautify
    nix-env -i nix-beautify -f default.nix

# usage

    cat code.nix | nix-beautify

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

## processed output

    cat code.nix | nix-beautify
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
