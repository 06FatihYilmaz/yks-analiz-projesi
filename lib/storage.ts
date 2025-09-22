import { promises as fs } from "fs";
import path from "path";
import { DEFAULT_STATE, StoredState, normalizeState } from "./analysis";

const DATA_DIRECTORY = path.join(process.cwd(), "data");
const STATE_FILE = path.join(DATA_DIRECTORY, "state.json");

let operationQueue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = operationQueue.then(task);
  operationQueue = run.catch(() => {});
  return run;
}

async function ensureDataFile() {
  await fs.mkdir(DATA_DIRECTORY, { recursive: true });

  try {
    await fs.access(STATE_FILE);
  } catch {
    await enqueue(async () => {
      try {
        await fs.access(STATE_FILE);
      } catch {
        await fs.writeFile(STATE_FILE, JSON.stringify(DEFAULT_STATE, null, 2), "utf8");
      }
    });
  }
}

export async function readState(): Promise<StoredState> {
  await ensureDataFile();

  return enqueue(async () => {
    try {
      const raw = await fs.readFile(STATE_FILE, "utf8");
      const parsed = JSON.parse(raw) as Partial<StoredState>;
      return normalizeState(parsed);
    } catch (error) {
      console.error("Durum dosyası okunamadı, varsayılan değerlere dönülüyor.", error);
      return normalizeState(DEFAULT_STATE);
    }
  });
}

export async function writeState(state: Partial<StoredState>): Promise<StoredState> {
  const normalized = normalizeState(state);
  await ensureDataFile();

  await enqueue(async () => {
    await fs.writeFile(STATE_FILE, JSON.stringify(normalized, null, 2), "utf8");
  });

  return normalized;
}

export async function mergeState(update: Partial<StoredState>): Promise<StoredState> {
  const current = await readState();
  const next: StoredState = {
    examNotes: typeof update.examNotes === "string" ? update.examNotes : current.examNotes,
    analysis: normalizeState({ analysis: update.analysis ?? current.analysis }).analysis,
  };

  return writeState(next);
}
