with (import <nixpkgs> {});
mkShell {
  buildInputs = [
    nodejs
    live-server
  ];
}
