#!/usr/bin/env python3
"""Build the Pyodide WebAssembly in-browser bundle for SimSurance Learning Lab.

Usage:
    python scripts/build_py_bundle.py

This packages all Python source files in src/simsurance and config/toy_county.json
into learning-lab/py-simsurance.js, enabling complete zero-dependency execution
of the tested Python simulation engine directly inside GitHub Pages via Pyodide.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / "src" / "simsurance"
CONFIG_FILE = ROOT / "config" / "toy_county.json"
OUT_JS = ROOT / "learning-lab" / "py-simsurance.js"
OUT_PY_DIR = ROOT / "learning-lab" / "py"


def build_bundle() -> int:
    files: dict[str, str] = {}
    py_files = sorted(SRC_DIR.glob("*.py"))
    if not py_files:
        raise RuntimeError(f"No python files found in {SRC_DIR}")

    for py_file in py_files:
        rel_path = f"simsurance/{py_file.name}"
        files[rel_path] = py_file.read_text(encoding="utf-8")

    files["config/toy_county.json"] = CONFIG_FILE.read_text(encoding="utf-8")

    # Also mirror as physical files under learning-lab/py
    for rel_path, content in files.items():
        dest = OUT_PY_DIR / rel_path
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(content, encoding="utf-8")

    bundle_json = json.dumps(files, indent=2)

    js_content = f"""(function (root) {{
  'use strict';

  // Bundled SimSurance Python package for client-side Pyodide WebAssembly runtime
  root.SIMSURANCE_PYTHON_BUNDLE = {{
    version: '0.1.0',
    files: {bundle_json}
  }};

  /**
   * Mounts the SimSurance Python package and config into the Pyodide virtual filesystem.
   * @param {{FS: object, runPythonAsync: Function}} pyodide
   */
  root.mountSimsurance = function (pyodide) {{
    if (!pyodide || !pyodide.FS) {{
      throw new Error('Valid Pyodide runtime instance with FS is required');
    }}
    try {{ pyodide.FS.mkdirTree('/home/pyodide/simsurance'); }} catch (_) {{}}
    try {{ pyodide.FS.mkdirTree('/home/pyodide/config'); }} catch (_) {{}}

    const files = root.SIMSURANCE_PYTHON_BUNDLE.files;
    for (const [relPath, content] of Object.entries(files)) {{
      pyodide.FS.writeFile('/home/pyodide/' + relPath, content);
    }}
  }};

  if (typeof module !== 'undefined' && module.exports) {{
    module.exports = {{
      bundle: root.SIMSURANCE_PYTHON_BUNDLE,
      mountSimsurance: root.mountSimsurance
    }};
  }}
}})(typeof window === 'undefined' ? globalThis : window);
"""

    OUT_JS.parent.mkdir(parents=True, exist_ok=True)
    OUT_JS.write_text(js_content, encoding="utf-8")
    print(f"Generated {OUT_JS.relative_to(ROOT)} with {len(files)} files ({sum(len(c) for c in files.values())} chars).")
    print(f"Mirrored physical Python sources to {OUT_PY_DIR.relative_to(ROOT)}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(build_bundle())
