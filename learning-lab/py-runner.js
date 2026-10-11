(function (root) {
  'use strict';

  const PYODIDE_CDN_URL = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';

  class SimSurancePyRunner {
    constructor() {
      this.pyodide = null;
      this.state = 'uninitialized'; // 'uninitialized' | 'loading' | 'ready' | 'running' | 'error'
      this.error = null;
      this.listeners = new Set();
      this.stdoutBuffer = [];
      this.stderrBuffer = [];
    }

    subscribe(fn) {
      this.listeners.add(fn);
      fn({ state: this.state, error: this.error });
      return () => this.listeners.delete(fn);
    }

    _notify(detail = {}) {
      const event = { state: this.state, error: this.error, ...detail };
      for (const fn of this.listeners) {
        try { fn(event); } catch (e) { console.error('Listener error:', e); }
      }
    }

    async init(options = {}) {
      if (this.state === 'ready') return this.pyodide;
      if (this.state === 'loading') {
        return new Promise((resolve, reject) => {
          const unsub = this.subscribe((ev) => {
            if (ev.state === 'ready') { unsub(); resolve(this.pyodide); }
            if (ev.state === 'error') { unsub(); reject(this.error); }
          });
        });
      }

      this.state = 'loading';
      this.error = null;
      this._notify({ message: 'Fetching Pyodide WebAssembly runtime…' });

      try {
        if (!root.loadPyodide) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = PYODIDE_CDN_URL;
            script.crossOrigin = 'anonymous';
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load Pyodide WebAssembly from CDN'));
            document.head.append(script);
          });
        }

        this._notify({ message: 'Initializing CPython 3.12 WebAssembly environment…' });

        this.pyodide = await root.loadPyodide({
          stdout: (text) => {
            this.stdoutBuffer.push(text);
            this._notify({ type: 'stdout', text });
            if (options.onStdout) options.onStdout(text);
          },
          stderr: (text) => {
            this.stderrBuffer.push(text);
            this._notify({ type: 'stderr', text });
            if (options.onStderr) options.onStderr(text);
          },
        });

        this._notify({ message: 'Mounting SimSurance simulation package into virtual filesystem…' });

        if (root.mountSimsurance) {
          root.mountSimsurance(this.pyodide);
        } else {
          throw new Error('SIMSURANCE_PYTHON_BUNDLE not found. Make sure py-simsurance.js is loaded.');
        }

        // Initialize Python sys.path
        await this.pyodide.runPythonAsync(`
import sys
if "/home/pyodide" not in sys.path:
    sys.path.insert(0, "/home/pyodide")
import simsurance
print(f"✓ SimSurance Python core mounted successfully. Ready for Monte Carlo execution.")
`);

        this.state = 'ready';
        this._notify({ message: 'Ready' });
        return this.pyodide;
      } catch (err) {
        this.state = 'error';
        this.error = err;
        this._notify({ message: `Initialization failed: ${err.message}` });
        throw err;
      }
    }

    async runCode(pythonCode) {
      await this.init();
      this.state = 'running';
      this.stdoutBuffer = [];
      this.stderrBuffer = [];
      this._notify({ type: 'run_start' });

      const startTime = performance.now();
      try {
        const rawResult = await this.pyodide.runPythonAsync(pythonCode);
        const durationMs = Math.round(performance.now() - startTime);
        this.state = 'ready';
        const payload = {
          success: true,
          result: rawResult,
          stdout: this.stdoutBuffer.join('\n'),
          stderr: this.stderrBuffer.join('\n'),
          durationMs,
        };
        this._notify({ type: 'run_complete', payload });
        return payload;
      } catch (err) {
        const durationMs = Math.round(performance.now() - startTime);
        this.state = 'ready';
        const payload = {
          success: false,
          error: err.message,
          stdout: this.stdoutBuffer.join('\n'),
          stderr: this.stderrBuffer.join('\n'),
          durationMs,
        };
        this._notify({ type: 'run_error', payload });
        return payload;
      }
    }

    async runSimulationGrid({
      scenario = 'care_coordination_pilot',
      capacityMultiplier = 1.0,
      seeds = [1, 2, 3, 4, 5],
      weeks = 52,
    } = {}) {
      await this.init();
      const code = `
import json
from simsurance import load_config, run_replications, summarize_runs

config = load_config("config/toy_county.json")
seeds = ${JSON.stringify(seeds)}
multiplier = ${Number(capacityMultiplier)}
scenario_id = "${scenario}"

results = run_replications(config, scenario_id, seeds, capacity_multiplier=multiplier)
summary = summarize_runs(results)

# Extract trajectory of the first run for visualization
first_run = results[0]
trajectory = {
    "weekly_waitlist": first_run.weekly_waitlist,
    "weekly_in_care": first_run.weekly_in_care,
}

output = {
    "scenario_id": scenario_id,
    "capacity_multiplier": multiplier,
    "seeds_count": len(seeds),
    "metrics": summary["metrics"],
    "trajectory": trajectory,
}
json.dumps(output)
`;
      const execution = await this.runCode(code);
      if (!execution.success) throw new Error(execution.error);
      const parsed = JSON.parse(execution.result);
      parsed.durationMs = execution.durationMs;
      return parsed;
    }
  }

  root.SimSurancePyRunner = new SimSurancePyRunner();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      SimSurancePyRunner: root.SimSurancePyRunner,
    };
  }
})(typeof window === 'undefined' ? globalThis : window);
