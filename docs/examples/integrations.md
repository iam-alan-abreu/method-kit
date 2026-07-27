# Integrations — Connecting AI Tools

How to connect different AI models and tools to method-kit.

## Claude Code / Zed

Create `.mcp.json` in your project root:

```json
{
  "mcpServers": {
    "method-kit": {
      "command": "method-kit",
      "args": ["mcp", "stdio"]
    }
  }
}
```

Claude Code reads this automatically and connects.

## Cursor

Create `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "method-kit": {
      "command": "method-kit",
      "args": ["mcp", "stdio"]
    }
  }
}
```

## GitHub Copilot

Create `.github/copilot-instructions.md`:

```markdown
Before answering questions about this project, always consult
the method-kit knowledge graph via the MCP tools available.
Call cortex_doc_context_pack with the user's question first.
Cite sources in your reply.
```

## GPT / OpenAI API (no MCP support)

Generate a system prompt:

```bash
method-kit prompt > /tmp/system-prompt.txt
```

Then inject it into your API call:

```python
import openai

system_prompt = open("/tmp/system-prompt.txt").read()

# Also fetch context before each query
import requests
context = requests.post("http://localhost:8080/mcp", json={
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
        "name": "cortex_doc_context_pack",
        "arguments": {"query": user_question}
    }
}).json()["result"]["content"][0]["text"]

response = openai.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "system", "content": f"Context from knowledge graph:\n{context}"},
        {"role": "user", "content": user_question}
    ]
)
```

## Ollama / Local models

Same as GPT but with local endpoint:

```bash
# Start method-kit MCP server
method-kit serve --port 8080

# In your script
curl -s http://localhost:8080/mcp \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"cortex_doc_context_pack","arguments":{"query":"your question"}}}' \
  | jq '.result.content[0].text'
```

## Any MCP-compatible agent

If your tool supports MCP protocol:

```bash
# Start stdio server
method-kit mcp stdio

# It reads JSON-RPC from stdin, writes to stdout
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}' | method-kit mcp stdio
```

## Hermes / Custom agents

For custom agent runtimes:

```python
import subprocess
import json

class MethodKitClient:
    def __init__(self):
        self.proc = subprocess.Popen(
            ["method-kit", "mcp", "stdio"],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            text=True
        )
    
    def ask(self, query, capability="profissional"):
        request = json.dumps({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "tools/call",
            "params": {
                "name": "cortex_doc_context_pack",
                "arguments": {
                    "query": query,
                    "capability": capability
                }
            }
        })
        self.proc.stdin.write(request + "\n")
        self.proc.stdin.flush()
        response = self.proc.stdout.readline()
        return json.loads(response)

# Usage
mk = MethodKitClient()
context = mk.ask("how does authentication work?")
```
