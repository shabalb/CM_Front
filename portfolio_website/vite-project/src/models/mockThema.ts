import type { Thema } from "../models/thema.ts";
import type { IThemaService } from "../services/themeService.ts";

export class MockThemaService implements IThemaService {
  static SavedThema: Thema;
  static listners = new Set<(thema: Thema) => void>();

  static set savedThema(thema: Thema) {
    this.SavedThema = thema;
    this.listners.forEach((l) => l(thema));
  }

  static get savedThema() {
    return this.SavedThema;
  }

  static subscribe(cb: (t: Thema) => void) {
    this.listners.add(cb);
    return () => this.listners.delete(cb);
  }

  async getThema(): Promise<readonly Thema[]> {
    return [MockThemaService.savedThema];
  }
  async sendThema(userThema: Thema) {
    MockThemaService.savedThema = userThema;
  }
}
