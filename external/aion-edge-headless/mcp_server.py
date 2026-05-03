#!/usr/bin/env python3
"""MCP stdio server for Aion Edge Runtime.

This lets AionUI agents inspect/start/use the headless WSL runtime without opening a terminal.
Heavy inference stays in server.py.
"""
from __future__ import annotations

import os
import subprocess
from pathlib import Path
from typing import Any

import httpx
from mcp.server.fastmcp import FastMCP

ROOT = Path(os.environ.get("AION_EDGE_ROOT", Path.home() / ".aionui" / "edge-runtime"))
BASE_URL = os.environ.get("AION_EDGE_BASE_URL", "http://127.0.0.1:32111")

mcp = FastMCP("aion-edge-runtime")


def _run(cmd: list[str], timeout: int = 120) -> dict[str, Any]:
    proc = subprocess.run(cmd, cwd=str(ROOT), text=True, capture_output=True, timeout=timeout)
    return {"returncode": proc.returncode, "stdout": proc.stdout, "stderr": proc.stderr}


@mcp.tool()
def edge_status() -> dict[str, Any]:
    """Return Aion Edge Runtime status and discovered models."""
    try:
        with httpx.Client(timeout=10) as client:
            return client.get(f"{BASE_URL}/runtime/status").json()
    except Exception as exc:
        return {"ok": False, "error": str(exc)}


@mcp.tool()
def edge_system(force: bool = False) -> dict[str, Any]:
    """Return detected CPU, RAM, GPU, VRAM, WSL, and runtime recommendation."""
    try:
        with httpx.Client(timeout=20) as client:
            return client.get(f"{BASE_URL}/runtime/system", params={"force": str(force).lower()}).json()
    except Exception as exc:
        return {"ok": False, "error": str(exc)}


@mcp.tool()
def edge_start() -> dict[str, Any]:
    """Start the headless Aion Edge Runtime server in WSL."""
    return _run(["bash", str(ROOT / "start_server_detached.sh")], timeout=90)


@mcp.tool()
def edge_stop() -> dict[str, Any]:
    """Stop the headless Aion Edge Runtime server."""
    return _run(["bash", str(ROOT / "stop_server.sh")], timeout=60)


@mcp.tool()
def edge_logs(lines: int = 160) -> dict[str, Any]:
    """Tail the headless runtime server log."""
    log = ROOT / "logs" / "server.log"
    if not log.exists():
        return {"ok": False, "error": f"Missing log: {log}"}
    data = log.read_text(encoding="utf-8", errors="replace").splitlines()[-max(1, min(lines, 2000)):]
    return {"ok": True, "lines": data}


@mcp.tool()
def edge_download_gguf(repo: str, filename: str, alias: str = "") -> dict[str, Any]:
    """Download a GGUF model from Hugging Face into the runtime model store."""
    cmd = ["bash", str(ROOT / "scripts" / "download_gguf_hf.sh"), repo, filename]
    if alias:
        cmd.append(alias)
    return _run(cmd, timeout=1800)


@mcp.tool()
def edge_chat(prompt: str, model: str = "gguf:auto", max_tokens: int = 256) -> dict[str, Any]:
    """Send a small OpenAI-compatible chat completion request to the active runtime."""
    payload = {"model": model, "messages": [{"role": "user", "content": prompt}], "max_tokens": max_tokens}
    try:
        with httpx.Client(timeout=120) as client:
            return client.post(
                f"{BASE_URL}/v1/chat/completions",
                json=payload,
                headers={"Authorization": "Bearer local"},
            ).json()
    except Exception as exc:
        return {"ok": False, "error": str(exc)}


if __name__ == "__main__":
    mcp.run()
